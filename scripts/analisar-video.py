#!/usr/bin/env python3
"""Analisa um vídeo bruto e reúne os dados para montar o PLANO DE EDIÇÃO.

Uso:
  python3 scripts/analisar-video.py <video> [pasta-de-saida] [--sem-transcricao] [--lingua pt]

Gera em <pasta-de-saida> (padrão: public/entrada/analise/<nome>/, ignorada pelo Git):
  analise.json   todos os dados
  resumo.md      resumo legível (é o que se mostra/usa no plano)
  contato.jpg    folha de contato (um quadro por segundo, até 24 quadros)
  legendas.json  transcrição com tempo por palavra (Whisper), se ativada

Só usa FFmpeg/FFprobe e a biblioteca padrão do Python. A transcrição chama scripts/transcrever.py
com /opt/whisper-venv (veja a skill `whisper`).
"""
import argparse
import json
import math
import os
import re
import shutil
import subprocess
import sys

AQUI = os.path.dirname(os.path.abspath(__file__))
WHISPER_PY = "/opt/whisper-venv/bin/python"


def sh(cmd):
    return subprocess.run(cmd, capture_output=True, text=True)


def fps_de(txt):
    try:
        a, b = txt.split("/")
        return round(float(a) / float(b), 3) if float(b) else 0.0
    except Exception:
        return 0.0


def sonda(caminho):
    r = sh(["ffprobe", "-v", "error", "-show_streams", "-show_format", "-of", "json", caminho])
    if r.returncode != 0:
        sys.exit("ffprobe não conseguiu ler o arquivo:\n" + r.stderr)
    d = json.loads(r.stdout)
    v = next((s for s in d["streams"] if s["codec_type"] == "video"), None)
    a = next((s for s in d["streams"] if s["codec_type"] == "audio"), None)
    if not v:
        sys.exit("O arquivo não tem vídeo.")
    rot = 0
    for sd in v.get("side_data_list", []) or []:
        if "rotation" in sd:
            rot = int(round(float(sd["rotation"])))
    if not rot and v.get("tags", {}).get("rotate"):
        rot = int(v["tags"]["rotate"])
    w, h = int(v["width"]), int(v["height"])
    if abs(rot) % 180 == 90:
        w, h = h, w
    dur = float(d["format"].get("duration") or v.get("duration") or 0)
    info = {
        "arquivo": os.path.basename(caminho),
        "duracao_s": round(dur, 3),
        "largura": w,
        "altura": h,
        "orientacao": "vertical" if h > w else ("horizontal" if w > h else "quadrado"),
        "rotacao_nos_metadados": rot,
        "fps": fps_de(v.get("avg_frame_rate", "0/1")),
        "codec_video": v.get("codec_name"),
        "pix_fmt": v.get("pix_fmt"),
        "dez_bits": "10" in (v.get("pix_fmt") or ""),
        "tem_audio": bool(a),
        "codec_audio": a.get("codec_name") if a else None,
        "canais": a.get("channels") if a else None,
        "tamanho_mb": round(int(d["format"].get("size", 0)) / 1e6, 1),
    }
    avisos = []
    if info["codec_video"] in ("hevc", "h265"):
        avisos.append("HEVC: converter para H.264 antes de usar no Remotion.")
    if info["dez_bits"]:
        avisos.append("10 bits: converter para yuv420p (8 bits).")
    if info["fps"] > 31:
        avisos.append(f"{info['fps']} fps: converter para 30 fps (o projeto renderiza em 30).")
    if rot:
        avisos.append(f"Rotação {rot}° nos metadados: o FFmpeg já corrige ao converter; conferir a orientação no resultado.")
    info["avisos"] = avisos
    return info


def loudness(caminho):
    r = sh(["ffmpeg", "-hide_banner", "-i", caminho, "-map", "0:a:0", "-af", "loudnorm=print_format=json", "-f", "null", "-"])
    m = re.search(r"\{[^{}]*\"input_i\"[^{}]*\}", r.stderr, re.S)
    if not m:
        return None
    j = json.loads(m.group(0))
    return {k: float(j[k]) for k in ("input_i", "input_tp", "input_lra", "input_thresh") if k in j}


def silencios(caminho, thresh, dur_total, min_d=0.5):
    # Método adaptativo da skill oficial remotion-markup/silence-detection: limiar = gate do loudnorm.
    noise = max(-60.0, min(-20.0, thresh))
    r = sh(["ffmpeg", "-hide_banner", "-i", caminho, "-map", "0:a:0", "-af", f"silencedetect=noise={noise}dB:d={min_d}", "-f", "null", "-"])
    out, ini = [], None
    for linha in r.stderr.splitlines():
        m1 = re.search(r"silence_start:\s*(-?[\d.]+)", linha)
        m2 = re.search(r"silence_end:\s*([\d.]+)", linha)
        if m1:
            ini = max(0.0, float(m1.group(1)))
        if m2 and ini is not None:
            fim = float(m2.group(1))
            out.append({"inicio_s": round(ini, 2), "fim_s": round(fim, 2), "duracao_s": round(fim - ini, 2)})
            ini = None
    if ini is not None:
        out.append({"inicio_s": round(ini, 2), "fim_s": round(dur_total, 2), "duracao_s": round(dur_total - ini, 2)})
    return {"limiar_db": round(noise, 1), "trechos": out}


def cortes(caminho, limiar=8):
    """Mudanças de plano (scdet). Limiar 8: com 12 passavam cortes entre planos parecidos (testado)."""
    r = sh(["ffmpeg", "-hide_banner", "-i", caminho, "-an", "-vf", f"scdet=threshold={limiar}", "-f", "null", "-"])
    achados = []
    for linha in r.stderr.splitlines():
        m = re.search(r"lavfi\.scd\.score:\s*([\d.]+),\s*lavfi\.scd\.time:\s*([\d.]+)", linha)
        if m:
            achados.append({"tempo_s": round(float(m.group(2)), 2), "pontuacao": round(float(m.group(1)), 1)})
    return sorted(achados, key=lambda c: c["tempo_s"])


def volume_medio(caminho, ini, dur):
    r = sh(["ffmpeg", "-hide_banner", "-ss", str(ini), "-t", str(dur), "-i", caminho, "-af", "volumedetect", "-vn", "-f", "null", "-"])
    m = re.search(r"mean_volume:\s*(-?[\d.]+)", r.stderr)
    return float(m.group(1)) if m else None


def som_de_fundo(caminho, fala):
    """Mede o volume na fala e nas pausas longas: som que não some nas pausas indica música ou ruído constante."""
    if not fala:
        return None
    ini = fala["fala_inicio_s"]
    na_fala = volume_medio(caminho, ini, min(5.0, fala["fala_fim_s"] - ini))
    pausas = []
    for p in fala["pausas_maiores_que_0_4s"]:
        if p["duracao_s"] >= 1.0:
            v = volume_medio(caminho, p["inicio_s"] + 0.2, max(0.3, p["duracao_s"] - 0.4))
            if v is not None:
                pausas.append({"inicio_s": p["inicio_s"], "duracao_s": p["duracao_s"], "volume_db": v})
    if na_fala is None or not pausas:
        return {"volume_na_fala_db": na_fala, "pausas": pausas, "leitura": None}
    media = sum(p["volume_db"] for p in pausas) / len(pausas)
    dif = round(na_fala - media, 1)
    leitura = (
        f"Som de fundo nas pausas: {round(media, 1)} dB, {dif} dB abaixo da fala. "
        + ("Há som constante (provavelmente música ou ruído de ambiente); não dá para saber qual sem ouvir." if media > -45 else "Pausas quase silenciosas: provavelmente sem música.")
    )
    return {"volume_na_fala_db": na_fala, "volume_nas_pausas_db": round(media, 1), "pausas": pausas, "leitura": leitura}


def contato(caminho, destino, dur):
    n = max(1, min(24, int(math.ceil(dur))))
    cols = 6 if n > 6 else n
    rows = int(math.ceil(n / cols))
    fps = n / max(dur, 0.1)
    vf = f"fps={fps:.4f},scale=270:-1,drawtext=text='%{{pts\\:hms}}':x=4:y=4:fontsize=18:fontcolor=yellow:box=1:boxcolor=black@0.6,tile={cols}x{rows}"
    r = sh(["ffmpeg", "-loglevel", "error", "-y", "-i", caminho, "-vf", vf, "-frames:v", "1", "-update", "1", destino])
    return r.returncode == 0 and os.path.exists(destino)


def transcrever(caminho, destino, lingua):
    script = os.path.join(AQUI, "transcrever.py")
    if not (os.path.exists(WHISPER_PY) and os.path.exists(script)):
        return None, "Whisper não encontrado (/opt/whisper-venv). Use a skill `whisper` para preparar."
    r = sh([WHISPER_PY, script, caminho, destino, "--lingua", lingua])
    if r.returncode != 0 or not os.path.exists(destino):
        return None, "Falha ao transcrever:\n" + r.stderr[-400:]
    with open(destino, encoding="utf-8") as f:
        return json.load(f), None


def fala_e_pausas(palavras, dur_total):
    if not palavras:
        return None
    ini = palavras[0]["startMs"] / 1000
    fim = palavras[-1]["endMs"] / 1000
    pausas = []
    for a, b in zip(palavras, palavras[1:]):
        gap = (b["startMs"] - a["endMs"]) / 1000
        if gap >= 0.4:
            pausas.append({"depois_de": a["text"].strip(), "inicio_s": round(a["endMs"] / 1000, 2), "duracao_s": round(gap, 2)})
    texto = "".join(p["text"] for p in palavras).strip()
    baixa = [p["text"].strip() for p in palavras if (p.get("confidence") or 1) < 0.5]
    return {
        "fala_inicio_s": round(ini, 2),
        "fala_fim_s": round(fim, 2),
        "palavras": len(palavras),
        "texto": texto,
        "pausas_maiores_que_0_4s": pausas,
        "palavras_de_baixa_confianca": baixa,
        "ritmo_palavras_por_s": round(len(palavras) / max(fim - ini, 0.1), 2),
    }


def sugestao_de_corte(info, fala, sil):
    """Sugere onde aparar o começo e o fim (só sugestão: o dono decide)."""
    if not fala:
        return None
    ini = max(0.0, fala["fala_inicio_s"] - 0.3)
    fim = min(info["duracao_s"], fala["fala_fim_s"] + 0.6)
    return {
        "aparar_comeco_ate_s": round(ini, 2) if ini > 0.5 else 0,
        "aparar_fim_a_partir_de_s": round(fim, 2) if info["duracao_s"] - fim > 0.5 else info["duracao_s"],
        "observacao": "Margem de 0,3 s antes da primeira palavra e 0,6 s depois da última. Só aparar se sobrar mais de 0,5 s.",
    }


def resumo_md(a):
    i = a["info"]
    L = [f"# Análise: {i['arquivo']}", ""]
    L.append(f"- **Formato:** {i['largura']}×{i['altura']} ({i['orientacao']}), {i['duracao_s']} s, {i['fps']} fps, {i['codec_video']} {i['pix_fmt']}")
    L.append(f"- **Áudio:** " + (f"{i['codec_audio']}, {i['canais']} canais" if i["tem_audio"] else "sem áudio"))
    if a.get("loudness"):
        ld = a["loudness"]
        L.append(f"- **Volume:** {ld['input_i']} LUFS integrado (alvo para redes: cerca de -14), pico {ld['input_tp']} dBTP")
    for av in i["avisos"]:
        L.append(f"- ⚠ {av}")
    L.append("")
    if a.get("silencios"):
        s = a["silencios"]
        L.append(f"## Silêncios (≥ 0,5 s, limiar {s['limiar_db']} dB)")
        L += [f"- {t['inicio_s']} s a {t['fim_s']} s ({t['duracao_s']} s)" for t in s["trechos"]] or ["- nenhum"]
        L.append("")
    L.append(f"## Cortes (mudanças de plano detectadas): {len(a['cortes_s'])}")
    L.append("- " + (", ".join(f"{c['tempo_s']} s (pontuação {c['pontuacao']})" for c in a["cortes"]) if a["cortes"] else "nenhum: provavelmente um plano único (sem cortes na origem)"))
    L.append("- Pontuação baixa (abaixo de ~10) pode ser movimento de câmera, zoom ou troca entre planos parecidos: conferir na folha de contato.")
    L.append("")
    if a.get("fala"):
        f = a["fala"]
        L.append(f"## Fala ({f['fala_inicio_s']} s a {f['fala_fim_s']} s, {f['palavras']} palavras, {f['ritmo_palavras_por_s']} palavras/s)")
        L.append(f"> {f['texto']}")
        if f["palavras_de_baixa_confianca"]:
            L.append(f"- **Conferir (baixa confiança):** {', '.join(f['palavras_de_baixa_confianca'])}")
        if f["pausas_maiores_que_0_4s"]:
            L.append("- Pausas ≥ 0,4 s (candidatas a respiro, corte ou frase de efeito): " + "; ".join(f"depois de “{p['depois_de']}” em {p['inicio_s']} s ({p['duracao_s']} s)" for p in f["pausas_maiores_que_0_4s"]))
        else:
            L.append("- Sem pausas ≥ 0,4 s: fala emendada (o sugeridor de frases de efeito não achará nada; as frases são escolhidas pelo dono).")
        L.append("")
    if a.get("som_de_fundo") and a["som_de_fundo"].get("leitura"):
        L.append("## Som de fundo")
        L.append("- " + a["som_de_fundo"]["leitura"])
        L.append("")
    if a.get("sugestao_de_corte"):
        c = a["sugestao_de_corte"]
        L.append("## Sugestão de aparo")
        L.append(f"- começo até {c['aparar_comeco_ate_s']} s; fim a partir de {c['aparar_fim_a_partir_de_s']} s. {c['observacao']}")
        L.append("")
    return "\n".join(L)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("video")
    ap.add_argument("saida", nargs="?")
    ap.add_argument("--sem-transcricao", action="store_true")
    ap.add_argument("--lingua", default="pt")
    args = ap.parse_args()
    if not (shutil.which("ffmpeg") and shutil.which("ffprobe")):
        sys.exit("FFmpeg/FFprobe não encontrados no PATH.")
    nome = os.path.splitext(os.path.basename(args.video))[0]
    saida = args.saida or os.path.join("public", "entrada", "analise", nome)
    os.makedirs(saida, exist_ok=True)

    info = sonda(args.video)
    a = {"info": info, "loudness": None, "silencios": None, "cortes": [], "cortes_s": [], "som_de_fundo": None, "fala": None, "sugestao_de_corte": None, "avisos_da_analise": []}
    if info["tem_audio"]:
        a["loudness"] = loudness(args.video)
        if a["loudness"]:
            a["silencios"] = silencios(args.video, a["loudness"]["input_thresh"], info["duracao_s"])
    a["cortes"] = cortes(args.video)
    a["cortes_s"] = [c["tempo_s"] for c in a["cortes"]]
    ok = contato(args.video, os.path.join(saida, "contato.jpg"), info["duracao_s"])
    if not ok:
        a["avisos_da_analise"].append("Não foi possível gerar a folha de contato.")
    if info["tem_audio"] and not args.sem_transcricao:
        pal, erro = transcrever(args.video, os.path.join(saida, "legendas.json"), args.lingua)
        if erro:
            a["avisos_da_analise"].append(erro)
        else:
            a["fala"] = fala_e_pausas(pal, info["duracao_s"])
            a["sugestao_de_corte"] = sugestao_de_corte(info, a["fala"], a["silencios"])
            a["som_de_fundo"] = som_de_fundo(args.video, a["fala"])
    with open(os.path.join(saida, "analise.json"), "w", encoding="utf-8") as f:
        json.dump(a, f, ensure_ascii=False, indent=2)
    md = resumo_md(a)
    with open(os.path.join(saida, "resumo.md"), "w", encoding="utf-8") as f:
        f.write(md)
    print(md)
    print(f"\n[arquivos em {saida}]")


if __name__ == "__main__":
    main()

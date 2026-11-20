#!/usr/bin/env python3
"""Transcreve áudio/vídeo com Whisper (faster-whisper, só CPU) e gera legendas no formato do Remotion.

Uso:
  /opt/whisper-venv/bin/python scripts/transcrever.py <arquivo> [saida.json] [--lingua pt] [--modelo small]

Saída: lista de Caption do Remotion ({text, startMs, endMs, timestampMs, confidence}), uma por palavra.
Os tempos são relativos ao começo do arquivo de origem.
"""
import argparse
import json
import os
import sys

os.environ.setdefault("HF_HUB_DISABLE_XET", "1")  # usa o download comum (o protocolo Xet é bloqueado na rede)

from faster_whisper import WhisperModel  # noqa: E402


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("arquivo")
    ap.add_argument("saida", nargs="?")
    ap.add_argument("--lingua", default="pt", help="código do idioma (pt, en, es...). Use 'auto' para detectar.")
    ap.add_argument("--modelo", default="small", help="tiny, base, small, medium, large-v3")
    a = ap.parse_args()

    model = WhisperModel(a.modelo, device="cpu", compute_type="int8")
    segments, info = model.transcribe(
        a.arquivo,
        language=None if a.lingua == "auto" else a.lingua,
        word_timestamps=True,
        vad_filter=True,
    )

    captions = []
    for seg in segments:
        for w in seg.words or []:
            start, end = round(w.start * 1000), round(w.end * 1000)
            captions.append(
                {
                    "text": w.word if w.word.startswith(" ") else " " + w.word,
                    "startMs": start,
                    "endMs": end,
                    "timestampMs": round((start + end) / 2),
                    "confidence": round(w.probability, 3),
                }
            )

    out = a.saida or os.path.splitext(a.arquivo)[0] + ".captions.json"
    with open(out, "w", encoding="utf-8") as f:
        json.dump(captions, f, ensure_ascii=False, indent=2)
    print(f"idioma={info.language} palavras={len(captions)} -> {out}", file=sys.stderr)
    print("".join(c["text"] for c in captions).strip())


if __name__ == "__main__":
    main()

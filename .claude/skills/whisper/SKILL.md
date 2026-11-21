---
name: whisper
description: Use quando o usuário pedir para transcrever áudio ou vídeo, gerar legendas, legendar um vídeo, ou obter o texto/tempo das palavras de uma fala. Roda Whisper (faster-whisper) só com CPU, grátis e dentro do container, sem API.
---

# Whisper (transcrição e legendas)

> Pedido de **legenda** de um vídeo? Siga a skill `legendas`: ela já inclui a transcrição, sem o usuário precisar pedir.

Roda o modelo Whisper da OpenAI (open source, MIT) via `faster-whisper`, **só na CPU**. Não usa API, chave nem placa de vídeo.

> Não use o caminho do `@remotion/whisper-webgpu` descrito na skill `remotion-captions`: ele exige GPU e o container não tem. Use este.

## Transcrever

```bash
/opt/whisper-venv/bin/python scripts/transcrever.py <arquivo.mp4|wav|mp3> <saida.json> --lingua pt
```

- `--lingua`: `pt`, `en`, `es`... ou `auto` para detectar. **Português do usuário: `pt`.**
- `--modelo`: `small` (padrão, bom equilíbrio), `base` (mais rápido), `medium` (mais preciso, mais lento). Modelos terminados em `.en` só entendem inglês.
- Saída: lista de `Caption` do Remotion (`text`, `startMs`, `endMs`, `timestampMs`, `confidence`), uma por palavra, com tempos relativos ao começo do arquivo de origem. Já serve para `@remotion/captions` (veja `remotion-captions/display-captions.md`).
- Aceita vídeo direto (o áudio é extraído). Teste de referência: ~4 s para ~7 s de áudio, modelo `small`, CPU.

## Preparação (só se `/opt/whisper-venv` não existir)

O ambiente `cf-studio` normalmente instala isso sozinho ao criar a sessão. Se não existir:

```bash
python3 -m venv /opt/whisper-venv
/opt/whisper-venv/bin/pip install -q -r scripts/requirements-whisper.txt
```

O modelo é baixado do Hugging Face na primeira execução (~460 MB para `small`).

## Armadilhas já resolvidas

- `av` deve ficar em `16.1.0` (versões 19+ quebram o faster-whisper). Está fixado em `scripts/requirements-whisper.txt`.
- O protocolo Xet do Hugging Face é bloqueado pela rede. O script define `HF_HUB_DISABLE_XET=1`; se rodar `faster_whisper` direto, exporte essa variável.
- Hosts liberados no ambiente: `huggingface.co`, `us.aws.cdn.hf.co` (+ `cdn-lfs.huggingface.co`, `cdn-lfs.hf.co`, `cas-bridge.xethub.hf.co`, `github.com`). Se um download falhar com 403, falta um host: avise o usuário.
- Revise o texto transcrito antes de usar como legenda: nomes próprios e termos técnicos podem sair errados.

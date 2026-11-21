# CERTI News (produção)

Design system: **CERTI**. Vídeo vertical de ~12 s com apresentação falada.

## O que tem

- Legendas do dia a dia (46 px, a 30% do pé), com a palavra falada em azul-claro e **sem ponto final**.
- Frase de efeito "A **Inteligência Artificial** está no centro das discussões" (5,5 s a 8,7 s), direto sobre a cena, sem escurecer.
- Fecho: a cena desfoca e é tingida de azul-profundo (a partir de 8,9 s) e o logo vertical nasce dentro do azul, com `certi.org.br` discreto.
- Terceiro de nome **desligado por regra do dono** (só entra se ele pedir no comando) (`terceiroDeNome={false}`): ainda não há nome e cargo reais. Ligar com `--props='{"terceiroDeNome":true}'` depois de trocar o texto em `CertiNews.tsx`.

## Como renderizar de novo

O vídeo original **não está no Git** (arquivos de vídeo nunca são versionados). Para renderizar:

1. Coloque o original em `public/entrada/` e converta (o original é HEVC 10 bits, 59,94 fps, com rotação nos metadados):
   ```bash
   ffmpeg -i <original>.mp4 -vf "scale=1080:1920:flags=lanczos,fps=30" -c:v libx264 -crf 16 -pix_fmt yuv420p -c:a aac -b:a 192k public/entrada/certi-news.mp4
   ```
2. As legendas já estão transcritas e corrigidas em `legendas.json` ("CERTI" em maiúsculas, "outubro" em minúscula). Se o vídeo mudar, transcreva de novo com a skill `whisper`.
3. `npx remotion render CertiNews out/certi-news.mp4 --browser-executable=/opt/pw-browsers/chromium`

## Parâmetros (`--props`)

`tamanhoLegenda` (padrão 46), `alturaLegenda` (padrão 0,3), `terceiroDeNome` (padrão false).

## Lições deste vídeo

- O sugeridor de frases de efeito não achou nada: a fala era emendada, sem pausas. A frase foi escolhida pelo dono.
- O Whisper errou só o nome próprio ("Certe" por "CERTI"): sempre conferir nomes na transcrição.
- A palavra-chave de duas palavras fica empilhada, uma por linha.

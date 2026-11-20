---
name: legendas
description: Use SEMPRE que o usuário enviar um vídeo ou áudio e pedir legenda, legendar, "colocar texto da fala" ou subtítulos, mesmo sem pedir transcrição. Transcreve com Whisper, sugere frases de efeito para aprovação e renderiza a legenda no estilo do design system (CFDesigner).
---

# Legendas automáticas

Quando o usuário mandar um vídeo/áudio e pedir legenda: **transcreva primeiro, sem perguntar.** Ele nunca precisa pedir a transcrição.

## Estilos (aprovados pelo dono)

- **Dia a dia (70–80% do vídeo):** Montserrat 700 branco gelo, **contorno preto fino e SEM tarja/caixa/linha**, a palavra falada em âmbar. É o padrão.
- **Frase de efeito:** "Título de cinema": palavra-chave gigante em âmbar (Bebas), o resto da frase pequeno em branco, fundo levemente escurecido e um leve zoom. Só em frases curtas e fortes.
- **Sem ponto final, nunca** (regra do dono: acha feio). Toda legenda termina sem ponto. Vírgula, `?` e `!` ficam. O componente `Legendas` já tira o ponto sozinho (`tiraPontoFinal`); se escrever texto de legenda à mão ou em outro componente, aplique a mesma regra. Reticências não são mexidas.
- Posição: acima dos ~24% de baixo (botões de Reels/Shorts). Nunca barras de REC/timecode.

Tudo isso já está no componente `Legendas` (`design-systems/cfdesigner/components/Legendas.tsx`). Não reinvente o visual.

## Passo a passo

1. **Vídeo de entrada:** coloque em `public/entrada/` (pasta ignorada pelo Git; nunca versione vídeos). Se o arquivo chegar de outro jeito, copie para lá.
2. **Transcrever** (veja a skill `whisper`):
   ```bash
   /opt/whisper-venv/bin/python scripts/transcrever.py public/entrada/<nome>.mp4 public/entrada/<nome>.captions.json --lingua pt
   ```
3. **Sugerir frases de efeito:**
   ```bash
   node scripts/frases-de-efeito.mjs public/entrada/<nome>.captions.json
   ```
4. **Mostrar ao usuário e esperar aprovação** (obrigatório): a transcrição completa + a lista numerada de frases de efeito sugeridas, cada uma com o destaque proposto. Ele aprova, remove, adiciona ou troca a palavra-chave. É uma heurística: sempre peça aprovação. Peça também que confira nomes próprios e termos técnicos na transcrição.
5. **Montar a composição:** o vídeo com `<OffthreadVideo src={staticFile("entrada/<nome>.mp4")} />` e, por cima, `<Legendas captions={...} punchLines={[...]} />` (captions = o JSON; punchLines = só as aprovadas, `{startMs, endMs, keyword}`). Tamanho/fps/duração do próprio vídeo. Registre em `src/Root.tsx`. Exemplo funcionando: `design-systems/cfdesigner/exemplo/ExemploLegendas.tsx`.
6. **Conferir antes de entregar:** renderize 2 quadros (`npx remotion still <id> <arquivo.png> --frame=N`): um de legenda do dia a dia e um de frase de efeito. Veja se está legível.
7. **Renderizar o vídeo** (`npx remotion render <id> out/<nome>.mp4`, usando `--browser-executable=/opt/pw-browsers/chromium`) e **enviar ao usuário na conversa**. O MP4 não vai para o repositório (`out/` é ignorada).

## Ajustes comuns

- `buildPages(captions, punchLines, { maxChars, maxWords, maxGapMs })` controla como as palavras se agrupam (padrão: 34 caracteres, 7 palavras, pausa de 550 ms).
- Se a legenda ficar apagada em trecho claro do vídeo, aumente o contorno (`WebkitTextStroke`) ou escureça o fundo no componente.
- Vídeo horizontal: o componente escala pela largura e pela altura do vídeo; confira o enquadramento em 1 quadro.
- Outro design system: crie o equivalente em `design-systems/<nome>/` seguindo o mesmo contrato (captions + punchLines) e aprove o visual com o usuário antes.

## Ainda não testado em condições reais

Fala real com ruído/música, vídeos longos e vídeo horizontal. Avise o usuário se algo sair estranho e mostre o quadro.

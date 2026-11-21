---
name: legendas
description: Use SEMPRE que o usuário enviar um vídeo ou áudio e pedir legenda, legendar, "colocar texto da fala" ou subtítulos, mesmo sem pedir transcrição. Fluxo geral: transcreve com Whisper, sugere destaques para aprovação e renderiza a legenda no estilo do design system escolhido.
---

# Legendas automáticas (fluxo geral)

Quando o usuário mandar um vídeo/áudio e pedir legenda: **transcreva primeiro, sem perguntar.** Ele nunca precisa pedir a transcrição.

**O visual é do design system escolhido**, não daqui: estilo do dia a dia, estilo de destaque (se houver), posição, agrupamento das palavras e componente estão na seção "Legendas" da `DESIGN-SYSTEM.md` dele. Leia antes. Regras do dono (`CLAUDE.md`): **legenda nunca termina com ponto final**; limpo e premium.

## Passo a passo

1. **Vídeo de entrada:** em `public/entrada/` (ignorada pelo Git; nunca versione vídeos).
2. **Transcrever** (skill `whisper`):
   ```bash
   /opt/whisper-venv/bin/python scripts/transcrever.py public/entrada/<nome>.mp4 public/entrada/<nome>.captions.json --lingua pt
   ```
3. **Destaques (só se o design system tiver estilo de destaque/frase de efeito):**
   ```bash
   node scripts/frases-de-efeito.mjs public/entrada/<nome>.captions.json
   ```
4. **Mostrar ao usuário e esperar aprovação** (obrigatório): a transcrição completa e a lista numerada de destaques sugeridos (é uma heurística). Ele aprova, remove, adiciona ou troca a palavra-chave. Peça que confira nomes próprios e termos técnicos.
5. **Montar:** o vídeo com `<OffthreadVideo src={staticFile("entrada/<nome>.mp4")} />` e, por cima, o componente de legenda **do design system escolhido**, com as palavras (JSON) e os destaques aprovados. Dimensões e fps do próprio vídeo. Registre a composição em `producoes/index.tsx`.
6. **Conferir:** 2 quadros (um do dia a dia, um de destaque) com `npx remotion still ... --frame=N`.
7. **Renderizar** e **enviar o MP4 na conversa** (`out/` é ignorada pelo Git).

## Ajudantes gerais

`tecnicas/legendas/texto.ts` (tipos `Caption`, `buildPages`, `tiraPontoFinal`, `suggestPunchLines`, `pickKeywordIndex`) são opcionais: um design system pode agrupar e destacar de outro jeito. Exemplo funcionando (CFDesigner): `design-systems/cfdesigner/exemplo/ExemploLegendas.tsx`.

## Ainda não testado em condições reais

Fala real com ruído/música, vídeos longos e vídeo horizontal. Avise o usuário se algo sair estranho e mostre o quadro.

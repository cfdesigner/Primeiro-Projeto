# Repositório master das produções audiovisuais

Repositório do dono para produzir vídeos e peças com Remotion. Falar em português do Brasil.

## Pendências

Leia `PENDENCIAS.md` no começo da sessão e **lembre o dono das pendências abertas**: ele pediu, porque pode esquecer.

## Estrutura

- `design-systems/<nome>/`: cada design system é independente e traz o seu movimento, transições, legendas, terceiros, números e fecho. Índice e contrato em `design-systems/README.md`. Modelo em `design-systems/_modelo/`.
- `tecnicas/`: só o que não tem marca (lógica de texto das legendas).
- `scripts/`: ferramentas gerais (transcrição com Whisper, sugestão de frases de efeito).
- `producoes/<nome>/`: os vídeos de verdade, cada um usando UM design system. Registrados em `producoes/index.tsx`.
- `src/Root.tsx`: registra as composições (exemplos de cada design system + produções).
- `.claude/skills/`: `producao-de-video` (fluxo geral), `design-systems` (índice), `criar-design-system` (a partir de referências), `legendas`, `whisper`, e as skills do Remotion.

## Regras do dono (valem para TODOS os design systems)

- **Legenda nunca termina com ponto final.** Vírgula, `?` e `!` podem. Reticências ficam.
- **Sem barras de REC, timecode ou fps** nos vídeos, a menos que ele peça.
- **Limpo e premium.** O elemento principal manda; texto de apoio é pequeno, suave e discreto. Nunca "textão" nem texto chamativo sobrando. Na dúvida: menos texto, menor, mais suave.
- **Frases de efeito e escolhas de estilo novas: mostrar e esperar a aprovação** antes de renderizar o vídeo final.
- **Terceiro de nome (lower third): NÃO colocar, a menos que o dono peça no comando.** É raro nos vídeos dele. Se pedir, perguntar nome e cargo; nunca inventar.
- **Nunca versionar vídeos** (`out/`, `public/entrada/` são ignorados). Entregar o MP4 na conversa.
- **Nunca misturar elementos de design systems diferentes** numa peça, a menos que ele peça.

## Comandos

- Instalar: `npm ci`. Verificar: `npm run lint`.
- Quadro: `npx remotion still <id> <arquivo.png> --frame=N --browser-executable=/opt/pw-browsers/chromium`
- Vídeo: `npx remotion render <id> out/<nome>.mp4 --browser-executable=/opt/pw-browsers/chromium`
- Transcrever: veja a skill `whisper` (`/opt/whisper-venv/bin/python scripts/transcrever.py ...`).

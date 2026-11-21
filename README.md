# Produções audiovisuais (repositório master)

Repositório master para produzir vídeos e peças com [Remotion](https://www.remotion.dev). Reúne as técnicas gerais, os design systems e as produções.

```
design-systems/   cada design system: cores, tipografia, movimento, transições, legendas, terceiros, números, fecho
tecnicas/         só o que não tem marca (lógica de texto das legendas)
scripts/          ferramentas gerais (transcrição com Whisper, sugestão de frases de efeito)
producoes/        os vídeos e peças de verdade, cada um com um design system
src/Root.tsx      registro das composições
.claude/skills/   skills para o Claude Code (fluxos, design systems, Remotion)
CLAUDE.md         regras do dono e comandos
```

Veja `design-systems/README.md` para o índice e o contrato de cada design system.

## Comandos

```console
npm ci                     # instalar
npm run dev                # Remotion Studio (no computador)
npm run lint               # eslint + tsc
npx remotion render <id> out/<nome>.mp4
```

Vídeos renderizados (`out/`) e vídeos de entrada (`public/entrada/`) não vão para o Git.

## Licença do Remotion

Para algumas entidades é necessária uma licença de empresa. [Leia os termos](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md).

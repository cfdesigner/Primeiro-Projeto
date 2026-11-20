# Design systems

Cada design system fica numa pasta própria: `design-systems/<nome>/`.

| Pasta | Marca | Origem |
| --- | --- | --- |
| `cfdesigner/` | CFDesigner (Carlos Felipe, editor de vídeo cinematográfico) | artefato "CFDesigner" no claude.ai |

## Estrutura de cada pasta

```
<nome>/
  README.md        brand book: voz, cor, tipografia, regras de uso
  tokens.json      tokens originais
  tokens.ts        tokens em TypeScript (cores por tema, tipografia, espaço...)
  fonts.ts         carrega as fontes
  components/      componentes Remotion (aceitam scale / width)
  assets/          logos e imagens
  docs/            props e regras de cada componente
  index.ts         ponto de entrada: import { ... } from "../design-systems/<nome>"
```

## Adicionar um design system novo

1. Criar a pasta `design-systems/<nome>/` com essa estrutura.
2. Adicionar uma linha na tabela acima.
3. Adicionar uma linha na skill `.claude/skills/design-systems/SKILL.md`.

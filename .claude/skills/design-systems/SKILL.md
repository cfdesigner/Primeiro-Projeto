---
name: design-systems
description: Use sempre que o usuário pedir um vídeo, imagem ou peça "com o design system X", perguntar quais design systems existem, ou quando for escolher o visual de uma produção. Índice dos design systems do repositório e o contrato de cada um.
---

# Design systems do repositório

Cada design system é **independente e completo**: tem o seu próprio jeito de fazer movimento, transições, legendas, terceiros, números e fecho. Nunca aplique regras ou componentes de um em outro.

## Disponíveis

| Nome | Pasta | Estilo |
| --- | --- | --- |
| CFDesigner | `design-systems/cfdesigner/` | Cinema escuro com um ponto de luz dourada; marca pessoal de Carlos Felipe. |
| CERTI | `design-systems/certi/` | Institucional, claro e tecnológico, azul da marca com acentos nas cores do símbolo. **Em construção (etapa 1 aprovada):** movimento, transições, legendas, terceiro, números e fecho ainda a definir; não improvisar, perguntar. |

## Como usar

1. Identifique qual design system o usuário quer. Se não disser, pergunte.
2. Leia, nesta ordem, na pasta dele: `README.md` (brand book) e `DESIGN-SYSTEM.md` (ficha de produção: movimento, transições, legendas...). **A ficha manda** sobre como produzir cada coisa.
3. Importe do ponto de entrada: `import { ... } from "../design-systems/<nome>"` e use os componentes e efeitos dele. Não invente cores, fontes, logos nem animações.
4. As regras do dono (`CLAUDE.md`) valem para todos.
5. Fluxo completo de uma produção: skill `producao-de-video`. Criar um design system novo: skill `criar-design-system`.

## Contrato de cada pasta

`README.md`, `DESIGN-SYSTEM.md`, `tokens.ts`, `movimento.ts`, `fonts.ts`, `components/`, `efeitos/`, `assets/`, `exemplo/`, `composicoes.tsx`, `index.ts`. Modelo em `design-systems/_modelo/`. Ao criar ou alterar um design system, atualize a tabela acima e `design-systems/README.md`.

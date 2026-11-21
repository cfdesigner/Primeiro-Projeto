# CFDesigner: ficha de produção

Como ESTE design system faz cada coisa. O brand book (cores, voz, logo) está em `README.md`; aqui está o "como produzir".

**Identidade em uma linha:** cinema escuro, contido, com um único ponto de luz dourada (âmbar). Limpo e premium.

```ts
import {
  Legendas,
  LowerThird,
  CountUp,
  LogoOutro,
  colors,
  imagery,
} from "../design-systems/cfdesigner";
```

## Movimento (a personalidade)

- **Seco e cinematográfico.** Cortes secos ou fades de 200–300 ms. Entradas com desaceleração forte (expo-out) e, no máximo, um leve "back" no terceiro de nome. Nada elástico, nada saltitante.
- As curvas estão em `movimento.ts`. Os efeitos em `efeitos/` (guia: `docs/efeitos.md`).

## Transições

- `FlashCut` (clarão branco-gelo, 12 frames) e `LightLeak` (vazamento âmbar, ~1 s) **em cortes**. Nunca atrás de texto.
- `WipeReveal` para revelar blocos; `BlurIn` para entradas suaves.
- Um destaque âmbar por peça: não empilhe efeito âmbar com texto âmbar no mesmo instante.

## Legendas

- **Dia a dia (70–80% do vídeo):** Montserrat 700, branco gelo, **contorno preto fino, sem tarja/caixa/linha**; a palavra falada em âmbar. Quebra de linha balanceada.
- **Frase de efeito:** "Título de cinema": palavra-chave gigante em âmbar (Bebas), o resto pequeno em branco, fundo levemente escurecido, leve zoom. Só frases curtas e fortes. A palavra-chave é um número, se houver; senão a mais longa.
- **Posição:** acima dos ~24% de baixo (botões de Reels/Shorts).
- **Agrupamento** (`buildPages`): até 34 caracteres, 7 palavras, pausa de 550 ms.
- Componente: `Legendas` (captions + punchLines aprovadas). As frases de efeito são sugeridas por `scripts/frases-de-efeito.mjs` e **sempre aprovadas pelo dono**.

## Terceiro de nome

`LowerThird`: rótulo pequeno em petróleo claro, nome em Bebas branco, fio âmbar que se desenha. Fica acima dos 26% de baixo.

## Números

`CountUp`: Bebas branco, sufixo em âmbar, para e pulsa de leve. Para números concretos (o brand book pede "48h", "30 segundos").

## Fecho

`LogoOutro`: logo metálico empilhado sobre void, grande. A assinatura embaixo é **minúscula, cinza e só com fade lento** (decisão do dono: o logo é o destaque).

## Imagem e foto

Fotos em luz baixa, 70% ou mais em sombra, vinheta preta até `void` onde há texto. Sem filtros coloridos. Retratos em `assets/imagery` (`imagery.*`).

## Proibido neste design system

Neon, gradientes coloridos (só vinheta preta), emoji em peças, barras de REC/timecode/fps (o `ReelFrame` tem `bars={false}` por padrão: assim fica), texto grande e chamativo no fim.

## Exemplos que renderizam

`CFDesigner-Componentes` (quadro com tudo), `CFDesigner-Legendas-Exemplo`, `CFDesigner-Efeitos-Exemplo`.

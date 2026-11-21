# CERTI: ficha de produção

> **Status: em construção.** Etapa 1 aprovada. **Etapa 2 (movimento, transições e terceiro de nome) pronta para aprovação.** Faltam legendas, números e fecho.

**Identidade em uma linha:** institucional, claro e tecnológico; azul da marca com acentos nas cores do símbolo.

```ts
import {
  Logo,
  Button,
  CategoryChip,
  SectionTitle,
  Card,
  HeroBanner,
  colors,
} from "../design-systems/certi";
```

## Decisões do dono (etapa 1)

1. **Cor do texto sobre verde, laranja e azul-claro: branco** (como o site). Contraste baixo: usar texto grande e em negrito (700+) nesses fundos.
2. **Fonte: Nunito Sans em tudo,** inclusive no título leve de seção (peso 300).
3. **Cantos e sombras: opção B** (4 px botões/etiquetas, 8 px cards e imagens, sombra suave azulada).

## Referências de origem

- Logos fornecidos pelo dono (horizontal e vertical, colorido e negativo): cores do símbolo medidas por pixel.
- 5 prints do site certi.org.br: paleta de interface, tipografia, componentes.
- Fonte indicada pelo dono: Nunito Sans, todos os pesos.
- O site em si não pôde ser lido (bloqueado na rede).

## Movimento (a personalidade)

**Direta e funcional**, de site institucional. Medido quadro a quadro no vídeo de tela do site (66 s, 30 fps); valores em `movimento.ts`.

| Evento no site                           | O que acontece                                                                           | Medido                                                                                    |
| ---------------------------------------- | ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Etiqueta ao passar o mouse               | Preenchimento azul (`primary`) e texto branco, subindo rápido e desacelerando (ease-out) | ≈ 300 ms para entrar, ≈ 250 ms para sair                                                  |
| Menu suspenso                            | Painel aparece e some de uma vez                                                         | 1 quadro (corte seco)                                                                     |
| Imagem dentro do menu, ao trocar de item | Crossfade entre as duas imagens, quase linear                                            | ≈ 400 ms (a troca já estava em andamento quando o trecho começou, pode ser um pouco mais) |
| Imagem ao abrir o menu                   | Aparece junto com o painel, sem fade                                                     | 1 quadro                                                                                  |
| Menu lateral (item ativo)                | Muda de cor instantaneamente                                                             | 1 quadro                                                                                  |
| Rolagem                                  | É do navegador, não é movimento do site                                                  | não replicar                                                                              |

**Não observado no vídeo** (não inventar): entradas de elementos ao rolar, contadores animados, carrossel, transições entre páginas.

## Transições

Duas fontes: o site (vídeo de tela) e o institucional "40 anos" da CERTI (vídeo de referência, exportado a 15 quadros reais/s). Valores em `movimento.ts` (`motion`, `transitions`).

| Transição             | Como é                                                                                                  | Medido / observado                                         | Componente           |
| --------------------- | ------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- | -------------------- |
| Corte seco            | Padrão entre planos (montagens rápidas, ~0,5 s por plano) e para painéis/cards                          | 1 quadro                                                   | (sem componente)     |
| Abertura              | Fade a partir do preto                                                                                  | ≈ 0,6 s                                                    | `FadeFromBlack`      |
| Dissolvência          | A cena que entra faz fade sobre a que sai                                                               | ≈ 0,2 s (3 quadros a 15 fps)                               | `Dissolve`           |
| Whip pan              | A câmera acelera para o lado com borrão direcional e corta no pico; o próximo plano chega desacelerando | ≈ 0,25 s; velocidade −3, −14, −22 px por passo             | `WhipOut` + `WhipIn` |
| Zoom de impacto       | Aproxima rápido com borrão crescente e corta                                                            | ≈ 0,17 s; nitidez 512 → 161; ampliação ~1,45× _(estimada)_ | `ZoomPunchOut`       |
| Entrada desfocada     | O plano novo chega borrado e ganha foco                                                                 | ≈ 0,4 s; nitidez 7 → 353                                   | `FocusIn`            |
| Speed ramp            | Câmera rápida que desacelera até quase parar (no plano de drone da abertura)                            | movimento decai de ~2,3%/quadro de zoom a ~0 em ~1 s       | `RampedVideo`        |
| Destaque de etiquetas | Preenchimento passando de uma etiqueta para a seguinte                                                  | 300 ms cada, passo de 450 ms                               | `GradeDeEtiquetas`   |
| Crossfade de imagens  | Troca de imagem por fade                                                                                | ≈ 0,4 s                                                    | `FadeIn`             |

Regras: corte seco é o padrão; as demais são pontuação, **não use todas no mesmo vídeo**. Sem wipes decorativos nem clarões (não aparecem nas referências). O borrão do whip e a ampliação do zoom são estimados dos quadros.

Vídeo de teste (com trechos do institucional): `Certi-Transicoes-Teste`.

## Legendas

**A definir** (etapa 3, com 4 opções em imagem simuladas em Reels). _Referência vista no institucional:_ branca, pequena, centralizada embaixo, com contorno/sombra preta fina e sem tarja, na mesma fonte do resto. Restrições já conhecidas: sem ponto final (regra do dono); texto branco, e sobre `sky`, `orange` e `green` só grande e em negrito.

## Terceiro de nome

Componente `TerceiroTech`, medido no institucional da CERTI:

- Barra escura translúcida de **cantos chanfrados**, com uma textura sutil de rede (pontos e linhas) em azul-claro.
- À esquerda, o **símbolo da CERTI em branco**: nasce de um ponto e vira o anel completo (~0,2 s).
- **Nome e cargo digitados letra a letra**: nome em ~0,4 s, cargo em ~0,5 s. O nome em Nunito Sans 600, o cargo em 400, menor e levemente transparente.
- A barra vai de transparente a opaca em ~0,5 s; sai com **fade de 0,2 s**.
- Fica no canto inferior esquerdo, acima da zona das legendas.

## Números e destaques

**A definir** (etapa 4).

## Fecho

**A definir** (etapa 4). O logo negativo (todo branco) já existe para fundos escuros e azuis.

## Imagem e vídeo

Fotos claras e reais, sem filtros coloridos (a confirmar com fotos fornecidas).

## Proibido neste design system (proposto)

- Logo recolorido, distorcido ou recriado.
- Logo colorido sobre fundo escuro (usar o negativo).
- Texto pequeno sobre verde, laranja ou azul-claro.
- Mais de uma cor de categoria como preenchimento grande na mesma peça.

## Exemplos que renderizam

`Certi-Componentes` (prancha com cores, tipografia e componentes).

# CERTI: ficha de produção

> **Status: em construção.** Etapa 1 (cores, tipografia, logo, componentes base) aprovada. **Etapa 2 (movimento e transições) pronta para aprovação.** Faltam legendas, terceiro, números e fecho.

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

- **Corte seco** é o padrão entre cenas e para painéis/cards que aparecem.
- **Crossfade de 400 ms** quando uma imagem ou cena é trocada por outra (`FadeIn` sobre a cena anterior).
- **Destaque em sequência** de etiquetas (`GradeDeEtiquetas`): o preenchimento passa de uma etiqueta para a seguinte, a cada ~450 ms, como o mouse passando.
- Sem wipes, zooms, clarões ou deslizes: o site não tem. _Proposta a aprovar:_ usar também o fade de 400 ms para textos entrando (o site só mostra isso em imagens).

Componentes em `efeitos/`: `ChipAnimado`, `GradeDeEtiquetas`, `FadeIn`. Vídeo de teste: `Certi-Movimento-Teste`.

## Legendas

**A definir** (etapa 3, com 4 opções em imagem simuladas em Reels). Restrições já conhecidas: sem ponto final (regra do dono); texto branco, e sobre `sky`, `orange` e `green` só grande e em negrito.

## Terceiro de nome

**A definir** (etapa 4).

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

# CERTI: ficha de produção

> **Status: em construção.** Etapas 1 a 3 (cores, tipografia, logo, componentes, movimento, transições, terceiro de nome, legendas e frase de efeito) aprovadas. Faltam números e fecho.

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

**Estilo A, em caixa alta (escolha do dono):** componente `Legendas`.

- **CAIXA ALTA**, Nunito Sans 700, branca, com **contorno preto fino** (3 px) e sombra suave, **sem tarja**. Igual à legenda do institucional da CERTI.
- A **palavra falada** fica em azul-claro (`sky`), mudando a cada palavra.
- **Entra e sai em corte seco**, como no institucional.
- **Sem ponto final** (regra do dono). Vírgula, `?` e `!` ficam.
- Posição: acima dos ~24% de baixo (botões de Reels/Shorts). Até 30 caracteres e 6 palavras por página, em até 2 linhas balanceadas e **entrelinha compacta (1,0)**: em caixa alta não há letras que descem, então linhas afastadas ficam soltas (ajuste pedido pelo dono).
- Artigos e preposições (a, o, de, da, em, e, que...) não ficam sozinhos no fim de uma página: vão junto da palavra seguinte (`carryStopwords`).
- **Degradê escuro suave no pé do quadro** (`scrim`, ligado por padrão), _adição minha_, que ajuda a ler em fundo claro. Pode ser desligado com `scrim={false}`.

**Ponto de atenção:** sem caixa, a legenda perde força sobre imagens muito claras (jaleco branco, paredes claras). O contorno e o degradê ajudam, mas se algum plano ficar difícil de ler, conversar antes de trocar de estilo. Alternativas já mostradas ao dono: B (tarja azul), C (bloco de destaque), D (barra tech).

**Frase de efeito, estilo C "leve e pesado" (escolha do dono):** o quadro escurece em azul-profundo (fade de 200 ms), o resto da frase vai em Nunito Sans **300** em caixa alta e a **palavra-chave em 900**, grande, com um fio fino branco embaixo. Corte seco na entrada e na saída. A palavra-chave é um número, se houver; senão a mais longa (ou a que o dono indicar). Tamanho ajustado para a palavra caber na largura. Sem ponto final; `?` e `!` ficam.

Fluxo: o script `scripts/frases-de-efeito.mjs` **sugere** as frases (curtas, cercadas de pausa) e o dono **aprova** antes de renderizar; as aprovadas entram em `punchLines` do componente `Legendas`. No teste, achou exatamente "ideias que viram resultado" numa fala com pausas.

Fluxo: skill `legendas` (transcreve com Whisper, agrupa, renderiza). Exemplo: `Certi-Legendas-Exemplo` (fala sintética com pausas, transcrita pelo Whisper, com uma frase de efeito).

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

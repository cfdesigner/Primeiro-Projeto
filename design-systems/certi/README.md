# CERTI: brand book (rascunho da etapa 1)

> Extraído de: o **logo** fornecido pelo dono (cores medidas por pixel) e **5 prints do site** certi.org.br (home, blog, institucional, insights). Itens marcados _estimado_ vêm de prints de baixa resolução: confirmar com o manual da marca, se existir. Ainda não há referência de movimento (vídeo de tela).

**Essência observada:** institucional, claro e tecnológico. Fundo branco ou azul profundo, títulos azuis, e as cores do símbolo usadas como acentos de categoria. Passa confiança e organização, sem exagero decorativo.

## Logo

- Arquivo original fornecido: `assets/logos/certi-logo-original.png` (fundo branco). Versão com fundo transparente, gerada do original sem alterar o desenho: `assets/logos/certi-logo.png`. Use pelo componente `Logo`.
- O símbolo são anéis segmentados nas cores da marca; "certi" em azul. **Nunca recolorir, distorcer ou recriar.**
- **Só sobre fundo claro.** O nome é azul e some em fundo escuro. Falta a **versão negativa (branca)** oficial para vídeos com fundo escuro.
- Faltam: versão só do símbolo e versões para fundo escuro.

## Cor

As cores da marca vêm do símbolo:

| Token     | Valor     | Uso                                                          |
| --------- | --------- | ------------------------------------------------------------ |
| `primary` | `#00578d` | Principal: "certi", títulos, botões, menu, cards de destaque |
| `sky`     | `#00adee` | Azul-claro: acento, botão secundário, itens ativos           |
| `orange`  | `#f08522` | Acento de categoria                                          |
| `green`   | `#8bc53f` | Acento de categoria                                          |
| `pink`    | `#e5287b` | Acento de categoria                                          |

Apoio de interface (medido no site): `deep #024a77` (painel escuro do hero), `navy #002860` (faixas de destaque), `surfaceSoft #f7f9fb` (fundo de seções), `ink #3c3c3b` (títulos e texto), `inkMuted #555d67` (apoio), `line #e9e9e9`.

**As 5 cores de categoria** (`primary`, `green`, `orange`, `pink`, `sky`) se alternam em ciclo nas etiquetas de competências, sempre como **contorno de 2 px**, nunca como preenchimento grande.

**Texto sobre cor (contraste medido):** branco só sobre `primary` (7,6:1), `deep` (9,3:1) e `navy` (14,3:1); sobre `pink` só texto grande/negrito (4,3:1). Sobre `sky`, `orange` e `green` o branco falha (2,1 a 2,6:1): usar texto escuro `ink` (4,3 a 5,3:1). _Isto difere do site, que usa branco nesses fundos: é uma proposta, a aprovar._

## Tipografia

**Nunito Sans**, em todos os pesos (200 a 900) e itálico, em tudo. Indicado pelo dono. Escala em `tokens.ts` (`textStyles`):

- `display` 300, azul: títulos leves de seção ("Competências").
- `title` 700 em caixa alta: título de hero.
- `heading` 800: títulos de card e artigo.
- `subtitle`, `body`, `bodySm` 400: texto corrido.
- `label` 700 em caixa alta com espaçamento: menu, "LEIA MAIS".
- `button` 700.

_Observação:_ o título leve "Competências" no site parece uma fonte geométrica diferente da Nunito Sans. Aqui ele usa Nunito Sans 300. Dizer se deve ser outra.

## Assinaturas visuais (do site)

- **Colchetes nos cantos** emoldurando a foto ou vídeo do hero (`HeroBanner`).
- **Título leve com fio fino** que se afasta à direita (`SectionTitle`).
- **Etiquetas com contorno** nas cores do símbolo (`CategoryChip`).
- **Cards brancos** com borda fina, cantos de 8 px e sombra suave azulada (_estimado_).
- Botões de cantos quase retos (4 px, _estimado_); degradê azul-claro `#28abe1 → #27cfe0` em itens ativos.

## Forma e espaço (estimado)

Raios: 4 px (botões, etiquetas), 8 px (cards, imagens), pílula (chips pequenos). Espaçamento em múltiplos de 4. Proporções de entrega: 16:9 (institucional), 9:16 (Reels), 1:1, 4:5.

## Imagem

Fotografia clara e real: prédios e áreas aéreas do campus, equipamentos, laboratórios e pessoas. Ainda não analisada em detalhe; aguardar fotos fornecidas pelo dono.

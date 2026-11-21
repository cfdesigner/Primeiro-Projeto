# CERTI: brand book

> Extraído de: o **logo** fornecido pelo dono (cores medidas por pixel) e **5 prints do site** certi.org.br (home, blog, institucional, insights). Etapa 1 aprovada pelo dono. Ainda não há referência de movimento (vídeo de tela).

**Essência observada:** institucional, claro e tecnológico. Fundo branco ou azul profundo, títulos azuis, e as cores do símbolo usadas como acentos de categoria. Passa confiança e organização, sem exagero decorativo.

## Logo

Arquivos em `assets/logos/`, todos com fundo transparente. Use pelo componente `Logo` (`layout`: horizontal, vertical ou symbol; `finish`: color ou negative).

| Variante                          | Arquivo                                           | Origem                                                                         |
| --------------------------------- | ------------------------------------------------- | ------------------------------------------------------------------------------ |
| Vertical colorido                 | `certi-vertical.png`                              | fornecido pelo dono                                                            |
| Vertical negativo (todo branco)   | `certi-vertical-negativo.png`                     | fornecido pelo dono                                                            |
| Horizontal colorido               | `certi-horizontal.png`                            | fornecido pelo dono (fundo branco removido, desenho intacto)                   |
| Horizontal negativo (todo branco) | `certi-horizontal-negativo.png`                   | **derivado**: mesmo contorno do horizontal, todo branco, como o dono descreveu |
| Símbolo colorido / negativo       | `certi-simbolo.png`, `certi-simbolo-negativo.png` | **derivados**: recorte do símbolo no topo do vertical                          |

Os arquivos exatamente como chegaram estão em `assets/logos/originais/`.

- O símbolo são anéis segmentados nas cores da marca; "certi" em azul. **Nunca recolorir, distorcer ou recriar.**
- **Colorido só sobre fundo claro.** O nome é azul e some em fundo escuro. **Sobre fundo escuro ou azul, use o negativo** (todo branco).
- Se existirem os arquivos oficiais do horizontal negativo e do símbolo, eles substituem os derivados.

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

**Texto sobre cor (decisão do dono): branco sobre todas as cores, como no site.** Nota de legibilidade, para vídeo: o contraste do branco é 7,6:1 sobre `primary`, 9,3:1 sobre `deep`, 14,3:1 sobre `navy`, 4,3:1 sobre `pink`, mas só 2,6:1 sobre `sky` e `orange` e 2,1:1 sobre `green`. Sobre essas três, use texto **grande e em negrito (700+)**, nunca texto pequeno.

## Tipografia

**Nunito Sans**, em todos os pesos (200 a 900) e itálico, em tudo. Indicado pelo dono; **inclusive no título leve de seção** (decisão do dono, mesmo o site parecendo usar outra fonte ali). Escala em `tokens.ts` (`textStyles`):

- `display` 300, azul: títulos leves de seção ("Competências").
- `title` 700 em caixa alta: título de hero.
- `heading` 800: títulos de card e artigo.
- `subtitle`, `body`, `bodySm` 400: texto corrido.
- `label` 700 em caixa alta com espaçamento: menu, "LEIA MAIS".
- `button` 700.

## Assinaturas visuais (do site)

- **Colchetes nos cantos** emoldurando a foto ou vídeo do hero (`HeroBanner`).
- **Título leve com fio fino** que se afasta à direita (`SectionTitle`).
- **Etiquetas com contorno** nas cores do símbolo (`CategoryChip`).
- **Cards brancos** com borda fina, cantos de 8 px e sombra suave azulada.
- Botões de cantos quase retos (4 px); degradê azul-claro `#28abe1 → #27cfe0` em itens ativos.

## Forma e espaço (decisão do dono: opção B)

Raios: 4 px (botões, etiquetas), 8 px (cards, imagens). Sombra suave e azulada nos cards. Espaçamento em múltiplos de 4. Proporções de entrega: 16:9 (institucional), 9:16 (Reels), 1:1, 4:5.

## Imagem

Fotografia clara e real: prédios e áreas aéreas do campus, equipamentos, laboratórios e pessoas. Ainda não analisada em detalhe; aguardar fotos fornecidas pelo dono.

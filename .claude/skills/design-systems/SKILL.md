---
name: design-systems
description: Use sempre que o usuário pedir um vídeo, imagem ou peça visual "com o design system X" (ex.: CFDesigner), ou pedir para criar, importar ou atualizar um design system. Lista os design systems deste repositório e explica como usá-los nas composições Remotion.
---

# Design systems do repositório

Cada design system vive em `design-systems/<nome>/`. Veja `design-systems/README.md` para a estrutura.

## Disponíveis

| Nome | Pasta | Quando usar |
| --- | --- | --- |
| CFDesigner | `design-systems/cfdesigner/` | Marca pessoal de Carlos Felipe: edição de vídeo cinematográfica. Visual escuro (tema Cinema) com um ponto de luz dourada. |

## Como usar ao fazer um vídeo ou imagem

1. Identifique qual design system o usuário pediu. Se ele não disser, pergunte.
2. Leia **`design-systems/<nome>/README.md`** (brand book) antes de desenhar qualquer coisa: voz, cores, tipografia e o que é proibido.
3. Importe do ponto de entrada: `import { ReelFrame, Manifesto, Logo, colors, imagery } from "../design-systems/<nome>";`
4. Use os componentes e tokens do sistema. Não invente cores, fontes nem logos. Nunca recrie o logo: use `Logo`.
5. Componentes têm tamanho de web por padrão. Em vídeo 1080×1920, use `width` (ReelFrame, ProfileBanner, Manifesto) ou `scale` (os demais).
6. Registre o vídeo em `src/Root.tsx` como `<Composition>`; imagens estáticas como `<Still>`. Para conferir o visual: `npx remotion still <id> <arquivo.png>`.
7. Vídeos renderizados NÃO vão para o repositório (a pasta `out/` é ignorada). Entregue o arquivo ao usuário na conversa.

## Observações

- Em sessão nova, rode `npm ci` antes de renderizar. O render usa o Chromium já instalado: `--browser-executable=/opt/pw-browsers/chromium`.
- As fontes vêm do Google Fonts no momento do render.
- CFDesigner: vídeo é sempre tema Cinema. Inglês para público internacional, português para o Brasil, nunca misturados na mesma linha. Um único destaque âmbar por peça.
- **CFDesigner, regra do dono: NÃO colocar as barras letterbox do ReelFrame** (ponto REC, timecode, símbolo + "@cfdesigner", "24 fps · 9:16"). Elas ficam desligadas por padrão (`bars={false}`). Só ligue com `bars` se o usuário pedir explicitamente. Também não escreva timecode, REC ou fps em vídeos por conta própria.
- **Legendas:** use o componente `Legendas` do CFDesigner (skill `legendas`). Dia a dia: Montserrat com contorno preto fino, sem tarja. Frase de efeito: Título de cinema.

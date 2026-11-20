# ReelFrame

Capa e texto sobreposto de Reels/Shorts em 9:16 (`frame-vertical`), com barras letterbox de `space-12`: em cima o ponto REC e o timecode, embaixo o símbolo branco + @cfdesigner e o fps. O hook vai em `display-m` no terço inferior, com a palavra-chave em âmbar.

- Fornecido pelo consumidor: `hook` (até 6–8 palavras), `accent` (trecho do hook a destacar), `eyebrow` opcional, `image` (URL do frame de fundo; recebe vinheta automática), `imagePosition` (enquadramento do corte 9:16, ex. `38% center` para manter o rosto), `timecode`, `fps`, `width`.
- Sempre no visual Cinema, nos dois temas: o vídeo é escuro por definição.
- Uma palavra em âmbar por hook. Nunca texto nas barras além do timecode e da assinatura.

- **`bars` (padrão `false`):** liga as barras letterbox com REC, timecode, @cfdesigner e fps. Desligadas por decisão do dono; só ligue se ele pedir.

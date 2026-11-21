---
name: criar-design-system
description: Use quando o usuário mandar imagens, vídeos, prints ou links de referência e pedir para criar, extrair ou montar um novo design system (ou "um estilo novo") a partir deles. Processo para analisar as referências e construir um design system completo, com movimento, transições, legendas e fecho próprios.
---

# Criar um design system a partir de referências

Cada design system é **único**: o que o usuário mandar define cores, tipografia, movimento, transições, legendas, terceiros, números e fecho dele. Não herde nada de outro design system, a menos que ele peça.

## 1. Receber e entender
- Pergunte só o que faltar: nome do design system, para que peças (Reels, YouTube...), e **o que exatamente copiar da referência** (clima geral? só as cores? o movimento?).
- **Logos, fontes e fotos:** peça os arquivos originais dele. Nunca redesenhe nem vetorize o logo de uma referência de terceiros; use referências só como inspiração de estilo, não copie arte de outras marcas.

## 2. Analisar as referências
- **Imagem:** olhe com a ferramenta de leitura de imagens. Extraia as cores reais por medição, não "a olho" (Python com Pillow: reduza a imagem e agrupe as cores dominantes; instale `pillow` num venv se faltar). Anote proporção das margens, peso e escala da tipografia, tratamento de foto (contraste, grão, vinheta), elementos gráficos (fios, formas, ícones).
- **Vídeo:** use `ffmpeg`.
  - Quadros ao longo do tempo: `ffmpeg -i ref.mp4 -vf "fps=2,scale=540:-1" frames/%03d.png`.
  - Cortes e transições: `-vf "select='gt(scene,0.3)',showinfo"` para achar os cortes; depois extraia **todos os quadros** em volta de cada corte para ver o tipo (corte seco, fade, wipe, zoom, flash...) e a duração em quadros.
  - Movimento: compare quadros consecutivos para estimar velocidade e curva (entra rápido e desacelera? linear? elástico?). Lembre: isso é estimado a partir de quadros amostrados, nunca exato. Confirme comparando seu resultado com a referência lado a lado.
  - Legendas/texto na tela: estilo, posição, como as palavras entram e saem.
  - Áudio, se houver fala: transcreva (skill `whisper`) só se ajudar a entender o ritmo.
- **Tipografia:** identifique a família mais próxima entre as do Google Fonts (disponíveis via `@remotion/google-fonts`) e **proponha** ao usuário; se ele tiver os arquivos da fonte, use-os.

## 3. Construir a partir do modelo
1. Copie `design-systems/_modelo/` para `design-systems/<nome>/` e crie a estrutura do contrato (`design-systems/README.md`).
2. Preencha `tokens.ts` (cores, tipografia, espaço, raios, sombras), `fonts.ts`, `movimento.ts` (curvas e velocidades **medidas**), `README.md` (brand book) e `DESIGN-SYSTEM.md` (ficha).
3. Crie os componentes e os **efeitos próprios** (`components/`, `efeitos/`): transições, legenda do dia a dia e de destaque, terceiro de nome, números, fecho. Pode se inspirar na estrutura do `cfdesigner`, mas o visual e o movimento vêm das referências, não dele.
4. Crie `composicoes.tsx` com exemplos e registre em `src/Root.tsx`.

## 4. Aprovar por etapas (não entregue tudo de uma vez)
1. Cores + tipografia + um quadro de componentes → imagem, aprovação.
2. Movimento e transições → um vídeo curto de teste (renderize de verdade), aprovação.
3. Legendas: **4 opções em imagem** (como foi feito no CFDesigner), o usuário escolhe, depois você implementa.
4. Terceiro de nome, números, fecho.
Ajuste a cada retorno. Escolhas dele viram regra na `DESIGN-SYSTEM.md` (inclusive o que ele NÃO gosta).

## 5. Fechar
- Verifique: `npm run lint`, renderize os exemplos.
- Atualize a tabela da skill `design-systems` e `design-systems/README.md`.
- Commit no `main`. Diga ao usuário o que veio de cada referência e o que ficou como suposição.

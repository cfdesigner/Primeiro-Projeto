# Plano de edição: C01 "ritmo da edição" (plano reverso)

> O vídeo **já vem editado** (os gráficos estão gravados na imagem). Este plano é a **leitura do que existe**, feita com `scripts/analisar-video.py` e com os tempos das palavras do Whisper. Serve para decidir o que fazer com ele. Tempos de gráficos são aproximados (±1 s); tempos de palavras e cortes são medidos.

**Design system:** CFDesigner (dourado âmbar, cartões escuros, logo cfdesigner) · **Formato:** vertical 1080×1920, 29,97 fps, 31,2 s · **Plataforma:** Reels
**Terceiro de nome:** não há (e só se o dono pedir). **Legendas:** não há (o vídeo usa cartões de palavra-chave no lugar).

## Material

| Arquivo | Duração | Formato                     | Avisos                                                        |
| ------- | ------- | --------------------------- | ------------------------------------------------------------- |
| C01.mp4 | 31,2 s  | 1080×1920, 29,97 fps, H.264 | volume -16,7 LUFS (um pouco baixo para redes), pico -0,6 dBTP |

## O que a análise mostrou

- **7 cortes secos:** 3,6 · 7,44 · 8,81 · 10,88 · 14,88 · 16,78 · 21,89 s (os de 3,6 e 10,88 são entre planos parecidos e só aparecem com o limiar sensível).
- **Fala:** 0 a 26,2 s, 84 palavras, 3,2 palavras/s. Pausas longas de **2,2 s** depois de "edição." (7,4 s) e depois de "pausa," (19 s): os cortes e os gestos caem exatamente nelas.
- **Som de fundo:** não some nas pausas (-27 dB, 8 dB abaixo da fala) e segue sob o logo do fim até 29,75 s: **provavelmente música** (não dá para confirmar sem ouvir).
- Palavras de baixa confiança: "Você", "a" (início da frase).

## Linha do tempo

| #   | Origem        | O que acontece                                                                                      | Fala                                                                          | Gráfico por cima                                                                                                                                      |
| --- | ------------- | --------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | 0–3,6 s       | Close, selfie, sala clara                                                                           | "Você já assistiu um vídeo e teve a sensação de que…"                         | Ícone **ASSISTIU** (play em linha dourada), com a palavra "assistiu" (0,42 s)                                                                         |
| 2   | 3,6–7,44 s    | Plano mais aberto, sala com TV                                                                      | "o problema não é a imagem, nem a câmera. É o ritmo"                          | Cartão **O PROBLEMA NÃO É… ☐ IMAGEM ☐ CÂMERA ☐ RITMO**: marca ✗ em "imagem" (4,98 s) e "câmera" (5,70 s); "ritmo" (6,62 s) fica sem marca             |
| 3   | 7,44–8,81 s   | Close, ele ajeita o fone                                                                            | (pausa de 2,2 s)                                                              | —                                                                                                                                                     |
| 4   | 8,81–10,88 s  | Mesa de edição, escrevendo                                                                          | "Sabe o que é mais interessante?"                                             | —                                                                                                                                                     |
| 5   | 10,88–~13,5 s | **Gravação de tela da timeline** cheia de trilhas coloridas, com ele em moldura arredondada embaixo | "Não adianta encher o vídeo de efeitos de transição"                          | A timeline fica mais cheia no meio do trecho                                                                                                          |
| 6   | ~13,5–14,88 s | Volta à mesa                                                                                        | "Acredita, eu já fiz isso"                                                    | —                                                                                                                                                     |
| 7   | 14,88–16,78 s | Plano lateral, ele editando (luz rosa e laranja)                                                    | "Uma boa edição está nas escolhas"                                            | —                                                                                                                                                     |
| 8   | 16,78–21,89 s | Cozinha, gesto de beber chá durante a pausa                                                         | "o momento do corte, na pausa, no som"                                        | Cartão **UMA BOA EDIÇÃO ESTÁ EM… ☑ CORTE ☑ PAUSA ☑ SOM**: ✓ em "corte" (17,67 s), "pausa" (18,39 s) e "som" (21,69 s)                                 |
| 9   | 21,89–26,2 s  | Mesa com LED laranja, plano mais próximo no fim                                                     | "editar não é colocar mais coisas na tela. É fazer cada segundo valer a pena" | **EDITAR NÃO É COLOCAR / MAIS** (palavra grande com sublinhado dourado, em "mais", 23,49 s); ícone **SEGUNDOS** (cronômetro), com "segundo" (25,05 s) |
| 10  | 26,2–31,2 s   | **Fecho:** preto com o logo cfdesigner em branco                                                    | —                                                                             | Logo com fade; a música continua até 29,75 s, depois silêncio                                                                                         |

## Como o vídeo "pensa" (o que dá para reaproveitar)

- **Corte seco em todas as trocas**, sempre colado numa **pausa ou numa virada da frase**. Nenhuma transição decorativa (o conteúdo do vídeo diz exatamente isso).
- **Cada gráfico acompanha uma palavra** da fala (a marca aparece quando a palavra é dita).
- **Variação de plano a cada 2 a 5 s**: close, aberto, mesa, tela, cozinha. Ritmo de uns 4 s por plano.
- **Pausa vira ação:** os 2,2 s de silêncio são preenchidos com gesto (fone, chá), não com corte.

## Componentes que este vídeo usa e que o CFDesigner ainda NÃO tem

1. **Cartão de checklist animado** (título pequeno + 3 caixinhas que viram ✗ ou ✓ no ritmo da fala).
2. **Ícone com rótulo** (tile escuro translúcido, ícone de linha dourado, palavra embaixo), no canto superior esquerdo.
3. **Palavra grande com sublinhado** ("EDITAR NÃO É COLOCAR / MAIS").
4. **Layout gravação de tela + ele em moldura arredondada.**
5. **Fecho com logo cfdesigner branco sobre preto** (o `LogoOutro` atual usa o logo metálico empilhado e uma assinatura).

## Decisões a aprovar

1. O que fazer com este vídeo (reaproveitar como referência para criar os componentes acima, refazer a partir dos clipes originais, ou só registrar o plano)?
2. Se for refazer: manter a música? Ela está abaixo da fala, sem competir.
3. Volume: -16,7 LUFS. Normalizar para perto de -14?

## Riscos

- Os gráficos estão gravados na imagem: **não dá para mexer neles** sem os clipes originais.
- A música não foi ouvida, só medida.

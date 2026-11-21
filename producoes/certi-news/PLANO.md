# Plano de edição: CERTI News (plano retroativo, serve de exemplo)

> Escrito depois da edição, para mostrar o formato. Os dados vêm de `scripts/analisar-video.py` rodado no original.

**Design system:** CERTI · **Formato:** vertical 1080×1920 · **Duração:** ~12 s · **Plataforma:** Reels
**Terceiro de nome:** o dono decidiu não colocar (só se pedir).

## Material

| Arquivo                   | Duração | Formato                                                                       | Avisos                                                |
| ------------------------- | ------- | ----------------------------------------------------------------------------- | ----------------------------------------------------- |
| FX30_20261110_9978S03.mp4 | 10,6 s  | 1080×1920 (gravado em pé, rotação 90° nos metadados), 59,94 fps, HEVC 10 bits | converter para H.264, 8 bits, 30 fps; volume -20 LUFS |

## O que a análise mostrou

- **Plano único** (0 cortes). Duas pessoas em pé; a apresentadora fala, o colega fica ao lado.
- **Fala:** 1,55 s a 8,55 s, 21 palavras, 3 palavras/s, **sem pausas relevantes** (só 0,56 s depois de "pessoal,"). O sugeridor automático de frases de efeito não achou nenhuma.
- **Conferir:** "Certe" (confiança 32%) → "CERTI"; "Outubro" → "outubro".
- **Quieto:** ~1,5 s no começo e ~2 s no fim. A detecção de silêncio não pegou (ruído de ambiente); a sugestão de aparo pela fala sim.

## Linha do tempo

| #   | Origem     | Duração | O que acontece                                                                                            | Por cima                                                                                                                                            | Transição            |
| --- | ---------- | ------- | --------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| 1   | 0,0–10,6 s | 10,6 s  | Plano único, apresentação falada                                                                          | Legenda do dia a dia (46 px, a 30% da altura); frase de efeito "A Inteligência Artificial está no centro das discussões" (5,5–8,7 s), sem escurecer | início em corte seco |
| 2   | (fecho)    | ~3,3 s  | Desfoque + tingimento azul-profundo; logo vertical negativo nasce dentro do azul, `certi.org.br` discreto | —                                                                                                                                                   | a partir de 8,9 s    |

Sem aparo: o dono preferiu manter o respiro no começo e no fim.

## Decisões tomadas pelo dono

1. Nome da marca sempre **CERTI**, em maiúsculas.
2. Legenda: menor (46 px), mais alta (30%), sem ponto final.
3. Frase de efeito direto sobre as pessoas, sem azul por cima.
4. Fecho com logo menor (440 px) e transição pelo azul (sem corte chapado).
5. Terceiro de nome desligado.

## Lições

- Fala emendada: o sugeridor de frases de efeito depende de pausas; a frase foi escolhida pelo dono.
- Palavra-chave de duas palavras fica empilhada, uma por linha.
- O dono é visual: o tamanho e a altura da legenda foram escolhidos comparando 3 a 4 opções lado a lado.

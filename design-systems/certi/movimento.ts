// PERSONALIDADE DE MOVIMENTO do CERTI: direta e funcional (institucional).
// Medida no vídeo de tela do site certi.org.br (66 s, 30 fps), quadro a quadro. Veja DESIGN-SYSTEM.md.
import { Easing } from "remotion";

export const motion = {
  /** Painéis e menus: aparecem e somem de uma vez (medido: 1 quadro). */
  cutMs: 0,
  /** Troca de imagem (crossfade): medido ≈ 400 ms, perfil quase linear. Ao abrir o menu a imagem aparece junto com o painel, sem fade. */
  fadeMs: 400,
  /** Etiqueta/botão destacado: preenchimento até ~94% em ≈ 300 ms, desacelerando. */
  fillMs: 300,
  /** Saída do preenchimento (medido ≈ 250 ms). */
  releaseMs: 250,
  /** Intervalo entre etiquetas destacadas em sequência (observado 0,4 a 0,5 s). */
  selectionStepMs: 450,
} as const;

export const easing = {
  /** CSS ease-out: sobe rápido e desacelera. Casa com a curva medida do preenchimento. */
  fill: Easing.bezier(0, 0, 0.58, 1),
  fade: Easing.linear,
} as const;

/** Milissegundos para quadros, no fps da composição. */
export const frames = (ms: number, fps: number) =>
  Math.round((ms * fps) / 1000);

/**
 * Transições, medidas no institucional "40 anos" da CERTI (vídeo de referência; exportado a 15 quadros reais/s).
 * "estimado" = visto nos quadros, sem medição direta (a conferir com o dono).
 */
export const transitions = {
  /** Dissolvência entre planos: ~3 quadros distintos a 15 fps. */
  dissolveMs: 200,
  /** Whip: a câmera acelera para o lado e corta no pico (−3, −14, −22 px por passo @480 px). */
  whipMs: 250,
  whipBlurPx: 60, // estimado
  /** Deslocamento (fração da largura) e ampliação durante o whip; a ampliação cobre a borda e evita faixa preta. */
  whipTravel: 0.17, // estimado
  whipScale: 1.35, // estimado
  /** Zoom de impacto antes do corte: nitidez cai de 512 para 161 (borrão de movimento). */
  zoomPunchMs: 170,
  zoomPunchScale: 1.45, // estimado
  zoomPunchBlurPx: 10, // estimado
  /** Plano que chega desfocado e ganha foco (nitidez 7 → 353). */
  focusInMs: 400,
  focusInBlurPx: 24, // estimado
  /** Abertura: fade a partir do preto. */
  fadeFromBlackMs: 600,
  /** Terceiro de nome: tempos de entrada e saída. */
  lowerThird: {
    barInStartMs: 130,
    barInEndMs: 600,
    nameTypeStartMs: 130,
    nameTypeEndMs: 530,
    roleTypeStartMs: 200,
    roleTypeEndMs: 730,
    emblemStartMs: 330,
    emblemEndMs: 550,
    exitMs: 200,
  },
} as const;

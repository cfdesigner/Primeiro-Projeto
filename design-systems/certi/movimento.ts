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

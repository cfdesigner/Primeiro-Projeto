// PERSONALIDADE DE MOVIMENTO do CFDesigner: seco e cinematográfico. Curvas de easing usadas pelos efeitos.
// Outro design system terá o seu próprio arquivo de movimento (ex.: mais elástico, mais suave).
import { Easing } from "remotion";

export const outExpo = Easing.bezier(0.16, 1, 0.3, 1);
export const outBack = Easing.out(Easing.back(1.6));
export const inQuad = Easing.in(Easing.quad);
export const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

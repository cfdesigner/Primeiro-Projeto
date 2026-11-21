import { Easing } from "remotion";

export const outExpo = Easing.bezier(0.16, 1, 0.3, 1);
export const outBack = Easing.out(Easing.back(1.6));
export const inQuad = Easing.in(Easing.quad);
export const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

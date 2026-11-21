import type React from "react";
import "../fonts";
import { fontFamilies, textStyles } from "../tokens";

export type BaseProps = {
  /** Multiplicador de tamanho. 1 = base de vídeo 1920×1080. */
  scale?: number;
  style?: React.CSSProperties;
};

export const fam = fontFamilies;

/** Converte um estilo de texto dos tokens em CSS (já escalado). */
export const text = (
  name: keyof typeof textStyles,
  scale = 1,
): React.CSSProperties => {
  const t = textStyles[name];
  return {
    fontFamily: fam.sans,
    fontSize: t.fontSize * scale,
    lineHeight: t.lineHeight,
    fontWeight: t.fontWeight,
    letterSpacing: t.letterSpacing,
    textTransform: "uppercase" in t && t.uppercase ? "uppercase" : "none",
  };
};

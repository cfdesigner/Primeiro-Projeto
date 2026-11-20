import React from "react";
import "../fonts";
import { colors, fontFamilies, type Theme } from "../tokens";

export type BaseProps = {
  /** Multiplicador de tamanho. 1 = tamanho de web do design system. */
  scale?: number;
  style?: React.CSSProperties;
};

export const palette = (theme: Theme = "cinema") => colors[theme];
export const fam = fontFamilies;

/** Granulado leve (~7%) sobre fundos e frames. Nunca sobre texto pequeno. */
export const Grain: React.FC = () => (
  <svg
    width="100%"
    height="100%"
    style={{
      position: "absolute",
      inset: 0,
      pointerEvents: "none",
      opacity: 0.07,
      mixBlendMode: "overlay",
      zIndex: 3,
    }}
  >
    <filter id="cf-grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} stitchTiles="stitch" />
    </filter>
    <rect width="100%" height="100%" filter="url(#cf-grain)" />
  </svg>
);

/** Quebra o texto e destaca o trecho `accent` com a cor dada. */
export const HookText: React.FC<{ text: string; accent?: string; color: string }> = ({
  text,
  accent,
  color,
}) => {
  const i = accent ? text.indexOf(accent) : -1;
  if (!accent || i < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <span style={{ color }}>{accent}</span>
      {text.slice(i + accent.length)}
    </>
  );
};

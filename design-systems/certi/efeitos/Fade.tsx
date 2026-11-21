import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { easing, frames, motion } from "../movimento";

export type FadeInProps = {
  children: React.ReactNode;
  /** Quadro em que começa. */
  from?: number;
  /** Duração em ms (padrão 400, como a troca de imagem do site). */
  durationMs?: number;
  style?: React.CSSProperties;
};

/** Entrada por fade (como a troca de imagem do menu do site: ≈ 400 ms, linear). Extrapolação para textos: a aprovar. */
export const FadeIn: React.FC<FadeInProps> = ({
  children,
  from = 0,
  durationMs = motion.fadeMs,
  style,
}) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const o = interpolate(f, [from, from + frames(durationMs, fps)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easing.fade,
  });
  return <div style={{ opacity: o, ...style }}>{children}</div>;
};

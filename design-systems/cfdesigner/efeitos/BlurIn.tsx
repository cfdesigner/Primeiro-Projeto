import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { clamp, outExpo } from "../movimento";

export type BlurInProps = {
  children: React.ReactNode;
  from?: number;
  durationInFrames?: number;
  blur?: number;
  y?: number;
};

/** Entrada suave: sai do desfoque, sobe um pouco e ganha opacidade. Inspirado em "blur-in". */
export const BlurIn: React.FC<BlurInProps> = ({
  children,
  from = 0,
  durationInFrames = 18,
  blur = 24,
  y = 24,
}) => {
  const f = useCurrentFrame();
  const p = interpolate(f, [from, from + durationInFrames], [0, 1], {
    ...clamp,
    easing: outExpo,
  });
  return (
    <div
      style={{
        opacity: p,
        filter: `blur(${(1 - p) * blur}px)`,
        transform: `translateY(${(1 - p) * y}px)`,
      }}
    >
      {children}
    </div>
  );
};

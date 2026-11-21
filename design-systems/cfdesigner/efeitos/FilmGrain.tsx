import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";

export type FilmGrainProps = {
  /** Opacidade do grão (padrão 0,07, como no brand book). */
  opacity?: number;
};

/** Granulado de filme animado: o padrão muda a cada quadro. Nunca sobre texto pequeno. */
export const FilmGrain: React.FC<FilmGrainProps> = ({ opacity = 0.07 }) => {
  const seed = useCurrentFrame() % 12;
  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        mixBlendMode: "overlay",
        opacity,
        zIndex: 3,
      }}
    >
      <svg width="100%" height="100%">
        <filter id="cf-film-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves={2}
            seed={seed}
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#cf-film-grain)" />
      </svg>
    </AbsoluteFill>
  );
};

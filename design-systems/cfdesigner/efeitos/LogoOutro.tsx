import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import "../fonts";
import { Logo } from "../components/Logo";
import { Grain } from "../components/shared";
import { colors, fontFamilies } from "../tokens";
import { clamp, outExpo } from "./util";

export type LogoOutroProps = {
  tagline?: string;
  /** Duração total em frames (padrão 2,5 s). */
  durationInFrames?: number;
};

const c = colors.cinema;

/** Fecho do vídeo: logo metálico sobre void, assinatura em Bebas. Inspirado em "logo-outro". */
export const LogoOutro: React.FC<LogoOutroProps> = ({
  tagline = "I turn seconds into cinematic stories",
  durationInFrames,
}) => {
  const f = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const k = Math.min(width, height) / 1080;
  const dur = durationInFrames ?? Math.round(fps * 2.5);
  const logoP = interpolate(f, [0, fps * 0.9], [0, 1], {
    ...clamp,
    easing: outExpo,
  });
  const textP = interpolate(f, [fps * 0.5, fps * 1.1], [0, 1], {
    ...clamp,
    easing: outExpo,
  });
  const out = interpolate(f, [dur - fps * 0.4, dur], [1, 0], clamp);

  return (
    <AbsoluteFill
      style={{
        background: c.void,
        justifyContent: "center",
        alignItems: "center",
        opacity: out,
      }}
    >
      <div style={{ display: "grid", justifyItems: "center", gap: 48 * k }}>
        <div
          style={{ opacity: logoP, transform: `scale(${0.94 + 0.06 * logoP})` }}
        >
          <Logo layout="stacked" finish="metal" height={480 * k} />
        </div>
        <div
          style={{
            opacity: textP,
            transform: `translateY(${(1 - textP) * 16 * k}px)`,
            fontFamily: fontFamilies.display,
            fontSize: 64 * k,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            color: c.ink,
            textAlign: "center",
            maxWidth: 900 * k,
            lineHeight: 1,
          }}
        >
          {tagline}
        </div>
      </div>
      <Grain />
    </AbsoluteFill>
  );
};

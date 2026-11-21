import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import "../fonts";
import { colors, fontFamilies } from "../tokens";
import { clamp, outExpo } from "../movimento";

export type CountUpProps = {
  from?: number;
  to: number;
  prefix?: string;
  /** Texto fixo depois do número (ex.: "h", " segundos"). Fica em âmbar. */
  suffix?: string;
  decimals?: number;
  /** Duração da contagem em frames (padrão 1,6 s). */
  durationInFrames?: number;
  /** Tamanho do número em px (padrão 220). */
  fontSize?: number;
};

const c = colors.cinema;

/**
 * Contador que desacelera e para exatamente no valor final, com um pulso discreto.
 * O brand book pede números concretos ("30 segundos", "entrega em 48h"): use isto para destacá-los.
 * Inspirado no componente "count-up" do HyperFrames (Apache-2.0), reescrito em Remotion.
 */
export const CountUp: React.FC<CountUpProps> = ({
  from = 0,
  to,
  prefix = "",
  suffix = "",
  decimals = 0,
  durationInFrames,
  fontSize = 220,
}) => {
  const f = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const k = Math.min(width, height) / 1080;
  const dur = durationInFrames ?? Math.round(fps * 1.6);
  const v = interpolate(f, [0, dur], [from, to], { ...clamp, easing: outExpo });
  const shown = f >= dur ? to : v;
  const pulse = interpolate(f, [dur, dur + 5, dur + 14], [1, 1.05, 1], clamp);
  const text = shown.toLocaleString("pt-BR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "baseline",
        gap: 10 * k,
        transform: `scale(${pulse})`,
        fontFamily: fontFamilies.display,
        lineHeight: 1,
        color: c.ink,
        fontVariantNumeric: "tabular-nums",
        textShadow: "0 6px 36px rgba(0,0,0,.7)",
      }}
    >
      <span style={{ fontSize: fontSize * k }}>
        {prefix}
        {text}
      </span>
      {suffix ? (
        <span style={{ fontSize: fontSize * 0.45 * k, color: c.amberText }}>
          {suffix}
        </span>
      ) : null}
    </div>
  );
};

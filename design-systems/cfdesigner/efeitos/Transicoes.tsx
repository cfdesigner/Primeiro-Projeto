import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { colors } from "../tokens";
import { clamp, outExpo } from "./util";

const c = colors.cinema;

export type FlashCutProps = {
  /** Frame (dentro da sequência) do corte. */
  at: number;
  /** Duração do clarão em frames (padrão 12). */
  durationInFrames?: number;
};

/** Clarão rápido de luz branco-gelo cobrindo um corte. Inspirado em "flash-through-white". */
export const FlashCut: React.FC<FlashCutProps> = ({
  at,
  durationInFrames = 12,
}) => {
  const f = useCurrentFrame();
  const o = interpolate(
    f,
    [at - 1, at + 1, at + durationInFrames],
    [0, 0.9, 0],
    clamp,
  );
  if (o <= 0) return null;
  return <AbsoluteFill style={{ background: c.ink, opacity: o }} />;
};

export type LightLeakProps = {
  /** Frame de início. */
  at?: number;
  durationInFrames?: number;
  /** Lado de onde a luz entra. */
  from?: "left" | "right";
};

/**
 * Vazamento de luz âmbar atravessando o quadro. Use em cortes, nunca atrás de texto
 * (o brand book pede flare único, âmbar, no canto). Inspirado em "light-leak".
 */
export const LightLeak: React.FC<LightLeakProps> = ({
  at = 0,
  durationInFrames = 36,
  from = "left",
}) => {
  const f = useCurrentFrame();
  const p = interpolate(f, [at, at + durationInFrames], [0, 1], {
    ...clamp,
    easing: outExpo,
  });
  const o = interpolate(
    f,
    [at, at + durationInFrames * 0.35, at + durationInFrames],
    [0, 1, 0],
    clamp,
  );
  if (o <= 0) return null;
  const dir = from === "left" ? 1 : -1;
  const x = (from === "left" ? -40 : 140) + dir * p * 120;
  return (
    <AbsoluteFill
      style={{
        mixBlendMode: "screen",
        opacity: o,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-10%",
          left: `${x}%`,
          width: "70%",
          height: "120%",
          filter: "blur(60px)",
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(226,180,90,.75), rgba(217,164,65,.35) 40%, rgba(138,74,20,0) 70%)",
        }}
      />
    </AbsoluteFill>
  );
};

export type WipeRevealProps = {
  children: React.ReactNode;
  /** Direção em que a borda de revelação se move. */
  direction?: "left" | "right" | "up" | "down";
  from?: number;
  durationInFrames?: number;
};

/** Revela o conteúdo com uma cortina reta. Inspirado em "directional-wipe" / "curtain-reveal". */
export const WipeReveal: React.FC<WipeRevealProps> = ({
  children,
  direction = "right",
  from = 0,
  durationInFrames = 18,
}) => {
  const f = useCurrentFrame();
  const p = interpolate(f, [from, from + durationInFrames], [0, 1], {
    ...clamp,
    easing: outExpo,
  });
  const r = (1 - p) * 100;
  const inset = {
    right: `inset(0 ${r}% 0 0)`,
    left: `inset(0 0 0 ${r}%)`,
    up: `inset(${r}% 0 0 0)`,
    down: `inset(0 0 ${r}% 0)`,
  }[direction];
  return <AbsoluteFill style={{ clipPath: inset }}>{children}</AbsoluteFill>;
};

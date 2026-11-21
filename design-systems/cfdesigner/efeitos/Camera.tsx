import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { clamp } from "./util";
import { Easing } from "remotion";

export type PushInProps = {
  children: React.ReactNode;
  from?: number;
  to?: number;
  /** Duração do movimento em frames (padrão 4 s). */
  durationInFrames?: number;
  originX?: string;
  originY?: string;
};

/** Aproximação lenta de câmera (dolly). Envolve o vídeo ou a foto. Inspirado em "cinematic-zoom". */
export const PushIn: React.FC<PushInProps> = ({
  children,
  from = 1,
  to = 1.08,
  durationInFrames,
  originX = "50%",
  originY = "45%",
}) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const dur = durationInFrames ?? Math.round(fps * 4);
  const scale = interpolate(f, [0, dur], [from, to], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });
  return (
    <AbsoluteFill
      style={{
        transform: `scale(${scale})`,
        transformOrigin: `${originX} ${originY}`,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

export type CameraShakeProps = {
  children: React.ReactNode;
  /** Intensidade em px (padrão 6). */
  intensity?: number;
  /** Velocidade (padrão 1). */
  speed?: number;
};

/** Tremor de câmera de mão, determinístico (sem aleatório), com leve zoom para esconder as bordas. */
export const CameraShake: React.FC<CameraShakeProps> = ({
  children,
  intensity = 6,
  speed = 1,
}) => {
  const f = useCurrentFrame() * speed;
  const { width, height } = useVideoConfig();
  const k = Math.min(width, height) / 1080;
  const x = (Math.sin(f * 0.9) + 0.5 * Math.sin(f * 2.3 + 1)) * intensity * k;
  const y = (Math.cos(f * 1.1) + 0.5 * Math.sin(f * 1.9 + 2)) * intensity * k;
  const r = Math.sin(f * 0.7) * 0.25;
  return (
    <AbsoluteFill
      style={{
        transform: `translate(${x}px, ${y}px) rotate(${r}deg) scale(1.04)`,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

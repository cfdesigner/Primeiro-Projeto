import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { frames, transitions } from "../movimento";
import { FadeIn } from "./Fade";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** Abertura: fade a partir do preto (cobre a composição e some). */
export const FadeFromBlack: React.FC<{ durationMs?: number }> = ({
  durationMs = transitions.fadeFromBlackMs,
}) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const o = interpolate(f, [0, frames(durationMs, fps)], [1, 0], {
    ...clamp,
    easing: Easing.out(Easing.quad),
  });
  if (o <= 0) return null;
  return (
    <AbsoluteFill style={{ background: "#000", opacity: o, zIndex: 50 }} />
  );
};

/** Dissolvência de ~0,2 s: a cena que entra faz fade por cima da que está saindo (as duas ficam em tela por um instante). */
export const Dissolve: React.FC<{
  children: React.ReactNode;
  from?: number;
  durationMs?: number;
}> = ({ children, from = 0, durationMs = transitions.dissolveMs }) => (
  <FadeIn
    from={from}
    durationMs={durationMs}
    style={{ position: "absolute", inset: 0 }}
  >
    {children}
  </FadeIn>
);

type Dir = "left" | "right";

const BlurDefs: React.FC<{ id: string; x: number; y?: number }> = ({
  id,
  x,
  y = 0,
}) => (
  <svg width={0} height={0} style={{ position: "absolute" }} aria-hidden>
    <defs>
      <filter id={id} x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation={`${x} ${y}`} />
      </filter>
    </defs>
  </svg>
);

export type WhipProps = {
  children: React.ReactNode;
  direction?: Dir;
  durationMs?: number;
  /** WhipOut: quadro (dentro da sequência) em que a saída começa. */
  from?: number;
};

/** Whip, saída: a cena acelera para o lado com borrão direcional. Corte logo em seguida (cena seguinte usa WhipIn). */
export const WhipOut: React.FC<WhipProps> = ({
  children,
  direction = "left",
  durationMs = transitions.whipMs,
  from = 0,
}) => {
  const f = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const p = interpolate(f, [from, from + frames(durationMs, fps)], [0, 1], {
    ...clamp,
    easing: Easing.in(Easing.cubic),
  });
  const dir = direction === "left" ? -1 : 1;
  const b = p * transitions.whipBlurPx;
  return (
    <AbsoluteFill
      style={{
        transform: `translateX(${dir * p * width * transitions.whipTravel}px) scale(${1 + p * (transitions.whipScale - 1)})`,
        filter: b > 0.5 ? "url(#cf-whip-out)" : undefined,
      }}
    >
      <BlurDefs id="cf-whip-out" x={b} />
      {children}
    </AbsoluteFill>
  );
};

/** Whip, entrada: a cena chega do lado oposto, desacelerando e ganhando nitidez. */
export const WhipIn: React.FC<WhipProps> = ({
  children,
  direction = "left",
  durationMs = transitions.whipMs,
}) => {
  const f = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const p = interpolate(f, [0, frames(durationMs, fps)], [1, 0], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });
  const dir = direction === "left" ? 1 : -1;
  const b = p * transitions.whipBlurPx;
  return (
    <AbsoluteFill
      style={{
        transform: `translateX(${dir * p * width * transitions.whipTravel}px) scale(${1 + p * (transitions.whipScale - 1)})`,
        filter: b > 0.5 ? "url(#cf-whip-in)" : undefined,
      }}
    >
      <BlurDefs id="cf-whip-in" x={b} />
      {children}
    </AbsoluteFill>
  );
};

export type ZoomPunchProps = {
  children: React.ReactNode;
  from?: number;
  durationMs?: number;
  scale?: number;
};

/** Zoom de impacto: aproxima rápido com borrão crescente. Termine a cena com um corte seco logo depois. */
export const ZoomPunchOut: React.FC<ZoomPunchProps> = ({
  children,
  from = 0,
  durationMs = transitions.zoomPunchMs,
  scale = transitions.zoomPunchScale,
}) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = interpolate(f, [from, from + frames(durationMs, fps)], [0, 1], {
    ...clamp,
    easing: Easing.in(Easing.quad),
  });
  return (
    <AbsoluteFill
      style={{
        transform: `scale(${1 + p * (scale - 1)})`,
        filter: `blur(${p * transitions.zoomPunchBlurPx}px)`,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

/** Entrada desfocada: o plano chega borrado e ganha foco em ~0,4 s. */
export const FocusIn: React.FC<{
  children: React.ReactNode;
  durationMs?: number;
  blurPx?: number;
}> = ({
  children,
  durationMs = transitions.focusInMs,
  blurPx = transitions.focusInBlurPx,
}) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = interpolate(f, [0, frames(durationMs, fps)], [1, 0], {
    ...clamp,
    easing: Easing.inOut(Easing.cubic),
  });
  return (
    <AbsoluteFill
      style={{ filter: p > 0.001 ? `blur(${p * blurPx}px)` : undefined }}
    >
      {children}
    </AbsoluteFill>
  );
};

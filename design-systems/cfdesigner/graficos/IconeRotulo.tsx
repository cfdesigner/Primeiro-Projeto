import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import "../fonts";
import { colors, fontFamilies } from "../tokens";

const c = colors.cinema;
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

export type IconeRotuloProps = {
  /** "cronometro": ponteiro que gira (uma volta a cada 1,2 s, como no vídeo de referência). "play": quadro de vídeo com play. */
  icone: "cronometro" | "play";
  /** Palavra embaixo, em Bebas Neue dourado (ex.: "Segundos"). */
  rotulo: string;
  durationInFrames: number;
  /** Posição do canto superior esquerdo, em px na base de 1080×1920 (padrão 22, 152). */
  esquerda?: number;
  topo?: number;
  saidaMs?: number;
};

const Cronometro: React.FC<{ ms: number; k: number }> = ({ ms, k }) => {
  const ang = (ms * 0.3) % 360; // graus, 0 = para cima, sentido horário (~300°/s)
  const r = 62;
  const cx = 80;
  const cy = 88;
  const rad = (a: number) => ((a - 90) * Math.PI) / 180;
  const ponta = {
    x: cx + 50 * Math.cos(rad(ang)),
    y: cy + 50 * Math.sin(rad(ang)),
  };
  // arco aceso de 110° logo atrás do ponteiro
  const a0 = ang - 110;
  const p0 = { x: cx + r * Math.cos(rad(a0)), y: cy + r * Math.sin(rad(a0)) };
  const p1 = { x: cx + r * Math.cos(rad(ang)), y: cy + r * Math.sin(rad(ang)) };
  return (
    <svg width={160 * k} height={170 * k} viewBox="0 0 160 170">
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke={c.amber}
        strokeWidth={5}
        opacity={0.4}
      />
      <path
        d={`M ${p0.x} ${p0.y} A ${r} ${r} 0 0 1 ${p1.x} ${p1.y}`}
        fill="none"
        stroke={c.amber}
        strokeWidth={5}
        strokeLinecap="butt"
      />
      <path
        d="M68 16 H92 M80 16 V26"
        stroke={c.amber}
        strokeWidth={6}
        strokeLinecap="square"
      />
      <line
        x1={cx}
        y1={cy}
        x2={cx + 44}
        y2={cy}
        stroke={c.ink}
        strokeWidth={4}
        opacity={0.7}
      />
      <line
        x1={cx}
        y1={cy}
        x2={ponta.x}
        y2={ponta.y}
        stroke={c.amber}
        strokeWidth={6}
        strokeLinecap="round"
      />
      <circle cx={cx} cy={cy} r={6} fill={c.amber} />
    </svg>
  );
};

const Play: React.FC<{ k: number }> = ({ k }) => (
  <svg width={160 * k} height={170 * k} viewBox="0 0 160 170">
    <rect
      x="16"
      y="38"
      width="128"
      height="96"
      rx="8"
      fill="none"
      stroke={c.amber}
      strokeWidth={5}
      opacity={0.5}
    />
    <path
      d="M16 62 H144 M16 110 H144"
      stroke={c.amber}
      strokeWidth={3}
      opacity={0.35}
    />
    <path
      d="M66 70 L66 102 L98 86 Z"
      fill="none"
      stroke={c.amber}
      strokeWidth={6}
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * Ícone com rótulo (visto no vídeo de referência C01): tile quadrado escuro no canto superior esquerdo, ícone de linha dourado
 * e uma palavra embaixo em Bebas Neue. Entra de uma vez; sai com fade curto (≈ 250 ms).
 */
export const IconeRotulo: React.FC<IconeRotuloProps> = ({
  icone,
  rotulo,
  durationInFrames,
  esquerda = 22,
  topo = 152,
  saidaMs = 250,
}) => {
  const f = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const k = width / 1080;
  const ms = (f / fps) * 1000;
  const endMs = (durationInFrames / fps) * 1000;
  const opacity = interpolate(ms, [endMs - saidaMs, endMs], [1, 0], clamp);
  return (
    <AbsoluteFill style={{ opacity, pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          left: esquerda * k,
          top: topo * k,
          width: 358 * k,
          height: 358 * k,
          background: "rgba(11,12,14,0.9)",
          display: "grid",
          gridTemplateRows: "1fr auto",
          justifyItems: "center",
          alignItems: "center",
          padding: `${34 * k}px 0 ${30 * k}px`,
          boxSizing: "border-box",
        }}
      >
        {icone === "cronometro" ? <Cronometro ms={ms} k={k} /> : <Play k={k} />}
        <div
          style={{
            fontFamily: fontFamilies.display,
            fontSize: 68 * k,
            lineHeight: 1,
            letterSpacing: "0.02em",
            textTransform: "uppercase",
            color: c.amber,
          }}
        >
          {rotulo}
        </div>
      </div>
    </AbsoluteFill>
  );
};

import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import "../fonts";
import { Logo } from "../components/Logo";
import { transitions } from "../movimento";
import { colors, fontFamilies } from "../tokens";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const T = transitions.lowerThird;

export type TerceiroTechProps = {
  name: string;
  role: string;
  /** Duração total em tela, em quadros. A saída (fade de 200 ms) acontece no fim. */
  durationInFrames: number;
};

/** Textura sutil de rede (pontos e linhas) dentro da barra. Determinística. */
const Rede: React.FC<{ w: number; h: number }> = ({ w, h }) => {
  const pts = [
    [0.08, 0.3],
    [0.2, 0.75],
    [0.33, 0.2],
    [0.47, 0.65],
    [0.6, 0.25],
    [0.72, 0.8],
    [0.85, 0.35],
    [0.94, 0.7],
  ];
  return (
    <svg
      width={w}
      height={h}
      style={{ position: "absolute", inset: 0, opacity: 0.35 }}
    >
      {pts.slice(1).map((p, i) => (
        <line
          key={i}
          x1={pts[i][0] * w}
          y1={pts[i][1] * h}
          x2={p[0] * w}
          y2={p[1] * h}
          stroke={colors.sky}
          strokeWidth={1}
          opacity={0.5}
        />
      ))}
      {pts.map((p, i) => (
        <circle key={i} cx={p[0] * w} cy={p[1] * h} r={2.2} fill={colors.sky} />
      ))}
    </svg>
  );
};

/**
 * Terceiro de nome do CERTI: nome e cargo são digitados letra a letra, a barra escura (cantos chanfrados) fica opaca
 * e o símbolo nasce de um ponto e vira o anel completo. Sai com fade de 200 ms. Tempos medidos no institucional da CERTI.
 */
export const TerceiroTech: React.FC<TerceiroTechProps> = ({
  name,
  role,
  durationInFrames,
}) => {
  const f = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const k = Math.min(width, height) / 1080;
  const ms = (f / fps) * 1000;
  const typed = (s: string, a: number, b: number) =>
    s.slice(0, Math.round(interpolate(ms, [a, b], [0, s.length], clamp)));
  const nameT = typed(name, T.nameTypeStartMs, T.nameTypeEndMs);
  const roleT = typed(role, T.roleTypeStartMs, T.roleTypeEndMs);
  const bar = interpolate(ms, [T.barInStartMs, T.barInEndMs], [0, 1], clamp);
  const emblem = interpolate(
    ms,
    [T.emblemStartMs, T.emblemEndMs],
    [0, 1],
    clamp,
  );
  const endMs = (durationInFrames / fps) * 1000;
  const out = interpolate(ms, [endMs - T.exitMs, endMs], [1, 0], clamp);
  const barW = 880 * k;
  const barH = 128 * k;
  const c = 16 * k;
  return (
    <AbsoluteFill style={{ opacity: out }}>
      <div
        style={{
          position: "absolute",
          left: 110 * k,
          bottom: 150 * k,
          width: barW,
          height: barH,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: bar,
            background: "rgba(0, 24, 58, 0.88)",
            clipPath: `polygon(${c}px 0, 100% 0, calc(100% - ${c}px) 100%, 0 100%)`,
          }}
        >
          <Rede w={barW} h={barH} />
        </div>
        <div
          style={{
            position: "absolute",
            left: 34 * k,
            top: 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",
            width: 88 * k,
          }}
        >
          <div
            style={{
              transform: `scale(${0.12 + 0.88 * emblem})`,
              opacity: 0.6 + 0.4 * emblem,
            }}
          >
            <Logo layout="symbol" finish="negative" height={84 * k} />
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            left: 150 * k,
            right: 24 * k,
            top: 0,
            bottom: 0,
            display: "grid",
            alignContent: "center",
            gap: 6 * k,
            fontFamily: fontFamilies.sans,
            color: colors.white,
          }}
        >
          <div
            style={{
              fontSize: 44 * k,
              fontWeight: 600,
              lineHeight: 1.1,
              whiteSpace: "nowrap",
            }}
          >
            {nameT}
            <span style={{ visibility: "hidden" }}>
              {name.slice(nameT.length)}
            </span>
          </div>
          <div
            style={{
              fontSize: 27 * k,
              fontWeight: 400,
              lineHeight: 1.2,
              opacity: 0.88,
              whiteSpace: "nowrap",
            }}
          >
            {roleT}
            <span style={{ visibility: "hidden" }}>
              {role.slice(roleT.length)}
            </span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

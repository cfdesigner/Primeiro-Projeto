import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import "../fonts";
import { colors, fontFamilies } from "../tokens";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

export type NumeroProps = {
  /** Valor final (ex.: 12). A contagem termina exatamente nele. */
  value: number;
  /** Antes do número, em azul-claro (ex.: "+"). */
  prefix?: string;
  /** Depois do número, no mesmo peso (ex.: " mil"). */
  suffix?: string;
  /** Linha pequena acima, peso leve (ex.: "Mais de"). */
  eyebrow?: string;
  /** Linha embaixo, em negrito (ex.: "clientes no mundo"). */
  label: string;
  /** Duração total em tela, em quadros. */
  durationInFrames: number;
  /** Duração da contagem em ms (padrão 1200). Proposta: o site não mostrou contador. */
  countMs?: number;
  /** Escurecimento azul sobre a imagem (padrão 0,62). */
  dim?: number;
};

/**
 * Número de destaque do CERTI (aprovado: identidade do estilo A, sobre a imagem): o quadro escurece em azul-profundo,
 * o número aparece enorme em branco (Nunito Sans 900) com o prefixo em azul-claro, rótulo em caixa alta e um fio fino.
 * A contagem desacelera e termina exatamente no valor. Corte seco; só o escurecimento tem fade (200 ms).
 */
export const Numero: React.FC<NumeroProps> = ({
  value,
  prefix,
  suffix,
  eyebrow,
  label,
  durationInFrames,
  countMs = 1200,
  dim = 0.62,
}) => {
  const f = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const k = Math.min(width, height) / 1080;
  const ms = (f / fps) * 1000;
  const endMs = (durationInFrames / fps) * 1000;
  const shade = interpolate(
    ms,
    [0, 200, endMs - 150, endMs],
    [0, 1, 1, 0],
    clamp,
  );
  const v =
    ms >= countMs
      ? value
      : Math.round(
          interpolate(ms, [0, countMs], [0, value], {
            ...clamp,
            easing: Easing.out(Easing.cubic),
          }),
        );
  const body = `${v.toLocaleString("pt-BR")}${suffix ?? ""}`;
  const len =
    (prefix?.length ?? 0) + String(value).length + (suffix?.length ?? 0);
  const size = Math.min(240 * k, (width * 0.84) / (Math.max(len, 1) * 0.55));
  const base: React.CSSProperties = {
    fontFamily: fontFamilies.sans,
    color: colors.white,
    textAlign: "center",
    textTransform: "uppercase",
  };
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <AbsoluteFill
        style={{ background: `rgba(0,40,96,${dim})`, opacity: shade }}
      />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div
          style={{
            display: "grid",
            justifyItems: "center",
            gap: 10 * k,
            textShadow: "0 6px 30px rgba(0,0,0,0.35)",
          }}
        >
          {eyebrow ? (
            <div
              style={{
                ...base,
                fontWeight: 300,
                fontSize: 52 * k,
                letterSpacing: "0.04em",
              }}
            >
              {eyebrow}
            </div>
          ) : null}
          <div
            style={{
              ...base,
              fontWeight: 900,
              fontSize: size,
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              fontVariantNumeric: "tabular-nums",
              whiteSpace: "nowrap",
              textTransform: "none",
            }}
          >
            {prefix ? (
              <span style={{ color: colors.sky }}>{prefix}</span>
            ) : null}
            {body}
          </div>
          <div
            style={{
              ...base,
              fontWeight: 700,
              fontSize: 60 * k,
              letterSpacing: "0.04em",
            }}
          >
            {label}
          </div>
          <div
            style={{
              height: 3 * k,
              width: 560 * k,
              marginTop: 30 * k,
              background:
                "linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.8), rgba(255,255,255,0))",
            }}
          />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import "../fonts";
import { colors, fontFamilies } from "../tokens";
import { clamp, inQuad, outBack, outExpo } from "./util";

export type LowerThirdProps = {
  /** Rótulo pequeno acima do nome (ex.: "Editor de vídeo"). */
  kicker?: string;
  name: string;
  /** Duração total em frames (padrão 4,8 s). Use dentro de um <Sequence>. */
  durationInFrames?: number;
};

const c = colors.cinema;

/**
 * Terceiro de nome/cargo: o rótulo cai, o nome sobe, o fio âmbar se desenha; no fim tudo recolhe.
 * Inspirado no bloco "lt-kicker-name" do catálogo do HyperFrames (Apache-2.0), reescrito em Remotion.
 */
export const LowerThird: React.FC<LowerThirdProps> = ({
  kicker,
  name,
  durationInFrames,
}) => {
  const f = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const k = Math.min(width, height) / 1080;
  const s = (sec: number) => sec * fps;
  const dur = durationInFrames ?? Math.round(s(4.8));
  const end = dur - s(0.55);

  const kickY =
    f < end
      ? interpolate(f, [s(0.1), s(0.52)], [-40, 0], {
          ...clamp,
          easing: outBack,
        })
      : interpolate(f, [end + s(0.02), end + s(0.32)], [0, -40], {
          ...clamp,
          easing: inQuad,
        });
  const nameIn = interpolate(f, [s(0.32), s(0.77)], [0, 1], {
    ...clamp,
    easing: outBack,
  });
  const nameOut = interpolate(f, [end + s(0.05), end + s(0.37)], [1, 0], {
    ...clamp,
    easing: inQuad,
  });
  const line =
    f < end
      ? interpolate(f, [s(0.5), s(1.0)], [0, 1], { ...clamp, easing: outExpo })
      : interpolate(f, [end, end + s(0.3)], [1, 0], {
          ...clamp,
          easing: inQuad,
        });
  if (f >= dur) return null;

  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-end",
        alignItems: "flex-start",
        padding: `0 ${72 * k}px`,
        paddingBottom: height * 0.26,
      }}
    >
      <div style={{ display: "grid", gap: 14 * k, justifyItems: "start" }}>
        {kicker ? (
          <div style={{ overflow: "hidden" }}>
            <div
              style={{
                transform: `translateY(${kickY * k}px)`,
                fontFamily: fontFamilies.heading,
                fontWeight: 600,
                fontSize: 26 * k,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: c.petrolText,
                textShadow: "0 2px 16px rgba(0,0,0,.7)",
              }}
            >
              {kicker}
            </div>
          </div>
        ) : null}
        <div
          style={{
            opacity: nameIn * nameOut,
            transform: `translateY(${(1 - nameIn) * 34 * k - (1 - nameOut) * 16 * k}px)`,
            fontFamily: fontFamilies.display,
            fontSize: 112 * k,
            lineHeight: 0.95,
            letterSpacing: "0.02em",
            textTransform: "uppercase",
            color: c.ink,
            whiteSpace: "nowrap",
            textShadow: "0 4px 28px rgba(0,0,0,.7)",
          }}
        >
          {name}
        </div>
        <div
          style={{
            height: 5 * k,
            width: "100%",
            background: c.amber,
            transformOrigin: "0% 50%",
            transform: `scaleX(${line})`,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};

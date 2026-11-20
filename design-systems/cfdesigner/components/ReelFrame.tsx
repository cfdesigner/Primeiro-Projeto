import React from "react";
import { Img } from "remotion";
import { Grain, HookText, palette, fam } from "./shared";
import { Logo } from "./Logo";
import { space } from "../tokens";

export type ReelFrameProps = {
  /** Hook de 6–8 palavras, em Bebas. */
  hook: string;
  /** Trecho do hook em âmbar (um só). */
  accent?: string;
  eyebrow?: string;
  /** Imagem de fundo (recebe vinheta automática). */
  image?: string;
  /** Enquadramento do corte 9:16, ex. "38% center". */
  imagePosition?: string;
  /** Barras letterbox com REC, timecode, @cfdesigner e fps. Desligadas por padrão: só ligue se o usuário pedir. */
  bars?: boolean;
  timecode?: string;
  fps?: string;
  /** Largura em px. A altura segue 9:16. Padrão 1080 (vídeo 1080×1920). */
  width?: number;
  style?: React.CSSProperties;
};

/** Capa e texto sobreposto de Reels/Shorts: letterbox, REC + timecode, hook em Bebas. Sempre Cinema. */
export const ReelFrame: React.FC<ReelFrameProps> = ({
  hook,
  accent,
  eyebrow,
  image,
  imagePosition = "center",
  bars = false,
  timecode = "00:00:15:00",
  fps = "24 fps · 9:16",
  width = 1080,
  style,
}) => {
  const c = palette("cinema");
  const s = width / 360;
  const bar: React.CSSProperties = {
    position: "relative",
    zIndex: 2,
    height: space.space12 * s,
    flex: "none",
    background: c.void,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: `0 ${space.space4 * s}px`,
    fontFamily: fam.mono,
    fontWeight: 500,
    fontSize: 11 * s,
    color: c.inkMuted,
    fontVariantNumeric: "tabular-nums",
    letterSpacing: "0.04em",
  };
  return (
    <div
      style={{
        position: "relative",
        isolation: "isolate",
        width,
        height: (width * 16) / 9,
        background: c.surface,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        ...style,
      }}
    >
      {image ? (
        <div style={{ position: "absolute", inset: 0 }}>
          <Img
            src={image}
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: imagePosition }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse at 50% 45%, transparent 30%, rgba(11,12,14,.85) 100%)",
            }}
          />
        </div>
      ) : (
        <div
          style={{
            position: "absolute",
            top: "18%",
            right: "-20%",
            width: "70%",
            aspectRatio: "1",
            borderRadius: 999,
            background: "radial-gradient(circle, rgba(217,164,65,.45), rgba(217,164,65,0) 65%)",
          }}
        />
      )}
      {bars ? (
        <div style={bar}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 * s, color: c.ink }}>
            <span style={{ width: 7 * s, height: 7 * s, borderRadius: 999, background: c.rec }} />
            REC
          </span>
          <span>{timecode}</span>
        </div>
      ) : null}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: `${space.space6 * s}px ${space.space4 * s}px`,
          gap: space.space2 * s,
        }}
      >
        {eyebrow ? (
          <span
            style={{
              fontFamily: fam.heading,
              fontWeight: 600,
              fontSize: 11 * s,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: c.amberText,
            }}
          >
            {eyebrow}
          </span>
        ) : null}
        <p
          style={{
            fontFamily: fam.display,
            fontSize: 40 * s,
            lineHeight: 0.95,
            letterSpacing: "0.02em",
            color: c.ink,
            margin: 0,
            textWrap: "balance",
          }}
        >
          <HookText text={hook} accent={accent} color={c.amberText} />
        </p>
      </div>
      {bars ? (
        <div style={bar}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 * s }}>
            <Logo layout="symbol" height={18 * s} />
            @cfdesigner
          </span>
          <span>{fps}</span>
        </div>
      ) : null}
      <Grain />
    </div>
  );
};

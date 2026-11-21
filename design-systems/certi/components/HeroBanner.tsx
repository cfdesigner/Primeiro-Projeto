import React from "react";
import { colors } from "../tokens";
import { text } from "./shared";

export type HeroBannerProps = {
  title: string;
  subtitle?: string;
  /** Imagem ou vídeo à esquerda, com os cantos em colchete (assinatura do site). */
  media?: React.ReactNode;
  /** Largura em px (altura segue 16:6). Padrão 1600. */
  width?: number;
  style?: React.CSSProperties;
};

const Corner: React.FC<{ pos: "tl" | "tr" | "bl" | "br"; s: number }> = ({
  pos,
  s,
}) => {
  const size = 44 * s;
  const t = 6 * s;
  const c = "rgba(255,255,255,0.55)";
  const base: React.CSSProperties = {
    position: "absolute",
    width: size,
    height: size,
  };
  const sides = {
    tl: {
      top: 0,
      left: 0,
      borderTop: `${t}px solid ${c}`,
      borderLeft: `${t}px solid ${c}`,
    },
    tr: {
      top: 0,
      right: 0,
      borderTop: `${t}px solid ${c}`,
      borderRight: `${t}px solid ${c}`,
    },
    bl: {
      bottom: 0,
      left: 0,
      borderBottom: `${t}px solid ${c}`,
      borderLeft: `${t}px solid ${c}`,
    },
    br: {
      bottom: 0,
      right: 0,
      borderBottom: `${t}px solid ${c}`,
      borderRight: `${t}px solid ${c}`,
    },
  }[pos];
  return <div style={{ ...base, ...sides }} />;
};

/** Painel azul-profundo com mídia emoldurada à esquerda e título em caixa alta à direita. */
export const HeroBanner: React.FC<HeroBannerProps> = ({
  title,
  subtitle,
  media,
  width = 1600,
  style,
}) => {
  const s = width / 1600;
  return (
    <div
      style={{
        width,
        height: 600 * s,
        boxSizing: "border-box",
        background: colors.deep,
        display: "grid",
        gridTemplateColumns: media ? "1fr 1fr" : "1fr",
        alignItems: "center",
        gap: 72 * s,
        padding: `0 ${96 * s}px`,
        ...style,
      }}
    >
      {media ? (
        <div
          style={{
            position: "relative",
            height: 400 * s,
            margin: `0 ${16 * s}px`,
          }}
        >
          <Corner pos="tl" s={s} />
          <Corner pos="tr" s={s} />
          <Corner pos="bl" s={s} />
          <Corner pos="br" s={s} />
          <div
            style={{ position: "absolute", inset: 24 * s, overflow: "hidden" }}
          >
            {media}
          </div>
        </div>
      ) : null}
      <div style={{ display: "grid", gap: 24 * s }}>
        <div style={{ ...text("title", s * 1.15), color: colors.white }}>
          {title}
        </div>
        {subtitle ? (
          <div
            style={{ ...text("subtitle", s), color: "rgba(255,255,255,0.92)" }}
          >
            {subtitle}
          </div>
        ) : null}
      </div>
    </div>
  );
};

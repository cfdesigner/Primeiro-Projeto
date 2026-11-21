import React from "react";
import { Img } from "remotion";
import { colors, radius, shadow } from "../tokens";
import { text, type BaseProps } from "./shared";

export type CardProps = BaseProps & {
  title: string;
  body?: string;
  /** Rótulo de ação em caixa alta (ex.: "Leia mais"). */
  action?: string;
  /** Imagem do topo (URL importada). */
  image?: string;
};

export const Card: React.FC<CardProps> = ({
  title,
  body,
  action,
  image,
  scale = 1,
  style,
}) => (
  <div
    style={{
      width: 420 * scale,
      boxSizing: "border-box",
      background: colors.surface,
      border: `${scale}px solid ${colors.line}`,
      borderRadius: radius.md * scale,
      boxShadow: shadow.card,
      overflow: "hidden",
      ...style,
    }}
  >
    {image ? (
      <Img
        src={image}
        style={{
          width: "100%",
          height: 200 * scale,
          objectFit: "cover",
          display: "block",
        }}
      />
    ) : null}
    <div style={{ padding: 28 * scale, display: "grid", gap: 14 * scale }}>
      <div style={{ ...text("heading", scale), color: colors.ink }}>
        {title}
      </div>
      {body ? (
        <div style={{ ...text("bodySm", scale), color: colors.inkMuted }}>
          {body}
        </div>
      ) : null}
      {action ? (
        <div style={{ ...text("label", scale), color: colors.primary }}>
          {action}
        </div>
      ) : null}
    </div>
  </div>
);

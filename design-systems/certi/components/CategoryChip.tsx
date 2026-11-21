import React from "react";
import { colors, radius, type Accent } from "../tokens";
import { text, type BaseProps } from "./shared";

export type CategoryChipProps = BaseProps & {
  /** Cor da borda (as cores do símbolo). */
  accent: Accent;
  children: React.ReactNode;
};

/** Etiqueta de competência: contorno de 2 px na cor da categoria, texto discreto. */
export const CategoryChip: React.FC<CategoryChipProps> = ({
  accent,
  scale = 1,
  style,
  children,
}) => (
  <div
    style={{
      ...text("bodySm", scale),
      display: "inline-flex",
      alignItems: "center",
      height: 52 * scale,
      padding: `0 ${22 * scale}px`,
      borderRadius: radius.sm * scale,
      border: `${2 * scale}px solid ${colors[accent]}`,
      background: colors.surface,
      color: colors.inkMuted,
      whiteSpace: "nowrap",
      ...style,
    }}
  >
    {children}
  </div>
);

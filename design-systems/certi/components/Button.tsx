import React from "react";
import { colors, onColor, radius } from "../tokens";
import { text, type BaseProps } from "./shared";

export type ButtonProps = BaseProps & {
  /** primary: azul cheio. sky: azul-claro cheio. outline: contorno azul. inverse: branco sobre fundo azul. */
  variant?: "primary" | "sky" | "outline" | "inverse";
  children: React.ReactNode;
};

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  scale = 1,
  style,
  children,
}) => {
  const look = {
    primary: {
      bg: colors.primary,
      fg: onColor.primary,
      border: colors.primary,
    },
    sky: { bg: colors.sky, fg: onColor.sky, border: colors.sky },
    outline: { bg: "transparent", fg: colors.primary, border: colors.primary },
    inverse: { bg: colors.white, fg: colors.primary, border: colors.white },
  }[variant];
  return (
    <div
      style={{
        ...text("button", scale),
        display: "inline-flex",
        alignItems: "center",
        height: 52 * scale,
        padding: `0 ${28 * scale}px`,
        borderRadius: radius.sm * scale,
        border: `${2 * scale}px solid ${look.border}`,
        background: look.bg,
        color: look.fg,
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

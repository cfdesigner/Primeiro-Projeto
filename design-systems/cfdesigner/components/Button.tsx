import React from "react";
import { palette, fam, type BaseProps } from "./shared";
import { radius, shadow, type Theme } from "../tokens";

export type ButtonProps = BaseProps & {
  variant?: "primary" | "petrol" | "ghost";
  size?: "md" | "sm";
  theme?: Theme;
  children: React.ReactNode;
};

export const Button: React.FC<ButtonProps> = ({
  variant = "ghost",
  size = "md",
  theme = "cinema",
  scale = 1,
  style,
  children,
}) => {
  const c = palette(theme);
  const fills = {
    primary: { background: c.amber, border: c.amber, color: c.onAmber },
    petrol: { background: c.petrol, border: c.petrol, color: c.onPetrol },
    ghost: { background: "transparent", border: c.lineStrong, color: c.ink },
  }[variant];
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        height: (size === "sm" ? 34 : 44) * scale,
        padding: `0 ${(size === "sm" ? 16 : 24) * scale}px`,
        borderRadius: radius.sm * scale,
        border: `${scale}px solid ${fills.border}`,
        background: fills.background,
        color: fills.color,
        fontFamily: fam.heading,
        fontWeight: 600,
        fontSize: (size === "sm" ? 13 : 14) * scale,
        letterSpacing: "0.04em",
        whiteSpace: "nowrap",
        boxShadow:
          variant === "primary" ? shadow[theme].shadowFlare : undefined,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

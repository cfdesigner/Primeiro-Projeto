import React from "react";
import { palette, fam, type BaseProps } from "./shared";
import { radius, type Theme } from "../tokens";

export type TagProps = BaseProps & {
  tone?: "neutral" | "amber" | "petrol" | "rec" | "time";
  theme?: Theme;
  children: React.ReactNode;
};

export const Tag: React.FC<TagProps> = ({
  tone = "neutral",
  theme = "cinema",
  scale = 1,
  style,
  children,
}) => {
  const c = palette(theme);
  const look = {
    neutral: { bg: c.surface, fg: c.inkMuted, border: c.line },
    amber: { bg: c.amberSoft, fg: c.amberText, border: "transparent" },
    petrol: { bg: c.petrolSoft, fg: c.petrolText, border: "transparent" },
    rec: { bg: c.surface, fg: c.ink, border: c.line },
    time: { bg: c.surface, fg: c.inkMuted, border: c.line },
  }[tone];
  const mono = tone === "time";
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6 * scale,
        height: 24 * scale,
        padding: `0 ${8 * scale}px`,
        borderRadius: radius.sm * scale,
        background: look.bg,
        color: look.fg,
        border: `${scale}px solid ${look.border}`,
        fontFamily: mono ? fam.mono : fam.heading,
        fontWeight: mono ? 500 : 600,
        fontSize: (mono ? 12 : 11) * scale,
        letterSpacing: mono ? "0.04em" : "0.14em",
        textTransform: mono ? "none" : "uppercase",
        whiteSpace: "nowrap",
        fontVariantNumeric: "tabular-nums",
        ...style,
      }}
    >
      {tone === "rec" ? (
        <span
          style={{ width: 8 * scale, height: 8 * scale, borderRadius: 999, background: c.rec }}
        />
      ) : null}
      {children}
    </div>
  );
};

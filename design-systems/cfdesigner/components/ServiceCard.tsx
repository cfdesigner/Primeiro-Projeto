import React from "react";
import { palette, fam, type BaseProps } from "./shared";
import { Button } from "./Button";
import { Tag } from "./Tag";
import type { Theme } from "../tokens";

export type ServiceCardProps = BaseProps & {
  title: string;
  price: string;
  unit?: string;
  items?: string[];
  badge?: string;
  featured?: boolean;
  cta?: string;
  theme?: Theme;
};

export const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  price,
  unit,
  items = [],
  badge,
  featured,
  cta,
  theme = "cinema",
  scale = 1,
  style,
}) => {
  const c = palette(theme);
  return (
    <div
      style={{
        width: 340 * scale,
        boxSizing: "border-box",
        background: c.surface,
        border: `${scale}px solid ${featured ? c.amber : c.line}`,
        padding: 24 * scale,
        display: "grid",
        gap: 16 * scale,
        alignContent: "start",
        ...style,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 * scale }}>
        <h3 style={{ fontFamily: fam.heading, fontWeight: 600, fontSize: 20 * scale, lineHeight: `${28 * scale}px`, margin: 0, color: c.ink }}>
          {title}
        </h3>
        {badge ? (
          <Tag tone={featured ? "amber" : "petrol"} theme={theme} scale={scale}>
            {badge}
          </Tag>
        ) : null}
      </div>
      <div style={{ fontFamily: fam.display, fontSize: 40 * scale, lineHeight: 1, color: c.ink }}>
        {price}
        {unit ? (
          <span style={{ fontFamily: fam.body, fontSize: 14 * scale, color: c.inkMuted, marginLeft: 4 * scale }}>
            {unit}
          </span>
        ) : null}
      </div>
      <div style={{ display: "grid", gap: 8 * scale, fontFamily: fam.body, fontSize: 14 * scale, lineHeight: `${22 * scale}px`, color: c.inkMuted }}>
        {items.map((it) => (
          <div key={it} style={{ display: "flex", gap: 8 * scale }}>
            <span style={{ flex: "none", width: 10 * scale, height: 2 * scale, marginTop: 10 * scale, background: c.amber }} />
            {it}
          </div>
        ))}
      </div>
      {cta ? (
        <Button variant={featured ? "primary" : "ghost"} theme={theme} scale={scale} style={{ justifySelf: "start" }}>
          {cta}
        </Button>
      ) : null}
    </div>
  );
};

import React from "react";
import { palette, fam, type BaseProps } from "./shared";
import type { Theme } from "../tokens";

export type TestimonialProps = BaseProps & {
  quote: string;
  author: string;
  context?: string;
  rating?: 1 | 2 | 3 | 4 | 5;
  theme?: Theme;
};

/** Use só depoimentos reais. */
export const Testimonial: React.FC<TestimonialProps> = ({
  quote,
  author,
  context,
  rating = 5,
  theme = "cinema",
  scale = 1,
  style,
}) => {
  const c = palette(theme);
  return (
    <div
      style={{
        width: 420 * scale,
        boxSizing: "border-box",
        background: c.surface,
        borderTop: `${2 * scale}px solid ${c.petrol}`,
        padding: 24 * scale,
        display: "grid",
        gap: 16 * scale,
        ...style,
      }}
    >
      <p style={{ margin: 0, fontFamily: fam.heading, fontWeight: 600, fontSize: 18 * scale, lineHeight: `${27 * scale}px`, color: c.ink }}>
        {quote}
      </p>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 * scale, fontFamily: fam.body, fontSize: 14 * scale, color: c.inkMuted }}>
        <span>
          <strong style={{ display: "block", color: c.ink, fontWeight: 700 }}>{author}</strong>
          {context}
        </span>
        <span style={{ color: c.amberText, letterSpacing: 2 * scale, fontSize: 14 * scale }}>
          {"★★★★★".slice(0, rating)}
        </span>
      </div>
    </div>
  );
};

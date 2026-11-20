import React from "react";
import { Grain, palette, fam } from "./shared";

export type ManifestoProps = {
  quote?: string;
  /** `null` esconde a tradução. */
  translation?: string | null;
  author?: string;
  /** Largura em px. Padrão 1080. */
  width?: number;
  style?: React.CSSProperties;
};

/** A frase-assinatura sobre bokeh âmbar. Uma por página; sempre Cinema; sem botões. */
export const Manifesto: React.FC<ManifestoProps> = ({
  quote = "A edição é o instante em que a emoção encontra o tempo.",
  translation = "Editing is the moment when emotion meets time.",
  author = "Carlos Felipe Moura",
  width = 1080,
  style,
}) => {
  const c = palette("cinema");
  const s = width / 600;
  const heading: React.CSSProperties = {
    margin: 0,
    fontFamily: fam.heading,
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.02em",
    textWrap: "balance",
  };
  return (
    <div
      style={{
        position: "relative",
        isolation: "isolate",
        width,
        boxSizing: "border-box",
        background: "#050506",
        color: c.ink,
        padding: `${48 * s}px ${24 * s}px`,
        textAlign: "center",
        overflow: "hidden",
        display: "grid",
        gap: 8 * s,
        ...style,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          filter: `blur(${2 * s}px)`,
          background: [
            `radial-gradient(circle at 12% 30%, rgba(217,164,65,.16) 0 ${18 * s}px, transparent ${19 * s}px)`,
            `radial-gradient(circle at 22% 78%, rgba(124,188,203,.10) 0 ${26 * s}px, transparent ${27 * s}px)`,
            `radial-gradient(circle at 70% 22%, rgba(217,164,65,.12) 0 ${34 * s}px, transparent ${35 * s}px)`,
            `radial-gradient(circle at 86% 70%, rgba(138,106,42,.22) 0 ${22 * s}px, transparent ${23 * s}px)`,
            `radial-gradient(circle at 94% 18%, rgba(217,164,65,.10) 0 ${14 * s}px, transparent ${15 * s}px)`,
            "radial-gradient(ellipse at 80% 50%, rgba(138,74,20,.28), transparent 60%)",
          ].join(", "),
        }}
      />
      <div style={{ position: "relative", zIndex: 2, display: "grid", gap: 4 * s }}>
        <p style={{ ...heading, fontSize: 20 * s, lineHeight: `${28 * s}px` }}>{`“${quote}”`}</p>
        {translation === null ? null : (
          <p style={{ ...heading, fontStyle: "italic", fontSize: 18 * s, lineHeight: `${26 * s}px`, color: c.amberText }}>
            {`“${translation}”`}
          </p>
        )}
      </div>
      <div
        style={{
          position: "relative",
          zIndex: 2,
          fontFamily: fam.heading,
          fontSize: 16 * s,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
        }}
      >
        {author}
      </div>
      <Grain />
    </div>
  );
};

import React from "react";
import { Img } from "remotion";
import horizontalWhite from "../assets/logos/cfdesigner-horizontal-white.png";
import stackedWhite from "../assets/logos/cfdesigner-stacked-white.png";
import symbolWhite from "../assets/logos/cfdesigner-symbol-white.png";
import stackedMetal from "../assets/logos/cfdesigner-stacked-metal.png";
import symbolMetal from "../assets/logos/cfdesigner-symbol-metal.png";

export const logos = {
  "horizontal-white": { src: horizontalWhite, ratio: 1090 / 267 },
  "stacked-white": { src: stackedWhite, ratio: 268 / 325 },
  "symbol-white": { src: symbolWhite, ratio: 254 / 253 },
  "stacked-metal": { src: stackedMetal, ratio: 456 / 555 },
  "symbol-metal": { src: symbolMetal, ratio: 456 / 449 },
} as const;

export type LogoProps = {
  layout?: "horizontal" | "stacked" | "symbol";
  /** `horizontal` só existe em branco. */
  finish?: "white" | "metal";
  /** Altura em px (padrão 48). */
  height?: number;
  style?: React.CSSProperties;
};

/** Logo oficial. Sempre o arquivo original: nunca recolorir, distorcer ou recriar. */
export const Logo: React.FC<LogoProps> = ({
  layout = "horizontal",
  finish = "white",
  height = 48,
  style,
}) => {
  const key = `${layout}-${finish}` as keyof typeof logos;
  const l = logos[key] ?? logos["horizontal-white"];
  return (
    <Img
      src={l.src}
      style={{
        height,
        width: Math.round(height * l.ratio),
        display: "block",
        ...style,
      }}
    />
  );
};

import React from "react";
import { Img } from "remotion";
import horizontal from "../assets/logos/certi-horizontal.png";
import horizontalNeg from "../assets/logos/certi-horizontal-negativo.png";
import vertical from "../assets/logos/certi-vertical.png";
import verticalNeg from "../assets/logos/certi-vertical-negativo.png";
import symbol from "../assets/logos/certi-simbolo.png";
import symbolNeg from "../assets/logos/certi-simbolo-negativo.png";

const files = {
  "horizontal-color": { src: horizontal, ratio: 584 / 237 },
  "horizontal-negative": { src: horizontalNeg, ratio: 584 / 237 },
  "vertical-color": { src: vertical, ratio: 518 / 698 },
  "vertical-negative": { src: verticalNeg, ratio: 518 / 698 },
  "symbol-color": { src: symbol, ratio: 1 },
  "symbol-negative": { src: symbolNeg, ratio: 1 },
} as const;

export type LogoProps = {
  layout?: "horizontal" | "vertical" | "symbol";
  /** color: sobre fundo claro. negative: todo branco, sobre fundo escuro ou azul. */
  finish?: "color" | "negative";
  /** Altura em px (padrão 80). */
  height?: number;
  style?: React.CSSProperties;
};

/**
 * Logo da CERTI. Arquivos fornecidos pelo dono (vertical colorido e negativo); o negativo horizontal é o mesmo
 * contorno do horizontal, todo branco; o símbolo é o recorte do topo do vertical. Fundo transparente.
 * Nunca recolorir, distorcer ou recriar. `color` só sobre fundo claro; `negative` sobre fundo escuro.
 */
export const Logo: React.FC<LogoProps> = ({
  layout = "horizontal",
  finish = "color",
  height = 80,
  style,
}) => {
  const f = files[`${layout}-${finish}` as keyof typeof files];
  return (
    <Img
      src={f.src}
      style={{
        height,
        width: Math.round(height * f.ratio),
        display: "block",
        ...style,
      }}
    />
  );
};

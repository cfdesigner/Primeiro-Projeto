import React from "react";
import { Img } from "remotion";
import logo from "../assets/logos/certi-logo.png";

export type LogoProps = {
  /** Altura em px (padrão 80). */
  height?: number;
  style?: React.CSSProperties;
};

const RATIO = 584 / 237;

/**
 * Logo da CERTI, arquivo original fornecido (fundo transparente).
 * ATENÇÃO: o nome "certi" é azul. Só use sobre fundo claro. Para fundo escuro falta a versão negativa (branca) oficial.
 */
export const Logo: React.FC<LogoProps> = ({ height = 80, style }) => (
  <Img
    src={logo}
    style={{
      height,
      width: Math.round(height * RATIO),
      display: "block",
      ...style,
    }}
  />
);

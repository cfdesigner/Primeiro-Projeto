import React from "react";
import { AbsoluteFill, useVideoConfig } from "remotion";

export type TelaComRostoProps = {
  /** Em cima: a gravação de tela (timeline, software...). */
  tela: React.ReactNode;
  /** Embaixo: a câmera, em moldura arredondada. */
  rosto: React.ReactNode;
  /** Cor de fundo (padrão preto levemente azulado, como no vídeo de referência). */
  fundo?: string;
};

/**
 * Layout "tela + rosto" (visto no vídeo de referência C01): fundo preto, a gravação de tela em cima (cantos quase retos) e a
 * câmera embaixo em moldura bem arredondada, ambas com 12% de margem lateral. Cada metade ocupa ~42% da altura.
 */
export const TelaComRosto: React.FC<TelaComRostoProps> = ({
  tela,
  rosto,
  fundo = "#05070c",
}) => {
  const { width, height } = useVideoConfig();
  const k = width / 1080;
  const margem = width * 0.12;
  const caixa: React.CSSProperties = {
    position: "absolute",
    left: margem,
    right: margem,
    overflow: "hidden",
    boxShadow: "0 12px 40px rgba(0,0,0,0.5)",
  };
  return (
    <AbsoluteFill style={{ background: fundo }}>
      <div
        style={{
          ...caixa,
          top: height * 0.083,
          height: height * 0.427,
          borderRadius: 12 * k,
        }}
      >
        {tela}
      </div>
      <div
        style={{
          ...caixa,
          top: height * 0.532,
          height: height * 0.437,
          borderRadius: 48 * k,
          border: `${2 * k}px solid rgba(255,255,255,0.08)`,
        }}
      >
        {rosto}
      </div>
    </AbsoluteFill>
  );
};

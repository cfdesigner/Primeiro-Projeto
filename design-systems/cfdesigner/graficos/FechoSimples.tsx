import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Logo } from "../components/Logo";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

export type FechoSimplesProps = {
  durationInFrames: number;
  /** Altura do logo em px na base de 1080 (padrão 96: o logo ocupa ~36% da largura, como no vídeo de referência). */
  logoHeight?: number;
};

/**
 * Fecho simples (visto no vídeo de referência C01): preto puro e o logo horizontal branco, pequeno, no centro. Sem texto.
 * Entra por fade de 400 ms e sai por fade de 400 ms no fim. É o fecho mais discreto do CFDesigner (o `LogoOutro` usa o logo
 * metálico grande e uma assinatura).
 */
export const FechoSimples: React.FC<FechoSimplesProps> = ({
  durationInFrames,
  logoHeight = 96,
}) => {
  const f = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const k = width / 1080;
  const ms = (f / fps) * 1000;
  const endMs = (durationInFrames / fps) * 1000;
  const o = interpolate(ms, [0, 400, endMs - 400, endMs], [0, 1, 1, 0], clamp);
  return (
    <AbsoluteFill
      style={{
        background: "#000",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ opacity: o }}>
        <Logo layout="horizontal" finish="white" height={logoHeight * k} />
      </div>
    </AbsoluteFill>
  );
};

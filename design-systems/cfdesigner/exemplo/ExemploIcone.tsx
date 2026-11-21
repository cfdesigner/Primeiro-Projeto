import React from "react";
import { AbsoluteFill, OffthreadVideo, staticFile } from "remotion";
import { IconeRotulo } from "../index";

/** Amostra do ícone com inclinação no eixo X (use --props '{"inclinacao":20}'). */
export const ExemploIcone: React.FC<{
  inclinacao: number;
  inclinacaoY: number;
}> = ({ inclinacao, inclinacaoY }) => (
  <AbsoluteFill>
    <OffthreadVideo
      src={staticFile("entrada/clips/b.mp4")}
      muted
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />
    <IconeRotulo
      icone="cronometro"
      rotulo="Segundos"
      durationInFrames={90}
      inclinacao={inclinacao}
      inclinacaoY={inclinacaoY}
    />
  </AbsoluteFill>
);

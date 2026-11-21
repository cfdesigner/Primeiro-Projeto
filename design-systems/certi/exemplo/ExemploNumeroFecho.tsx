// EXEMPLO LOCAL: usa um quadro do institucional em public/entrada/ (ignorada pelo Git) como fundo.
import React from "react";
import { AbsoluteFill, Img, Sequence, staticFile } from "remotion";
import { Dissolve, Fecho, Logo, Numero } from "../index";

/** Número sobre a imagem (estilo A sobre foto) e fecho com logo menor (7 s, 1080×1920). */
export const ExemploNumeroFecho: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Sequence durationInFrames={150}>
      <Img
        src={staticFile("entrada/certi-fundo-legenda.png")}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
      <div style={{ position: "absolute", top: 80, left: 80 }}>
        <Logo height={80} finish="negative" />
      </div>
      <Numero
        value={12}
        prefix="+"
        suffix=" mil"
        eyebrow="Mais de"
        label="clientes no mundo"
        durationInFrames={150}
      />
    </Sequence>
    <Sequence from={138} durationInFrames={72}>
      <Dissolve>
        <Fecho />
      </Dissolve>
    </Sequence>
  </AbsoluteFill>
);

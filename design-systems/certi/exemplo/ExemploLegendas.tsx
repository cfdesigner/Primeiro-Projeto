// EXEMPLO LOCAL: usa um quadro do institucional em public/entrada/ (ignorada pelo Git) como fundo.
import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { Legendas, Logo, type Caption } from "../index";
import captionsJson from "./legendas-exemplo.json";

const captions = captionsJson as Caption[];

/** Legenda do CERTI sobre uma imagem clara (o pior caso para legenda sem caixa). Fala sintética transcrita pelo Whisper. */
export const ExemploLegendas: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Img
      src={staticFile("entrada/certi-fundo-legenda.png")}
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />
    <div style={{ position: "absolute", top: 80, left: 80 }}>
      <Logo height={80} finish="negative" />
    </div>
    <Legendas captions={captions} />
  </AbsoluteFill>
);

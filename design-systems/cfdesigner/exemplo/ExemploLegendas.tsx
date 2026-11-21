import React from "react";
import { AbsoluteFill, Img } from "remotion";
import { imagery, Legendas, type Caption, type PunchLine } from "../index";
import captionsJson from "./legendas-exemplo.json";

const captions = captionsJson as Caption[];
// "Cinema em 15 segundos." marcada como frase de efeito (palavra-chave: o número).
const punchLines: PunchLine[] = [{ startMs: 3280, endMs: 4460, keyword: "15" }];

/** Exemplo de referência: legenda do dia a dia + uma frase de efeito sobre a foto da marca. */
export const ExemploLegendas: React.FC = () => (
  <AbsoluteFill style={{ background: "#0b0c0e" }}>
    <Img
      src={imagery.portraitEditingDesk}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: "38% center",
      }}
    />
    <Legendas captions={captions} punchLines={punchLines} />
  </AbsoluteFill>
);

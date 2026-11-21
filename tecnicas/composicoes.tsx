import React from "react";
import { Composition } from "remotion";
import {
  ExemploMotionBlur,
  ExemploMotionBlurVideo,
} from "./transicoes/ExemploMotionBlur";
import {
  EXEMPLO_TRANSICOES_QUADROS,
  ExemploTransicoes,
} from "./transicoes/ExemploTransicoes";

/** Exemplos das técnicas gerais (sem marca). Entram no Root.tsx. */
export const TecnicasComposicoes: React.FC = () => (
  <>
    <Composition
      id="Tecnicas-Transicoes-Exemplo"
      component={ExemploTransicoes}
      durationInFrames={EXEMPLO_TRANSICOES_QUADROS}
      fps={30}
      width={1080}
      height={1920}
    />
    <Composition
      id="Tecnicas-MotionBlur-Teste"
      component={ExemploMotionBlur}
      durationInFrames={31}
      fps={30}
      width={1080}
      height={1920}
      defaultProps={{ modo: "nenhum" as const }}
    />
    <Composition
      id="Tecnicas-MotionBlur-Video"
      component={ExemploMotionBlurVideo}
      durationInFrames={30}
      fps={30}
      width={1920}
      height={1080}
      defaultProps={{ comBlur: false }}
    />
  </>
);

import React from "react";
import { Composition } from "remotion";
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
  </>
);

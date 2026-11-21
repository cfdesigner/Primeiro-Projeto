import React from "react";
import { Composition, Still } from "remotion";
import { CFDesignerShowcase } from "./Showcase";
import { ExemploEfeitos } from "./exemplo/ExemploEfeitos";
import { ExemploLegendas } from "./exemplo/ExemploLegendas";

/** Composições de referência do CFDesigner. Entram no Root.tsx; pode apagar quando quiser. */
export const CFDesignerComposicoes: React.FC = () => (
  <>
    <Still
      id="CFDesigner-Componentes"
      component={CFDesignerShowcase}
      width={1600}
      height={1500}
    />
    <Composition
      id="CFDesigner-Legendas-Exemplo"
      component={ExemploLegendas}
      durationInFrames={150}
      fps={30}
      width={1080}
      height={1920}
    />
    <Composition
      id="CFDesigner-Efeitos-Exemplo"
      component={ExemploEfeitos}
      durationInFrames={210}
      fps={30}
      width={1080}
      height={1920}
    />
  </>
);

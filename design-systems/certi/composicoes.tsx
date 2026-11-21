import React from "react";
import { Composition, Still } from "remotion";
import { MovimentoMedido } from "./exemplo/MovimentoMedido";
import { MovimentoTeste } from "./exemplo/MovimentoTeste";
import { CertiPrancha } from "./exemplo/Prancha";

/** Composições de referência do CERTI. Entram no Root.tsx. */
export const CertiComposicoes: React.FC = () => (
  <>
    <Still
      id="Certi-Componentes"
      component={CertiPrancha}
      width={1920}
      height={1080}
    />
    <Still
      id="Certi-Movimento-Medido"
      component={MovimentoMedido}
      width={1920}
      height={1080}
    />
    <Composition
      id="Certi-Movimento-Teste"
      component={MovimentoTeste}
      durationInFrames={270}
      fps={30}
      width={1080}
      height={1920}
    />
  </>
);

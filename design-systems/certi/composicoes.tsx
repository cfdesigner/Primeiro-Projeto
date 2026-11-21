import React from "react";
import { Still } from "remotion";
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
  </>
);

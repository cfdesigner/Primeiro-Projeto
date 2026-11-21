import React from "react";
import { Still } from "remotion";
import { DecisaoCores, DecisaoFonte, DecisaoFormas } from "./exemplo/Decisoes";
import { CertiPrancha } from "./exemplo/Prancha";

/** Composições de referência do CERTI. Entram no Root.tsx. */
export const CertiComposicoes: React.FC = () => (
  <>
    <Still id="Certi-Componentes" component={CertiPrancha} width={1920} height={1080} />
    {/* Prévias temporárias para decisão do dono (apagar depois de decidir) */}
    <Still id="Certi-Decisao-1-Cores" component={DecisaoCores} width={2150} height={1560} />
    <Still id="Certi-Decisao-2-Fonte" component={DecisaoFonte} width={2890} height={1560} />
    <Still id="Certi-Decisao-3-Formas" component={DecisaoFormas} width={2890} height={1560} />
  </>
);

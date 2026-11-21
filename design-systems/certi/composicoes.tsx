import React from "react";
import { Composition, Still } from "remotion";
import { ExemploLegendas } from "./exemplo/ExemploLegendas";
import { MovimentoMedido } from "./exemplo/MovimentoMedido";
import { MovimentoTeste } from "./exemplo/MovimentoTeste";
import { FechoOpcoes, NumerosOpcoes } from "./exemplo/NumerosFechoOpcoes";
import { TransicoesTeste } from "./exemplo/TransicoesTeste";
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
    <Composition
      id="Certi-Transicoes-Teste"
      component={TransicoesTeste}
      durationInFrames={226}
      fps={30}
      width={1920}
      height={1080}
    />
    <Composition
      id="Certi-Legendas-Exemplo"
      component={ExemploLegendas}
      durationInFrames={285}
      fps={30}
      width={1080}
      height={1920}
    />
    {/* Prévias temporárias para decisão do dono (apagar depois de decidir) */}
    <Still
      id="Certi-Numeros-Opcoes"
      component={NumerosOpcoes}
      width={2500}
      height={1300}
    />
    <Still
      id="Certi-Fecho-Opcoes"
      component={FechoOpcoes}
      width={2500}
      height={1300}
    />
  </>
);

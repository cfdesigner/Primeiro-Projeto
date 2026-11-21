import React from "react";
import { Composition, Still } from "remotion";
import { ExemploLegendas } from "./exemplo/ExemploLegendas";
import { FrasesEfeitoOpcoes } from "./exemplo/FrasesEfeitoOpcoes";
import { MovimentoMedido } from "./exemplo/MovimentoMedido";
import { MovimentoTeste } from "./exemplo/MovimentoTeste";
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
      durationInFrames={165}
      fps={30}
      width={1080}
      height={1920}
    />
    {/* Prévia temporária para decisão do dono (apagar depois de decidir) */}
    <Still
      id="Certi-Frases-Opcoes"
      component={FrasesEfeitoOpcoes}
      width={2900}
      height={1300}
    />
  </>
);

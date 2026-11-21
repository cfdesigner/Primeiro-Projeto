// TÉCNICA GERAL (sem marca): como encadear cenas com os pacotes oficiais do Remotion.
// ATENÇÃO: o light leak oficial (`@remotion/effects/light-leak`) NÃO é usado: em testes neste ambiente (sem GPU) o mesmo quadro
// saiu branco ou normal ao acaso, em renderizações idênticas. Use o light leak em CSS do design system (ex.: CFDesigner `LightLeak`).
// Cada design system escolhe QUAIS transições usa e com que tempo (ficha DESIGN-SYSTEM.md); aqui só se mostra o mecanismo.
import React from "react";
import { AbsoluteFill } from "remotion";
import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";

const Cena: React.FC<{ cor: string; texto: string }> = ({ cor, texto }) => (
  <AbsoluteFill
    style={{ background: cor, justifyContent: "center", alignItems: "center" }}
  >
    <div
      style={{
        fontFamily: "sans-serif",
        fontWeight: 800,
        fontSize: 120,
        color: "#fff",
      }}
    >
      {texto}
    </div>
  </AbsoluteFill>
);

/** 4 cenas de 2 s: fade (15 quadros), slide (12) e corte seco no fim. 7,1 s no total. */
export const ExemploTransicoes: React.FC = () => (
  <TransitionSeries>
    <TransitionSeries.Sequence durationInFrames={60}>
      <Cena cor="#024a77" texto="CENA 1" />
    </TransitionSeries.Sequence>
    <TransitionSeries.Transition
      presentation={fade()}
      timing={linearTiming({ durationInFrames: 15 })}
    />
    <TransitionSeries.Sequence durationInFrames={60}>
      <Cena cor="#00578d" texto="CENA 2" />
    </TransitionSeries.Sequence>
    <TransitionSeries.Transition
      presentation={slide({ direction: "from-right" })}
      timing={linearTiming({ durationInFrames: 12 })}
    />
    <TransitionSeries.Sequence durationInFrames={60}>
      <Cena cor="#8bc53f" texto="CENA 3" />
    </TransitionSeries.Sequence>
    <TransitionSeries.Sequence durationInFrames={60}>
      <Cena cor="#f08522" texto="CENA 4" />
    </TransitionSeries.Sequence>
  </TransitionSeries>
);

/** Duração total: 4×60 − 15 − 12 = 213 quadros . */
export const EXEMPLO_TRANSICOES_QUADROS = 213;

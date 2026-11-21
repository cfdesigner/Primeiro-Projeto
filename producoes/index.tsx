import React from "react";
import { Composition } from "remotion";
import { CERTI_NEWS_FRAMES, CertiNews } from "./certi-news/CertiNews";

/**
 * Registro das produções (vídeos e peças de verdade).
 * Convenção: uma pasta por produção em producoes/<nome>/, com uma composição que usa UM design system.
 * Registre cada <Composition> aqui. Veja a skill producao-de-video.
 */
export const Producoes: React.FC = () => (
  <>
    <Composition
      id="CertiNews"
      component={CertiNews}
      durationInFrames={CERTI_NEWS_FRAMES}
      fps={30}
      width={1080}
      height={1920}
    />
  </>
);

import React from "react";
import { AbsoluteFill } from "remotion";
import {
  Button,
  colors,
  HighlightCover,
  imagery,
  Logo,
  Manifesto,
  ProfileBanner,
  ReelFrame,
  ServiceCard,
  Tag,
  Testimonial,
} from "./index";

/** Quadro de referência com todos os componentes (um Still). Serve para conferir o visual. */
export const CFDesignerShowcase: React.FC = () => (
  <AbsoluteFill style={{ background: colors.cinema.void, padding: 48, gap: 32, flexDirection: "row" }}>
    <ReelFrame
      width={405}
      hook="Cinema em 15 segundos."
      accent="15 segundos"
      eyebrow="AI + Adobe"
      image={imagery.portraitEditingDesk}
      imagePosition="38% center"
    />
    <div style={{ display: "grid", gap: 28, alignContent: "start", width: 1000, flexShrink: 0 }}>
      <ProfileBanner
        width={1000}
        image={imagery.timelineCloseup}
        headline="Every second tells a story."
        accent="story"
        sub="Short-form storytelling for creators and brands worldwide."
      />
      <Manifesto width={1000} />
      <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
        <Logo layout="horizontal" height={40} />
        <Logo layout="symbol" finish="metal" height={64} />
        <Button variant="primary">View portfolio</Button>
        <Button variant="petrol">Start a project</Button>
        <Button>Saiba mais</Button>
        <Tag tone="amber">AI + Adobe</Tag>
        <Tag tone="rec">REC</Tag>
        <Tag tone="time">00:00:15:00 · 24 fps</Tag>
      </div>
      <div style={{ display: "flex", gap: 24 }}>
        <HighlightCover icon="reels" label="Reels" />
        <HighlightCover icon="process" label="Process" />
        <HighlightCover icon="clients" label="Clients" />
        <HighlightCover icon="collabs" label="Collabs" />
        <HighlightCover icon="cinestyle" label="CineStyle" />
      </div>
      <div style={{ display: "flex", gap: 24 }}>
        <ServiceCard
          featured
          title="Reel completo"
          badge="Popular"
          price="$120"
          unit="/ vídeo"
          items={["Até 30 segundos", "2 revisões", "Entrega em 48h"]}
          cta="Start a project"
        />
        <Testimonial
          quote="Cada corte tinha intenção. O vídeo ficou com cara de cinema."
          author="Cliente de exemplo"
          context="Projeto de exemplo"
        />
      </div>
    </div>
  </AbsoluteFill>
);

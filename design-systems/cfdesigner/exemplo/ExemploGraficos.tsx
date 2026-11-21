import React from "react";
import { AbsoluteFill, OffthreadVideo, Sequence, staticFile } from "remotion";
import {
  ChecklistCard,
  FechoSimples,
  IconeRotulo,
  PalavraRiscada,
  TelaComRosto,
} from "../index";

const Fundo: React.FC<{ arquivo: string }> = ({ arquivo }) => (
  <AbsoluteFill>
    <OffthreadVideo
      src={staticFile(arquivo)}
      muted
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />
  </AbsoluteFill>
);

const Video: React.FC<{ arquivo: string }> = ({ arquivo }) => (
  <OffthreadVideo
    src={staticFile(arquivo)}
    muted
    style={{ width: "100%", height: "100%", objectFit: "cover" }}
  />
);

/** Demo dos 5 gráficos do CFDesigner (12 s, 1080×1920) sobre imagens de apoio. */
export const ExemploGraficos: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Sequence durationInFrames={108}>
      <Fundo arquivo="entrada/certi-news.mp4" />
      <ChecklistCard
        titulo="O problema não é..."
        durationInFrames={108}
        itens={[
          { texto: "Imagem", tipo: "x", marcaEmMs: 800 },
          { texto: "Câmera", tipo: "x", marcaEmMs: 1500 },
          { texto: "Ritmo", tipo: "check", marcaEmMs: 2300 },
        ]}
      />
    </Sequence>
    <Sequence from={108} durationInFrames={60}>
      <Fundo arquivo="entrada/clips/b.mp4" />
      <IconeRotulo icone="cronometro" rotulo="Segundos" durationInFrames={60} />
    </Sequence>
    <Sequence from={168} durationInFrames={72}>
      <Fundo arquivo="entrada/clips/c.mp4" />
      <PalavraRiscada chamada="Editar não é colocar" palavra="Mais" />
    </Sequence>
    <Sequence from={240} durationInFrames={60}>
      <TelaComRosto
        tela={<Video arquivo="entrada/clips/d.mp4" />}
        rosto={<Video arquivo="entrada/clips/a.mp4" />}
      />
    </Sequence>
    <Sequence from={300} durationInFrames={60}>
      <FechoSimples durationInFrames={60} />
    </Sequence>
  </AbsoluteFill>
);

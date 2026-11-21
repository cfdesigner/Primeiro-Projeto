// PRODUÇÃO: CERTI News (design system CERTI). O vídeo de entrada fica em public/entrada/ (ignorada pelo Git).
import React from "react";
import { AbsoluteFill, OffthreadVideo, Sequence, staticFile } from "remotion";
import {
  FechoComTransicao,
  Legendas,
  TerceiroTech,
  type Caption,
  type PunchLine,
} from "../../design-systems/certi";
import legendasJson from "./legendas.json";

const captions = legendasJson as Caption[];

// Frase de efeito (aprovada pelo dono): "a Inteligência Artificial está no centro das discussões".
const punchLines: PunchLine[] = [
  { startMs: 5550, endMs: 8750, keyword: "Inteligência Artificial" },
];

/** Quadro em que a transição para o fecho começa (8,9 s). */
export const FECHO_FROM = 267;
/** 12,2 s no total: vídeo de 10,6 s + fecho com logo parado por ~2,4 s. */
export const CERTI_NEWS_FRAMES = 366;

export const CertiNews: React.FC<{
  tamanhoLegenda?: number;
  alturaLegenda?: number;
}> = ({ tamanhoLegenda = 46, alturaLegenda = 0.24 }) => (
  <AbsoluteFill style={{ background: "#000" }}>
    <FechoComTransicao from={FECHO_FROM}>
      <OffthreadVideo
        src={staticFile("entrada/certi-news.mp4")}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
      <Legendas
        captions={captions}
        punchLines={punchLines}
        tamanho={tamanhoLegenda}
        altura={alturaLegenda}
      />
      {/* SIMULAÇÃO: nome e cargo ainda não informados pelo dono. */}
      <Sequence from={15} durationInFrames={120}>
        <TerceiroTech
          name="Nome Sobrenome"
          role="Apresentadora - CERTI"
          durationInFrames={120}
        />
      </Sequence>
    </FechoComTransicao>
  </AbsoluteFill>
);

// PRODUÇÃO: C02, teste de legendas com o CFDesigner. O vídeo fica em public/entrada/ (ignorada pelo Git).
import React from "react";
import { AbsoluteFill, OffthreadVideo, staticFile } from "remotion";
import {
  Legendas,
  type Caption,
  type PunchLine,
} from "../../design-systems/cfdesigner";
import legendasJson from "./legendas.json";

const captions = legendasJson as Caption[];

// Frases de efeito (aprovadas pelo dono).
const punchLines: PunchLine[] = [
  { startMs: 4100, endMs: 5400, keyword: "câmera" },
  { startMs: 17500, endMs: 18840, keyword: "experiência" },
];

/** 19,5 s a 30 fps. */
export const C02_FRAMES = 585;

export const C02Legendas: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <OffthreadVideo
      src={staticFile("entrada/C02.mp4")}
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />
    <Legendas captions={captions} punchLines={punchLines} />
  </AbsoluteFill>
);

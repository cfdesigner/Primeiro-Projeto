// PRODUÇÃO: C02, teste de legendas com o CFDesigner. O vídeo fica em public/entrada/ (ignorada pelo Git).
import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  OffthreadVideo,
  Sequence,
  staticFile,
  useCurrentFrame,
} from "remotion";
import {
  FechoSimples,
  LightLeak,
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

/** Vídeo: 19,5 s (585 quadros). Fecho com o logo: +2,5 s. */
const VIDEO_FRAMES = 585;
const FECHO_FRAMES = 75;
export const C02_FRAMES = VIDEO_FRAMES + FECHO_FRAMES;

/** Transição para o fecho: o vídeo avança (zoom), desfoca e escurece enquanto um vazamento de luz âmbar atravessa; o logo sai do desfoque. */
const TRANSICAO = 27;
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const Corpo: React.FC = () => {
  const f = useCurrentFrame();
  const t = VIDEO_FRAMES - TRANSICAO;
  const p = interpolate(f, [t, VIDEO_FRAMES], [0, 1], {
    ...clamp,
    easing: Easing.in(Easing.cubic),
  });
  const escuro = interpolate(
    f,
    [VIDEO_FRAMES - 12, VIDEO_FRAMES],
    [1, 0],
    clamp,
  );
  return (
    <AbsoluteFill
      style={{
        opacity: escuro,
        transform: `scale(${1 + p * 0.16})`,
        filter: `blur(${p * 16}px)`,
      }}
    >
      <OffthreadVideo
        src={staticFile("entrada/C02.mp4")}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
      <Legendas captions={captions} punchLines={punchLines} />
    </AbsoluteFill>
  );
};

export const C02Legendas: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Sequence durationInFrames={VIDEO_FRAMES}>
      <Corpo />
    </Sequence>
    <Sequence from={VIDEO_FRAMES - TRANSICAO} durationInFrames={TRANSICAO + 12}>
      <LightLeak durationInFrames={TRANSICAO + 12} from="left" />
    </Sequence>
    <Sequence from={VIDEO_FRAMES} durationInFrames={FECHO_FRAMES}>
      <FechoSimples durationInFrames={FECHO_FRAMES} desfoque={18} />
    </Sequence>
  </AbsoluteFill>
);

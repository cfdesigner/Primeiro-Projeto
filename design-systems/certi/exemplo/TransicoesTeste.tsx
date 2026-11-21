// TESTE LOCAL: usa trechos do institucional da CERTI em public/entrada/clips/ (ignorada pelo Git).
import React from "react";
import { AbsoluteFill, OffthreadVideo, Sequence, staticFile } from "remotion";
import {
  Dissolve,
  FadeFromBlack,
  FocusIn,
  RampedVideo,
  TerceiroTech,
  WhipIn,
  WhipOut,
  ZoomPunchOut,
  fam,
} from "../index";

const clip = (n: string) => staticFile(`entrada/clips/${n}.mp4`);
const fill: React.CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

const Rotulo: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      position: "absolute",
      top: 40,
      left: 48,
      zIndex: 60,
      fontFamily: fam.sans,
      fontWeight: 700,
      fontSize: 26,
      color: "#fff",
      background: "rgba(0,24,58,0.78)",
      padding: "10px 18px",
      borderRadius: 4,
    }}
  >
    {children}
  </div>
);

/** Teste das transições do CERTI (8 s, 1920×1080), sobre trechos do institucional "40 anos". */
export const TransicoesTeste: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    {/* 1 · abertura: fade do preto + speed ramp (rápido que desacelera), 0 a 1,5 s */}
    <Sequence durationInFrames={45}>
      <AbsoluteFill>
        <RampedVideo
          src={clip("a")}
          rateFrom={1.5}
          rateTo={0.4}
          rampFrames={45}
        />
      </AbsoluteFill>
      <FadeFromBlack />
      <Rotulo>1 · Fade do preto + speed ramp (rápido → lento)</Rotulo>
    </Sequence>

    {/* 2 · corte seco + terceiro de nome, 1,5 a 3,1 s */}
    <Sequence from={45} durationInFrames={48}>
      <OffthreadVideo src={clip("b")} muted style={fill} />
      <Sequence from={6} durationInFrames={42}>
        <TerceiroTech
          name="Nome Sobrenome"
          role="Superintendente de Negócios - CERTI"
          durationInFrames={42}
        />
      </Sequence>
      <Rotulo>2 · Corte seco + terceiro de nome digitado</Rotulo>
    </Sequence>

    {/* 3 · dissolvência de 0,2 s, 2,9 a 3,8 s */}
    <Sequence from={87} durationInFrames={28}>
      <Dissolve>
        <WhipOut from={20}>
          <OffthreadVideo src={clip("c")} muted style={fill} />
        </WhipOut>
      </Dissolve>
      <Rotulo>3 · Dissolvência (0,2 s)</Rotulo>
    </Sequence>

    {/* 4 · whip pan, 3,8 a 5,3 s */}
    <Sequence from={115} durationInFrames={45}>
      <ZoomPunchOut from={40}>
        <WhipIn>
          <OffthreadVideo src={clip("d")} muted style={fill} />
        </WhipIn>
      </ZoomPunchOut>
      <Rotulo>4 · Whip pan (entra) · 5 · Zoom de impacto (sai)</Rotulo>
    </Sequence>

    {/* 5 · entrada desfocada, 5,3 a 7,6 s */}
    <Sequence from={160} durationInFrames={66}>
      <FocusIn>
        <OffthreadVideo src={clip("e")} muted style={fill} />
      </FocusIn>
      <Rotulo>6 · Entrada desfocada (ganha foco em 0,4 s)</Rotulo>
    </Sequence>
  </AbsoluteFill>
);

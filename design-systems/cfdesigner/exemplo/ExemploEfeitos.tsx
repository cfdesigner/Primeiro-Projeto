import React from "react";
import { AbsoluteFill, Img, Sequence } from "remotion";
import {
  BlurIn,
  CameraShake,
  colors,
  CountUp,
  FilmGrain,
  FlashCut,
  imagery,
  LightLeak,
  LogoOutro,
  LowerThird,
  PushIn,
  WipeReveal,
} from "../index";
import { fontFamilies } from "../tokens";

/** Exemplo de referência dos efeitos do CFDesigner (7 s, 1080×1920). */
export const ExemploEfeitos: React.FC = () => (
  <AbsoluteFill style={{ background: colors.cinema.void }}>
    <Sequence durationInFrames={90}>
      <PushIn durationInFrames={90} to={1.1}>
        <Img
          src={imagery.portraitEditingDesk}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "38% center",
          }}
        />
        <AbsoluteFill
          style={{
            background:
              "linear-gradient(0deg, rgba(11,12,14,.85), transparent 50%)",
          }}
        />
      </PushIn>
      <LowerThird
        kicker="Editor de vídeo"
        name="Carlos Felipe"
        durationInFrames={90}
      />
    </Sequence>

    <Sequence from={90} durationInFrames={60}>
      <CameraShake intensity={4}>
        <AbsoluteFill
          style={{
            background: colors.cinema.void,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <WipeReveal direction="up" durationInFrames={20}>
            <AbsoluteFill
              style={{ justifyContent: "center", alignItems: "center", gap: 8 }}
            >
              <BlurIn from={4}>
                <div
                  style={{
                    fontFamily: fontFamilies.heading,
                    fontWeight: 600,
                    fontSize: 30,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: colors.cinema.inkMuted,
                  }}
                >
                  Entrega em
                </div>
              </BlurIn>
              <CountUp to={48} suffix="h" />
            </AbsoluteFill>
          </WipeReveal>
        </AbsoluteFill>
      </CameraShake>
    </Sequence>

    <Sequence from={150} durationInFrames={60}>
      <LogoOutro durationInFrames={60} />
    </Sequence>

    <LightLeak at={80} durationInFrames={34} />
    <FlashCut at={90} />
    <FilmGrain />
  </AbsoluteFill>
);

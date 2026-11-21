import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import "../fonts";
import { Logo } from "../components/Logo";
import { colors, fontFamilies } from "../tokens";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

export type FechoProps = {
  /** Endereço discreto embaixo. Passe "" para esconder. */
  site?: string;
  /** Altura do logo em px na base de 1080 (padrão 440: menor que o logo da opção D da prancha, de 560). */
  logoHeight?: number;
  /** Sem o fundo azul-profundo (usado pela transição, que já traz o fundo). */
  semFundo?: boolean;
};

/**
 * Fecho do CERTI (aprovado: opção A, logo menor): fundo azul-profundo, logo vertical negativo (todo branco) e o endereço
 * do site bem discreto. O logo entra por fade de 400 ms (o mesmo crossfade do site); o endereço aparece 300 ms depois, mais suave.
 */
export const Fecho: React.FC<FechoProps> = ({
  site = "certi.org.br",
  logoHeight = 440,
  semFundo = false,
}) => {
  const f = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const k = Math.min(width, height) / 1080;
  const ms = (f / fps) * 1000;
  const logo = interpolate(ms, [0, 400], [0, 1], clamp);
  const url = interpolate(ms, [300, 700], [0, 1], clamp);
  return (
    <AbsoluteFill
      style={{ background: semFundo ? "transparent" : colors.deep }}
    >
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{ opacity: logo }}>
          <Logo layout="vertical" finish="negative" height={logoHeight * k} />
        </div>
      </AbsoluteFill>
      {site ? (
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: height * 0.12,
            textAlign: "center",
            fontFamily: fontFamilies.sans,
            fontWeight: 600,
            fontSize: 32 * k,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: colors.white,
            opacity: url * 0.55,
          }}
        >
          {site}
        </div>
      ) : null}
    </AbsoluteFill>
  );
};

export type FechoComTransicaoProps = {
  /** A cena (vídeo, legendas, terceiro de nome...) que vai ser "dissolvida" no fecho. */
  children: React.ReactNode;
  /** Quadro em que a transição começa. */
  from: number;
  site?: string;
  logoHeight?: number;
};

/**
 * Transição para o fecho: em vez de cortar para um fundo chapado, a cena **desfoca e amplia de leve** enquanto é
 * **tingida em azul-profundo** (~0,9 s); o logo nasce dentro desse azul (a partir de 0,5 s). A imagem some por dentro
 * do azul, sem corte seco. Tempos: proposta (o institucional da CERTI termina com outro recurso).
 */
export const FechoComTransicao: React.FC<FechoComTransicaoProps> = ({
  children,
  from,
  site,
  logoHeight,
}) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ms = ((f - from) / fps) * 1000;
  const blur = interpolate(ms, [0, 900], [0, 26], {
    ...clamp,
    easing: Easing.in(Easing.cubic),
  });
  const zoom = interpolate(ms, [0, 1100], [1, 1.06], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });
  const tint = interpolate(ms, [0, 900], [0, 1], {
    ...clamp,
    easing: Easing.inOut(Easing.cubic),
  });
  return (
    <AbsoluteFill style={{ background: colors.deep }}>
      <AbsoluteFill
        style={{
          transform: `scale(${zoom})`,
          filter: blur > 0.2 ? `blur(${blur}px)` : undefined,
        }}
      >
        {children}
      </AbsoluteFill>
      <AbsoluteFill style={{ background: colors.deep, opacity: tint }} />
      <Sequence from={from + Math.round((500 / 1000) * fps)}>
        <Fecho semFundo site={site} logoHeight={logoHeight} />
      </Sequence>
    </AbsoluteFill>
  );
};

import React from "react";
import {
  AbsoluteFill,
  interpolate,
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
};

/**
 * Fecho do CERTI (aprovado: opção A, logo menor): fundo azul-profundo, logo vertical negativo (todo branco) e o endereço
 * do site bem discreto. O logo entra por fade de 400 ms (o mesmo crossfade do site); o endereço aparece 300 ms depois, mais suave.
 * Use dentro de uma <Sequence> (ou sobre um <Dissolve>) para entrar por crossfade sobre a cena anterior.
 */
export const Fecho: React.FC<FechoProps> = ({
  site = "certi.org.br",
  logoHeight = 440,
}) => {
  const f = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const k = Math.min(width, height) / 1080;
  const ms = (f / fps) * 1000;
  const logo = interpolate(ms, [0, 400], [0, 1], clamp);
  const url = interpolate(ms, [300, 700], [0, 1], clamp);
  return (
    <AbsoluteFill style={{ background: colors.deep }}>
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

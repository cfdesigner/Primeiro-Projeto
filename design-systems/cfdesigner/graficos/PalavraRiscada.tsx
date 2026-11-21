import React from "react";
import { AbsoluteFill, useVideoConfig } from "remotion";
import "../fonts";
import { colors, fontFamilies } from "../tokens";

const c = colors.cinema;

export type PalavraRiscadaProps = {
  /** Chamada pequena em cima (ex.: "Editar não é colocar"). */
  chamada: string;
  /** A palavra grande (ex.: "Mais"). */
  palavra: string;
  /** Risca a palavra com o fio dourado (o que NÃO se deve fazer). Padrão: sim. */
  riscada?: boolean;
  /** Distância do topo da chamada, em % da altura (padrão 61,5, como no vídeo de referência). */
  topoPct?: number;
};

/**
 * Palavra grande riscada (vista no vídeo de referência C01): uma chamada pequena em Montserrat espaçada, dourada, e uma palavra
 * enorme em Bebas Neue branca com um fio dourado atravessando. Aparece e some em corte seco; o tempo é o da <Sequence>.
 */
export const PalavraRiscada: React.FC<PalavraRiscadaProps> = ({
  chamada,
  palavra,
  riscada = true,
  topoPct = 61.5,
}) => {
  const { width, height } = useVideoConfig();
  const k = width / 1080;
  const tamanho = Math.min(
    290 * k,
    (width * 0.7) / (Math.max(palavra.length, 1) * 0.5),
  );
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: (height * topoPct) / 100,
          display: "grid",
          justifyItems: "center",
          gap: 10 * k,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: fontFamilies.heading,
            fontWeight: 600,
            fontSize: 32 * k,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: c.amber,
            textShadow: "0 2px 14px rgba(0,0,0,0.55)",
            paddingLeft: "0.3em",
          }}
        >
          {chamada}
        </div>
        <div style={{ position: "relative", display: "inline-block" }}>
          <div
            style={{
              fontFamily: fontFamilies.display,
              fontSize: tamanho,
              lineHeight: 0.95,
              letterSpacing: "0.01em",
              textTransform: "uppercase",
              color: c.ink,
              WebkitTextStroke: `${5 * k}px ${c.ink}`,
              textShadow: "0 8px 36px rgba(0,0,0,0.45)",
            }}
          >
            {palavra}
          </div>
          {riscada ? (
            <div
              style={{
                position: "absolute",
                left: "-9%",
                right: "-9%",
                top: "58%",
                height: 14 * k,
                background: c.amber,
                boxShadow: "0 3px 14px rgba(0,0,0,0.4)",
              }}
            />
          ) : null}
        </div>
      </div>
    </AbsoluteFill>
  );
};

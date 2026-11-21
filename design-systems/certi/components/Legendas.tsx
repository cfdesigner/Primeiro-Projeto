import React, { useMemo } from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import {
  buildPages,
  tiraPontoFinal,
  type Caption,
} from "../../../tecnicas/legendas/texto";
import { colors } from "../tokens";
import { text } from "./shared";

export type LegendasProps = {
  /** Palavras com tempo, de scripts/transcrever.py (ou @remotion/captions). */
  captions: Caption[];
  /** Degradê escuro suave no pé do quadro para ajudar a leitura em fundo claro (padrão ligado). */
  scrim?: boolean;
};

/**
 * Legenda do CERTI (estilo A, aprovado pelo dono): CAIXA ALTA, Nunito Sans 700, branca, contorno preto fino e sombra,
 * sem tarja. A palavra falada fica em azul-claro. Entra e sai em corte seco (como no institucional).
 * Sem ponto final (regra do dono). Fica acima dos ~24% de baixo (botões de Reels/Shorts).
 */
export const Legendas: React.FC<LegendasProps> = ({
  captions,
  scrim = true,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const t = (frame / fps) * 1000;
  const k = Math.min(width, height) / 1080;
  // caixa alta ocupa mais largura: páginas um pouco menores que no estilo de caixa mista
  const pages = useMemo(
    () =>
      buildPages(captions, [], {
        maxChars: 30,
        maxWords: 6,
        carryStopwords: true,
      }),
    [captions],
  );

  const i = pages.findIndex((p, idx) => {
    const holdEnd = Math.min(
      p.endMs + 300,
      pages[idx + 1]?.startMs ?? Infinity,
    );
    return t >= p.startMs && t < holdEnd;
  });
  const page = i >= 0 ? pages[i] : null;
  let active = 0;
  if (page)
    page.words.forEach((w, idx) => {
      if (w.startMs <= t) active = idx;
    });

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {scrim ? (
        <AbsoluteFill
          style={{
            background:
              "linear-gradient(0deg, rgba(0,20,40,0.5), transparent 42%)",
          }}
        />
      ) : null}
      {page ? (
        <AbsoluteFill
          style={{
            justifyContent: "flex-end",
            alignItems: "center",
            paddingBottom: height * 0.24,
          }}
        >
          <div
            style={{
              ...text("heading", 2.6 * k),
              maxWidth: width * 0.86,
              fontWeight: 700,
              textTransform: "uppercase",
              textAlign: "center",
              textWrap: "balance",
              lineHeight: 1,
              color: colors.white,
              WebkitTextStroke: `${3 * k}px #000`,
              paintOrder: "stroke fill",
              textShadow: "0 2px 12px rgba(0,0,0,0.5)",
            }}
          >
            {page.words.map((w, idx) => {
              const raw =
                idx === page.words.length - 1 ? tiraPontoFinal(w.text) : w.text;
              return (
                <span
                  key={idx}
                  style={{ color: idx === active ? colors.sky : colors.white }}
                >
                  {idx === 0 ? raw.trimStart() : raw}
                </span>
              );
            })}
          </div>
        </AbsoluteFill>
      ) : null}
    </AbsoluteFill>
  );
};

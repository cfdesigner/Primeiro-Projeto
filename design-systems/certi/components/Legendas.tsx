import React, { useMemo } from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  buildPages,
  pickKeywordIndex,
  tiraPontoFinal,
  type Caption,
  type PunchLine,
} from "../../../tecnicas/legendas/texto";
import { colors } from "../tokens";
import { text } from "./shared";

export type LegendasProps = {
  /** Palavras com tempo, de scripts/transcrever.py (ou @remotion/captions). */
  captions: Caption[];
  /** Frases de efeito APROVADAS pelo dono. Viram o estilo "leve e pesado". A palavra-chave pode ter mais de uma palavra. */
  punchLines?: PunchLine[];
  /** Degradê escuro suave no pé do quadro para ajudar a leitura em fundo claro (padrão ligado). */
  scrim?: boolean;
  /** Tamanho da legenda do dia a dia em px, na base de 1080 (padrão 46, escolha do dono). */
  tamanho?: number;
  /** Altura da legenda do dia a dia: distância do pé do quadro, como fração da altura (padrão 0,30, escolha do dono). Só vale para o dia a dia; a frase de efeito fica no centro-baixo. */
  altura?: number;
  /** Escurece o quadro em azul durante a frase de efeito. Padrão desligado: a frase entra direto sobre a cena (decisão do dono). */
  escurecerFrase?: boolean;
};

const clean = (s: string) => s.replace(/[.,!?…:;"“”()]/g, "").trim();
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/**
 * Legendas do CERTI.
 * - Dia a dia (estilo A, aprovado): CAIXA ALTA, Nunito Sans 700, branca, contorno preto fino e sombra, sem tarja;
 *   a palavra falada em azul-claro; entra e sai em corte seco; entrelinha compacta.
 * - Frase de efeito (estilo C "leve e pesado", aprovado): o quadro escurece em azul-profundo, o resto da frase vai em
 *   Nunito Sans 300 e a palavra-chave em 900, grande, com um fio fino embaixo. Corte seco; só o escurecimento tem fade (200 ms).
 *   Palavra-chave com várias palavras (ex.: "Inteligência Artificial") fica empilhada, uma por linha.
 * Sem ponto final (regra do dono; `?` e `!` ficam). Fica acima dos ~24% de baixo (botões de Reels/Shorts).
 */
export const Legendas: React.FC<LegendasProps> = ({
  captions,
  punchLines = [],
  scrim = true,
  escurecerFrase = false,
  tamanho = 46,
  altura = 0.3,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const t = (frame / fps) * 1000;
  const k = Math.min(width, height) / 1080;
  const pages = useMemo(
    () =>
      buildPages(captions, punchLines, {
        maxChars: 30,
        maxWords: 6,
        carryStopwords: true,
      }),
    [captions, punchLines],
  );
  const zone: React.CSSProperties = {
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: height * 0.24,
  };

  const punch = punchLines.find((p) => t >= p.startMs && t < p.endMs);
  if (punch) {
    const words = captions.filter(
      (w) => w.startMs >= punch.startMs && w.startMs < punch.endMs,
    );
    const texts = words.map((w) => clean(w.text));
    const lastRaw = words.length ? words[words.length - 1].text.trim() : "";
    if (texts.length && /[?!]$/.test(lastRaw))
      texts[texts.length - 1] += lastRaw.slice(-1);
    const kwTokens = punch.keyword
      ? clean(punch.keyword).toLowerCase().split(/\s+/).filter(Boolean)
      : [];
    let ki = -1;
    for (
      let i = 0;
      kwTokens.length > 0 && i + kwTokens.length <= texts.length;
      i++
    ) {
      if (kwTokens.every((tk, j) => clean(texts[i + j]).toLowerCase() === tk)) {
        ki = i;
        break;
      }
    }
    const kn = ki >= 0 ? kwTokens.length : 1;
    if (ki < 0) ki = pickKeywordIndex(texts);
    const above = texts.slice(0, ki).join(" ");
    const below = texts.slice(ki + kn).join(" ");
    const keyLines = texts.slice(ki, ki + kn);
    const maxW = width * 0.85;
    // Nunito Sans 900 em caixa alta ocupa ~0,72 em por letra; 300 ocupa ~0,6 em.
    const longest = Math.max(...keyLines.map((l) => l.length), 1);
    const keySize = Math.min(128 * k, maxW / (longest * 0.72));
    const sideSize = (s: string) =>
      Math.min(84 * k, maxW / (Math.max(s.length, 1) * 0.6));
    const dim = interpolate(
      t,
      [punch.startMs, punch.startMs + 200, punch.endMs - 150, punch.endMs],
      [0, 1, 1, 0],
      clamp,
    );
    const common: React.CSSProperties = {
      fontFamily: text("heading").fontFamily,
      textTransform: "uppercase",
      textAlign: "center",
      color: colors.white,
      lineHeight: 1,
    };
    return (
      <AbsoluteFill style={{ pointerEvents: "none" }}>
        {escurecerFrase ? (
          <AbsoluteFill
            style={{ background: "rgba(0,40,96,0.55)", opacity: dim }}
          />
        ) : null}
        <AbsoluteFill style={zone}>
          <div
            style={{
              display: "grid",
              justifyItems: "center",
              gap: 14 * k,
              maxWidth: maxW,
            }}
          >
            {above ? (
              <div
                style={{
                  ...common,
                  fontWeight: 300,
                  textWrap: "balance",
                  fontSize: sideSize(above),
                  letterSpacing: "0.02em",
                  textShadow: "0 3px 18px rgba(0,0,0,0.4)",
                }}
              >
                {above}
              </div>
            ) : null}
            <div
              style={{
                ...common,
                fontWeight: 900,
                fontSize: keySize,
                lineHeight: 0.95,
                letterSpacing: "-0.01em",
                textShadow: "0 6px 30px rgba(0,0,0,0.45)",
              }}
            >
              {keyLines.map((l, i) => (
                <div key={i}>{l}</div>
              ))}
            </div>
            {below ? (
              <div
                style={{
                  ...common,
                  fontWeight: 300,
                  textWrap: "balance",
                  fontSize: sideSize(below),
                  letterSpacing: "0.02em",
                  textShadow: "0 3px 18px rgba(0,0,0,0.4)",
                }}
              >
                {below}
              </div>
            ) : null}
            <div
              style={{
                height: 3 * k,
                width: 560 * k,
                marginTop: 8 * k,
                background:
                  "linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.85), rgba(255,255,255,0))",
              }}
            />
          </div>
        </AbsoluteFill>
      </AbsoluteFill>
    );
  }

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
        <AbsoluteFill style={{ ...zone, paddingBottom: height * altura }}>
          <div
            style={{
              ...text("heading"),
              fontSize: tamanho * k,
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

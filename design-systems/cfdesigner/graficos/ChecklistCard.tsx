import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import "../fonts";
import { colors, fontFamilies } from "../tokens";

const c = colors.cinema;
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

export type ChecklistItem = {
  texto: string;
  /** Instante (ms, contado desde o início da <Sequence>) em que a caixinha muda de estado. Sem isso, fica vazia. */
  marcaEmMs?: number;
  /** "x": item riscado e apagado (o que NÃO é). "check": caixa dourada com ✓ e rótulo dourado (o que É). */
  tipo?: "x" | "check";
};

export type ChecklistCardProps = {
  /** Chamada pequena em cima (ex.: "O problema não é..."). */
  titulo: string;
  itens: ChecklistItem[];
  /** Duração total em tela, em quadros. */
  durationInFrames: number;
  /** Distância do topo, em px na base de 1080×1920 (padrão 340, como no vídeo de referência). */
  topo?: number;
  /** Fade de saída em ms (padrão 250). */
  saidaMs?: number;
};

const Caixa: React.FC<{ estado: "vazio" | "x" | "check"; k: number }> = ({
  estado,
  k,
}) => (
  <div
    style={{
      width: 50 * k,
      height: 50 * k,
      boxSizing: "border-box",
      borderRadius: 5 * k,
      border: `${3 * k}px solid ${estado === "check" ? c.amber : c.lineStrong}`,
      background: estado === "check" ? c.amber : "rgba(11,12,14,0.6)",
      display: "grid",
      placeItems: "center",
      flex: "none",
    }}
  >
    {estado === "x" ? (
      <svg width={30 * k} height={30 * k} viewBox="0 0 30 30">
        <path
          d="M4 4 L26 26 M26 4 L4 26"
          stroke={c.ink}
          strokeWidth={2.4}
          strokeLinecap="square"
          fill="none"
          opacity={0.85}
        />
      </svg>
    ) : null}
    {estado === "check" ? (
      <svg width={32 * k} height={32 * k} viewBox="0 0 32 32">
        <path
          d="M5 17 L13 25 L27 7"
          stroke={c.void}
          strokeWidth={4.2}
          strokeLinecap="square"
          strokeLinejoin="miter"
          fill="none"
        />
      </svg>
    ) : null}
  </div>
);

/**
 * Cartão de checklist (visto no vídeo de referência C01): cartão escuro com borda dourada fina, chamada pequena em Montserrat
 * espaçada e itens em Bebas Neue com caixinha. Entra de uma vez (corte seco) e as marcas trocam num quadro só; sai com fade curto.
 * Marque os itens no instante em que a palavra é dita (no vídeo de referência a marca cai uns décimos ANTES da palavra).
 */
export const ChecklistCard: React.FC<ChecklistCardProps> = ({
  titulo,
  itens,
  durationInFrames,
  topo = 340,
  saidaMs = 250,
}) => {
  const f = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const k = width / 1080;
  const ms = (f / fps) * 1000;
  const endMs = (durationInFrames / fps) * 1000;
  const opacity = interpolate(ms, [endMs - saidaMs, endMs], [1, 0], clamp);
  return (
    <AbsoluteFill style={{ opacity, pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          left: 60 * k,
          top: topo * k,
          width: 960 * k,
          boxSizing: "border-box",
          padding: `${26 * k}px ${38 * k}px ${30 * k}px`,
          borderRadius: 18 * k,
          background: "rgba(11,12,14,0.86)",
          border: `${1 * k}px solid rgba(217,164,65,0.45)`,
        }}
      >
        <div
          style={{
            fontFamily: fontFamilies.heading,
            fontWeight: 600,
            fontSize: 24 * k,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: c.amber,
          }}
        >
          {titulo}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 44 * k,
            marginTop: 22 * k,
          }}
        >
          {itens.map((it) => {
            const marcado = it.marcaEmMs !== undefined && ms >= it.marcaEmMs;
            const estado = marcado ? (it.tipo ?? "check") : "vazio";
            return (
              <div
                key={it.texto}
                style={{ display: "flex", alignItems: "center", gap: 14 * k }}
              >
                <Caixa estado={estado} k={k} />
                <div
                  style={{
                    fontFamily: fontFamilies.display,
                    fontSize: 74 * k,
                    lineHeight: 1,
                    letterSpacing: "0.01em",
                    textTransform: "uppercase",
                    color:
                      estado === "check"
                        ? c.amber
                        : estado === "x"
                          ? c.inkMuted
                          : c.ink,
                    textDecoration: estado === "x" ? "line-through" : "none",
                    textDecorationThickness: `${4 * k}px`,
                    textDecorationColor: c.inkMuted,
                  }}
                >
                  {it.texto}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

import React from "react";
import {
  interpolate,
  interpolateColors,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { CategoryChip } from "../components/CategoryChip";
import { easing, frames, motion } from "../movimento";
import { colors, type Accent } from "../tokens";
import type { BaseProps } from "../components/shared";

export type ChipAnimadoProps = BaseProps & {
  accent: Accent;
  children: React.ReactNode;
  /** Quadro em que o destaque começa. Sem isso, a etiqueta fica em repouso. */
  selectAt?: number;
  /** Quadro em que o destaque é solto. */
  releaseAt?: number;
};

/**
 * Etiqueta com o destaque do site: ao ser "tocada" ganha preenchimento azul e o texto vira branco,
 * em ~300 ms com desaceleração; ao soltar, volta em ~250 ms.
 */
export const ChipAnimado: React.FC<ChipAnimadoProps> = ({
  accent,
  selectAt,
  releaseAt,
  scale = 1,
  style,
  children,
}) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  let p = 0;
  if (selectAt !== undefined) {
    const inP = interpolate(
      f,
      [selectAt, selectAt + frames(motion.fillMs, fps)],
      [0, 1],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: easing.fill,
      },
    );
    const outP =
      releaseAt === undefined
        ? 0
        : interpolate(
            f,
            [releaseAt, releaseAt + frames(motion.releaseMs, fps)],
            [0, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: easing.fill,
            },
          );
    p = Math.min(inP, 1 - outP);
  }
  return (
    <CategoryChip
      accent={accent}
      scale={scale}
      style={{
        background: interpolateColors(
          p,
          [0, 1],
          ["rgba(0,87,141,0)", colors.primary],
        ),
        color: interpolateColors(p, [0, 1], [colors.inkMuted, colors.white]),
        ...style,
      }}
    >
      {children}
    </CategoryChip>
  );
};

export type GradeDeEtiquetasProps = BaseProps & {
  itens: { texto: string; accent: Accent }[];
  /** Índices dos itens, na ordem em que são destacados (como o mouse passando). */
  ordem: number[];
  /** Quadro do primeiro destaque. */
  inicio: number;
  /** Quanto cada destaque dura, em ms (padrão 400). */
  segurarMs?: number;
  colunas?: number;
};

/** Grade de etiquetas de competências com destaque em sequência. */
export const GradeDeEtiquetas: React.FC<GradeDeEtiquetasProps> = ({
  itens,
  ordem,
  inicio,
  segurarMs = 400,
  colunas = 2,
  scale = 1,
  style,
}) => {
  const { fps } = useVideoConfig();
  const passo = frames(motion.selectionStepMs, fps);
  const segurar = frames(segurarMs, fps);
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${colunas}, 1fr)`,
        gap: 16 * scale,
        ...style,
      }}
    >
      {itens.map((it, i) => {
        const k = ordem.indexOf(i);
        const sel = k >= 0 ? inicio + k * passo : undefined;
        return (
          <ChipAnimado
            key={it.texto}
            accent={it.accent}
            scale={scale}
            selectAt={sel}
            releaseAt={sel === undefined ? undefined : sel + segurar}
            style={{ width: "100%", boxSizing: "border-box" }}
          >
            {it.texto}
          </ChipAnimado>
        );
      })}
    </div>
  );
};

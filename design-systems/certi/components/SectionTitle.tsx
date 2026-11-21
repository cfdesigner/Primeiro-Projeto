import React from "react";
import { colors } from "../tokens";
import { text, type BaseProps } from "./shared";

export type SectionTitleProps = BaseProps & { children: React.ReactNode };

/** Título leve de seção em azul, com um fio fino que se afasta à direita (assinatura do site). */
export const SectionTitle: React.FC<SectionTitleProps> = ({
  scale = 1,
  style,
  children,
}) => (
  <div
    style={{
      display: "flex",
      alignItems: "flex-end",
      gap: 32 * scale,
      ...style,
    }}
  >
    <div
      style={{
        ...text("display", scale),
        color: colors.primary,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </div>
    <div
      style={{
        flex: 1,
        height: 1.5 * scale,
        marginBottom: 14 * scale,
        background: `linear-gradient(90deg, ${colors.lineStrong}, rgba(200,200,200,0))`,
      }}
    />
  </div>
);

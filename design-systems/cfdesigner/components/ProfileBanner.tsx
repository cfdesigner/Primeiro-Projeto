import React from "react";
import { Img } from "remotion";
import { Grain, HookText, palette, fam } from "./shared";
import { Logo } from "./Logo";

export type ProfileBannerProps = {
  /** Fundo opcional (timeline-closeup ou studio-setup), escurecido à esquerda. */
  image?: string;
  role?: string;
  headline?: string;
  accent?: string;
  sub?: string;
  /** Largura em px. A altura segue 16:9. Padrão 1920. */
  width?: number;
  style?: React.CSSProperties;
};

/** Capa 16:9 para Fiverr/Upwork/YouTube. Sempre em inglês, sempre Cinema. */
export const ProfileBanner: React.FC<ProfileBannerProps> = ({
  image,
  role = "Cinematic Video Editor | AI + Adobe",
  headline = "Every second tells a story.",
  accent,
  sub,
  width = 1920,
  style,
}) => {
  const c = palette("cinema");
  const s = width / 960;
  return (
    <div
      style={{
        position: "relative",
        isolation: "isolate",
        width,
        height: (width * 9) / 16,
        background: c.void,
        color: c.ink,
        overflow: "hidden",
        display: "grid",
        alignContent: "center",
        padding: `0 ${48 * s}px`,
        boxSizing: "border-box",
        ...style,
      }}
    >
      {image ? (
        <Img
          src={image}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      ) : null}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: image
            ? `linear-gradient(90deg, ${c.void} 30%, rgba(11,12,14,.75) 55%, rgba(11,12,14,.25)), linear-gradient(0deg, rgba(11,12,14,.7), transparent 40%)`
            : `linear-gradient(90deg, ${c.void} 35%, rgba(11,12,14,.2)), repeating-linear-gradient(90deg, transparent 0 ${46 * s}px, rgba(124,188,203,.10) ${46 * s}px ${48 * s}px), linear-gradient(180deg, transparent 58%, ${c.petrol} 58% 64%, transparent 64% 70%, rgba(217,164,65,.35) 70% 73%, transparent 73%)`,
        }}
      />
      {image ? null : (
        <div
          style={{
            position: "absolute",
            left: "62%",
            top: "52%",
            width: 2 * s,
            height: "30%",
            background: c.amberText,
            boxShadow: `0 0 ${16 * s}px rgba(217,164,65,.6)`,
          }}
        />
      )}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "grid",
          gap: 12 * s,
          maxWidth: "62%",
          justifyItems: "start",
        }}
      >
        <Logo
          layout="horizontal"
          height={40 * s}
          style={{ marginBottom: 8 * s }}
        />
        <span
          style={{
            fontFamily: fam.heading,
            fontWeight: 600,
            fontSize: 13 * s,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: c.petrolText,
          }}
        >
          {role}
        </span>
        <p
          style={{
            fontFamily: fam.display,
            fontSize: 64 * s,
            lineHeight: 0.95,
            letterSpacing: "0.01em",
            margin: 0,
          }}
        >
          <HookText text={headline} accent={accent} color={c.amberText} />
        </p>
        {sub ? (
          <p
            style={{
              fontFamily: fam.body,
              fontSize: 15 * s,
              lineHeight: `${22 * s}px`,
              color: c.inkMuted,
              margin: 0,
            }}
          >
            {sub}
          </p>
        ) : null}
      </div>
      <Grain />
    </div>
  );
};

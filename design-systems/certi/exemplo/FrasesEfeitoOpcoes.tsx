// PRÉVIA TEMPORÁRIA para o dono escolher o estilo de frase de efeito do CERTI (não é parte do design system).
// Usa um quadro do institucional e um recorte do site em public/entrada/ (ignorada pelo Git).
import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { colors, fam, Logo, text } from "../index";

const Fundo: React.FC<{ children: React.ReactNode; dim?: number }> = ({
  children,
  dim = 0.55,
}) => (
  <div
    style={{
      width: 1080,
      height: 1920,
      position: "relative",
      background: "#000",
    }}
  >
    <Img
      src={staticFile("entrada/certi-fundo-legenda.png")}
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />
    <AbsoluteFill style={{ background: `rgba(0,40,96,${dim})` }} />
    <AbsoluteFill
      style={{
        background: "linear-gradient(0deg, rgba(0,20,40,.45), transparent 50%)",
      }}
    />
    <div style={{ position: "absolute", top: 80, left: 80 }}>
      <Logo height={80} finish="negative" />
    </div>
    <AbsoluteFill
      style={{
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: 1920 * 0.24,
      }}
    >
      {children}
    </AbsoluteFill>
  </div>
);

const W = 920;
const small: React.CSSProperties = {
  ...text("heading", 2.5),
  fontWeight: 800,
  textTransform: "uppercase",
  color: "#fff",
  textShadow: "0 3px 18px rgba(0,0,0,.45)",
  lineHeight: 1,
};
const big: React.CSSProperties = {
  fontFamily: fam.sans,
  fontWeight: 900,
  textTransform: "uppercase",
  fontSize: 128,
  lineHeight: 1,
  letterSpacing: "-0.01em",
};

/* A · Palavra gigante em azul-claro */
const OpcaoA: React.FC = () => (
  <Fundo>
    <div
      style={{
        width: W,
        display: "grid",
        justifyItems: "center",
        gap: 18,
        textAlign: "center",
      }}
    >
      <div style={small}>Ideias que viram</div>
      <div
        style={{
          ...big,
          color: colors.sky,
          textShadow: "0 6px 30px rgba(0,0,0,.45)",
        }}
      >
        resultado
      </div>
    </div>
  </Fundo>
);

/* B · Bloco azul sólido com a palavra-chave (como o destaque das etiquetas) */
const OpcaoB: React.FC = () => (
  <Fundo dim={0.4}>
    <div
      style={{
        width: W,
        display: "grid",
        justifyItems: "center",
        gap: 26,
        textAlign: "center",
      }}
    >
      <div style={small}>Ideias que viram</div>
      <div
        style={{
          ...big,
          background: colors.primary,
          color: "#fff",
          borderRadius: 4,
          padding: "10px 40px 14px",
        }}
      >
        resultado
      </div>
    </div>
  </Fundo>
);

/* C · Leve e pesado: contraste de pesos, com o fio fino do site */
const OpcaoC: React.FC = () => (
  <Fundo>
    <div
      style={{
        width: W,
        display: "grid",
        justifyItems: "center",
        gap: 14,
        textAlign: "center",
        fontFamily: fam.sans,
        textTransform: "uppercase",
        color: "#fff",
      }}
    >
      <div
        style={{
          fontWeight: 300,
          fontSize: 84,
          lineHeight: 1,
          letterSpacing: "0.02em",
          textShadow: "0 3px 18px rgba(0,0,0,.4)",
        }}
      >
        Ideias que viram
      </div>
      <div
        style={{
          ...big,
          fontWeight: 900,
          textShadow: "0 6px 30px rgba(0,0,0,.45)",
        }}
      >
        resultado
      </div>
      <div
        style={{
          height: 3,
          width: 560,
          marginTop: 8,
          background:
            "linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,.85), rgba(255,255,255,0))",
        }}
      />
    </div>
  </Fundo>
);

/* D · Colchetes nos cantos, a assinatura do hero do site */
const Canto: React.FC<{ pos: "tl" | "tr" | "bl" | "br" }> = ({ pos }) => {
  const c = "rgba(255,255,255,0.7)";
  const t = 8;
  const base: React.CSSProperties = {
    position: "absolute",
    width: 70,
    height: 70,
  };
  const side = {
    tl: {
      top: 0,
      left: 0,
      borderTop: `${t}px solid ${c}`,
      borderLeft: `${t}px solid ${c}`,
    },
    tr: {
      top: 0,
      right: 0,
      borderTop: `${t}px solid ${c}`,
      borderRight: `${t}px solid ${c}`,
    },
    bl: {
      bottom: 0,
      left: 0,
      borderBottom: `${t}px solid ${c}`,
      borderLeft: `${t}px solid ${c}`,
    },
    br: {
      bottom: 0,
      right: 0,
      borderBottom: `${t}px solid ${c}`,
      borderRight: `${t}px solid ${c}`,
    },
  }[pos];
  return <div style={{ ...base, ...side }} />;
};
const OpcaoD: React.FC = () => (
  <Fundo dim={0.6}>
    <div
      style={{
        position: "relative",
        width: W,
        padding: "70px 30px",
        display: "grid",
        justifyItems: "center",
        gap: 18,
        textAlign: "center",
      }}
    >
      <Canto pos="tl" />
      <Canto pos="tr" />
      <Canto pos="bl" />
      <Canto pos="br" />
      <div style={small}>Ideias que viram</div>
      <div
        style={{
          ...big,
          color: "#fff",
          textShadow: "0 6px 30px rgba(0,0,0,.45)",
        }}
      >
        resultado
      </div>
    </div>
  </Fundo>
);

const Reel: React.FC<{
  tag: string;
  name: string;
  sub: string;
  children: React.ReactNode;
}> = ({ tag, name, sub, children }) => (
  <div style={{ width: 540 }}>
    <div
      style={{
        width: 540,
        height: 960,
        overflow: "hidden",
        borderRadius: 24,
        boxShadow: "0 24px 60px rgba(0,40,96,.22)",
        position: "relative",
      }}
    >
      <div
        style={{
          width: 1080,
          height: 1920,
          transform: "scale(0.5)",
          transformOrigin: "0 0",
        }}
      >
        {children}
      </div>
    </div>
    <div
      style={{ marginTop: 22, display: "flex", alignItems: "center", gap: 12 }}
    >
      <div
        style={{
          ...text("button", 1),
          background: colors.primary,
          color: "#fff",
          borderRadius: 6,
          padding: "8px 14px",
        }}
      >
        {tag}
      </div>
      <div style={{ ...text("heading", 1), color: colors.ink }}>{name}</div>
    </div>
    <div
      style={{
        ...text("body", 1),
        color: colors.inkMuted,
        marginTop: 6,
        minHeight: 56,
      }}
    >
      {sub}
    </div>
  </div>
);

export const FrasesEfeitoOpcoes: React.FC = () => (
  <AbsoluteFill
    style={{
      background: colors.surfaceSoft,
      padding: 56,
      fontFamily: fam.sans,
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "baseline",
        gap: 20,
        marginBottom: 36,
      }}
    >
      <div style={{ ...text("display", 0.9), color: colors.primary }}>
        Frase de efeito
      </div>
      <div style={{ ...text("heading", 1.5), color: colors.ink }}>
        Qual estilo para a palavra-chave?
      </div>
    </div>
    <div style={{ display: "flex", gap: 52, alignItems: "flex-start" }}>
      <div style={{ width: 420, flexShrink: 0 }}>
        <div
          style={{
            ...text("label", 1.1),
            color: colors.inkMuted,
            marginBottom: 16,
          }}
        >
          NO SITE
        </div>
        <div style={{ background: colors.deep, borderRadius: 8, padding: 18 }}>
          <Img
            src={staticFile("entrada/certi-ref-hero.png")}
            style={{ width: 380, display: "block" }}
          />
        </div>
        <div
          style={{
            ...text("bodySm", 1),
            color: colors.inkMuted,
            marginTop: 16,
          }}
        >
          O título do hero: caixa alta, branco, peso forte. A frase de efeito é
          a versão "gritada" disso: uma palavra-chave grande e o resto pequeno.
        </div>
      </div>
      <Reel
        tag="A"
        name="A · Palavra em azul-claro"
        sub="A palavra-chave gigante na cor da marca, o resto pequeno em branco."
      >
        <OpcaoA />
      </Reel>
      <Reel
        tag="B"
        name="B · Bloco azul"
        sub="A palavra-chave num bloco azul sólido, como o destaque das etiquetas."
      >
        <OpcaoB />
      </Reel>
      <Reel
        tag="C"
        name="C · Leve e pesado"
        sub="Contraste entre peso leve e peso máximo, com o fio fino do site."
      >
        <OpcaoC />
      </Reel>
      <Reel
        tag="D"
        name="D · Colchetes"
        sub="A frase emoldurada pelos colchetes dos cantos, a assinatura do site."
      >
        <OpcaoD />
      </Reel>
    </div>
  </AbsoluteFill>
);

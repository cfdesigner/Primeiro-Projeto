// PRÉVIA TEMPORÁRIA para o dono escolher números e fecho do CERTI (não é parte do design system).
// Usa um quadro do institucional em public/entrada/ (ignorada pelo Git).
import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { colors, fam, Logo, text, type Accent } from "../index";

const Foto: React.FC<{ dim: number }> = ({ dim }) => (
  <>
    <Img
      src={staticFile("entrada/certi-fundo-legenda.png")}
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />
    <AbsoluteFill style={{ background: `rgba(0,40,96,${dim})` }} />
  </>
);

const Cena: React.FC<{ bg: string; children: React.ReactNode }> = ({
  bg,
  children,
}) => (
  <div
    style={{
      width: 1080,
      height: 1920,
      position: "relative",
      background: bg,
      overflow: "hidden",
      fontFamily: fam.sans,
    }}
  >
    {children}
  </div>
);

const Centro: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
    {children}
  </AbsoluteFill>
);

const caixa: React.CSSProperties = {
  textTransform: "uppercase",
  letterSpacing: "0.04em",
};

/* ---------------- NÚMEROS ---------------- */
const NA: React.FC = () => (
  <Cena bg={colors.deep}>
    <div style={{ position: "absolute", top: 80, left: 80 }}>
      <Logo height={80} finish="negative" />
    </div>
    <Centro>
      <div
        style={{
          display: "grid",
          justifyItems: "center",
          gap: 10,
          color: "#fff",
          textAlign: "center",
        }}
      >
        <div style={{ ...caixa, fontWeight: 300, fontSize: 52 }}>Mais de</div>
        <div
          style={{
            fontWeight: 900,
            fontSize: 230,
            lineHeight: 0.95,
            letterSpacing: "-0.02em",
          }}
        >
          <span style={{ color: colors.sky }}>+</span>12 mil
        </div>
        <div style={{ ...caixa, fontWeight: 700, fontSize: 60 }}>
          clientes no mundo
        </div>
        <div
          style={{
            height: 3,
            width: 560,
            marginTop: 30,
            background:
              "linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,.8), rgba(255,255,255,0))",
          }}
        />
      </div>
    </Centro>
  </Cena>
);

const NB: React.FC = () => (
  <Cena bg={colors.surfaceSoft}>
    <div style={{ position: "absolute", top: 80, left: 80 }}>
      <Logo height={80} />
    </div>
    <Centro>
      <div
        style={{
          display: "grid",
          justifyItems: "center",
          gap: 12,
          textAlign: "center",
        }}
      >
        <div style={{ fontWeight: 300, fontSize: 90, color: colors.primary }}>
          Mais de
        </div>
        <div
          style={{
            fontWeight: 800,
            fontSize: 320,
            lineHeight: 0.95,
            letterSpacing: "-0.02em",
            color: colors.primary,
          }}
        >
          12 mil
        </div>
        <div style={{ fontWeight: 400, fontSize: 64, color: colors.inkMuted }}>
          clientes no mundo
        </div>
        <div
          style={{
            height: 3,
            width: 620,
            marginTop: 36,
            background: `linear-gradient(90deg, ${colors.lineStrong}, rgba(200,200,200,0))`,
          }}
        />
      </div>
    </Centro>
  </Cena>
);

const Canto: React.FC<{ pos: "tl" | "tr" | "bl" | "br" }> = ({ pos }) => {
  const c = "rgba(255,255,255,0.7)";
  const t = 8;
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
  return (
    <div style={{ position: "absolute", width: 70, height: 70, ...side }} />
  );
};
const NC: React.FC = () => (
  <Cena bg="#000">
    <Foto dim={0.62} />
    <div style={{ position: "absolute", top: 80, left: 80 }}>
      <Logo height={80} finish="negative" />
    </div>
    <Centro>
      <div
        style={{
          position: "relative",
          padding: "90px 70px",
          display: "grid",
          justifyItems: "center",
          gap: 6,
          color: "#fff",
          textAlign: "center",
          textShadow: "0 6px 30px rgba(0,0,0,.4)",
        }}
      >
        <Canto pos="tl" />
        <Canto pos="tr" />
        <Canto pos="bl" />
        <Canto pos="br" />
        <div style={{ ...caixa, fontWeight: 300, fontSize: 52 }}>Quase</div>
        <div style={{ fontWeight: 900, fontSize: 340, lineHeight: 0.95 }}>
          40
        </div>
        <div style={{ ...caixa, fontWeight: 700, fontSize: 64 }}>
          anos de história
        </div>
      </div>
    </Centro>
  </Cena>
);

const stats: { n: string; l: string; a: Accent }[] = [
  { n: "40", l: "anos de história", a: "primary" },
  { n: "+12 mil", l: "clientes no mundo", a: "green" },
  { n: "5", l: "centros de referência", a: "pink" },
];
const ND: React.FC = () => (
  <Cena bg="#fff">
    <div style={{ position: "absolute", top: 80, left: 80 }}>
      <Logo height={80} />
    </div>
    <Centro>
      <div style={{ display: "grid", gap: 36, width: 820 }}>
        {stats.map((s) => (
          <div
            key={s.l}
            style={{
              border: `4px solid ${colors[s.a]}`,
              borderRadius: 4,
              padding: "34px 44px",
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              gap: 20,
            }}
          >
            <div
              style={{
                fontWeight: 800,
                fontSize: 118,
                whiteSpace: "nowrap",
                lineHeight: 1,
                color: colors.ink,
                letterSpacing: "-0.02em",
              }}
            >
              {s.n}
            </div>
            <div
              style={{
                fontWeight: 400,
                fontSize: 44,
                color: colors.inkMuted,
                textAlign: "right",
                lineHeight: 1.15,
              }}
            >
              {s.l}
            </div>
          </div>
        ))}
      </div>
    </Centro>
  </Cena>
);

/* ---------------- FECHO ---------------- */
const Site: React.FC<{ color: string }> = ({ color }) => (
  <div
    style={{
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 1920 * 0.12,
      textAlign: "center",
      fontWeight: 600,
      fontSize: 36,
      letterSpacing: "0.22em",
      textTransform: "uppercase",
      color,
    }}
  >
    certi.org.br
  </div>
);

const FA: React.FC = () => (
  <Cena bg={colors.deep}>
    <Centro>
      <Logo layout="vertical" finish="negative" height={640} />
    </Centro>
    <Site color="rgba(255,255,255,.6)" />
  </Cena>
);
const FB: React.FC = () => (
  <Cena bg="#fff">
    <Centro>
      <Logo layout="vertical" height={640} />
    </Centro>
    <Site color={colors.inkMuted} />
  </Cena>
);
const FC: React.FC = () => (
  <Cena bg={colors.deep}>
    <AbsoluteFill
      style={{ justifyContent: "center", alignItems: "center", opacity: 0.1 }}
    >
      <Logo layout="symbol" finish="negative" height={1500} />
    </AbsoluteFill>
    <Centro>
      <Logo finish="negative" height={230} />
    </Centro>
    <Site color="rgba(255,255,255,.6)" />
  </Cena>
);
const FD: React.FC = () => (
  <Cena bg="#000">
    <Foto dim={0.82} />
    <Centro>
      <Logo layout="vertical" finish="negative" height={560} />
    </Centro>
    <Site color="rgba(255,255,255,.65)" />
  </Cena>
);

/* ---------------- PRANCHAS ---------------- */
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
        border: `1px solid ${colors.line}`,
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

const Quadro: React.FC<{
  titulo: string;
  pergunta: string;
  children: React.ReactNode;
}> = ({ titulo, pergunta, children }) => (
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
        {titulo}
      </div>
      <div style={{ ...text("heading", 1.5), color: colors.ink }}>
        {pergunta}
      </div>
    </div>
    <div style={{ display: "flex", gap: 52, alignItems: "flex-start" }}>
      {children}
    </div>
  </AbsoluteFill>
);

export const NumerosOpcoes: React.FC = () => (
  <Quadro
    titulo="Números"
    pergunta="Como destacar um dado, como “mais de 12 mil clientes”?"
  >
    <Reel
      tag="A"
      name="A · Azul-profundo"
      sub="Número branco enorme, o + em azul-claro, fio fino embaixo."
    >
      <NA />
    </Reel>
    <Reel
      tag="B"
      name="B · Claro e leve"
      sub="Fundo claro, número em azul da marca, como os títulos do site."
    >
      <NB />
    </Reel>
    <Reel
      tag="C"
      name="C · Sobre a foto"
      sub="Número sobre o vídeo escurecido, com os colchetes dos cantos."
    >
      <NC />
    </Reel>
    <Reel
      tag="D"
      name="D · Etiquetas"
      sub="Vários dados empilhados em caixas com contorno nas cores do símbolo."
    >
      <ND />
    </Reel>
  </Quadro>
);

export const FechoOpcoes: React.FC = () => (
  <Quadro titulo="Fecho" pergunta="Como terminar o vídeo?">
    <Reel
      tag="A"
      name="A · Logo vertical, fundo azul"
      sub="O logo negativo grande e o endereço do site, bem discreto."
    >
      <FA />
    </Reel>
    <Reel
      tag="B"
      name="B · Logo vertical, fundo branco"
      sub="O logo colorido sobre branco: a versão mais limpa."
    >
      <FB />
    </Reel>
    <Reel
      tag="C"
      name="C · Logo horizontal e anéis"
      sub="O logo horizontal com o símbolo gigante e transparente ao fundo."
    >
      <FC />
    </Reel>
    <Reel
      tag="D"
      name="D · Sobre a foto"
      sub="O último plano do vídeo escurecido, com o logo por cima."
    >
      <FD />
    </Reel>
  </Quadro>
);

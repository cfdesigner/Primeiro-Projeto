// PRÉVIA TEMPORÁRIA para o dono decidir (não é parte do design system).
// Usa recortes dos prints do site em public/entrada/ (ignorada pelo Git).
import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { loadFont as loadExo2 } from "@remotion/google-fonts/Exo2";
import { loadFont as loadJura } from "@remotion/google-fonts/Jura";
import { colors, fam, Logo, onColor, text } from "../index";

const exo2 = loadExo2("normal", {
  weights: ["300"],
  subsets: ["latin", "latin-ext"],
});
const jura = loadJura("normal", {
  weights: ["300"],
  subsets: ["latin", "latin-ext"],
});

/* ---------- moldura: simula um Reels (1080×1920) a 2/3 do tamanho ---------- */
const Reel: React.FC<{
  children: React.ReactNode;
  name: string;
  sub: string;
  tag?: string;
}> = ({ children, name, sub, tag }) => (
  <div style={{ width: 720 }}>
    <div
      style={{
        width: 720,
        height: 1280,
        overflow: "hidden",
        borderRadius: 28,
        boxShadow: "0 24px 60px rgba(0,40,96,.20)",
        background: "#fff",
        position: "relative",
      }}
    >
      <div
        style={{
          width: 1080,
          height: 1920,
          transform: "scale(0.6667)",
          transformOrigin: "0 0",
        }}
      >
        {children}
      </div>
    </div>
    <div
      style={{ marginTop: 22, display: "flex", alignItems: "center", gap: 12 }}
    >
      {tag ? (
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
      ) : null}
      <div style={{ ...text("heading", 1), color: colors.ink }}>{name}</div>
    </div>
    <div style={{ ...text("body", 1), color: colors.inkMuted, marginTop: 6 }}>
      {sub}
    </div>
  </div>
);

const Ref: React.FC<{
  title: string;
  items: { src: string; w: number; h: number }[];
}> = ({ title, items }) => (
  <div style={{ width: 420, flexShrink: 0 }}>
    <div
      style={{
        ...text("label", 1.1),
        color: colors.inkMuted,
        marginBottom: 16,
      }}
    >
      {title}
    </div>
    <div style={{ display: "grid", gap: 20 }}>
      {items.map((it) => (
        <div
          key={it.src}
          style={{
            background: "#fff",
            border: `1px solid ${colors.line}`,
            borderRadius: 8,
            padding: 14,
          }}
        >
          <Img
            src={staticFile(`entrada/${it.src}`)}
            style={{ width: it.w, height: it.h, display: "block" }}
          />
        </div>
      ))}
    </div>
    <div
      style={{ ...text("bodySm", 1), color: colors.inkMuted, marginTop: 16 }}
    >
      recortes dos prints que tu mandou
    </div>
  </div>
);

const Board: React.FC<{
  n: number;
  question: string;
  ref: React.ReactNode;
  children: React.ReactNode;
}> = ({ n, question, ref, children }) => (
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
      <div style={{ ...text("display", 0.9), color: colors.primary }}>{n}</div>
      <div style={{ ...text("heading", 1.5), color: colors.ink }}>
        {question}
      </div>
    </div>
    <div style={{ display: "flex", gap: 56, alignItems: "flex-start" }}>
      {ref}
      {children}
    </div>
  </AbsoluteFill>
);

/* ---------- cena base de um Reels CERTI ---------- */
const Cena: React.FC<{ children: React.ReactNode; bg?: string }> = ({
  children,
  bg = colors.surfaceSoft,
}) => (
  <div
    style={{
      width: 1080,
      height: 1920,
      background: bg,
      padding: "90px 80px",
      boxSizing: "border-box",
      position: "relative",
    }}
  >
    <Logo height={96} />
    {children}
  </div>
);

/* ===================== DECISÃO 1: texto sobre cor ===================== */
const Pilar: React.FC<{
  bg: string;
  fg: string;
  titulo: string;
  corpo: string;
}> = ({ bg, fg, titulo, corpo }) => (
  <div
    style={{
      background: bg,
      color: fg,
      borderRadius: 8,
      padding: "44px 48px",
      height: 250,
      boxSizing: "border-box",
      display: "grid",
      alignContent: "center",
      gap: 14,
    }}
  >
    <div style={{ ...text("heading", 2), fontWeight: 800 }}>{titulo}</div>
    <div style={{ ...text("subtitle", 1.15), fontWeight: 600 }}>{corpo}</div>
  </div>
);

const CenaCores: React.FC<{ escuro: boolean }> = ({ escuro }) => {
  const fgClaro = (c: keyof typeof onColor) =>
    escuro ? onColor[c] : "#ffffff";
  return (
    <Cena>
      <div
        style={{
          ...text("display", 1.35),
          color: colors.primary,
          marginTop: 70,
        }}
      >
        Nossos pilares
      </div>
      <div style={{ display: "grid", gap: 26, marginTop: 56 }}>
        <Pilar
          bg={colors.green}
          fg={fgClaro("green")}
          titulo="Propósito"
          corpo="Competitividade e desenvolvimento sustentável."
        />
        <Pilar
          bg={colors.orange}
          fg={fgClaro("orange")}
          titulo="Missão"
          corpo="Soluções em inovação, tecnologia e empreendedorismo."
        />
        <Pilar
          bg={colors.sky}
          fg={fgClaro("sky")}
          titulo="Visão"
          corpo="Referência entre as melhores ICTs do país."
        />
      </div>
      <div
        style={{
          display: "inline-flex",
          marginTop: 56,
          background: colors.sky,
          color: fgClaro("sky"),
          borderRadius: 4,
          padding: "0 56px",
          height: 104,
          alignItems: "center",
          ...text("button", 2.1),
        }}
      >
        Saiba mais
      </div>
    </Cena>
  );
};

export const DecisaoCores: React.FC = () => (
  <Board
    n={1}
    question="Cor do texto sobre verde, laranja e azul-claro"
    ref={
      <Ref
        title="NO SITE"
        items={[{ src: "certi-ref-cards.png", w: 392, h: 188 }]}
      />
    }
  >
    <Reel
      name="A · Texto branco (como o site)"
      sub="Contraste fraco: verde 2,1:1 · laranja 2,6:1 · azul-claro 2,6:1"
      tag="A"
    >
      <CenaCores escuro={false} />
    </Reel>
    <Reel
      name="B · Texto escuro (minha proposta)"
      sub="Contraste bom: verde 5,3:1 · laranja 4,3:1 · azul-claro 4,3:1"
      tag="B"
    >
      <CenaCores escuro />
    </Reel>
  </Board>
);

/* ===================== DECISÃO 2: fonte do título ===================== */
const CenaTitulo: React.FC<{ familia: string }> = ({ familia }) => (
  <Cena bg="#ffffff">
    <div style={{ marginTop: 360, display: "grid", gap: 40 }}>
      <div
        style={{
          fontFamily: familia,
          fontWeight: 300,
          fontSize: 124,
          lineHeight: 1,
          color: colors.primary,
          letterSpacing: "-0.01em",
        }}
      >
        Competências
      </div>
      <div
        style={{
          height: 3,
          width: 560,
          background: `linear-gradient(90deg, ${colors.lineStrong}, rgba(200,200,200,0))`,
        }}
      />
      <div style={{ ...text("heading", 2), color: colors.ink, maxWidth: 800 }}>
        Centros de referência em tecnologias inovadoras
      </div>
      <div
        style={{
          ...text("subtitle", 1.3),
          color: colors.inkMuted,
          maxWidth: 800,
        }}
      >
        Inovação, tecnologia e empreendedorismo para a competitividade da
        indústria.
      </div>
    </div>
  </Cena>
);

export const DecisaoFonte: React.FC = () => (
  <Board
    n={2}
    question="Fonte do título leve “Competências”"
    ref={
      <Ref
        title="NO SITE"
        items={[{ src: "certi-ref-titulo.png", w: 392, h: 107 }]}
      />
    }
  >
    <Reel
      name="A · Nunito Sans leve"
      sub="A fonte que tu indicou. É a que está no sistema hoje."
      tag="A"
    >
      <CenaTitulo familia={fam.sans} />
    </Reel>
    <Reel
      name="B · Exo 2 leve"
      sub="Geométrica e mais “tecnológica”, parecida com a do site."
      tag="B"
    >
      <CenaTitulo familia={`"${exo2.fontFamily}", sans-serif`} />
    </Reel>
    <Reel
      name="C · Jura leve"
      sub="Cantos arredondados e quadrados, mais futurista."
      tag="C"
    >
      <CenaTitulo familia={`"${jura.fontFamily}", sans-serif`} />
    </Reel>
  </Board>
);

/* ===================== DECISÃO 3: cantos e sombra ===================== */
type Forma = {
  sm: number;
  md: number;
  chip: number;
  sombra: string;
  borda: string;
};

const CenaFormas: React.FC<{ f: Forma }> = ({ f }) => (
  <Cena>
    <div
      style={{ ...text("display", 1.1), color: colors.primary, marginTop: 60 }}
    >
      Notícias
    </div>
    <div
      style={{
        marginTop: 44,
        background: "#fff",
        borderRadius: f.md,
        boxShadow: f.sombra,
        border: f.borda,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          height: 330,
          background: colors.deep,
          display: "grid",
          placeItems: "center",
          color: "rgba(255,255,255,.7)",
          ...text("subtitle", 1.2),
        }}
      >
        foto
      </div>
      <div style={{ padding: "40px 44px", display: "grid", gap: 18 }}>
        <div style={{ ...text("heading", 1.7), color: colors.ink }}>
          Tecnologia no setor de energia transforma a infraestrutura
        </div>
        <div style={{ ...text("subtitle", 1.1), color: colors.inkMuted }}>
          A tecnologia acompanha uma das maiores transformações da história do
          mercado.
        </div>
        <div style={{ ...text("label", 1.7), color: colors.primary }}>
          Leia mais
        </div>
      </div>
    </div>
    <div style={{ display: "flex", gap: 24, marginTop: 44 }}>
      <div
        style={{
          background: colors.primary,
          color: "#fff",
          borderRadius: f.sm,
          height: 100,
          padding: "0 52px",
          display: "flex",
          alignItems: "center",
          ...text("button", 2),
        }}
      >
        Saiba mais
      </div>
      <div
        style={{
          border: `4px solid ${colors.primary}`,
          color: colors.primary,
          borderRadius: f.sm,
          height: 100,
          boxSizing: "border-box",
          padding: "0 52px",
          display: "flex",
          alignItems: "center",
          ...text("button", 2),
        }}
      >
        Portfólio
      </div>
    </div>
    <div style={{ display: "flex", gap: 18, marginTop: 40, flexWrap: "wrap" }}>
      {[
        ["Indústria 4.0", colors.primary],
        ["Software", colors.orange],
        ["Bioeconomia", colors.green],
      ].map(([t, c]) => (
        <div
          key={t}
          style={{
            border: `4px solid ${c}`,
            borderRadius: f.chip,
            height: 84,
            boxSizing: "border-box",
            padding: "0 34px",
            display: "flex",
            alignItems: "center",
            background: "#fff",
            color: colors.inkMuted,
            ...text("body", 1.5),
          }}
        >
          {t}
        </div>
      ))}
    </div>
  </Cena>
);

const formas: { tag: string; name: string; sub: string; f: Forma }[] = [
  {
    tag: "A",
    name: "A · Quase reto, sem sombra",
    sub: "Cantos de 2 e 4 px, só uma borda fina. Mais sóbrio.",
    f: {
      sm: 4,
      md: 8,
      chip: 4,
      sombra: "none",
      borda: `2px solid ${colors.lineStrong}`,
    },
  },
  {
    tag: "B",
    name: "B · O que estimei do site",
    sub: "Cantos de 4 e 8 px, sombra suave azulada.",
    f: {
      sm: 8,
      md: 16,
      chip: 8,
      sombra: "0 16px 48px rgba(0,87,141,.12)",
      borda: `2px solid ${colors.line}`,
    },
  },
  {
    tag: "C",
    name: "C · Mais arredondado",
    sub: "Cantos de 12 e 24 px, chips em pílula, sombra marcada.",
    f: {
      sm: 22,
      md: 40,
      chip: 999,
      sombra: "0 24px 64px rgba(0,87,141,.22)",
      borda: "none",
    },
  },
];

export const DecisaoFormas: React.FC = () => (
  <Board
    n={3}
    question="Cantos e sombras dos botões, cards e etiquetas"
    ref={
      <Ref
        title="NO SITE"
        items={[
          { src: "certi-ref-botao.png", w: 230, h: 75 },
          { src: "certi-ref-busca.png", w: 392, h: 41 },
          { src: "certi-ref-card.png", w: 250, h: 248 },
        ]}
      />
    }
  >
    {formas.map((x) => (
      <Reel key={x.tag} name={x.name} sub={x.sub} tag={x.tag}>
        <CenaFormas f={x.f} />
      </Reel>
    ))}
  </Board>
);

// PRÉVIA TEMPORÁRIA para o dono escolher a legenda do dia a dia (não é parte do design system).
// Usa um quadro do institucional em public/entrada/ (ignorada pelo Git).
import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { colors, fam, Logo, text } from "../index";

const palavras = [
  "A",
  "inovação",
  "acelera",
  "a",
  "competitividade",
  "das",
  "empresas",
];
const linhas = [palavras.slice(0, 3), palavras.slice(3)];
const ATIVA = 1; // "inovação" é a palavra falada agora

const Fundo: React.FC<{ children: React.ReactNode }> = ({ children }) => (
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
    <AbsoluteFill
      style={{
        background: "linear-gradient(0deg, rgba(0,20,40,.55), transparent 45%)",
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

const idx = (l: number, i: number) => (l === 0 ? i : linhas[0].length + i);

/* A · Contorno: branca com contorno preto fino e sombra, como no institucional */
const OpcaoA: React.FC = () => (
  <Fundo>
    <div
      style={{
        ...text("heading", 2.6),
        fontWeight: 700,
        textAlign: "center",
        color: "#fff",
        WebkitTextStroke: "3px #000",
        paintOrder: "stroke fill",
        textShadow: "0 2px 12px rgba(0,0,0,.5)",
        lineHeight: 1.25,
      }}
    >
      {linhas.map((l, li) => (
        <div key={li}>
          {l.map((w, i) => (
            <span
              key={i}
              style={{ color: idx(li, i) === ATIVA ? colors.sky : "#fff" }}
            >
              {w}{" "}
            </span>
          ))}
        </div>
      ))}
    </div>
  </Fundo>
);

/* B · Tarja azul: texto branco sobre faixa azul-profunda, palavra falada em azul-claro */
const OpcaoB: React.FC = () => (
  <Fundo>
    <div style={{ display: "grid", gap: 10, justifyItems: "center" }}>
      {linhas.map((l, li) => (
        <div
          key={li}
          style={{
            ...text("heading", 2.3),
            fontWeight: 700,
            color: "#fff",
            background: "rgba(2,74,119,.93)",
            borderRadius: 4,
            padding: "8px 26px",
          }}
        >
          {l.map((w, i) => (
            <span
              key={i}
              style={{
                background: idx(li, i) === ATIVA ? colors.sky : "transparent",
                borderRadius: 4,
                padding: idx(li, i) === ATIVA ? "0 10px" : 0,
              }}
            >
              {w}
              {i < l.length - 1 ? " " : ""}
            </span>
          ))}
        </div>
      ))}
    </div>
  </Fundo>
);

/* C · Preenchimento: caixa alta com a palavra falada em bloco azul, como o destaque das etiquetas do site */
const OpcaoC: React.FC = () => (
  <Fundo>
    <div
      style={{
        ...text("heading", 1.95),
        fontWeight: 800,
        textTransform: "uppercase",
        textAlign: "center",
        color: "#fff",
        lineHeight: 1.5,
      }}
    >
      {linhas.map((l, li) => (
        <div key={li}>
          {l.map((w, i) => (
            <span
              key={i}
              style={{
                background:
                  idx(li, i) === ATIVA ? colors.primary : "transparent",
                borderRadius: 4,
                padding: "0 14px",
                WebkitTextStroke: idx(li, i) === ATIVA ? "0" : "3px #000",
                paintOrder: "stroke fill",
                textShadow:
                  idx(li, i) === ATIVA ? "none" : "0 2px 12px rgba(0,0,0,.5)",
              }}
            >
              {w}
            </span>
          ))}
        </div>
      ))}
    </div>
  </Fundo>
);

/* D · Barra tech: barra escura de cantos chanfrados, igual à do terceiro de nome */
const OpcaoD: React.FC = () => (
  <Fundo>
    <div
      style={{
        background: "rgba(0,24,58,.88)",
        clipPath: "polygon(26px 0, 100% 0, calc(100% - 26px) 100%, 0 100%)",
        padding: "30px 70px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          ...text("heading", 2.2),
          fontWeight: 600,
          color: "#fff",
          lineHeight: 1.3,
        }}
      >
        {linhas.map((l, li) => (
          <div key={li}>
            {l.map((w, i) => (
              <span
                key={i}
                style={{
                  color: idx(li, i) === ATIVA ? colors.sky : "#fff",
                  fontWeight: idx(li, i) === ATIVA ? 800 : 600,
                }}
              >
                {w}{" "}
              </span>
            ))}
          </div>
        ))}
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
    <div style={{ ...text("body", 1), color: colors.inkMuted, marginTop: 6 }}>
      {sub}
    </div>
  </div>
);

export const LegendasOpcoes: React.FC = () => (
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
        Legendas
      </div>
      <div style={{ ...text("heading", 1.5), color: colors.ink }}>
        Qual estilo para a fala do dia a dia?
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
          NO INSTITUCIONAL
        </div>
        <div
          style={{
            background: "#fff",
            border: `1px solid ${colors.line}`,
            borderRadius: 8,
            padding: 14,
          }}
        >
          <Img
            src={staticFile("entrada/certi-ref-legenda.png")}
            style={{ width: 392, display: "block", borderRadius: 4 }}
          />
        </div>
        <div
          style={{
            ...text("bodySm", 1),
            color: colors.inkMuted,
            marginTop: 16,
          }}
        >
          Branca, pequena, com contorno preto fino e sem tarja. A palavra falada
          em destaque é o que acrescentei.
        </div>
      </div>
      <Reel
        tag="A"
        name="A · Contorno"
        sub="Como no institucional. Limpa, sem caixa."
      >
        <OpcaoA />
      </Reel>
      <Reel
        tag="B"
        name="B · Tarja azul"
        sub="Faixa azul da marca, palavra falada em azul-claro."
      >
        <OpcaoB />
      </Reel>
      <Reel
        tag="C"
        name="C · Bloco de destaque"
        sub="Caixa alta, palavra falada num bloco azul (como as etiquetas do site)."
      >
        <OpcaoC />
      </Reel>
      <Reel
        tag="D"
        name="D · Barra tech"
        sub="Barra chanfrada igual à do terceiro de nome."
      >
        <OpcaoD />
      </Reel>
    </div>
  </AbsoluteFill>
);

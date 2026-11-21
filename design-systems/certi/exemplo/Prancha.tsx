import React from "react";
import { AbsoluteFill } from "remotion";
import {
  Button,
  Card,
  CategoryChip,
  colors,
  fam,
  HeroBanner,
  Logo,
  SectionTitle,
  text,
} from "../index";
import type { Accent } from "../tokens";

const label: React.CSSProperties = {
  ...text("label", 0.8),
  color: colors.inkMuted,
};

const Swatch: React.FC<{
  name: string;
  hex: string;
  w: number;
  h: number;
  dark?: boolean;
}> = ({ name, hex, w, h, dark }) => (
  <div style={{ width: w }}>
    <div
      style={{
        height: h,
        background: hex,
        borderRadius: 8,
        border: `1px solid ${colors.line}`,
      }}
    />
    <div
      style={{
        ...text("bodySm", 0.8),
        color: colors.ink,
        fontWeight: 700,
        marginTop: 8,
      }}
    >
      {name}
    </div>
    <div
      style={{
        ...text("bodySm", 0.75),
        color: dark ? colors.ink : colors.inkMuted,
      }}
    >
      {hex}
    </div>
  </div>
);

const chips: [string, Accent][] = [
  ["Indústria 4.0", "primary"],
  ["Mecatrônica", "green"],
  ["Software", "orange"],
  ["Inteligência Artificial", "pink"],
  ["Visão Computacional", "sky"],
  ["BIM", "orange"],
  ["Gestão da Integridade", "pink"],
  ["Sistemas de Energia", "sky"],
  ["Bioeconomia", "primary"],
  ["Empreendedorismo", "green"],
];

const weights = [200, 300, 400, 600, 700, 800, 900];

/** Prancha de referência do design system CERTI (etapa 1: cores, tipografia e componentes base). */
export const CertiPrancha: React.FC = () => (
  <AbsoluteFill
    style={{
      background: colors.surfaceSoft,
      padding: 56,
      flexDirection: "row",
      gap: 48,
      fontFamily: fam.sans,
    }}
  >
    {/* Coluna 1: logo e cores */}
    <div
      style={{
        width: 520,
        display: "grid",
        gap: 28,
        alignContent: "start",
        flexShrink: 0,
      }}
    >
      <div>
        <div style={label}>Logo (arquivo fornecido)</div>
        <div
          style={{
            marginTop: 10,
            background: colors.white,
            border: `1px solid ${colors.line}`,
            borderRadius: 8,
            padding: 32,
            display: "grid",
            placeItems: "center",
          }}
        >
          <Logo height={120} />
        </div>
      </div>
      <div>
        <div style={label}>Marca · cores do símbolo</div>
        <div style={{ display: "flex", gap: 12, marginTop: 10 }}>
          <Swatch name="primary" hex={colors.primary} w={92} h={110} />
          <Swatch name="sky" hex={colors.sky} w={92} h={110} />
          <Swatch name="orange" hex={colors.orange} w={92} h={110} />
          <Swatch name="green" hex={colors.green} w={92} h={110} />
          <Swatch name="pink" hex={colors.pink} w={92} h={110} />
        </div>
      </div>
      <div>
        <div style={label}>Apoio de interface</div>
        <div
          style={{ display: "flex", gap: 12, marginTop: 10, flexWrap: "wrap" }}
        >
          <Swatch name="deep" hex={colors.deep} w={92} h={64} />
          <Swatch name="navy" hex={colors.navy} w={92} h={64} />
          <Swatch name="ink" hex={colors.ink} w={92} h={64} />
          <Swatch name="inkMuted" hex={colors.inkMuted} w={92} h={64} />
          <Swatch name="surfaceSoft" hex={colors.surfaceSoft} w={92} h={64} />
        </div>
      </div>
      <div>
        <div style={label}>Texto branco sobre as cores (decisão do dono)</div>
        <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
          {[
            ["primary", colors.primary, colors.white],
            ["deep", colors.deep, colors.white],
            ["sky", colors.sky, colors.white],
            ["orange", colors.orange, colors.white],
            ["green", colors.green, colors.white],
          ].map(([n, bg, fg]) => (
            <div
              key={n}
              style={{
                width: 92,
                height: 56,
                background: bg,
                color: fg,
                borderRadius: 6,
                display: "grid",
                placeItems: "center",
                ...text("bodySm", 0.85),
                fontWeight: 800,
              }}
            >
              Aa
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Coluna 2: tipografia */}
    <div
      style={{
        width: 600,
        display: "grid",
        gap: 26,
        alignContent: "start",
        flexShrink: 0,
      }}
    >
      <div style={label}>Tipografia · Nunito Sans, todos os pesos</div>
      <SectionTitle scale={0.9}>Competências</SectionTitle>
      <div style={{ ...text("title", 0.8), color: colors.primary }}>
        Centros de referência em tecnologias inovadoras
      </div>
      <div style={{ ...text("heading", 1), color: colors.ink }}>
        Ensaio por ultrassom na manufatura aditiva: técnicas e aplicações
      </div>
      <div style={{ ...text("body", 1), color: colors.inkMuted }}>
        Contribuímos com inovação, tecnologia e empreendedorismo para
        competitividade e sustentabilidade de mais de 12 mil clientes no mundo.
      </div>
      <div style={{ display: "grid", gap: 4 }}>
        {weights.map((w) => (
          <div
            key={w}
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 16,
              fontWeight: w,
              fontSize: 26,
              color: colors.ink,
              lineHeight: 1.25,
            }}
          >
            <span
              style={{
                width: 52,
                fontWeight: 600,
                fontSize: 14,
                color: colors.inkMuted,
              }}
            >
              {w}
            </span>
            <span>Aa Bb Cc · Inovação e tecnologia 0123</span>
          </div>
        ))}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 16,
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: 26,
            color: colors.ink,
            lineHeight: 1.25,
          }}
        >
          <span
            style={{
              width: 52,
              fontStyle: "normal",
              fontWeight: 600,
              fontSize: 14,
              color: colors.inkMuted,
            }}
          >
            itálico
          </span>
          <span>Aa Bb Cc · Inovação e tecnologia 0123</span>
        </div>
      </div>
    </div>

    {/* Coluna 3: componentes */}
    <div
      style={{
        flex: 1,
        display: "grid",
        gap: 20,
        alignContent: "start",
        minWidth: 0,
      }}
    >
      <div style={label}>Componentes</div>
      <div style={{ display: "flex", gap: 12 }}>
        <Button scale={0.85}>Saiba mais</Button>
        <Button variant="sky" scale={0.85}>
          Cadastrar
        </Button>
        <Button variant="outline" scale={0.85}>
          Portfólio
        </Button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        {chips.map(([t, a]) => (
          <CategoryChip key={t} accent={a} scale={0.8}>
            {t}
          </CategoryChip>
        ))}
      </div>
      <Card
        scale={0.8}
        style={{ width: "100%" }}
        title="Tecnologia no setor de energia: inovação que transforma a infraestrutura"
        body="A tecnologia no setor de energia acompanha uma das maiores transformações da história do mercado."
        action="Leia mais"
      />
      <HeroBanner
        width={630}
        title="Centros de referência em tecnologias inovadoras"
        subtitle="Inovação, tecnologia e empreendedorismo."
        media={
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "rgba(255,255,255,0.14)",
              display: "grid",
              placeItems: "center",
              color: "rgba(255,255,255,0.8)",
              fontFamily: fam.sans,
              fontSize: 18,
            }}
          >
            foto ou vídeo
          </div>
        }
      />
    </div>
  </AbsoluteFill>
);

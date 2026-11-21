import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import {
  Button,
  Card,
  colors,
  FadeIn,
  GradeDeEtiquetas,
  Logo,
  SectionTitle,
  text,
} from "../index";
import type { Accent } from "../tokens";

const itens: { texto: string; accent: Accent }[] = [
  { texto: "Indústria 4.0", accent: "primary" },
  { texto: "Mecatrônica", accent: "green" },
  { texto: "Software", accent: "orange" },
  { texto: "Inteligência Artificial", accent: "pink" },
  { texto: "Visão Computacional", accent: "sky" },
  { texto: "BIM", accent: "orange" },
  { texto: "Gestão da Integridade", accent: "pink" },
  { texto: "Sistemas de Energia", accent: "sky" },
  { texto: "Bioeconomia", accent: "primary" },
  { texto: "Empreendedorismo", accent: "green" },
];

const Pagina: React.FC<{ bg: string; children: React.ReactNode }> = ({
  bg,
  children,
}) => (
  <AbsoluteFill
    style={{ background: bg, padding: "90px 80px", boxSizing: "border-box" }}
  >
    {children}
  </AbsoluteFill>
);

/** Teste de movimento do CERTI (9 s, 1080×1920): cortes secos, crossfade de 400 ms e destaque de etiquetas em sequência. */
export const MovimentoTeste: React.FC = () => (
  <AbsoluteFill style={{ background: colors.surfaceSoft }}>
    {/* Cena A: competências (0 a 5 s) */}
    <Sequence durationInFrames={150}>
      <Pagina bg={colors.surfaceSoft}>
        <Logo height={96} />
        <FadeIn from={6} style={{ marginTop: 70 }}>
          <SectionTitle scale={1.3}>Competências</SectionTitle>
        </FadeIn>
        {/* etiquetas aparecem de uma vez (corte), depois são destacadas em sequência, como o mouse passando */}
        <Sequence from={16} layout="none">
          <GradeDeEtiquetas
            itens={itens}
            ordem={[7, 2, 1, 0, 5, 6]}
            inicio={14}
            scale={1.6}
            style={{ marginTop: 56 }}
          />
        </Sequence>
        {/* painel que aparece de uma vez, como o menu do site */}
        <Sequence from={96} layout="none">
          <Card
            scale={2.1}
            style={{ width: 920, marginTop: 56 }}
            title="Tecnologia no setor de energia transforma a infraestrutura"
            body="A tecnologia acompanha uma das maiores transformações da história do mercado."
            action="Leia mais"
          />
        </Sequence>
      </Pagina>
    </Sequence>

    {/* Cena B: hero (5 a 7,5 s), entrada por corte seco */}
    <Sequence from={150} durationInFrames={87}>
      <Pagina bg={colors.deep}>
        <Logo height={96} finish="negative" />
        <div style={{ marginTop: 420, display: "grid", gap: 40 }}>
          <FadeIn from={4}>
            <div style={{ ...text("title", 2.2), color: colors.white }}>
              Centros de referência em tecnologias inovadoras
            </div>
          </FadeIn>
          <FadeIn from={14}>
            <div
              style={{
                ...text("subtitle", 1.5),
                color: "rgba(255,255,255,0.92)",
              }}
            >
              Inovação, tecnologia e empreendedorismo para a competitividade da
              indústria.
            </div>
          </FadeIn>
          <Sequence from={40} layout="none">
            <Button
              variant="inverse"
              scale={2.2}
              style={{ justifySelf: "start" }}
            >
              Saiba mais
            </Button>
          </Sequence>
        </div>
      </Pagina>
    </Sequence>

    {/* Cena C: fecho (7,5 a 9 s), entra por crossfade de 400 ms sobre a cena B */}
    <Sequence from={225} durationInFrames={45}>
      <FadeIn
        from={0}
        style={{
          position: "absolute",
          inset: 0,
          background: colors.deep,
          display: "grid",
          placeItems: "center",
        }}
      >
        <Logo layout="vertical" finish="negative" height={560} />
      </FadeIn>
    </Sequence>
  </AbsoluteFill>
);

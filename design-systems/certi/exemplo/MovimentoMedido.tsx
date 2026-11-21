// Resumo visual do que foi medido no vídeo de tela do site (usa recortes em public/entrada/, ignorada pelo Git).
import React from "react";
import { AbsoluteFill, Easing, Img, staticFile } from "remotion";
import { colors, fam, text } from "../index";

const medidos = [
  0.0, 0.11, 0.33, 0.45, 0.64, 0.64, 0.75, 0.84, 0.89, 0.92, 0.93, 0.94,
].map((v) => v / 0.94);

const Grafico: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <svg
    width={520}
    height={250}
    viewBox="0 0 520 250"
    style={{ display: "block" }}
  >
    <line x1={40} y1={20} x2={40} y2={200} stroke={colors.lineStrong} />
    <line x1={40} y1={200} x2={500} y2={200} stroke={colors.lineStrong} />
    {children}
  </svg>
);

const Cartao: React.FC<{
  n: number;
  titulo: string;
  resultado: string;
  children: React.ReactNode;
}> = ({ n, titulo, resultado, children }) => (
  <div
    style={{
      flex: 1,
      background: "#fff",
      border: `1px solid ${colors.line}`,
      borderRadius: 8,
      boxShadow: "0 8px 24px rgba(0,87,141,.10)",
      padding: 32,
      display: "grid",
      gap: 16,
      alignContent: "start",
    }}
  >
    <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
      <div style={{ ...text("display", 0.9), color: colors.primary }}>{n}</div>
      <div style={{ ...text("heading", 1.05), color: colors.ink }}>
        {titulo}
      </div>
    </div>
    {children}
    <div
      style={{
        ...text("subtitle", 1.05),
        color: colors.primary,
        fontWeight: 800,
      }}
    >
      {resultado}
    </div>
  </div>
);

export const MovimentoMedido: React.FC = () => {
  const curva = Easing.bezier(0, 0, 0.58, 1);
  const pts = (fn: (t: number) => number) =>
    Array.from(
      { length: 41 },
      (_, i) => `${40 + (i / 40) * 330},${200 - fn(i / 40) * 170}`,
    ).join(" ");
  return (
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
          marginBottom: 32,
        }}
      >
        <div style={{ ...text("display", 0.9), color: colors.primary }}>
          Movimento
        </div>
        <div style={{ ...text("heading", 1.5), color: colors.ink }}>
          O que medi no vídeo de tela do site, quadro a quadro
        </div>
      </div>
      <div style={{ display: "flex", gap: 32 }}>
        <Cartao
          n={1}
          titulo="Etiqueta ao passar o mouse"
          resultado="Preenche em ~0,3 s e desacelera"
        >
          <div
            style={{
              background: colors.surfaceSoft,
              borderRadius: 6,
              padding: 10,
            }}
          >
            <Img
              src={staticFile("entrada/certi-vid-chips.png")}
              style={{ width: "100%", display: "block", borderRadius: 4 }}
            />
          </div>
          <Grafico>
            <polyline
              points={pts(curva)}
              fill="none"
              stroke={colors.sky}
              strokeWidth={3}
            />
            {medidos.map((v, i) => (
              <circle
                key={i}
                cx={40 + ((i * 33.3) / 360) * 330}
                cy={200 - Math.min(v, 1) * 170}
                r={5}
                fill={colors.primary}
              />
            ))}
            <text
              x={380}
              y={80}
              fill={colors.primary}
              fontSize={15}
              fontFamily={fam.sans}
            >
              ● medido no vídeo
            </text>
            <text
              x={380}
              y={104}
              fill={colors.sky}
              fontSize={15}
              fontFamily={fam.sans}
            >
              ━ curva ease-out
            </text>
            <text
              x={40}
              y={222}
              fill={colors.inkMuted}
              fontSize={14}
              fontFamily={fam.sans}
            >
              tempo (0 a 0,36 s)
            </text>
          </Grafico>
        </Cartao>
        <Cartao
          n={2}
          titulo="Menu suspenso"
          resultado="Corte seco: aparece e some em 1 quadro"
        >
          <div style={{ display: "grid", gap: 8 }}>
            <Img
              src={staticFile("entrada/certi-vid-menu-antes.png")}
              style={{
                width: "100%",
                display: "block",
                border: `1px solid ${colors.line}`,
              }}
            />
            <div style={{ ...text("bodySm", 1), color: colors.inkMuted }}>
              quadro antes (1/30 s)
            </div>
            <Img
              src={staticFile("entrada/certi-vid-menu-depois.png")}
              style={{
                width: "100%",
                display: "block",
                border: `1px solid ${colors.line}`,
              }}
            />
            <div style={{ ...text("bodySm", 1), color: colors.inkMuted }}>
              quadro seguinte: menu pronto, sem deslizar
            </div>
          </div>
        </Cartao>
        <Cartao
          n={3}
          titulo="Troca da imagem do menu"
          resultado="Crossfade de ~0,4 s, quase linear"
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 10,
            }}
          >
            {[
              ["30.45", "durante"],
              ["30.60", "meio"],
              ["30.85", "fim"],
            ].map(([t, l]) => (
              <div key={t}>
                <Img
                  src={staticFile(`entrada/certi-vid-troca-${t}.png`)}
                  style={{
                    width: "100%",
                    display: "block",
                    border: `1px solid ${colors.line}`,
                  }}
                />
                <div
                  style={{
                    ...text("bodySm", 1),
                    color: colors.inkMuted,
                    marginTop: 6,
                  }}
                >
                  {l}
                </div>
              </div>
            ))}
          </div>
          <div
            style={{ ...text("body", 1), color: colors.inkMuted, marginTop: 8 }}
          >
            <b style={{ color: colors.ink }}>Também observado:</b> ao{" "}
            <i>abrir</i> o menu, a imagem aparece junto com o painel, sem fade.
            O menu lateral muda de cor instantaneamente. A rolagem é a do
            navegador (não é movimento do site).
          </div>
        </Cartao>
      </div>
    </AbsoluteFill>
  );
};

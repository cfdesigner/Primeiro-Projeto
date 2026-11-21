// Tokens do design system CERTI. Origem: símbolo do logo (cores da marca, medidas por pixel) e prints do site.
// Decisões do dono (etapa 1): texto branco sobre as cores, fonte Nunito Sans, cantos e sombras da opção B.

export const colors = {
  // Marca: as cores do símbolo do logo
  primary: "#00578d", // azul: "certi" e segmentos do símbolo; títulos, botões, menu
  sky: "#00adee", // azul-claro do símbolo
  orange: "#f08522",
  green: "#8bc53f",
  pink: "#e5287b",
  // Apoio de interface (medidos no site)
  deep: "#024a77", // painel escuro do hero
  navy: "#002860", // faixas de destaque (podcast)
  surface: "#ffffff",
  surfaceSoft: "#f7f9fb", // fundo de seções
  ink: "#3c3c3b", // títulos e texto principal (medido nos pixels mais escuros do texto)
  inkMuted: "#555d67", // texto de apoio
  line: "#e9e9e9",
  lineStrong: "#c8c8c8",
  white: "#ffffff",
} as const;

/** As 5 cores de categoria (símbolo), em ciclo nas etiquetas de competências. */
export const accents = ["primary", "green", "orange", "pink", "sky"] as const;
export type Accent = (typeof accents)[number];

/**
 * Texto sobre cada cor de preenchimento. DECISÃO DO DONO: branco em todas, como no site.
 * Atenção à legibilidade (contraste do branco): primary 7,6:1, deep 9,3:1, navy 14,3:1, pink 4,3:1,
 * sky 2,6:1, orange 2,6:1, green 2,1:1. Sobre sky, orange e green use texto grande e em negrito (700+).
 */
export const onColor = {
  primary: colors.white,
  deep: colors.white,
  navy: colors.white,
  pink: colors.white,
  sky: colors.white,
  orange: colors.white,
  green: colors.white,
} as const;

export const fontFamilies = {
  sans: '"Nunito Sans", "Nunito", system-ui, sans-serif',
} as const;

/** Estilos de texto, em px para vídeo 1920×1080. Fonte única: Nunito Sans, em vários pesos. */
export const textStyles = {
  display: {
    fontSize: 72,
    lineHeight: 1.05,
    fontWeight: 300,
    letterSpacing: "-0.01em",
  }, // título leve de seção, em azul
  title: {
    fontSize: 44,
    lineHeight: 1.15,
    fontWeight: 700,
    letterSpacing: "0.01em",
    uppercase: true,
  }, // hero
  heading: {
    fontSize: 26,
    lineHeight: 1.25,
    fontWeight: 800,
    letterSpacing: "0",
  },
  subtitle: {
    fontSize: 22,
    lineHeight: 1.6,
    fontWeight: 400,
    letterSpacing: "0",
  },
  body: { fontSize: 18, lineHeight: 1.6, fontWeight: 400, letterSpacing: "0" },
  bodySm: {
    fontSize: 15,
    lineHeight: 1.6,
    fontWeight: 400,
    letterSpacing: "0",
  },
  label: {
    fontSize: 14,
    lineHeight: 1.2,
    fontWeight: 700,
    letterSpacing: "0.06em",
    uppercase: true,
  }, // menu, "LEIA MAIS"
  button: {
    fontSize: 16,
    lineHeight: 1,
    fontWeight: 700,
    letterSpacing: "0.02em",
  },
} as const;

export const space = {
  s1: 4,
  s2: 8,
  s3: 12,
  s4: 16,
  s6: 24,
  s8: 32,
  s12: 48,
  s16: 64,
  s24: 96,
} as const;

/** Aprovado pelo dono (opção B): 4 px em botões/etiquetas, 8 px em cards e imagens. */
export const radius = { none: 0, sm: 4, md: 8, pill: 999 } as const;

/** Aprovado pelo dono (opção B): sombra suave e azulada nos cards. */
export const shadow = { card: "0 8px 24px rgba(0,87,141,0.10)" } as const;

/** Degradê de destaque visto no site (item ativo, banners). */
export const gradients = {
  sky: "linear-gradient(90deg, #28abe1, #27cfe0)",
} as const;

export const frame = {
  wide: "16 / 9",
  vertical: "9 / 16",
  square: "1 / 1",
  portrait: "4 / 5",
} as const;

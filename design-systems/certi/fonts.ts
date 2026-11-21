// Nunito Sans, com todas as variações de peso (e itálico). Importe este arquivo antes de renderizar texto.
import { loadFont } from "@remotion/google-fonts/NunitoSans";

loadFont("normal", {
  weights: ["200", "300", "400", "600", "700", "800", "900"],
  subsets: ["latin", "latin-ext"],
});
loadFont("italic", {
  weights: ["300", "400", "700", "800"],
  subsets: ["latin", "latin-ext"],
});

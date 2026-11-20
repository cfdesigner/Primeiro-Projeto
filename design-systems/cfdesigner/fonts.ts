// Carrega as fontes da marca (Google Fonts) uma única vez. Importe este arquivo antes de renderizar texto.
import { loadFont as loadBebas } from "@remotion/google-fonts/BebasNeue";
import { loadFont as loadMontserrat } from "@remotion/google-fonts/Montserrat";
import { loadFont as loadLato } from "@remotion/google-fonts/Lato";
import { loadFont as loadPlexMono } from "@remotion/google-fonts/IBMPlexMono";

loadBebas("normal", { weights: ["400"], subsets: ["latin"] });
loadMontserrat("normal", { weights: ["600", "700"], subsets: ["latin"] });
loadMontserrat("italic", { weights: ["600"], subsets: ["latin"] });
loadLato("normal", { weights: ["400", "700"], subsets: ["latin"] });
loadPlexMono("normal", { weights: ["500"], subsets: ["latin"] });

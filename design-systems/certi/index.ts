// Design system CERTI para Remotion.
export * from "./components";
export * from "./tokens";
export { fam, text, type BaseProps } from "./components/shared";
export * from "./efeitos";
export { motion, easing, frames, transitions } from "./movimento";
export {
  buildPages,
  tiraPontoFinal,
  suggestPunchLines,
  pickKeywordIndex,
  type Caption,
  type PunchLine,
  type Page,
  type PunchCandidate,
} from "../../tecnicas/legendas/texto";

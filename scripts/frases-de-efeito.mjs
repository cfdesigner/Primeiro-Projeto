#!/usr/bin/env node
// Lista a transcrição e SUGERE frases de efeito para o dono aprovar.
// Uso: node scripts/frases-de-efeito.mjs <legendas.json>
import { readFileSync } from "node:fs";
import { buildPages, suggestPunchLines } from "../design-systems/cfdesigner/captions.ts";

const file = process.argv[2];
if (!file) {
  console.error("Uso: node scripts/frases-de-efeito.mjs <legendas.json>");
  process.exit(1);
}
const captions = JSON.parse(readFileSync(file, "utf8"));
const mmss = (ms) => `${String(Math.floor(ms / 60000)).padStart(2, "0")}:${(((ms % 60000)) / 1000).toFixed(1).padStart(4, "0")}`;

console.log("TRANSCRIÇÃO");
console.log(captions.map((c) => c.text).join("").trim());
console.log(`\n${captions.length} palavras, ${buildPages(captions).length} legendas no dia a dia.`);

const found = suggestPunchLines(captions);
console.log(`\nFRASES DE EFEITO SUGERIDAS (${found.length}) — heurística, o dono aprova:`);
found.forEach((f, i) => console.log(`${i + 1}. [${mmss(f.startMs)}–${mmss(f.endMs)}] "${f.text}"  → destaque: ${f.keyword}`));
console.log("\npunchLines (JSON, depois da aprovação):");
console.log(JSON.stringify(found.map(({ startMs, endMs, keyword }) => ({ startMs, endMs, keyword })), null, 2));

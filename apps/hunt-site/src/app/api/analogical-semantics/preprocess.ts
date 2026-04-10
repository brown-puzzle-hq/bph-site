/**
 * Preprocessing script: parses glove_top_10000.txt and writes a v8-serialized
 * .bin file for fast loading at runtime.
 *
 * Run automatically via `predev` / `prebuild`. To run manually from apps/hunt-site:
 *   npx tsx src/app/api/analogical-semantics/preprocess.ts
 */

import fs from "fs";
import path from "path";
import v8 from "v8";

const DIR = import.meta.dirname;

type Vec3 = [number, number, number];

function parseLine(line: string): { word: string; vec: Vec3 } | null {
  const parts = line.trim().split(" ");
  if (parts.length < 4) return null;
  const z = parseFloat(parts[parts.length - 1]!);
  const y = parseFloat(parts[parts.length - 2]!);
  const x = parseFloat(parts[parts.length - 3]!);
  if (isNaN(x) || isNaN(y) || isNaN(z)) return null;
  const word = parts.slice(0, parts.length - 3).join(" ");
  return { word, vec: [x, y, z] };
}

const txtPath = path.join(DIR, "glove_top_10000.txt");
const binPath = path.join(DIR, "glove_top_10000.bin");

console.log("Preprocessing glove_top_10000.txt...");
const t0 = Date.now();
const words: string[] = [];
const vectors: Vec3[] = [];
for (const line of fs.readFileSync(txtPath, "utf-8").split("\n")) {
  const parsed = parseLine(line);
  if (parsed) {
    words.push(parsed.word);
    vectors.push(parsed.vec);
  }
}
fs.writeFileSync(binPath, v8.serialize({ words, vectors }));
console.log(
  `Done: ${words.length} words in ${Date.now() - t0}ms → glove_top_10000.bin`,
);

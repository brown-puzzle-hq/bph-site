import { promises as fs } from "node:fs";
import path from "node:path";

type Piece = {
  folder: string;
  filename: string;
  relPathFromManifest: string;
  id: string;
};

function isNumericFolder(name: string) {
  return /^\d+$/.test(name);
}

function isPngFile(name: string) {
  return name.toLowerCase().endsWith(".png");
}

function isKeyFile(name: string) {
  return name.toLowerCase().includes("key");
}

function byNumericThenLex(a: string, b: string) {
  const aBase = path.basename(a, path.extname(a));
  const bBase = path.basename(b, path.extname(b));
  const aNum = Number(aBase);
  const bNum = Number(bBase);
  const aIsNum = Number.isFinite(aNum);
  const bIsNum = Number.isFinite(bNum);
  if (aIsNum && bIsNum && aNum !== bNum) return aNum - bNum;
  if (aIsNum !== bIsNum) return aIsNum ? -1 : 1;
  return a.localeCompare(b, undefined, { numeric: true });
}

async function main() {
  const mediaDir = path.join(
    process.cwd(),
    "src/app/(hunt)/puzzle/(backpack)/psychoceramics/media",
  );
  const outFile = path.join(mediaDir, "manifest.ts");

  const dirents = await fs.readdir(mediaDir, { withFileTypes: true });
  const folders = dirents
    .filter((d) => d.isDirectory() && isNumericFolder(d.name))
    .map((d) => d.name)
    .sort((a, b) => Number(a) - Number(b));

  const pieces: Piece[] = [];

  for (const folder of folders) {
    const folderDir = path.join(mediaDir, folder);
    const files = await fs.readdir(folderDir);
    const pngs = files
      .filter((f) => isPngFile(f) && !isKeyFile(f))
      .sort(byNumericThenLex);

    for (const filename of pngs) {
      // manifest.ts lives in media/, so paths are like ./1/3.png
      const relPathFromManifest = `./${folder}/${filename}`;
      const id = `${folder}/${path.basename(filename, path.extname(filename))}`;
      pieces.push({ folder, filename, relPathFromManifest, id });
    }
  }

  const lines: string[] = [];
  lines.push("/* eslint-disable */");
  lines.push("// This file is auto-generated.");
  lines.push(
    "// Run: pnpm -C apps/hunt-site tsx scripts/generate-jigsaw-locations.ts",
  );
  lines.push("");
  lines.push("export type JigsawExamplePieceAsset = {");
  lines.push("  id: string;");
  lines.push("  folder: string;");
  lines.push("  filename: string;");
  lines.push("  url: string;");
  lines.push("};");
  lines.push("");
  lines.push(
    "export const JIGSAW_EXAMPLE_PIECES: JigsawExamplePieceAsset[] = [",
  );
  for (const p of pieces) {
    lines.push("  {");
    lines.push(`    id: ${JSON.stringify(p.id)},`);
    lines.push(`    folder: ${JSON.stringify(p.folder)},`);
    lines.push(`    filename: ${JSON.stringify(p.filename)},`);
    lines.push(
      `    url: new URL(${JSON.stringify(p.relPathFromManifest)}, import.meta.url).toString(),`,
    );
    lines.push("  },");
  }
  lines.push("];");
  lines.push("");
  lines.push(
    "export const JIGSAW_EXAMPLE_PIECE_COUNT = JIGSAW_EXAMPLE_PIECES.length;",
  );
  lines.push("");

  await fs.writeFile(outFile, lines.join("\n"), "utf8");

  // eslint-disable-next-line no-console
  console.log(`Wrote ${outFile} with ${pieces.length} pieces.`);
}

void main();

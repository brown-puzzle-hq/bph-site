import fs from "fs/promises";
import path from "path";
import { db } from "@/db/index";
import { puzzles } from "@/db/schema";
import "dotenv/config";
import { HUNT_NAME } from "~/config/client";

const TEMPLATE_DIR = path.join(
  process.cwd(),
  "src/app/(hunt)/puzzle",
  "example",
);
const PUZZLE_DIR = path.join(process.cwd(), "src/app/(hunt)/puzzle");

async function main() {
  console.log("📥 Fetching puzzles from DB...");
  const puzzleRows = await db.select().from(puzzles);

  const idsFromDB = puzzleRows.map((p) => p.id);
  const namesFromDB = Object.fromEntries(puzzleRows.map((p) => [p.id, p.name]));

  const foldersOnDisk = (await fs.readdir(PUZZLE_DIR, { withFileTypes: true }))
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .filter((name) => name !== "example");

  const idsOnDisk = new Set(foldersOnDisk);

  // Create missing folders
  for (const id of idsFromDB) {
    const targetDir = path.join(PUZZLE_DIR, id);
    const title = `${namesFromDB[id]} - ${HUNT_NAME}`;

    if (idsOnDisk.has(id)) {
      console.log(`✅ Folder exists: ${id}`);
      continue;
    }

    console.log(`📁 Creating folder for: ${id}`);
    await copyDir(TEMPLATE_DIR, targetDir);
    await replaceLineMatching(
      path.join(targetDir, "layout.tsx"),
      "title:",
      `  title: "${title}",`,
    );

    await replaceLineMatching(
      path.join(targetDir, "data.tsx"),
      "export const puzzleId",
      `export const puzzleId = "${id}";`,
    );
  }

  // Warn about extraneous folders
  for (const diskId of idsOnDisk) {
    if (!idsFromDB.includes(diskId) && diskId !== "components") {
      console.warn(`⚠️  Folder "${diskId}" exists but is not in the database.`);
    }
  }

  console.log("🎉 Folder sync complete.");
  process.exit(0);
}

async function copyDir(src: string, dest: string) {
  await fs.mkdir(dest, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else {
      await fs.copyFile(srcPath, destPath);
    }
  }
}

async function replaceLineMatching(
  filePath: string,
  matchPrefix: string,
  newLine: string,
) {
  const content = await fs.readFile(filePath, "utf-8");
  const lines = content.split("\n");

  const index = lines.findIndex((line) =>
    line.trimStart().startsWith(matchPrefix),
  );
  if (index === -1) {
    throw new Error(
      `Couldn't find line starting with "${matchPrefix}" in ${filePath}`,
    );
  }

  lines[index] = newLine;
  await fs.writeFile(filePath, lines.join("\n"), "utf-8");
}

main().catch((err) => {
  console.error("❌ Folder generation failed:", err);
  process.exit(1);
});

import fs from "fs/promises";
import path from "path";
import { db } from "@/db/index";
import { puzzles } from "@/db/schema";
import "dotenv/config";
import { HUNT_NAME } from "~/hunt.config";

const PUZZLE_DIR = path.join(process.cwd(), "src/app/(hunt)/puzzle");

async function main() {
  console.log("📥 Fetching puzzles from DB...");
  const puzzleRows = await db.select().from(puzzles);

  const idsFromDB = puzzleRows.map((p) => p.id);
  const namesFromDB = Object.fromEntries(puzzleRows.map((p) => [p.id, p.name]));

  console.log("🔎 Checking puzzle folders against DB...");

  const foldersOnDisk = (await fs.readdir(PUZZLE_DIR, { withFileTypes: true }))
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  const idsOnDisk = new Set(foldersOnDisk);

  let hadError = false;

  for (const id of idsFromDB) {
    const targetDir = path.join(PUZZLE_DIR, id);
    const title = `${namesFromDB[id]} - ${HUNT_NAME}`;

    if (!idsOnDisk.has(id)) {
      console.error(`❌ Missing folder for DB puzzle id: ${id}`);
      hadError = true;
      continue;
    }

    // Check metadata title line in layout.tsx
    const titleLine = await findLineMatching(
      path.join(targetDir, "layout.tsx"),
      "title:",
    );

    if (titleLine === null) {
      console.error(`❌ ${id}: missing "title:" line in layout.tsx`);
      hadError = true;
    } else {
      const actualTitle = extractQuotedValue(titleLine, "title:");
      if (actualTitle === null) {
        console.error(
          `❌ ${id}: couldn't parse title string from line: ${titleLine.trim()}`,
        );
        hadError = true;
      } else if (actualTitle !== title) {
        console.error(
          `❌ ${id}: metadata title mismatch. Expected "${title}", got "${actualTitle}"`,
        );
        hadError = true;
      }
    }

    // Check puzzleId export in data.tsx
    const puzzleIdLine = await findLineMatching(
      path.join(targetDir, "data.tsx"),
      "export const puzzleId",
    );

    if (puzzleIdLine === null) {
      console.error(`❌ ${id}: missing export for puzzleId in data.tsx`);
      hadError = true;
    } else {
      const actualPuzzleId = extractQuotedValue(
        puzzleIdLine,
        "export const puzzleId = ",
      );
      if (actualPuzzleId === null) {
        console.error(
          `❌ ${id}: couldn't parse puzzleId from line: ${puzzleIdLine.trim()}`,
        );
        hadError = true;
      } else if (actualPuzzleId !== id) {
        console.error(
          `❌ ${id}: puzzleId mismatch. Expected "${id}", got "${actualPuzzleId}"`,
        );
        hadError = true;
      }
    }
  }

  // Warn about extraneous folders
  for (const diskId of idsOnDisk) {
    if (!idsFromDB.includes(diskId) && diskId !== "components") {
      console.warn(`⚠️  Folder "${diskId}" exists but is not in the database.`);
    }
  }

  if (hadError) {
    console.error("\n❌ Puzzle folder check failed.");
    process.exit(1);
  }

  console.log("🎉 Puzzle folder check passed.");
  process.exit(0);
}

async function findLineMatching(
  filePath: string,
  matchPrefix: string,
): Promise<string | null> {
  const content = await fs.readFile(filePath, "utf-8");
  const lines = content.split("\n");
  return lines.find((line) => line.trimStart().startsWith(matchPrefix)) ?? null;
}

function extractQuotedValue(line: string, key: string): string | null {
  const match = line.match(new RegExp(`${key}\\s*(["'])(.+?)\\1`));
  return match?.[2] ?? null;
}

main().catch((err) => {
  console.error("❌ Folder check crashed:", err);
  process.exit(1);
});

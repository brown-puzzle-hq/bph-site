import fs from "fs/promises";
import path from "path";
import { db } from "@/db/index";
import { puzzles } from "@/db/schema";
import "dotenv/config";
import { HUNT_NAME } from "@/config/client";
import { locations } from "~/generated/puzzle-locations.json";

const PUZZLE_ROOT = path.join(process.cwd(), "src/app/(hunt)/puzzle");
const IGNORE = new Set(["example", "components"]);

async function main() {
  console.log("📥 Fetching puzzles from DB...");
  const puzzleRows = await db.select().from(puzzles);
  const namesFromDB = Object.fromEntries(puzzleRows.map((p) => [p.id, p.name]));

  console.log("🔎 Checking puzzle folders...");
  let hadError = false;

  for (const [puzzleId, rel] of Object.entries(locations)) {
    const targetDir = path.join(PUZZLE_ROOT, rel);
    const title = `${namesFromDB[puzzleId]} - ${HUNT_NAME}`;

    // Check metadata title line in layout.tsx
    const titleLine = await findLineMatching(
      path.join(targetDir, "layout.tsx"),
      "title:",
    );

    if (titleLine === null) {
      console.error(`❌ ${puzzleId}: missing "title:" line in layout.tsx`);
      hadError = true;
    } else {
      const actualTitle = extractQuotedValue(titleLine, "title:");
      if (actualTitle === null) {
        console.error(
          `❌ ${puzzleId}: couldn't parse title string from line: ${titleLine.trim()}`,
        );
        hadError = true;
      } else if (actualTitle !== title) {
        console.error(
          `❌ ${puzzleId}: metadata title mismatch. Expected "${title}", got "${actualTitle}"`,
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
      console.error(`❌ ${puzzleId}: missing export for puzzleId in data.tsx`);
      hadError = true;
    } else {
      const actualPuzzleId = extractQuotedValue(
        puzzleIdLine,
        "export const puzzleId =",
      );
      if (actualPuzzleId === null) {
        console.error(
          `❌ ${puzzleId}: couldn't parse puzzleId from line: ${puzzleIdLine.trim()}`,
        );
        hadError = true;
      } else if (actualPuzzleId !== puzzleId) {
        console.error(
          `❌ ${puzzleId}: puzzleId mismatch. Expected "${puzzleId}", got "${actualPuzzleId}"`,
        );
        hadError = true;
      }
    }
  }

  if (hadError) {
    console.error("\n❌ Puzzle folder check failed.");
  } else {
    console.log("🎉 Puzzle folder check passed.");
  }

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

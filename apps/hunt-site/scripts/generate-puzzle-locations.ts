import fs from "fs/promises";
import path from "path";
import { db } from "@/db/index";
import { puzzles } from "@/db/schema";
import "dotenv/config";

const PUZZLE_ROOT = path.join(process.cwd(), "src/app/(hunt)/puzzle");
const OUTPUT_PATH = path.join(
  process.cwd(),
  "src/generated/puzzle-locations.json",
);
const IGNORE = new Set(["example", "components"]);

type Found = Record<string, string[]>;
type PuzzleDirectoryMap = Record<string, string | null>;

async function main() {
  console.log("📥 Fetching puzzles from DB...");
  const puzzleRows = await db.select().from(puzzles);

  const idsFromDB = new Set(
    puzzleRows.map((p) => p.id).filter((id) => !IGNORE.has(id)),
  );

  console.log("🔎 Scanning puzzle directories on disk...");
  const { found, extraneous } = await walkPuzzleDirectories(
    PUZZLE_ROOT,
    idsFromDB,
  );

  const puzzleDirectoryMap: PuzzleDirectoryMap = {};
  const missing: string[] = [];
  const duplicate: Record<string, string[]> = {};

  for (const [puzzleId, dirs] of Object.entries(found)) {
    if (dirs.length === 0) {
      missing.push(puzzleId);
      puzzleDirectoryMap[puzzleId] = null;
    } else if (dirs.length > 1) {
      duplicate[puzzleId] = dirs;
      puzzleDirectoryMap[puzzleId] = null;
    } else {
      puzzleDirectoryMap[puzzleId] = dirs[0]!;
    }
  }

  const sortedPuzzleDirectoryMap = Object.fromEntries(
    Object.entries(puzzleDirectoryMap).sort(([a], [b]) => a.localeCompare(b)),
  );

  const output = {
    root: "src/app/(hunt)/puzzle",
    locations: sortedPuzzleDirectoryMap,
    missing,
    extraneous,
    duplicate,
  };

  await fs.mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
  await fs.writeFile(
    OUTPUT_PATH,
    JSON.stringify(output, null, 2) + "\n",
    "utf-8",
  );

  // Report
  let hadError = false;

  if (missing.length > 0) {
    hadError = true;
    for (const id of missing) {
      console.error(`❌ Missing directory on disk for DB puzzle id: ${id}`);
    }
  }

  const duplicateIds = Object.keys(duplicate);
  if (duplicateIds.length > 0) {
    hadError = true;
    for (const id of duplicateIds) {
      console.error(
        `❌ Duplicate puzzle directories found for ${id}: ${duplicate[id]!.join(
          ", ",
        )}`,
      );
    }
  }

  for (const rel of extraneous.sort()) {
    console.warn(`⚠️ Unexpected directory on disk: ${rel}`);
  }

  if (hadError) {
    console.error("❌ Puzzle directory map generation failed.");
    process.exit(1);
  }

  console.log(
    `🎉 Puzzle directory map written to ${path.relative(
      process.cwd(),
      OUTPUT_PATH,
    )} (${Object.keys(puzzleDirectoryMap).length} puzzles)`,
  );
  process.exit(0);
}

async function walkPuzzleDirectories(
  rootDir: string,
  idsFromDB: Set<string>,
): Promise<{ found: Found; extraneous: string[] }> {
  const found: Found = Object.fromEntries(
    Array.from(idsFromDB).map((id) => [id, []]),
  );
  const extraneous: string[] = [];

  async function walk(currentDir: string): Promise<boolean> {
    const dirName = path.basename(currentDir);
    const rel = path
      .relative(PUZZLE_ROOT, currentDir)
      .replaceAll(path.sep, "/");

    if (idsFromDB.has(dirName)) {
      found[dirName]!.push(rel);
      // Do not recurse into puzzle directories
      return true;
    }

    const entries = await fs.readdir(currentDir, { withFileTypes: true });
    let containsPuzzle = false;

    for (const entry of entries) {
      if (!entry.isDirectory() || IGNORE.has(entry.name)) continue;
      const childContainsPuzzle = await walk(path.join(currentDir, entry.name));
      containsPuzzle ||= childContainsPuzzle;
    }

    if (!containsPuzzle) {
      extraneous.push(rel);
    }

    return containsPuzzle;
  }

  await walk(rootDir);
  return { found, extraneous };
}

main().catch((err) => {
  console.error("❌ Puzzle map generation crashed:", err);
  process.exit(1);
});

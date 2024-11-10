// NOTE: Account for daylight savings time
// All times are in ISO
// https://greenwichmeantime.com/articles/clocks/iso/

import { db } from "@/db/index";
import { eq } from "drizzle-orm";
import { count } from "drizzle-orm";
import { hints } from "@/db/schema";

export const REGISTRATION_START_TIME = new Date("2024-10-24T05:56:35Z");
export const REGISTRATION_END_TIME = new Date("2024-11-20T05:56:35Z");
export const HUNT_START_TIME = new Date("2024-11-09T05:59:00Z");
export const HUNT_END_TIME = new Date("2024-11-20T05:56:35Z");
export const NUMBER_OF_GUESSES_PER_PUZZLE = 20;

/* HINTING SYSTEM
 * Teams currently get a hint request every three hours since the start of the hunt.
 * Teams cannot have more than one outstanding request at a time.
 */

/** Calculates the total number of hints given to a team */
export function getTotalHints(teamId: string) {
  const currentTime = new Date();
  const timeDifference = currentTime.getTime() - HUNT_START_TIME.getTime(); // In milliseconds
  const rate = 3 * 60 * 60 * 1000; // 3 hours in milliseconds
  return Math.floor(timeDifference / rate);
}

/** Calculates the total number of hints available to a team */
export async function getNumberOfHintsRemaining(teamId: string) {
  const totalHints = getTotalHints(teamId);

  const query = await db
    .select({ count: count() })
    .from(hints)
    .where(eq(hints.teamId, teamId));
  const usedHints = query[0]?.count ? query[0].count : 0;

  return totalHints - usedHints;
}

/** PUZZLE UNLOCK SYSTEM
 * WARNING: make sure that everything here is a valid puzzle ID.
 * You should really avoid changing anything here after the hunt starts
 */

const firstPuzzle = (await db.query.puzzles.findMany()).sort((a, b) =>
  a.name.localeCompare(b.name),
)[0];

/** Puzzles available at the beginning of the hunt that will never need to be unlocked by the team.
 * This is currently set to the first puzzle in the database alphabetically.
 */
export const INITIAL_PUZZLES: string[] = firstPuzzle ? [firstPuzzle.id] : [];

/** Returns a map for the next puzzles unlocked after a puzzle is solved.
 * This is currently set to a sequential unlock, sorted alphabetically by puzzle name.
 */
export async function getNextPuzzleMap() {
  /* Example: list unlock */
  const puzzles = (
    await db.query.puzzles.findMany({ columns: { id: true, name: true } })
  ).sort((a, b) => a.name.localeCompare(b.name));

  const nextPuzzleMap: Record<string, { id: string; name: string }[] | null> =
    puzzles.reduce(
      (map, puzzle, index) => {
        const nextPuzzle = puzzles[index + 1];
        if (nextPuzzle) {
          map[puzzle.id] = [nextPuzzle];
        }
        return map;
      },
      {} as Record<string, { id: string; name: string }[] | null>,
    );

  return nextPuzzleMap;

  /* Example: adjacency list unlock

  const PUZZLE_UNLOCK_MAP: { [key: string]: string[] } = {
    puzzle1: ["puzzle1", "puzzle2", "hello"],
    puzzle2: ["hello", "sorry"],
    hello: ["sorry", "puzzle2", "puzzle1"],
    sorry: ["sorry", "puzzle2", "puzzle1"],
  };

  if (PUZZLE_UNLOCK_MAP[puzzleId]) {
    await insertUnlock(teamId, PUZZLE_UNLOCK_MAP[puzzleId]);
  }
  */
}

/**
 * Runs every time a team solves a puzzle.
 */
// export async function unlockPuzzleAfterSolve(teamId: string, puzzleId: string) {
//   const nextPuzzles = (await getNextPuzzleMap())[puzzleId];

//   if (!nextPuzzles) {
//     return null;
//   }

//   await insertUnlock(
//     teamId,
//     nextPuzzles.map((puzzle) => puzzle.id),
//   );
// }

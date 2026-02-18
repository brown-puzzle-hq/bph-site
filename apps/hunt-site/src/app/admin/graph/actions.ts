"use server";

import { db } from "~/server/db";
import { teams, puzzles, guesses, hints } from "@/db/schema";
import { eq } from "drizzle-orm";
import { INITIAL_PUZZLES } from "@/config/server";
import { assertPermissions } from "~/lib/server";

export async function getSearchedTeam(teamId: string) {
  await assertPermissions({ level: "admin" });

  const result = await db.query.teams.findFirst({
    where: eq(teams.id, teamId),
    columns: {
      id: true,
      displayName: true,
      primaryEmail: true,
      role: true,
      createTime: true,
      finishTime: true,
      members: true,
      interactionMode: true,
    },
    with: {
      unlocks: {
        columns: { puzzleId: true },
      },
      solves: {
        columns: { puzzleId: true },
      },
    },
  });

  if (!result) throw new Error(`Team ${teamId} not found.`);

  const unlocks = result.unlocks.map((u) => u.puzzleId);
  const unlocksAndInitialPuzzles = [...unlocks, ...INITIAL_PUZZLES];
  const solves = result.solves.map((s) => s.puzzleId);

  return {
    ...result,
    unlocks: unlocksAndInitialPuzzles,
    solves,
  };
}

export async function getSearchedPuzzle(
  teamId: string | null,
  puzzleId: string, // should be valid
) {
  await assertPermissions({ level: "admin" });

  // If no teamId is provided, return all of the hints made on the puzzle
  if (!teamId) {
    const puzzle = await db.query.puzzles.findFirst({
      where: eq(puzzles.id, puzzleId),
      columns: {},
      with: {
        hints: {
          columns: { id: true, request: true, response: true },
        },
      },
    });

    if (!puzzle) throw new Error(`Puzzle ${puzzleId} not found.`);

    return {
      guesses: [],
      requestedHints: puzzle.hints,
    };
  }

  // If teamId is provided, return all of the hints and guesses made on the puzzle by the team
  const result = await db.query.teams.findFirst({
    where: eq(teams.id, teamId),
    columns: {},
    with: {
      guesses: {
        where: eq(guesses.puzzleId, puzzleId),
        columns: { isCorrect: true, guess: true },
        orderBy: (g) => g.submitTime,
      },
      requestedHints: {
        where: eq(hints.puzzleId, puzzleId),
        columns: { id: true, request: true, response: true },
        orderBy: (h) => h.requestTime,
      },
    },
  });

  if (!result) throw new Error(`Team ${teamId} not found.`);

  return result;
}

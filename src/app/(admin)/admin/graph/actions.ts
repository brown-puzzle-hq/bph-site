"use server";
import { db } from "~/server/db";
import { teams, guesses, hints } from "@/db/schema";
import { eq } from "drizzle-orm";
import { INITIAL_PUZZLES } from "~/hunt.config";

export async function getSearchedTeam(teamId: string) {
  const result = await db.query.teams.findFirst({
    where: eq(teams.id, teamId),
    with: {
      unlocks: {
        columns: { puzzleId: true },
      },
      solves: {
        columns: { puzzleId: true },
      },
    },
  });

  if (!result) {
    return { error: "Team not found." };
  }

  const unlocks = result?.unlocks.map((u) => u.puzzleId) || [];
  const unlocksAndInitialPuzzles = [...unlocks, ...INITIAL_PUZZLES];
  const solves = result?.solves.map((s) => s.puzzleId) || [];

  return {
    teamId: teamId,
    unlocks: unlocksAndInitialPuzzles,
    solves: solves,
  };
}

export async function getSearchedPuzzle(teamId: string, puzzleId: string) {
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
        columns: { request: true },
        orderBy: (h) => h.requestTime,
      },
    },
  });

  if (!result) {
    return { error: "Puzzle not found." };
  }

  return {
    puzzleId: puzzleId,
    guesses: result.guesses,
    requestedHints: result.requestedHints
  };
}

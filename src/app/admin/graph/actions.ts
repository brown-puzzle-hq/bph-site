"use server";
import { db } from "~/server/db";
import { teams, puzzles, guesses, hints } from "@/db/schema";
import { eq } from "drizzle-orm";
import { INITIAL_PUZZLES } from "~/hunt.config";

export async function getSearchedTeam(teamId: string) {
  const result = await db.query.teams.findFirst({
    where: eq(teams.id, teamId),
    columns: {
      id: true,
      displayName: true,
      role: true,
      createTime: true,
      finishTime: true,
      members: true,
      interactionMode: true,
      phoneNumber: true,
      solvingLocation: true,
      numCommunity: true,
      hasBox: true,
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

  if (!result) {
    return { error: "Team not found." };
  }

  const unlocks = result?.unlocks.map((u) => u.puzzleId) || [];
  const unlocksAndInitialPuzzles = [...unlocks, ...INITIAL_PUZZLES];
  const solves = result?.solves.map((s) => s.puzzleId) || [];

  return {
    ...result,
    unlocks: unlocksAndInitialPuzzles,
    solves: solves,
  };
}

export async function getSearchedPuzzle(
  teamId: string | null,
  puzzleId: string,
) {
  // If no teamId is provided, return all of the hints made on the puzzle
  if (!teamId) {
    const result = await db.query.puzzles.findFirst({
      where: eq(puzzles.id, puzzleId),
      columns: {},
      with: {
        hints: {
          columns: { id: true, request: true, response: true },
        },
      },
    });
    if (!result) {
      return { error: "Puzzle not found." };
    }
    return {
      puzzleId: puzzleId,
      guesses: null,
      requestedHints: result.hints,
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

  if (!result) {
    return { error: "Puzzle not found." };
  }

  return {
    puzzleId: puzzleId,
    guesses: result.guesses,
    requestedHints: result.requestedHints,
  };
}

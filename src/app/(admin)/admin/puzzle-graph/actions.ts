"use server";
import { auth } from "@/auth";
import { db } from "~/server/db";
import { teams } from "@/db/schema";
import { eq } from "drizzle-orm";
import { INITIAL_PUZZLES } from "~/hunt.config";

export async function getGraphPath(teamId: string) {
  const session = await auth();
  if (session?.user?.role !== "admin") {
    return {
      error: "Not authenticated, please ensure you're on an admin account.",
    };
  }

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
    unlocks: unlocksAndInitialPuzzles,
    solves: solves,
  };
}

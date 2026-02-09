"use server";

import { db } from "@/db/index";
import { solves, unlocks } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { IN_PERSON, REMOTE } from "@/config/client";
import { INITIAL_PUZZLES } from "@/config/server";
import { checkPermissions } from "~/lib/server";

// TODO: the canView functions should return a more specific type.
// They also do not need to be async functions, so we can put them in
// a different file

export type viewStatus = "success" | "not_authenticated" | "not_authorized";

/** Checks that the user can view the puzzle.
 * Admins can always view the puzzle, testsolvers can view the puzzle if it is unlocked,
 * and teams can view the puzzle if the hunt has started AND it is unlocked.
 * Returns a viewStatus string.
 */
export async function canViewPuzzle(puzzleId: string) {
  const currentTime = new Date();

  // If the hunt has ended for everyone, anyone can view the puzzle
  if (currentTime > REMOTE.END_TIME) return "success";

  // Otherwise, they must be signed in
  const { error, user } = await checkPermissions({ level: "userAny" });
  if (error !== null) return "not_authenticated";
  const { id: teamId, role, interactionMode } = user;

  // Admin can always view the puzzle
  if (role === "admin") return "success";

  // If the hunt has ended for in-person teams,
  // in-person teams can view puzzles
  if (interactionMode === "in-person" && currentTime > IN_PERSON.END_TIME)
    return "success";

  // If they are a testsolver, or the hunt has started for them,
  // then check whether they have unlocked the puzzle
  if (
    role === "testsolver" ||
    currentTime >
      (interactionMode === "in-person"
        ? IN_PERSON.START_TIME
        : REMOTE.START_TIME)
  ) {
    const isInitialPuzzle = INITIAL_PUZZLES.includes(puzzleId);
    const isUnlocked = !!(await db.query.unlocks.findFirst({
      columns: { id: true },
      where: and(eq(unlocks.teamId, teamId), eq(unlocks.puzzleId, puzzleId)),
    }));
    return isInitialPuzzle || isUnlocked ? "success" : "not_authorized";
  }

  // The hunt has not started yet and the user is not an admin or testsolver
  return "not_authorized";
}

/** Asserts that the user can view the puzzle. Wrapper around
 * canViewPuzzle. Throws an error if the user cannot view the puzzle.
 */
export async function assertCanViewPuzzle(puzzleId: string) {
  const viewStatus = await canViewPuzzle(puzzleId);
  if (viewStatus === "not_authenticated") {
    throw new Error("Not authenticated.");
  } else if (viewStatus === "not_authorized") {
    throw new Error("Not authorized.");
  }
}

/** Checks whether the user can view the hint. Currently
 * ignores puzzleId. Returns a viewStatus string.
 */
export async function canViewHint(puzzleId: string): Promise<viewStatus> {
  const { error } = await checkPermissions({ level: "userAny" });
  return error ? "not_authenticated" : "success";
}

/** Checks whether the user can view the solution.
 * Does not check whether the solution actually exists.
 * Returns a viewStatus string.
 */
export async function canViewSolution(puzzleId: string): Promise<viewStatus> {
  // If wrapup has released, anyone can view solutions
  if (new Date() > REMOTE.WRAPUP_TIME) return "success";

  // If the hunt has not ended, users must be signed-in
  const { error, user } = await checkPermissions({ level: "userAny" });
  if (error !== null) return "not_authenticated";
  const { id: teamId, role } = user;

  // Admin can always view the solution
  if (role === "admin") return "success";

  // Everyone else needs to have solved the puzzle
  const solved = await db.query.solves.findFirst({
    where: and(eq(solves.teamId, teamId), eq(solves.puzzleId, puzzleId)),
  });

  return solved ? "success" : "not_authorized";
}

/** Checks whether the user can view stats.
 * Currently only allows admins.
 * Returns a viewStatus string.
 */
export async function canViewStats(puzzleId: string): Promise<viewStatus> {
  // If the hunt has ended, anyone can view stats
  if (new Date() > REMOTE.WRAPUP_TIME) return "success";

  // Admin can always view stats
  const { error } = await checkPermissions({ level: "admin" });
  return error ? "not_authorized" : "success";
}

"use server";
import { Session } from "next-auth";
import { db } from "@/db/index";
import { solves, unlocks } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { IN_PERSON, REMOTE, INITIAL_PUZZLES } from "~/hunt.config";

// TODO: the canView functions should return a more specific type.
// They also do not need to be async functions, so we can put them in
// a different file

export type viewStatus = "success" | "not_authenticated" | "not_authorized";

/** Checks whether the user can view the puzzle.
 * Admins can always view the puzzle, testsolvers can view the puzzle if it is unlocked,
 * and teams can view the puzzle if the hunt has started AND it is unlocked.
 * Returns a viewStatus string.
 */
export async function canViewPuzzle(
  puzzleId: string,
  session: Session | null,
): Promise<viewStatus> {
  const currentTime = new Date();

  // If the hunt has ended for everyone, anyone can view the puzzle
  if (currentTime > REMOTE.END_TIME) return "success";
  // Otherwise, they must be signed in
  if (!session?.user?.id) return "not_authenticated";
  // Admin can always view the puzzle
  if (session.user.role == "admin") return "success";

  // If the hunt has ended for in-person teams
  // In-person teams can view puzzles
  if (
    session.user.interactionMode === "in-person" &&
    currentTime > IN_PERSON.END_TIME
  )
    return "success";

  // If they are a testsolver, or the hunt has started for them,
  // then check whether they have unlocked the puzzle
  if (
    session.user.role === "testsolver" ||
    currentTime >
      (session.user.interactionMode === "in-person"
        ? IN_PERSON.START_TIME
        : REMOTE.START_TIME)
  ) {
    const isInitialPuzzle = INITIAL_PUZZLES.includes(puzzleId);
    const isUnlocked = !!(await db.query.unlocks.findFirst({
      columns: { id: true },
      where: and(
        eq(unlocks.teamId, session.user.id),
        eq(unlocks.puzzleId, puzzleId),
      ),
    }));

    return isInitialPuzzle || isUnlocked ? "success" : "not_authorized";
  }

  // The hunt has not started yet and the user is not an admin or testsolver
  return "not_authorized";
}

/** Only users who are logged in can view hints. */
export async function canViewHint(session: Session | null) {
  if (!session?.user?.id) return "not_authenticated";
  else return "success";
}

/** Checks whether the user can view the solution.
 *  Does not check whether the solution actually exists.
 * Returns a viewStatus string.
 */
export async function canViewSolution(
  puzzleId: string,
  session: Session | null,
): Promise<viewStatus> {
  // If wrapup has released, anyone can view solutions
  if (new Date() > REMOTE.WRAPUP_TIME) return "success";
  // If the hunt has not ended, users must be signed-in
  if (!session?.user?.id) return "not_authenticated";
  // Admin can always view the solution
  if (session.user.role == "admin") return "success";

  // Everyone else needs to have solved the puzzle
  const solved = await db.query.solves.findFirst({
    where: and(
      eq(solves.teamId, session.user.id),
      eq(solves.puzzleId, puzzleId),
    ),
  });

  return solved ? "success" : "not_authorized";
}

export async function canViewStats(
  session: Session | null,
): Promise<viewStatus> {
  // If the hunt has ended, anyone can view stats
  if (new Date() > REMOTE.WRAPUP_TIME) return "success";
  // Admin can always view stats
  if (session?.user?.role == "admin") return "success";
  return "not_authorized";
}

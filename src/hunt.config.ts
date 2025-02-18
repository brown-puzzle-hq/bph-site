import { redirect } from "next/navigation";
import { db } from "./server/db";
import { teams, guesses, hints, unlocks } from "./server/db/schema";
import { and, count, eq, ne } from "drizzle-orm";
import { insertUnlock } from "./app/(hunt)/puzzle/actions";
import { Session } from "next-auth";

/** REGISTRATION AND HUNT START */
export const REGISTRATION_START_TIME = new Date("2024-11-17T17:00:00.000Z");
export const REGISTRATION_END_TIME = new Date("2027-11-24T17:00:00Z");

export const IN_PERSON = {
  KICKOFF_DOOR_TIME: new Date("2025-04-12T15:30:00.000Z"),
  KICKOFF_TIME: new Date("2025-04-12T16:00:00.000Z"),
  START_TIME: new Date("2025-04-12T17:00:00.000Z"),
  END_TIME: new Date("2025-04-13T23:00:00Z"),
  WRAPUP_DOOR_TIME: new Date("2025-04-13T23:30:00.000Z"),
  WRAPUP_TIME: new Date("2025-04-14T00:00:00Z"),
};

export const REMOTE = {
  START_TIME: new Date("2025-04-19T16:00:00.000Z"),
  END_TIME: new Date("2025-04-25T16:00:00.000Z"),
  WRAPUP_TIME: new Date("2025-04-26T17:00:00Z"),
};

export const NUMBER_OF_GUESSES_PER_PUZZLE = 20;

/** PUZZLE UNLOCK SYSTEM
 * WARNING: make sure that everything here is a valid puzzle ID.
 * You should really avoid changing anything here after the hunt starts
 */

/** Checks whether the user can view the puzzle. */
export async function canViewPuzzle(puzzleId: string, session: Session | null) {
  const currentTime = new Date();

  // If the hunt has ended for everyone, anyone can view the puzzle
  if (currentTime > REMOTE.END_TIME) {
    return "SUCCESS";
  }

  // Otherwise, they must be signed-in
  if (!session?.user?.id) {
    return "NOT AUTHENTICATED";
  }

  // Admin can always view the puzzle
  if (session.user.role == "admin") {
    return "SUCCESS";
  }

  // If the hunt has ended for in-person teams
  // In-person teams can view puzzles
  if (
    session.user.interactionMode === "in-person" &&
    currentTime > IN_PERSON.END_TIME
  ) {
    return "SUCCESS";
  }

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
    return isInitialPuzzle || isUnlocked ? "SUCCESS" : "NOT AUTHORIZED";
  }

  // The hunt has not started yet and the user is not an admin or testsolver
  redirect("/puzzle");
}

/** Puzzles available at the beginning of the hunt that will never need to be unlocked by the team. */
export const INITIAL_PUZZLES: string[] = [];

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
export const numbersToPuzzles: Record<number, string> = {};
export const puzzlesToNumbers: Record<string, number> = {};
export const puzzleUnlockMap: Record<number, number[]> = {};

/** Returns the next unlock after a puzzle is solved.
 */
export function getNextUnlocks(puzzleId: string) {
  const puzzleNumber = puzzlesToNumbers[puzzleId];
  if (!puzzleNumber) {
    return [];
  }

  const unlockedPuzzles = puzzleUnlockMap[puzzleNumber];
  if (!unlockedPuzzles) {
    return [];
  }

  return unlockedPuzzles.map((number) => numbersToPuzzles[number]!)!;
}

/** Handles puzzle unlocks after a puzzle is solved.
 * This is currently set to a sequential unlock, sorted alphabetically by puzzle name.
 */
export async function unlockPuzzleAfterSolve(teamId: string, puzzleId: string) {
  const nextPuzzles = getNextUnlocks(puzzleId);
  if (nextPuzzles) {
    await insertUnlock(teamId, nextPuzzles);
  }
}

/** Checks whether a team has completed the hunt. This is called every time
 * a team submits a correct guess for a puzzle.
 */
export async function checkFinishHunt(teamId: string, puzzleId: string) {
  // let query = await db.select({ count: count() }).from(puzzles);
  // const numberOfPuzzles = query[0] ? query[0].count : 0;
  //
  // query = await db
  //   .select({ count: count() })
  //   .from(guesses)
  //   .where(and(eq(guesses.teamId, teamId), guesses.isCorrect));
  // const numberOfSolves = query[0] ? query[0].count : 0;
  //
  // if (numberOfPuzzles === numberOfSolves) {
  //   await db
  //     .update(teams)
  //     .set({ finishTime: new Date() })
  //     .where(eq(teams.id, teamId));
  // }

  if (puzzleId == "") {
    await db
      .update(teams)
      .set({ finishTime: new Date() })
      .where(eq(teams.id, teamId));
  }
}

/** Solution drop system */

/** Checks whether the user can view the solution.
 *  Does not check whether the solution actually exists.
 */
export async function canViewSolution(
  puzzleId: string,
  session: Session | null,
) {
  // If the hunt has ended, anyone can view solutions
  if (new Date() > REMOTE.END_TIME) {
    return "SUCESSS";
  }

  // If the hunt has not ended, users must be signed-in
  if (!session?.user?.id) {
    return "NOT AUTHENTICATED";
  }

  // Admin can always view the solution
  if (session.user.role == "admin") {
    return "SUCCESS";
  }

  // Everyone else needs to have solved the puzzle
  const isSolved = !!(await db.query.guesses.findFirst({
    where: and(
      eq(guesses.teamId, session.user.id),
      eq(guesses.puzzleId, puzzleId),
      guesses.isCorrect,
    ),
  }));

  return isSolved ? "SUCCESS" : "NOT AUTHORIZED";
}

/* HINTING SYSTEM
 * Teams currently get a hint request every three hours since the start of the hunt.
 * Teams cannot have more than one outstanding request at a time.
 */

/** Calculates the total number of hints given to a team */
export function getTotalHints(teamId: string, role: string) {
  const initialNumberOfHints =
    role == "admin" || role == "testsolver" ? 1000000 : 1;
  const currentTime = new Date();
  const timeDifference = currentTime.getTime() - IN_PERSON.START_TIME.getTime(); // In milliseconds
  const rate = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
  return initialNumberOfHints + Math.max(Math.floor(timeDifference / rate), 0);
}

/** Calculates the total number of hints available to a team */
export async function getNumberOfHintsRemaining(teamId: string, role: string) {
  const totalHints = getTotalHints(teamId, role);
  const query = await db
    .select({ count: count() })
    .from(hints)
    .where(and(eq(hints.teamId, teamId), ne(hints.status, "refunded")));
  const usedHints = query[0]?.count ? query[0].count : 0;
  return totalHints - usedHints;
}

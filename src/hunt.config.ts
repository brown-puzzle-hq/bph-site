import { db } from "./server/db";
import { hints } from "./server/db/schema";
import { and, count, eq, ne } from "drizzle-orm";

/** REGISTRATION AND HUNT START */
export const REGISTRATION_START_TIME = new Date("2024-11-17T17:00:00.000Z");
export const REGISTRATION_END_TIME = new Date("2030-11-24T17:00:00Z");

export const IN_PERSON = {
  KICKOFF_DOOR_TIME: new Date("2024-04-12T15:30:00.000Z"),
  KICKOFF_TIME: new Date("2024-04-12T16:00:00.000Z"),
  START_TIME: new Date("2024-04-12T17:30:00.000Z"),
  END_TIME: new Date("2030-04-13T23:00:00.000Z"),
  WRAPUP_DOOR_TIME: new Date("2030-04-13T23:30:00.000Z"),
  WRAPUP_TIME: new Date("2030-04-14T00:00:00Z"),
};

export const REMOTE = {
  START_TIME: new Date("2024-04-19T16:00:00.000Z"),
  END_TIME: new Date("2030-04-25T16:00:00.000Z"),
  WRAPUP_TIME: new Date("2030-04-30T17:00:00.000Z"),
};

export type Round = {
  name: string;
  puzzles: string[];
};

/** GUESSES */
export const NUMBER_OF_GUESSES_PER_PUZZLE = 20;

/** PUZZLE UNLOCK SYSTEM
 * WARNING: make sure that everything here is a valid puzzle ID.
 * You should really avoid changing anything here after the hunt starts
 */

/** Puzzles available at the beginning of the hunt that will never need to be unlocked by the team. */
export const INITIAL_PUZZLES: string[] = ["example"];

/** Adjacency list for puzzles */
export const PUZZLE_UNLOCK_MAP: Record<string, string[]> = {};

/** List of puzzles in each round. Each puzzle must be in a round. **/
export const ROUNDS: Round[] = [
  { name: "Example Round", puzzles: ["example"] },
];

/** List of meta puzzles. Solving all of the metas unlocks the runaround. */
export const META_PUZZLES: string[] = [];

/* HINTING SYSTEM
 * Teams currently get a hint request every three hours since the start of the hunt.
 * Teams cannot have more than one outstanding request at a time.
 */

/** Calculates the total number of hints given to a team */
export function getTotalHints(role: string, interactionMode: string) {
  const initialNumberOfHints =
    role == "admin" || role == "testsolver" ? 1e6 : 1;

  const huntStartTime =
    interactionMode === "in-person" ? IN_PERSON.START_TIME : REMOTE.START_TIME;

  const huntEndTime =
    interactionMode === "in-person" ? IN_PERSON.END_TIME : REMOTE.END_TIME;

  const timeDifference =
    Math.min(new Date().getTime(), huntEndTime.getTime()) -
    huntStartTime.getTime();

  const rate =
    interactionMode === "in-person"
      ? 3 * 60 * 60 * 1000 // 3 hours
      : 6 * 60 * 60 * 1000; // 6 hours

  return initialNumberOfHints + Math.max(Math.floor(timeDifference / rate), 0);
}

/** Calculates the total number of hints available to a team */
export async function getNumberOfHintsRemaining(
  teamId: string,
  role: string,
  interactionMode: string,
) {
  const totalHints = getTotalHints(role, interactionMode);
  const query = await db
    .select({ count: count() })
    .from(hints)
    .where(and(eq(hints.teamId, teamId), ne(hints.status, "refunded")));
  const usedHints = query[0]?.count ? query[0].count : 0;
  return totalHints - usedHints;
}

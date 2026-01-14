import "server-only";

import { db } from "@/db/index";
import { hints } from "@/db/schema";
import { and, count, eq, ne } from "drizzle-orm";
import { IN_PERSON, REMOTE } from "./client";

/** PUZZLE UNLOCK SYSTEM
 * WARNING: make sure that everything here is a valid puzzle ID.
 * You should really avoid changing anything here after the hunt starts
 */

/** Puzzles available at the beginning of the hunt that will never need to be unlocked by the team. */
export const INITIAL_PUZZLES: string[] = [
  "example-1",
  "example-2",
  "example-3",
];

/** Adjacency list for puzzles */
// NOTE: every puzzle must be listed here and be associated with a round
// for the src/admin/graph to work
export const PUZZLE_UNLOCK_MAP: Record<string, string[]> = {
  "example-1": ["example-4", "example-5"],
  "example-2": ["example-4", "example-5"],
  "example-3": ["example-4", "example-5"],
  "example-4": ["example-4", "example-5"],
  "example-5": ["example-4", "example-5"],
};

export type Round = {
  name: string;
  puzzles: string[];
};

/** List of puzzles in each round. Each puzzle must be in a round. **/
export const ROUNDS: Round[] = [
  {
    name: "Example Round",
    puzzles: ["example-1", "example-2", "example-3", "example-4", "example-5"],
  },
];

/** List of meta puzzles. Solving all of the metas unlocks the runaround. */
export const META_PUZZLES: string[] = ["example-1"];

/* HINTING SYSTEM
 * Teams currently get a hint request every three hours since the start of the hunt.
 * Teams cannot have more than one outstanding request at a time.
 */

/** Calculates the total number of hints given to a team */
function getTotalHints(role: string, interactionMode: string) {
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

/** ENUMS AND TYPES */

export const SOLVE_TYPE_VALUES = ["guess", "answer_token"] as const;
export type SolveType = (typeof SOLVE_TYPE_VALUES)[number];

export const UNLOCK_TYPE_VALUES = ["guess"] as const;
export type UnlockType = (typeof UNLOCK_TYPE_VALUES)[number];

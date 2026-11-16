/** DO NOT PUT SENSITIVE INFORMATION IN THIS FILE */

export const HUNT_NAME = "Brown Puzzlehunt";
export const HUNT_DOMAIN = "brownpuzzlehunt.com";
export const HUNT_URL = `https://www.${HUNT_DOMAIN}`;

// This is for Resend, the emailing service
// Check /src/lib/comms.ts
export const HUNT_EMAIL = "brownpuzzlehq@gmail.com";

/** TIMING */

export const REGISTRATION_START_TIME = new Date("2026-02-18T15:00:00.000Z");
export const REGISTRATION_END_TIME = new Date("2030-01-01T16:00:00.000Z");

export const IN_PERSON = {
  KICKOFF_DOOR_TIME: new Date("2026-04-11T15:30:00.000Z"),
  KICKOFF_TIME: new Date("2026-04-11T16:00:00.000Z"),
  START_TIME: new Date("2026-04-11T17:00:00.000Z"), // April 11th, 1 PM EDT
  END_TIME: new Date("2026-04-12T23:00:00.000Z"), // April 12th, 7 PM EDT
  WRAPUP_DOOR_TIME: new Date("2026-04-12T23:30:00.000Z"),
  WRAPUP_TIME: new Date("2026-04-13T00:00:00Z"),
};

export const REMOTE = {
  START_TIME: new Date("2026-04-18T16:00:00.000Z"), // April 18th, 12 PM EDT
  END_TIME: new Date("2026-04-24T16:30:00.000Z"), // April 24th, 12:30 PM EDT
  WRAPUP_TIME: new Date("2026-05-01T16:00:00.000Z"), // May 1st, 12 PM EDT
};

/** GUESSES */

export const NUMBER_OF_GUESSES_PER_PUZZLE = 20;

/** Uppercase string and strip all characters except A-Z and 0-9 */
export function sanitizeAnswer(answer: any) {
  return typeof answer === "string"
    ? answer.toUpperCase().replace(/[^A-Z0-9]/g, "")
    : "";
}

/** ENUMS AND TYPES */

/** BEGIN_SNIPPET:ROLE_ENUM */
export const ROLE_VALUES = ["user", "admin", "testsolver"] as const;
/** END_SNIPPET:ROLE_ENUM */
export type Role = (typeof ROLE_VALUES)[number];

/** BEGIN_SNIPPET:INTERACTION_MODE_ENUM */
export const INTERACTION_MODE_VALUES = ["in-person", "remote"] as const;
/** END_SNIPPET:INTERACTION_MODE_ENUM */
export type InteractionMode = (typeof INTERACTION_MODE_VALUES)[number];

export const HINT_STATUS_VALUES = [
  "no_response",
  "answered",
  "refunded",
] as const;
export type HintStatus = (typeof HINT_STATUS_VALUES)[number];

export const SOLVE_TYPE_VALUES = ["guess", "answer_token"] as const;
export type SolveType = (typeof SOLVE_TYPE_VALUES)[number];

export const UNLOCK_TYPE_VALUES = ["guess"] as const;
export type UnlockType = (typeof UNLOCK_TYPE_VALUES)[number];

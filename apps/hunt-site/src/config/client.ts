/** DO NOT PUT SENSITIVE INFORMATION IN THIS FILE */

export const HUNT_NAME = "Puzzlehunt";
export const HUNT_DOMAIN = "puzzlehunt.com";

// This is for Resend, the emailing service
// Check /src/lib/comms.ts
export const HUNT_EMAIL = "puzzlehunt@gmail.com";

/** TIMING */

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
export const ROLE_VALUES = ["admin", "user", "testsolver"] as const;
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

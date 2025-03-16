import { db } from "./server/db";
import { hints } from "./server/db/schema";
import { and, count, eq, ne } from "drizzle-orm";

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

type Sequence = {
  name?: string;
  icon: string;
  puzzles: string[];
};

/** The sequence list is ordered. Sequences that occur earlier in the list
 * will be displayed earlier. Puzzles that occur earlier in the list will
 * be displayed earlier. */
export const SEQUENCES: Sequence[] = [
  {
    name: "Eyes",
    icon: "👁️",
    puzzles: [
      "plagiarism",
      "eye-of-the-storm",
      "genetic-counseling",
      "eye-spy",
      "one-guard-screen",
      "eye-to-eye",
    ],
  },
  {
    name: "Word Bank",
    icon: "🧩",
    puzzles: [
      "youve-got-this-covered",
      "fractal-shanty",
      "study-abroad",
      "fridge-magnets",
    ],
  },
  {
    name: "Guards",
    icon: "💂",
    puzzles: [
      "two-guards-two-doors",
      "ten-guards-ten-doors",
      "two-guards-river",
      "m-guards-n-doors-and-k-choices",
      "one-guard-screen",
      "the-guard-and-the-door",
    ],
  },
  {
    name: "Chain",
    icon: "⛓️",
    puzzles: ["beads", "chain-letters", "red-blue"],
  },
  {
    name: "CD",
    icon: "💿",
    puzzles: [
      "lost-category",
      "youve-got-this-covered",
      "imagine",
      "the-compact-disc",
    ],
  },
  {
    name: "Ben Doyle Squad",
    icon: "✈️",
    puzzles: [
      "find-ben",
      "the-snack-zone",
      "bluenos-puzzle-box",
      "color-transfer",
    ],
  },
  {
    name: "Heist",
    icon: "🏦",
    puzzles: ["heist", "heist-ii", "heist-iii", "the-final-heist"],
  },
  {
    name: "Tree",
    icon: "🌲",
    puzzles: ["whats-my-ride", "opening-sequences", "secret-ingredient"],
  },
  {
    name: "Star",
    icon: "⭐",
    puzzles: [
      "walk-of-fame",
      "galileo-was-wrong",
      "whats-my-ride",
      "constellation",
    ],
  },
  {
    name: "Cards",
    icon: "🃏",
    puzzles: [
      "a-fistful-of-cards",
      "a-fistful-of-cards-ii",
      "a-fistful-of-cards-iii",
      "a-fistful-of-cards-iv",
    ],
  },
  {
    name: "Time",
    icon: "⏰",
    puzzles: ["filming-schedule", "hand-letters", "placeholder-ii"], // Need placeholder
  },
];

/** GUESSES */
export const NUMBER_OF_GUESSES_PER_PUZZLE = 20;

/** PUZZLE UNLOCK SYSTEM
 * WARNING: make sure that everything here is a valid puzzle ID.
 * You should really avoid changing anything here after the hunt starts
 */

/** Puzzles available at the beginning of the hunt that will never need to be unlocked by the team. */
export const INITIAL_PUZZLES: string[] = [
  "walk-of-fame",
  "two-guards-two-doors",
];

/** List of meta puzzles. Solving all of the metas unlocks the runaround. */
export const META_PUZZLES: string[] = [
  "drop-the",
  "aha-erlebnis",
  "balloon-animals",
  "boring-plot",
  "six-degrees",
  "cutting-room-floor",
];

/** Adjacency list for puzzles */
export const PUZZLE_UNLOCK_MAP: Record<string, string[]> = {
  // ACTION
  "walk-of-fame": ["find-ben", "a-fistful-of-cards"],
  "two-guards-two-doors": ["find-ben", "heist"],
  "find-ben": ["filming-schedule"], // walk-of-fame, two-guards-two-doors
  "a-fistful-of-cards": [
    "ten-guards-ten-doors",
    "drop-the",
    "filming-schedule",
  ], // walk-of-fame
  "filming-schedule": [
    "find-ben",
    "a-fistful-of-cards",
    "heist",
    "ten-guards-ten-doors",
    "drop-the",
    "two-guards-river",
  ],
  "drop-the": [],
  heist: ["filming-schedule", "drop-the", "two-guards-river"], // two-guards-two-doors

  // ACTION -> DRAMA
  "ten-guards-ten-doors": [
    "a-fistful-of-cards",
    "filming-schedule",
    "beads",
    "lost-category",
  ],
  "a-fistful-of-cards-ii": ["heist-ii", "youve-got-this-covered"], // ten-guards-ten-doors
  beads: ["heist-ii", "a-fistful-of-cards-ii", "aha-erlebnis"], // ten-guards-ten-doors
  "lost-category": [
    "youve-got-this-covered",
    "a-fistful-of-cards-ii",
    "m-guards-n-doors-and-k-choices",
  ], // ten-guards-ten-doors
  "heist-ii": [
    "a-fistful-of-cards-ii",
    "beads",
    "aha-erlebnis",
    "youve-got-this-covered",
  ],
  "youve-got-this-covered": [
    "heist-ii",
    "beads",
    "lost-category",
    "aha-erlebnis",
    "m-guards-n-doors-and-k-choices",
  ],
  "aha-erlebnis": ["heist-ii", "youve-got-this-covered"],

  // ACTION -> COMEDY
  "two-guards-river": [
    "filming-schedule",
    "heist",
    "peanuts",
    "plagiarism",
    "watching-between-the-lines",
  ],
  peanuts: ["galileo-was-wrong", "one-guard-screen"], // two-guards-river
  plagiarism: ["galileo-was-wrong", "fractal-shanty"], // two-guards-river
  "watching-between-the-lines": ["fractal-shanty"], // two-guards-river
  "galileo-was-wrong": [
    "peanuts",
    "plagiarism",
    "fractal-shanty",
    "one-guard-screen",
    "balloon-animals",
  ],
  "fractal-shanty": [
    "watching-between-the-lines",
    "plagiarism",
    "galileo-was-wrong",
    "balloon-animals",
  ],
  "balloon-animals": ["galileo-was-wrong", "fractal-shanty"],

  // DRAMA -> Adventure
  "m-guards-n-doors-and-k-choices": [
    "heist-ii",
    "youve-got-this-covered",
    "bluenos-puzzle-box",
    "identify-the-piece",
    "piecemeal",
  ],
  "bluenos-puzzle-box": ["the-snack-zone", "imagine", "whats-my-ride"], // m-guards-n-doors-and-k-choices
  narcissism: ["eye-of-the-storm", "piecemeal", "financial-crimes-3"], // m-guards-n-doors-and-k-choices
  "financial-crimes-3": [
    "narcissism",
    "genetic-counseling",
    "eye-spy",
    "the-guard-and-the-door",
  ], // m-guards-n-doors-and-k-choices
  "boring-plot": ["bluenos-puzzle-box", "narcissism", "financial-crimes-3"],
  "whats-my-ride": ["bluenos-puzzle-box"],
  piecemeal: ["once-upon-a-quote", "eye-of-the-storm", "narcissism"],
  "eye-spy": ["bluenos-puzzle-box", "whats-my-ride", "imagine"],
  "identify-the-piece": ["the-snack-zone"],
  "eye-of-the-storm": ["boring-plot", "narcissism"],
  "genetic-counseling": [
    "financial-crimes-3",
    "the-guard-and-the-door",
    "eye-spy",
  ],
  imagine: ["whats-my-ride"],
  "once-upon-a-quote": ["boring-plot"],
  "the-snack-zone": ["imagine"],

  // REALITY -> COMEDY
  "one-guard-screen": [
    "galileo-was-wrong",
    "fractal-shanty",
    "opening-sequences",
    "chain-letters",
  ],
  "opening-sequences": ["a-fistful-of-cards-iii", "hand-letters"],
  "chain-letters": ["hand-letters", "heist-iii"],
  "a-fistful-of-cards-iii": [
    "the-guard-and-the-door",
    "study-abroad",
    "six-degrees",
  ], // opening-sequences
  "hand-letters": ["study-abroad", "are-you-sure", "six-degrees"], // opening-sequences, chain-letters,
  "heist-iii": ["are-you-sure"], // chain-letters
  "study-abroad": [
    "a-fistful-of-cards-iii",
    "hand-letters",
    "are-you-sure",
    "the-guard-and-the-door",
    "six-degrees",
  ],
  "are-you-sure": ["study-abroad", "hand-letters", "heist-iii"],
  "six-degrees": [],
  "cutting-room-floor": [],

  "the-guard-and-the-door": [
    // adventure
    "financial-crimes-3",
    "genetic-counseling",
    // reality
    "study-abroad",
    "a-fistful-of-cards-iii",
    // cerebral
    "secret-ingredient",
    "color-transfer",
    "the-compact-disc",
  ],

  // CEREBRAL
  "red-blue": ["the-final-heist", "eye-to-eye", "fridge-magnets"], // the-guard-and-the-door
  "a-fistful-of-cards-iv": [
    "placeholder-ii",
    "eye-to-eye",
    "secret-ingredient",
    "color-transfer",
    "cutting-room-floor",
  ], // the-guard-and-the-door
  "the-final-heist": [
    "fridge-magnets",
    "eye-to-eye",
    "color-transfer",
    "red-blue",
  ], // the-guard-and-the-door
  "the-compact-disc": ["red-blue", "the-final-heist"], // the-guard-and-the-door
  constellation: [
    "red-blue",
    "a-fistful-of-cards-iv",
    "secret-ingredient",
    "placeholder-i",
  ], // PLACEHOLDER I is blueberry
  "color-transfer": [
    "a-fistful-of-cards-iv",
    "placeholder-i",
    "the-final-heist",
  ],
  "eye-to-eye": [
    "the-final-heist",
    "constellation",
    "fridge-magnets",
    "red-blue",
    "cutting-room-floor",
  ], // PLACEHOLDER II is blueberry
  "secret-ingredient": ["placeholder-i", "a-fistful-of-cards-iv"],
  "fridge-magnets": [
    "constellation",
    "eye-to-eye",
    "the-final-heist",
    "red-blue",
  ],
  "placeholder-i": ["placeholder-ii", "color-transfer", "secret-ingredient"],
  "placeholder-ii": ["placeholder-i", "constellation", "a-fistful-of-cards-iv"],
};

export type Round = {
  name: string;
  puzzles: string[];
};

export const ROUNDS: Round[] = [
  {
    name: "Action",
    puzzles: [
      "drop-the",
      "filming-schedule",
      "heist",
      "find-ben",
      "walk-of-fame",
      "a-fistful-of-cards",
      "two-guards-two-doors",
    ],
  },
  {
    name: "Drama",
    puzzles: [
      "aha-erlebnis",
      "beads",
      "ten-guards-ten-doors",
      "a-fistful-of-cards-ii",
      "lost-category",
      "youve-got-this-covered",
      "heist-ii",
    ],
  },
  {
    name: "Comedy",
    puzzles: [
      "balloon-animals",
      "two-guards-river",
      "galileo-was-wrong",
      "fractal-shanty",
      "watching-between-the-lines",
      "peanuts",
      "plagiarism",
    ],
  },
  {
    name: "Adventure",
    puzzles: [
      "boring-plot",
      "identify-the-piece",
      "once-upon-a-quote",
      "imagine",
      "narcissism",
      "genetic-counseling",
      "financial-crimes-3",
      "m-guards-n-doors-and-k-choices",
      "the-snack-zone",
      "whats-my-ride",
      "eye-spy",
      "piecemeal",
      "eye-of-the-storm",
      "bluenos-puzzle-box",
    ],
  },
  {
    name: "Reality",
    puzzles: [
      "six-degrees",
      "opening-sequences",
      "are-you-sure",
      "chain-letters",
      "hand-letters",
      "one-guard-screen",
      "study-abroad",
      "a-fistful-of-cards-iii",
      "heist-iii",
    ],
  },
  {
    name: "Cerebral",
    puzzles: [
      "cutting-room-floor",
      "color-transfer",
      "the-guard-and-the-door",
      "a-fistful-of-cards-iv",
      "placeholder-i",
      "eye-to-eye",
      "fridge-magnets",
      "red-blue",
      "secret-ingredient",
      "placeholder-ii",
      "constellation",
      "the-compact-disc",
      "the-final-heist",
    ],
  },
];

/* HINTING SYSTEM
 * Teams currently get a hint request every three hours since the start of the hunt.
 * Teams cannot have more than one outstanding request at a time.
 */

/** Calculates the total number of hints given to a team */
export function getTotalHints(teamId: string, role: string) {
  const initialNumberOfHints =
    role == "admin" || role == "testsolver" ? 1e6 : 1;
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

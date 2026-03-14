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
  "big-wheel",
  "applied-probability",
  "schmear-campaign",
  "hash-hash-hash-hash-bang",
  "linesman-training",
];

/** Adjacency list for puzzles */
// NOTE: every puzzle must be listed here and be associated with a round
// for the src/admin/graph to work
export const PUZZLE_UNLOCK_MAP: Record<string, string[]> = {
  "advanced-logical-cooking-techniques": ["one-guard-no-doors"],
  "anthropology-of-computers": [],
  "applied-criminology": [],
  "applied-probability": ["crossoverword"],
  "bar-exam": [],
  "big-wheel": ["sword-placeholder", "wordbrain"],
  "card-game-theory": [
    "mischievous-literature",
    "sunk-modern-naval-investigative-methodology",
    "one-guard-no-doors",
    "multi-clef-composition",
  ],
  crossoverword: [
    "disguised-financial-crimes",
    "applied-probability",
    "wordbrain",
    "schmear-campaign",
  ],
  "cubist-linguistics": [],
  "culinary-chemistry-lab": [
    "one-guard-no-doors",
    "editing-practice",
    "multi-clef-composition",
  ],
  "date-everything-brown": [],
  dirt: ["primary-investigation", "linear-algebra"],
  "disguised-financial-crimes": [
    "going-in-circles",
    "escapism-in-cinema",
    "herculean-math",
    "wordbrain",
    "crossoverword",
  ],
  "editing-practice": ["culinary-chemistry-lab", "one-guard-no-doors"],
  embeddings: [
    "primary-investigation",
    "intro-to-ubpcosu-first-lecture",
    "linear-algebra",
    "year-of-the-honse",
  ],
  "escapism-in-cinema": [
    "disguised-financial-crimes",
    "primary-investigation",
    "going-in-circles",
    "messy-placeholder",
  ],
  "experimental-cardiac-measurement": [],
  "flying-through-the-grid": [
    "movable-chorale",
    "sunk-modern-naval-investigative-methodology",
    "trap-streets",
    "mischievous-literature",
  ],
  "geographical-textiles": [],
  "going-in-circles": [
    "disguised-financial-crimes",
    "sword-placeholder",
    "herculean-math",
    "escapism-in-cinema",
  ],
  "hash-hash-hash-hash-bang": [],
  "herculean-math": [
    "disguised-financial-crimes",
    "primary-investigation",
    "going-in-circles",
    "messy-placeholder",
  ],
  "intro-to-ubpcosu-final-exam": [
    "movable-chorale",
    "trap-streets",
    "intro-to-ubpcosu-first-lecture",
  ],
  "intro-to-ubpcosu-first-lecture": [
    "embeddings",
    "intro-to-ubpcosu-final-exam",
    "messy-placeholder",
  ],
  "linear-algebra": [
    "messy-placeholder",
    "embeddings",
    "dirt",
    "pageant-problems",
  ],
  "linesman-training": [],
  "luck-practicum": [],
  "maritime-studies": [],
  "messy-placeholder": [
    "escapism-in-cinema",
    "linear-algebra",
    "year-of-the-honse",
    "herculean-math",
    "intro-to-ubpcosu-first-lecture",
  ],
  "mischievous-literature": [
    "flying-through-the-grid",
    "rabbit-konundrum",
    "card-game-theory",
    "multi-clef-composition",
  ],
  "movable-chorale": [
    "intro-to-ubpcosu-final-exam",
    "flying-through-the-grid",
    "rabbit-konundrum",
    "year-of-the-honse",
  ],
  "multi-clef-composition": [
    "sunk-modern-naval-investigative-methodology",
    "culinary-chemistry-lab",
    "card-game-theory",
    "mischievous-literature",
  ],
  "one-guard-no-doors": [
    "culinary-chemistry-lab",
    "editing-practice",
    "advanced-logical-cooking-techniques",
    "card-game-theory",
  ],
  "pageant-problems": ["primary-investigation", "linear-algebra"],
  "primary-investigation": [
    "escapism-in-cinema",
    "embeddings",
    "herculean-math",
    "dirt",
    "pageant-problems",
  ],
  psychoceramics: [],
  "rabbit-konundrum": [
    "movable-chorale",
    "sunk-modern-naval-investigative-methodology",
    "trap-streets",
    "mischievous-literature",
  ],
  "schmear-campaign": ["crossoverword", "sword-placeholder", "wordbrain"],
  "sunk-modern-naval-investigative-methodology": [
    "flying-through-the-grid",
    "rabbit-konundrum",
    "card-game-theory",
    "multi-clef-composition",
  ],
  "sword-placeholder": ["going-in-circles", "schmear-campaign", "big-wheel"],
  "theological-chemistry": [],
  "thermodynamic-zoology": [],
  "trap-streets": [
    "intro-to-ubpcosu-final-exam",
    "flying-through-the-grid",
    "rabbit-konundrum",
    "year-of-the-honse",
  ],
  "underwater-basketweaving": [],
  wordbrain: [
    "disguised-financial-crimes",
    "crossoverword",
    "schmear-campaign",
    "big-wheel",
  ],
  "year-of-the-honse": [
    "movable-chorale",
    "embeddings",
    "messy-placeholder",
    "trap-streets",
  ],
};

/** List of meta puzzles. Solving all of the metas unlocks the runaround. */
export const META_PUZZLES: string[] = [
  "anthropology-of-computers",
  "psychoceramics",
  "applied-criminology",
  "theological-chemistry",
  "underwater-basketweaving",
  "geographical-textiles",
  "thermodynamic-zoology",
  "maritime-studies",
  "luck-practicum",
  "bar-exam",
  "cubist-linguistics",
];

export type Round = {
  name: string;
  puzzles: string[];
};

/** List of puzzles in each round. Each puzzle must be in a round. **/
export const ROUNDS: Round[] = [
  {
    name: "Business",
    puzzles: [
      "schmear-campaign",
      "big-wheel",
      "rabbit-konundrum",
      "applied-probability",
      "sword-placeholder",
    ],
  },
  {
    name: "Humanities",
    puzzles: [
      "sunk-modern-naval-investigative-methodology",
      "multi-clef-composition",
      "card-game-theory",
      "mischievous-literature",
      "flying-through-the-grid",
    ],
  },
  {
    name: "Math",
    puzzles: [
      "primary-investigation",
      "herculean-math",
      "messy-placeholder",
      "embeddings",
      "linear-algebra",
    ],
  },
  {
    name: "Performing Arts",
    puzzles: [
      "crossoverword",
      "escapism-in-cinema",
      "going-in-circles",
      "disguised-financial-crimes",
      "wordbrain",
    ],
  },
  {
    name: "Physical Sciences",
    puzzles: [
      "pageant-problems",
      "hash-hash-hash-hash-bang",
      "dirt",
      "linesman-training",
      "experimental-cardiac-measurement",
    ],
  },
  {
    name: "RISD",
    puzzles: [
      "culinary-chemistry-lab",
      "editing-practice",
      "advanced-logical-cooking-techniques",
      "date-everything-brown",
      "one-guard-no-doors",
    ],
  },
  {
    name: "Social Sciences",
    puzzles: [
      "movable-chorale",
      "intro-to-ubpcosu-final-exam",
      "trap-streets",
      "intro-to-ubpcosu-first-lecture",
      "year-of-the-honse",
    ],
  },
  {
    name: "Backpack",
    puzzles: META_PUZZLES,
  },
];

export type PoolUnlock = {
  name: string;
  threshold: number;
  feeders: string[];
};

export const POOL_UNLOCKS: PoolUnlock[] = [
  {
    name: "applied-criminology",
    threshold: 3,
    feeders: [
      "schmear-campaign",
      "big-wheel",
      "applied-probability",
      "sword-placeholder",
      "herculean-math",
      "crossoverword",
      "going-in-circles",
      "disguised-financial-crimes",
      "wordbrain",
    ],
  },
  {
    name: "cubist-linguistics",
    threshold: 3,
    feeders: [
      "mischievous-literature",
      "disguised-financial-crimes",
      "wordbrain",
      "trap-streets",
      "intro-to-ubpcosu-first-lecture",
    ],
  },
  {
    name: "underwater-basketweaving",
    threshold: 4,
    feeders: [
      "messy-placeholder",
      "crossoverword",
      "going-in-circles",
      "hash-hash-hash-hash-bang",
      "culinary-chemistry-lab",
    ],
  },
  {
    name: "anthropology-of-computers",
    threshold: 6,
    feeders: [
      "flying-through-the-grid",
      "primary-investigation",
      "messy-placeholder",
      "embeddings",
      "linear-algebra",
      "dirt",
      "movable-chorale",
      "trap-streets",
      "intro-to-ubpcosu-first-lecture",
      "year-of-the-honse",
    ],
  },
  {
    name: "thermodynamic-zoology",
    threshold: 5,
    feeders: [
      "primary-investigation",
      "embeddings",
      "linesman-training",
      "experimental-cardiac-measurement",
      "date-everything-brown",
      "intro-to-ubpcosu-final-exam",
      "year-of-the-honse",
    ],
  },
  {
    name: "maritime-studies",
    threshold: 3,
    feeders: [
      "big-wheel",
      "sunk-modern-naval-investigative-methodology",
      "crossoverword",
      "advanced-logical-cooking-techniques",
      "movable-chorale",
    ],
  },
  {
    name: "luck-practicum",
    threshold: 4,
    feeders: [
      "rabbit-konundrum",
      "escapism-in-cinema",
      "pageant-problems",
      "experimental-cardiac-measurement",
      "intro-to-ubpcosu-final-exam",
    ],
  },
  {
    name: "bar-exam",
    threshold: 4,
    feeders: [
      "applied-probability",
      "sword-placeholder",
      "linear-algebra",
      "date-everything-brown",
      "one-guard-no-doors",
    ],
  },
  {
    name: "geographical-textiles",
    threshold: 5,
    feeders: [
      "schmear-campaign",
      "sunk-modern-naval-investigative-methodology",
      "multi-clef-composition",
      "hash-hash-hash-hash-bang",
      "editing-practice",
      "date-everything-brown",
      "year-of-the-honse",
    ],
  },
  {
    name: "theological-chemistry",
    threshold: 3,
    feeders: [
      "multi-clef-composition",
      "card-game-theory",
      "flying-through-the-grid",
      "herculean-math",
      "dirt",
    ],
  },
  {
    name: "psychoceramics",
    threshold: 7,
    feeders: [
      "rabbit-konundrum",
      "card-game-theory",
      "mischievous-literature",
      "escapism-in-cinema",
      "pageant-problems",
      "linesman-training",
      "culinary-chemistry-lab",
      "editing-practice",
      "advanced-logical-cooking-techniques",
      "date-everything-brown",
      "one-guard-no-doors",
    ],
  },
  {
    name: "experimental-cardiac-measurement",
    threshold: 3,
    feeders: [
      "pageant-problems",
      "hash-hash-hash-hash-bang",
      "dirt",
      "linesman-training",
    ],
  },
  {
    name: "editing-practice",
    threshold: 3,
    feeders: [
      "pageant-problems",
      "hash-hash-hash-hash-bang",
      "dirt",
      "linesman-training",
    ],
  },
  {
    name: "advanced-logical-cooking-techniques",
    threshold: 3,
    feeders: [
      "schmear-campaign",
      "big-wheel",
      "rabbit-konundrum",
      "applied-probability",
      "sword-placeholder",
    ],
  },
  {
    name: "date-everything-brown",
    threshold: 3,
    feeders: [
      "schmear-campaign",
      "big-wheel",
      "rabbit-konundrum",
      "applied-probability",
      "sword-placeholder",
    ],
  },
];

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

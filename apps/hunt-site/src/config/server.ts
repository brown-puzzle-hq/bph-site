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
  "schmear-campaigns",
  "scacchic-fabrication",
  "linesman-training",
];

/** Adjacency list for puzzles */
// NOTE: every puzzle must be listed here and be associated with a round
// for the src/admin/graph to work
export const PUZZLE_UNLOCK_MAP: Record<string, string[]> = {
  "advanced-logical-cooking-techniques": ["topics-in-guard-door-theory"],
  "anthropology-of-computers": [],
  "applied-criminology": [],
  "applied-probability": [
    "serialized-storytelling",
    "architecture-on-college-hill",
  ],
  "bar-exam": [],
  "big-wheel": ["architecture-on-college-hill", "characters-in-flight"],
  "card-game-theory": [
    "mischievous-literature",
    "sunk-modern-naval-investigative-methodology",
    "topics-in-guard-door-theory",
    "multi-clef-composition",
  ],
  "serialized-storytelling": [
    "disguised-financial-crimes",
    "characters-in-flight",
  ],
  "cubist-linguistics": [],
  "culinary-chemistry-lab": [
    "topics-in-guard-door-theory",
    "editing-practice",
    "multi-clef-composition",
  ],
  "how-to-get-your-heart-broken": ["analogical-semantics", "linear-algebra"],
  dirt: ["primary-investigation", "linear-algebra"],
  "disguised-financial-crimes": [
    "going-in-circles",
    "escapism-in-cinema",
    "herculean-math",
    "characters-in-flight",
    "serialized-storytelling",
  ],
  "editing-practice": ["culinary-chemistry-lab", "topics-in-guard-door-theory"],
  "analogical-semantics": [
    "primary-investigation",
    "ubpcosu-i",
    "linear-algebra",
    "year-of-the-honse",
  ],
  "escapism-in-cinema": [
    "disguised-financial-crimes",
    "primary-investigation",
    "going-in-circles",
    "how-to-get-your-heart-broken",
  ],
  "experimental-cardiac-measurement": [],
  "avionic-intersectionality": [
    "collaborative-chorale",
    "sunk-modern-naval-investigative-methodology",
    "trap-streets",
    "mischievous-literature",
  ],
  "geographical-textiles": [],
  "going-in-circles": [
    "disguised-financial-crimes",
    "architecture-on-college-hill",
    "herculean-math",
    "escapism-in-cinema",
    "how-to-get-your-heart-broken",
  ],
  "scacchic-fabrication": ["advanced-logical-cooking-techniques"],
  "herculean-math": [
    "disguised-financial-crimes",
    "primary-investigation",
    "going-in-circles",
    "itty-bitty-kitties",
  ],
  "ubpcosu-ii": ["collaborative-chorale", "trap-streets", "ubpcosu-i"],
  "ubpcosu-i": ["analogical-semantics", "ubpcosu-ii", "itty-bitty-kitties"],
  "linear-algebra": [
    "itty-bitty-kitties",
    "analogical-semantics",
    "dirt",
    "voting-dynamics",
  ],
  "linesman-training": ["advanced-logical-cooking-techniques"],
  "luck-practicum": [],
  "maritime-studies": [],
  "itty-bitty-kitties": [
    "escapism-in-cinema",
    "linear-algebra",
    "year-of-the-honse",
    "herculean-math",
    "ubpcosu-i",
  ],
  "mischievous-literature": [
    "avionic-intersectionality",
    "rabbit-nundrum",
    "card-game-theory",
    "multi-clef-composition",
  ],
  "collaborative-chorale": [
    "avionic-intersectionality",
    "rabbit-nundrum",
    "year-of-the-honse",
  ],
  "multi-clef-composition": [
    "sunk-modern-naval-investigative-methodology",
    "culinary-chemistry-lab",
    "card-game-theory",
    "mischievous-literature",
  ],
  "topics-in-guard-door-theory": [
    "culinary-chemistry-lab",
    "editing-practice",
    "advanced-logical-cooking-techniques",
    "card-game-theory",
  ],
  "voting-dynamics": ["primary-investigation", "linear-algebra"],
  "primary-investigation": [
    "escapism-in-cinema",
    "analogical-semantics",
    "herculean-math",
    "dirt",
    "voting-dynamics",
  ],
  psychoceramics: [],
  "rabbit-nundrum": [
    "collaborative-chorale",
    "sunk-modern-naval-investigative-methodology",
    "trap-streets",
    "mischievous-literature",
  ],
  "schmear-campaigns": [
    "serialized-storytelling",
    "architecture-on-college-hill",
    "characters-in-flight",
  ],
  "sunk-modern-naval-investigative-methodology": [
    "avionic-intersectionality",
    "rabbit-nundrum",
    "card-game-theory",
    "multi-clef-composition",
  ],
  "architecture-on-college-hill": ["going-in-circles"],
  "theological-chemistry": [],
  "thermodynamic-zoology": [],
  "trap-streets": [
    "avionic-intersectionality",
    "rabbit-nundrum",
    "year-of-the-honse",
  ],
  "underwater-basketweaving": [],
  "characters-in-flight": [
    "disguised-financial-crimes",
    "serialized-storytelling",
  ],
  "year-of-the-honse": [
    "collaborative-chorale",
    "analogical-semantics",
    "itty-bitty-kitties",
    "trap-streets",
  ],
  "fifth-year-masters": [],
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
  "fifth-year-masters",
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
      "schmear-campaigns",
      "big-wheel",
      "rabbit-nundrum",
      "applied-probability",
      "architecture-on-college-hill",
    ],
  },
  {
    name: "Humanities",
    puzzles: [
      "sunk-modern-naval-investigative-methodology",
      "multi-clef-composition",
      "card-game-theory",
      "mischievous-literature",
      "avionic-intersectionality",
    ],
  },
  {
    name: "Math",
    puzzles: [
      "primary-investigation",
      "herculean-math",
      "itty-bitty-kitties",
      "analogical-semantics",
      "linear-algebra",
    ],
  },
  {
    name: "Performing Arts",
    puzzles: [
      "serialized-storytelling",
      "escapism-in-cinema",
      "going-in-circles",
      "disguised-financial-crimes",
      "characters-in-flight",
    ],
  },
  {
    name: "Physical Sciences",
    puzzles: [
      "voting-dynamics",
      "scacchic-fabrication",
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
      "how-to-get-your-heart-broken",
      "topics-in-guard-door-theory",
    ],
  },
  {
    name: "Social Sciences",
    puzzles: [
      "collaborative-chorale",
      "ubpcosu-ii",
      "trap-streets",
      "ubpcosu-i",
      "year-of-the-honse",
    ],
  },
  {
    name: "Backpack",
    puzzles: META_PUZZLES.filter((puzzle) => puzzle !== "fifth-year-masters"),
  },
  {
    name: "Capstone: Fifth Year Master's",
    puzzles: ["fifth-year-masters"],
  },
];

export const ALL_PUZZLES = ROUNDS.flatMap((round) => round.puzzles);

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
      "schmear-campaigns",
      "big-wheel",
      "applied-probability",
      "architecture-on-college-hill",
      "herculean-math",
      "serialized-storytelling",
      "going-in-circles",
      "disguised-financial-crimes",
      "characters-in-flight",
    ],
  },
  {
    name: "cubist-linguistics",
    threshold: 3,
    feeders: [
      "mischievous-literature",
      "disguised-financial-crimes",
      "advanced-logical-cooking-techniques",
      "characters-in-flight",
      "trap-streets",
      "ubpcosu-i",
    ],
  },
  {
    name: "underwater-basketweaving",
    threshold: 4,
    feeders: [
      "itty-bitty-kitties",
      "serialized-storytelling",
      "going-in-circles",
      "scacchic-fabrication",
      "culinary-chemistry-lab",
    ],
  },
  {
    name: "anthropology-of-computers",
    threshold: 6,
    feeders: [
      "avionic-intersectionality",
      "primary-investigation",
      "itty-bitty-kitties",
      "analogical-semantics",
      "linear-algebra",
      "dirt",
      "collaborative-chorale",
      "trap-streets",
      "ubpcosu-i",
      "year-of-the-honse",
    ],
  },
  {
    name: "thermodynamic-zoology",
    threshold: 5,
    feeders: [
      "primary-investigation",
      "analogical-semantics",
      "linesman-training",
      "experimental-cardiac-measurement",
      "how-to-get-your-heart-broken",
      "ubpcosu-ii",
      "year-of-the-honse",
    ],
  },
  {
    name: "maritime-studies",
    threshold: 3,
    feeders: [
      "big-wheel",
      "sunk-modern-naval-investigative-methodology",
      "serialized-storytelling",
      "advanced-logical-cooking-techniques",
      "collaborative-chorale",
    ],
  },
  {
    name: "luck-practicum",
    threshold: 4,
    feeders: [
      "rabbit-nundrum",
      "escapism-in-cinema",
      "voting-dynamics",
      "experimental-cardiac-measurement",
      "ubpcosu-ii",
    ],
  },
  {
    name: "bar-exam",
    threshold: 4,
    feeders: [
      "applied-probability",
      "architecture-on-college-hill",
      "linear-algebra",
      "how-to-get-your-heart-broken",
      "topics-in-guard-door-theory",
    ],
  },
  {
    name: "geographical-textiles",
    threshold: 5,
    feeders: [
      "schmear-campaigns",
      "sunk-modern-naval-investigative-methodology",
      "multi-clef-composition",
      "scacchic-fabrication",
      "editing-practice",
      "how-to-get-your-heart-broken",
      "year-of-the-honse",
    ],
  },
  {
    name: "theological-chemistry",
    threshold: 3,
    feeders: [
      "multi-clef-composition",
      "card-game-theory",
      "avionic-intersectionality",
      "herculean-math",
      "dirt",
    ],
  },
  {
    name: "psychoceramics",
    threshold: 7,
    feeders: [
      "rabbit-nundrum",
      "card-game-theory",
      "mischievous-literature",
      "escapism-in-cinema",
      "voting-dynamics",
      "linesman-training",
      "culinary-chemistry-lab",
      "editing-practice",
      "advanced-logical-cooking-techniques",
      "how-to-get-your-heart-broken",
      "topics-in-guard-door-theory",
    ],
  },
  {
    name: "experimental-cardiac-measurement",
    threshold: 3,
    feeders: [
      "voting-dynamics",
      "scacchic-fabrication",
      "dirt",
      "linesman-training",
    ],
  },
  {
    name: "editing-practice",
    threshold: 3,
    feeders: [
      "voting-dynamics",
      "scacchic-fabrication",
      "dirt",
      "linesman-training",
    ],
  },
  {
    name: "fifth-year-masters",
    threshold: 11,
    feeders: META_PUZZLES.filter((puzzle) => puzzle !== "fifth-year-masters"),
  },
];

export const FEEDER_ORDER: Record<string, number> = {
  "anthropology-of-computers": 1,
  "applied-criminology": 2,
  "bar-exam": 3,
  "cubist-linguistics": 4,
  "geographical-textiles": 5,
  "luck-practicum": 6,
  "maritime-studies": 7,
  psychoceramics: 8,
  "theological-chemistry": 9,
  "thermodynamic-zoology": 10,
  "underwater-basketweaving": 11,
  "rabbit-nundrum": 1,
  "applied-probability": 2,
  "big-wheel": 3,
  "architecture-on-college-hill": 4,
  "schmear-campaigns": 5,
  "mischievous-literature": 1,
  "card-game-theory": 2,
  "sunk-modern-naval-investigative-methodology": 3,
  "avionic-intersectionality": 4,
  "multi-clef-composition": 5,
  "itty-bitty-kitties": 1,
  "herculean-math": 2,
  "primary-investigation": 3,
  "analogical-semantics": 4,
  "linear-algebra": 5,
  "serialized-storytelling": 1,
  "going-in-circles": 2,
  "escapism-in-cinema": 3,
  "disguised-financial-crimes": 4,
  "characters-in-flight": 5,
  "linesman-training": 1,
  "voting-dynamics": 2,
  dirt: 3,
  "scacchic-fabrication": 4,
  "experimental-cardiac-measurement": 5,
  "topics-in-guard-door-theory": 1,
  "how-to-get-your-heart-broken": 2,
  "culinary-chemistry-lab": 3,
  "advanced-logical-cooking-techniques": 4,
  "editing-practice": 5,
  "ubpcosu-i": 1,
  "trap-streets": 2,
  "ubpcosu-ii": 3,
  "year-of-the-honse": 4,
  "collaborative-chorale": 5,
};

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
    Math.min(Date.now(), huntEndTime.getTime()) - huntStartTime.getTime();

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

/** Duration bounds for Blueno solve time gimmick */
export const MIN_SOLVE_DELAY = 5 * 1000; // 5 seconds
export const MAX_SOLVE_DELAY = 5 * 60 * 1000; // 5 minutes
export const MIN_BLUENO_TIME = 30 * 1000; // 30 seconds

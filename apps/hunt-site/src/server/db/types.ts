import type { InferSelectModel } from "drizzle-orm";
import type {
  teams,
  puzzles,
  unlocks,
  solves,
  guesses,
  hints,
  replies,
  errata,
  feedback,
  events,
  answerTokens,
} from "./schema";

export type Team = InferSelectModel<typeof teams>;
export type Puzzle = InferSelectModel<typeof puzzles>;
export type Unlock = InferSelectModel<typeof unlocks>;
export type Solve = InferSelectModel<typeof solves>;
export type Guess = InferSelectModel<typeof guesses>;
export type Hint = InferSelectModel<typeof hints>;
export type Reply = InferSelectModel<typeof replies>;
export type Erratum = InferSelectModel<typeof errata>;
export type Feedback = InferSelectModel<typeof feedback>;
export type Event = InferSelectModel<typeof events>;
export type AnswerToken = InferSelectModel<typeof answerTokens>;

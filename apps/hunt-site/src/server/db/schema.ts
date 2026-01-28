import { relations } from "drizzle-orm";
import {
  boolean,
  index,
  pgTableCreator,
  pgEnum,
  serial,
  text,
  timestamp,
  unique,
  varchar,
} from "drizzle-orm/pg-core";
import {
  ROLE_VALUES,
  INTERACTION_MODE_VALUES,
  HINT_STATUS_VALUES,
  SOLVE_TYPE_VALUES,
  UNLOCK_TYPE_VALUES,
} from "@/config/client";

/* Naming conventions:
- Table names in TS are pluralized and camelCase (`teamRelations`)
- Column names in TS are singular and camelCase (`teamId`)
- All identfiers in Postgres are singular and snake_case (`team_relation` and `team_id`)
- Verbs are present tense (`createTime` instead of `createdTime` or `creationTime`)
- All `time` columns are absolute datatime with timezone, not an offset of some time
*/

export const createTable = pgTableCreator((name) => `hunt_site_${name}`);

export const roleEnum = pgEnum("role", ROLE_VALUES);
export const interactionModeEnum = pgEnum(
  "interaction_type",
  INTERACTION_MODE_VALUES,
);
export const hintStatusEnum = pgEnum("status", HINT_STATUS_VALUES);
export const solveTypeEnum = pgEnum("solve_type", SOLVE_TYPE_VALUES);
export const unlockTypeEnum = pgEnum("unlock_type", UNLOCK_TYPE_VALUES);

// NOTE: If you change the team schema, remember to update seed.ts
/** BEGIN_SNIPPET:TEAM_SCHEMA */
export const teams = createTable("team", {
  id: varchar("id", { length: 255 }).primaryKey(), // login username
  displayName: varchar("display_name", { length: 255 }).notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  role: roleEnum("role").notNull().default("user"),
  primaryEmail: varchar("primary_email", { length: 255 }).notNull(),
  members: text("members").notNull().default("[]"),
  interactionMode: interactionModeEnum("interaction_type").notNull(),
  createTime: timestamp("create_time", { withTimezone: true })
    .notNull()
    .defaultNow(),
  finishTime: timestamp("finish_time", { withTimezone: true }),
});
/** END_SNIPPET:TEAM_SCHEMA */

export const puzzles = createTable("puzzle", {
  // This is also the slug used in URLS to identify this puzzle
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  // Human-readable name that can be changed at any time
  name: varchar("name", { length: 255 }).notNull(),
  answer: varchar("answer", { length: 255 }).notNull(),
});

// Unlocks may happen when a team guesses the answer correctly,
// when there is a time unlock, or when a team uses an answer token
export const unlocks = createTable(
  "unlock",
  {
    id: serial("id").primaryKey(),
    puzzleId: varchar("puzzle_id")
      .notNull()
      .references(() => puzzles.id, { onDelete: "cascade" }),
    teamId: varchar("team_id")
      .notNull()
      .references(() => teams.id, { onDelete: "cascade" }),
    unlockTime: timestamp("unlock_time", { withTimezone: true })
      .notNull()
      .defaultNow(),
    type: unlockTypeEnum("type").notNull().default("guess"),
  },
  (table) => {
    return {
      unique_unlocks_team_puzzle: unique("unlock_team_puzzle").on(
        table.teamId,
        table.puzzleId,
      ),
    };
  },
);

// Solves may happen when a team guesses an answer correctly
// Or when a team uses an answer token
export const solves = createTable(
  "solve",
  {
    id: serial("id").primaryKey(),
    puzzleId: varchar("puzzle_id")
      .notNull()
      .references(() => puzzles.id, { onDelete: "cascade" }),
    teamId: varchar("team_id")
      .notNull()
      .references(() => teams.id, { onDelete: "cascade" }),
    solveTime: timestamp("solve_time", { withTimezone: true })
      .notNull()
      .defaultNow(),
    type: solveTypeEnum("type").notNull().default("guess"),
  },
  (table) => {
    return {
      unique_solves_team_puzzle: unique("solve_team_puzzle").on(
        table.teamId,
        table.puzzleId,
      ),
    };
  },
);

export const guesses = createTable(
  "guess",
  {
    id: serial("id").primaryKey(),
    puzzleId: varchar("puzzle_id")
      .notNull()
      .references(() => puzzles.id, { onDelete: "cascade" }),
    teamId: varchar("team_id")
      .notNull()
      .references(() => teams.id, { onDelete: "cascade" }),
    guess: varchar("guess", { length: 255 }).notNull(),
    isCorrect: boolean("is_correct").notNull(),
    submitTime: timestamp("submit_time", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => {
    return {
      unique_guesses_team_puzzle_guess: unique("guess_team_puzzle_guess").on(
        table.teamId,
        table.puzzleId,
        table.guess,
      ),
    };
  },
);

export const hints = createTable("hint", {
  id: serial("id").primaryKey(),
  puzzleId: varchar("puzzle_id")
    .notNull()
    .references(() => puzzles.id, { onDelete: "cascade" }),
  teamId: varchar("team_id")
    .notNull()
    .references(() => teams.id, { onDelete: "cascade" }),
  request: text("request").notNull(),
  requestTime: timestamp("request_time", { withTimezone: true })
    .notNull()
    .defaultNow(),
  claimer: varchar("claimer").references(() => teams.id),
  claimTime: timestamp("claim_time", { withTimezone: true }),
  response: text("response"),
  responseTime: timestamp("response_time", { withTimezone: true }),
  status: hintStatusEnum("status").notNull().default("no_response"),
});

export const replies = createTable(
  "reply",
  {
    id: serial("id").primaryKey(),
    hintId: serial("hint_id")
      .notNull()
      .references(() => hints.id, { onDelete: "cascade" }),
    userId: varchar("user_id")
      .notNull()
      .references(() => teams.id, { onDelete: "cascade" }),
    message: text("message").notNull(),
    time: timestamp("time", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => {
    return {
      hint_idx: index("hint_idx").on(table.hintId),
    };
  },
);

export const errata = createTable("erratum", {
  id: serial("id").primaryKey(),
  puzzleId: varchar("puzzle_id")
    .notNull()
    .references(() => puzzles.id, { onDelete: "cascade" }),
  timestamp: timestamp("timestamp", { withTimezone: true })
    .notNull()
    .defaultNow(),
  description: text("description").notNull(),
});

export const feedback = createTable("feedback", {
  id: serial("id").primaryKey(),
  teamId: varchar("team_id")
    .notNull()
    .references(() => teams.id, { onDelete: "cascade" }),
  timestamp: timestamp("timestamp", { withTimezone: true })
    .notNull()
    .defaultNow(),
  description: text("feedback").notNull(),
});

export const events = createTable("event", {
  id: varchar("id", { length: 255 }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  answer: varchar("answer", { length: 255 }).notNull(),
  startTime: varchar("start_time").notNull(),
  description: text("description").notNull(),
});

export const answerTokens = createTable(
  "answer_token",
  {
    id: serial("id").primaryKey(),
    teamId: varchar("team_id")
      .notNull()
      .references(() => teams.id, {
        onDelete: "cascade",
      }),
    eventId: varchar("event_id")
      .notNull()
      .references(() => events.id, {
        onDelete: "cascade",
      }),
    timestamp: timestamp("timestamp", { withTimezone: true })
      .notNull()
      .defaultNow(),
    // This is the puzzle that the token was used for
    puzzleId: varchar("puzzle_id").references(() => puzzles.id, {
      onDelete: "set null",
    }),
  },
  (table) => ({
    unique_tokens_team_event: unique("unique_token_team_event").on(
      table.teamId,
      table.eventId,
    ),
  }),
);

export const teamRelations = relations(teams, ({ many }) => ({
  unlocks: many(unlocks),
  guesses: many(guesses),
  // Hints requested by this team
  requestedHints: many(hints, { relationName: "requested_hints" }),
  // Hints claimed by this admin "team"
  claimedHints: many(hints, { relationName: "claimed_hints" }),
  answerTokens: many(answerTokens),
  solves: many(solves),
}));

export const puzzleRelations = relations(puzzles, ({ many }) => ({
  unlocks: many(unlocks),
  guesses: many(guesses),
  hints: many(hints),
  errata: many(errata),
  solves: many(solves),
  tokens: many(answerTokens),
}));

export const unlockRelations = relations(unlocks, ({ one }) => ({
  team: one(teams, {
    fields: [unlocks.teamId],
    references: [teams.id],
  }),
  puzzle: one(puzzles, {
    fields: [unlocks.puzzleId],
    references: [puzzles.id],
  }),
}));

export const solveRelations = relations(solves, ({ one }) => ({
  team: one(teams, {
    fields: [solves.teamId],
    references: [teams.id],
  }),
  puzzle: one(puzzles, {
    fields: [solves.puzzleId],
    references: [puzzles.id],
  }),
}));

export const guessRelations = relations(guesses, ({ one }) => ({
  team: one(teams, {
    fields: [guesses.teamId],
    references: [teams.id],
  }),
  puzzle: one(puzzles, {
    fields: [guesses.puzzleId],
    references: [puzzles.id],
  }),
}));

export const hintRelations = relations(hints, ({ one, many }) => ({
  team: one(teams, {
    fields: [hints.teamId],
    references: [teams.id],
    relationName: "requested_hints",
  }),
  puzzle: one(puzzles, {
    fields: [hints.puzzleId],
    references: [puzzles.id],
  }),
  claimer: one(teams, {
    fields: [hints.claimer],
    references: [teams.id],
    relationName: "claimed_hints",
  }),
  replies: many(replies),
}));

export const replyRelations = relations(replies, ({ one }) => ({
  hint: one(hints, {
    fields: [replies.hintId],
    references: [hints.id],
  }),
  user: one(teams, {
    fields: [replies.userId],
    references: [teams.id],
  }),
}));

export const erratumRelations = relations(errata, ({ one }) => ({
  puzzle: one(puzzles, {
    fields: [errata.puzzleId],
    references: [puzzles.id],
  }),
}));

export const eventRelations = relations(events, ({ many }) => ({
  tokens: many(answerTokens),
}));

export const answerTokenRelations = relations(answerTokens, ({ one }) => ({
  team: one(teams, {
    fields: [answerTokens.teamId],
    references: [teams.id],
  }),
  event: one(events, {
    fields: [answerTokens.eventId],
    references: [events.id],
  }),
  puzzle: one(puzzles, {
    fields: [answerTokens.puzzleId],
    references: [puzzles.id],
  }),
}));

import { relations, InferSelectModel } from "drizzle-orm";
import {
  boolean,
  index,
  pgTableCreator,
  pgEnum,
  serial,
  integer,
  text,
  timestamp,
  unique,
  varchar,
} from "drizzle-orm/pg-core";

/* Naming conventions:
- Table names in TS are pluralized and camelCase (`teamRelations`)
- Column names in TS are singular and camelCase (`teamId`)
- All identfiers in Postgres are singular and snake_case (`team_relation` and `team_id`)
- Verbs are present tense (`createTime` instead of `createdTime` or `creationTime`)
- All `time` columns are absolute datatime with timezone, not an offset of some time
*/

export const createTable = pgTableCreator((name) => `bph_site_${name}`);

// TODO: change "user" to "participant"
export const roleEnum = pgEnum("role", ["admin", "user", "testsolver"]);

export const interactionModeEnum = pgEnum("interaction_type", [
  "in-person",
  "remote",
]);

export const hintStatusEnum = pgEnum("status", [
  "no_response",
  "answered",
  "refunded",
]);

export const solveTypeEnum = pgEnum("solve_type", ["guess", "answer_token"]);

export const unlockTypeEnum = pgEnum("unlock_type", [
  "guess",
  /* "time_unlock" */
]);

export const teams = createTable("team", {
  id: varchar("id", { length: 255 }).primaryKey(), // Also acts as a login username
  displayName: varchar("display_name", { length: 255 }).notNull(), // For display
  password: varchar("password", { length: 255 }).notNull(),
  role: roleEnum("role").notNull().default("user"),
  members: text("members").notNull().default("[]"),
  interactionMode: interactionModeEnum("interaction_type").notNull(),
  createTime: timestamp("create_time", { withTimezone: true })
    .notNull()
    .defaultNow(),
  finishTime: timestamp("finish_time", { withTimezone: true }),
  // TODO: rename this to registerTime

  // Only for in-person teams
  // NOTE: defaults seem to not be working, entries still get added with NULL by default
  numCommunity: varchar("num_community", { length: 31 }).notNull().default(""),
  phoneNumber: varchar("phone_number", { length: 31 }).notNull().default(""),
  roomNeeded: boolean("room_needed").notNull().default(false),
  solvingLocation: varchar("solving_location", { length: 255 })
    .notNull()
    .default(""),
  wantsBox: boolean("wants_box"),
  hasBox: boolean("has_box").notNull().default(false),

  // Not included:
  // allow_time_unlocks, total_hints_awarded, total_free_answers_awarded
  // last_solve_time, is_prerelease_testsolver, is_hidden
});

export const puzzles = createTable("puzzle", {
  // This is also the slug used in URLS to identify this puzzle
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  // Human-readable name that can be changed at any time
  name: varchar("name", { length: 255 }).notNull(),
  answer: varchar("answer", { length: 255 }).notNull(),
  // Not included:
  // body_template, round, order, is_meta, emoji
  // unlock_hours, unlock_global, unlock_local
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
  // TODO: change this idx to the primaryKey of the table later
  (table) => {
    return {
      team_and_puzzle_idx: index("unlocks_team_puzzle_idx").on(
        table.teamId,
        table.puzzleId,
      ),
      unique_team_and_puzzle: unique("team_and_puzzle").on(
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
  // TODO: change this idx to the primaryKey of the table later
  (table) => {
    return {
      team_and_puzzle_idx: index("solves_team_puzzle_idx").on(
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
      team_and_puzzle_idx: index("guesses_team_and_puzzle_idx").on(
        table.teamId,
        table.puzzleId,
      ),
    };
  },
);

export const hints = createTable(
  "hint",
  {
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
    // Not included:
    // obsolute statuses
    // notify_emails, discord_id, is_followup
  },
  (table) => {
    return {
      team_and_puzzle_idx: index("hints_team_and_puzzle_idx").on(
        table.teamId,
        table.puzzleId,
      ),
    };
  },
);

export const followUps = createTable(
  "follow_up",
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

export const errata = createTable(
  "erratum",
  {
    id: serial("id").primaryKey(),
    puzzleId: varchar("puzzle_id")
      .notNull()
      .references(() => puzzles.id, { onDelete: "cascade" }),
    timestamp: timestamp("timestamp", { withTimezone: true })
      .notNull()
      .defaultNow(),
    description: text("description").notNull(),
  },
  (table) => {
    return {
      puzzle_idx: index("errata_puzzle_idx").on(table.puzzleId),
    };
  },
);

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
  startTime: timestamp("start_time", { withTimezone: true }).notNull(),
  description: text("description").notNull(),
});

export const answerTokens = createTable("answer_token", {
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
});

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
  followUps: many(followUps),
}));

export const followUpRelations = relations(followUps, ({ one }) => ({
  hint: one(hints, {
    fields: [followUps.hintId],
    references: [hints.id],
  }),
  user: one(teams, {
    fields: [followUps.userId],
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

export type Team = InferSelectModel<typeof teams>;

// M Guards, N doors, and K Choices
export const mnkDecisionEnum = pgEnum("mnk_decision", [
  "door_1",
  "door_2",
  "door_3",
  "stay",
  "switch",
]);

export const mnkDecisionTypeEnum = pgEnum("mnk_decision_type", [
  "door",
  "final",
]);

export const mnk = createTable(
  "m_guards_n_doors_k_choices",
  {
    id: serial("id").primaryKey(),
    teamId: varchar("team_id")
      .notNull()
      .references(() => teams.id, { onDelete: "cascade" }),
    run: integer("run").notNull(),
    scenario: integer("scenario").notNull(), // 1-4
    decision: mnkDecisionEnum("decision").notNull(),
    decisionType: mnkDecisionTypeEnum("decision_type").notNull(), // door, final
    time: timestamp("time", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    unique_decision: unique("unique_decision").on(
      table.teamId,
      table.run,
      table.scenario,
      table.decisionType,
    ),
  }),
);

export type MNKDecision = (typeof mnkDecisionEnum.enumValues)[number];
export type MNKDecisionType = (typeof mnkDecisionTypeEnum.enumValues)[number];

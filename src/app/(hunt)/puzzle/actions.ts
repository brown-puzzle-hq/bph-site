"use server";
import { Session } from "next-auth";
import { revalidatePath } from "next/cache";
import { db } from "@/db/index";
import {
  puzzles,
  guesses,
  hints,
  solves,
  followUps,
  unlocks,
  teams,
  events,
  answerTokens,
  solveTypeEnum,
} from "@/db/schema";
import { and, count, eq, inArray } from "drizzle-orm";
import { auth } from "@/auth";
import {
  IN_PERSON,
  REMOTE,
  INITIAL_PUZZLES,
  META_PUZZLES,
  NUMBER_OF_GUESSES_PER_PUZZLE,
  PUZZLE_UNLOCK_MAP,
  ROUNDS,
  PUZZLES_WITH_INFINITE_GUESSES,
} from "~/hunt.config";
import { getNumberOfHintsRemaining } from "~/hunt.config";
import { sendBotMessage, sendEmail, extractEmails } from "~/lib/comms";
import {
  FollowUpEmailTemplate,
  FollowUpEmailTemplateProps,
} from "~/lib/email-template";
import { ensureError } from "~/lib/utils";

export type TxType = Parameters<Parameters<typeof db.transaction>[0]>[0];
export type viewStatus = "success" | "not_authenticated" | "not_authorized";

/** Checks whether the user can view the puzzle.
 * Admins can always view the puzzle, testsolvers can view the puzzle if it is unlocked,
 * and teams can view the puzzle if the hunt has started AND it is unlocked.
 * Returns a viewStatus string.
 */
export async function canViewPuzzle(
  puzzleId: string,
  session: Session | null,
): Promise<viewStatus> {
  const currentTime = new Date();

  // If the hunt has ended for everyone, anyone can view the puzzle
  if (currentTime > REMOTE.END_TIME) return "success";
  // Otherwise, they must be signed in
  if (!session?.user?.id) return "not_authenticated";
  // Admin can always view the puzzle
  if (session.user.role == "admin") return "success";

  // If the hunt has ended for in-person teams
  // In-person teams can view puzzles
  if (
    session.user.interactionMode === "in-person" &&
    currentTime > IN_PERSON.END_TIME
  )
    return "success";

  // If they are a testsolver, or the hunt has started for them,
  // then check whether they have unlocked the puzzle
  if (
    session.user.role === "testsolver" ||
    currentTime >
      (session.user.interactionMode === "in-person"
        ? IN_PERSON.START_TIME
        : REMOTE.START_TIME)
  ) {
    const isInitialPuzzle = INITIAL_PUZZLES.includes(puzzleId);
    const isUnlocked = !!(await db.query.unlocks.findFirst({
      columns: { id: true },
      where: and(
        eq(unlocks.teamId, session.user.id),
        eq(unlocks.puzzleId, puzzleId),
      ),
    }));

    return isInitialPuzzle || isUnlocked ? "success" : "not_authorized";
  }

  // The hunt has not started yet and the user is not an admin or testsolver
  return "not_authorized";
}

/** Checks whether the user can view the solution.
 *  Does not check whether the solution actually exists.
 * Returns a viewStatus string.
 */
export async function canViewSolution(
  puzzleId: string,
  session: Session | null,
): Promise<viewStatus> {
  if (!session?.user?.id) return "not_authenticated";
  if (session.user.role == "admin") return "success";
  else return "not_authorized";

  // // If the hunt has ended, anyone can view solutions
  // if (new Date() > REMOTE.END_TIME) return "success";
  // // If the hunt has not ended, users must be signed-in
  // if (!session?.user?.id) return "not_authenticated";
  // // Admin can always view the solution
  // if (session.user.role == "admin") return "success";
  //
  // // Everyone else needs to have solved the puzzle
  // const solved = await db.query.solves.findFirst({
  //   where: and(
  //     eq(solves.teamId, session.user.id),
  //     eq(solves.puzzleId, puzzleId),
  //   ),
  // });
  //
  // return solved ? "success" : "not_authorized";
}

/** Handles a guess for a puzzle. May call handleSolve.
 * Returns a { error?: string, hasFinishedHunt?: boolean } */
export async function handleGuess(puzzleId: string, guess: string) {
  // Check that the user is logged in
  const session = await auth();
  if (!session?.user?.id) return { error: "Not logged in" };
  const teamId = session.user.id;
  const currDate = new Date();

  // Check that the guess is valid
  const puzzle = await db.query.puzzles.findFirst({
    where: eq(puzzles.id, puzzleId),
    with: {
      guesses: {
        where: eq(guesses.teamId, teamId),
      },
    },
  });

  if (!puzzle) return { error: "Puzzle not found" };

  if (puzzle.guesses.find((g) => g.guess === guess))
    return { error: "Already guessed!" };

  // Don't penalize guess if it is a task
  const roundName = ROUNDS.find((round) =>
    round.puzzles.includes(puzzleId),
  )?.name.toLowerCase();
  const module = await import(`./(${roundName})/${puzzleId}/data.tsx`).catch(
    () => null,
  );
  const tasks = module?.tasks ?? {};
  const partialSolutions = module?.partialSolutions ?? {};

  // Check if the number of guesses is exceeded
  if (
    !PUZZLES_WITH_INFINITE_GUESSES.includes(puzzleId) &&
    puzzle.guesses.filter(
      ({ guess }) => !(guess in tasks || guess in partialSolutions),
    ).length >= NUMBER_OF_GUESSES_PER_PUZZLE
  ) {
    revalidatePath(`/puzzle/${puzzleId}`);
    return { error: "You have no guesses left. Please contact HQ for help." };
  }

  // Insert the guess into the guess table
  // If the guess is correct, handle the solve
  var isCorrect = puzzle.answer === guess;
  var solveType: (typeof solveTypeEnum.enumValues)[number] = "guess";

  // If the guess is not correct and it is not a meta puzzle
  // check if it is an answer token
  if (!isCorrect && !META_PUZZLES.includes(puzzleId)) {
    const event = await db.query.events.findFirst({
      columns: { id: true },
      where: eq(events.answer, guess),
    });

    if (event) {
      // Check if it is an answer token.
      const answerToken = await db.query.answerTokens.findFirst({
        where: and(
          eq(answerTokens.eventId, event.id),
          eq(answerTokens.teamId, teamId),
        ),
      });

      // If the answer token already exists and the it is not used yet,
      // update it with the puzzleId and use it to solve the puzzle
      // Mark the guess as correct with solveType "answer_token"
      if (answerToken && !answerToken.puzzleId) {
        isCorrect = true;
        solveType = "answer_token";
        await db
          .update(answerTokens)
          .set({ puzzleId })
          .where(
            and(
              eq(answerTokens.id, answerToken.id),
              eq(answerTokens.teamId, teamId),
            ),
          );
      }

      // If there is no answer token, insert a new one
      // Mark the guess as correct with solveType "answer_token"
      if (!answerToken) {
        isCorrect = true;
        solveType = "answer_token";
        await db.insert(answerTokens).values({
          teamId,
          eventId: event.id,
          puzzleId,
          timestamp: currDate,
        });
      }
    }
  }

  // Insert the guess into the guess table, handle the solve
  // And check if the team has completed the hunt
  var hasFinishedHunt = false;

  try {
    await db.transaction(async (tx) => {
      await tx.insert(guesses).values({
        teamId,
        puzzleId,
        guess,
        isCorrect,
        submitTime: currDate,
      });

      // Handle the solve
      if (isCorrect) {
        const res = await handleSolve(tx, teamId, puzzleId, solveType);
        // Check if the team has completed the hunt
        if (res?.hasFinishedHunt) hasFinishedHunt = true;
      }
    });
  } catch (e) {
    const error = ensureError(e);
    const errorMessage = `🐛 Error inserting solve for puzzle ${puzzleId} for team ${teamId}: ${error.message} <@?1287563929282678795>`;
    sendBotMessage(errorMessage, "dev");
    return { error: "An unexpected error occurred. Please try again." };
  }

  // Message the guess channel
  const guessMessage = `🧩 **Guess** by [${teamId}](https://www.brownpuzzlehunt.com/teams/${teamId}) on [${puzzleId}](https://www.brownpuzzlehunt.com/puzzle/${puzzleId} ): \`${guess}\` [${isCorrect ? (solveType === "guess" ? "✓" : "**E** → ✓") : "✕"}]`;
  await sendBotMessage(guessMessage, "guess");

  // Message interaction channel about action meta solve and ping the lore role
  if (isCorrect && puzzleId == "drop-the") {
    const query = await db.query.teams.findFirst({
      columns: { solvingLocation: true },
      where: eq(teams.id, teamId),
    });

    const actionInteractionMessage = `💥 **Action Interaction** for [${teamId}](https://www.brownpuzzlehunt.com/teams/${teamId}) after [${puzzleId}](https://www.brownpuzzlehunt.com/puzzle/${puzzleId} ). ${query && query.solvingLocation ? `They are in ${query.solvingLocation}.` : ""} <@&1201541948880736378>`;
    await sendBotMessage(actionInteractionMessage, "interaction");
  }

  // Message interaction channel about horror guard and ping the lore role
  if (isCorrect && puzzleId == "the-guard-and-the-door") {
    const query = await db.query.teams.findFirst({
      columns: { solvingLocation: true },
      where: eq(teams.id, teamId),
    });

    const horrorInteractionMessage = `👻 **Horror Interaction** for [${teamId}](https://www.brownpuzzlehunt.com/teams/${teamId}) after [${puzzleId}](https://www.brownpuzzlehunt.com/puzzle/${puzzleId} ). ${query && query.solvingLocation ? `They are in ${query.solvingLocation}.` : ""} <@&1201541948880736378>`;
    await sendBotMessage(horrorInteractionMessage, "interaction");
  }

  // If the team has finished the hunt, message the finish channel and ping the lore role
  if (hasFinishedHunt) {
    const finishMessage = `🏆 **Hunt Finish** by [${teamId}](https://www.brownpuzzlehunt.com/teams/${teamId}) <@&900958940475559969>`;
    await sendBotMessage(finishMessage, "interaction");
  }

  revalidatePath(`/puzzle/${puzzleId}`);

  // Refund hints if the guess is correct
  if (isCorrect) {
    await db
      .update(hints)
      .set({
        response: "[REFUNDED]",
        status: "refunded",
        claimer: teamId, // TODO: maybe don't make this the claimer
      })
      .where(
        and(
          eq(hints.puzzleId, puzzleId),
          eq(hints.teamId, teamId),
          eq(hints.status, "no_response"),
        ),
      );
  }

  return { hasFinishedHunt };
}

/** Handles a solve for a puzzle */
export async function handleSolve(
  tx: TxType,
  teamId: string,
  puzzleId: string,
  type: (typeof solveTypeEnum.enumValues)[number],
) {
  // Insert the solve into the solve table
  const currDate = new Date();
  await tx.insert(solves).values({
    teamId,
    puzzleId,
    solveTime: currDate,
    type,
  });

  // Unlock the next puzzles
  const nextPuzzles = PUZZLE_UNLOCK_MAP[puzzleId];
  if (nextPuzzles?.length) {
    const newUnlocks = nextPuzzles.map((puzzleId) => ({
      teamId,
      puzzleId,
      unlockTime: currDate,
    }));
    await tx.insert(unlocks).values(newUnlocks).onConflictDoNothing();
  }

  // Check if the team has just completed the hunt
  // by solving the six metas
  if (META_PUZZLES.includes(puzzleId)) {
    const query = await tx
      .select({ count: count() })
      .from(solves)
      .where(
        and(eq(solves.teamId, teamId), inArray(solves.puzzleId, META_PUZZLES)),
      );

    if (query[0]?.count === META_PUZZLES.length) {
      await tx
        .update(teams)
        .set({ finishTime: new Date() })
        .where(eq(teams.id, teamId));
      return { hasFinishedHunt: true };
    }
  }

  return { hasFinishedHunt: false };
}

/** Inserts an answer token into the token table */
export async function insertAnswerToken(eventId: string, guess: string) {
  // Check that the user is logged in
  const session = await auth();
  if (!session?.user?.id) return { error: "Not logged in!" };

  const teamId = session.user.id;
  const currDate = new Date();

  // Check that the team has not already had a token
  const token = await db.query.answerTokens.findFirst({
    where: and(
      eq(answerTokens.teamId, teamId),
      eq(answerTokens.eventId, eventId),
    ),
  });
  if (token) {
    revalidatePath(`/puzzle`);
    return { error: "Token already used!" };
  }

  // Check that the token is valid
  const event = await db.query.events.findFirst({
    where: eq(events.id, eventId),
  });
  if (!event) return { error: "Event not found!" };
  if (event.answer !== guess) return { error: "Incorrect token!" };

  // Insert a token into the token table
  await db.insert(answerTokens).values({
    teamId,
    eventId,
    timestamp: currDate,
  });

  revalidatePath(`/puzzle`);
  return { error: null };
}

/** PREVIOUS HINT TABLE **/

export type MessageType = "request" | "response" | "follow-up";

/** Inserts a hint request into the hint table */
export async function insertHintRequest(puzzleId: string, hint: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not logged in");

  const teamId = session.user.id;
  const role = session.user.role;
  const interactionMode = session.user.interactionMode;

  // Checks
  const hasHint =
    (await getNumberOfHintsRemaining(teamId, role, interactionMode)) > 0;

  if (!hasHint) {
    return {
      error: "No hints remaining.",
    };
  }

  const unansweredHint = await db.query.hints.findFirst({
    columns: { id: true },
    where: and(eq(hints.teamId, teamId), eq(hints.status, "no_response")),
    with: {
      puzzle: {
        columns: { name: true },
      },
    },
  });

  if (unansweredHint) {
    return {
      error: `You have an outstanding hint on the puzzle ${unansweredHint.puzzle.name}.`,
    };
  }

  const result = (
    await db
      .insert(hints)
      .values({
        teamId: teamId,
        puzzleId,
        request: hint,
        requestTime: new Date(),
        status: "no_response",
      })
      .returning({ id: hints.id })
  )?.[0];

  if (!result) {
    return {
      error:
        "Please try again. If the problem persists, contact HQ or use the feedback form.",
    };
  }

  const hintMessage = `🙏 **Hint** [request](https://www.brownpuzzlehunt.com/admin/hints/${result.id}) by [${teamId}](https://www.brownpuzzlehunt.com/teams/${teamId}) on [${puzzleId}](https://www.brownpuzzlehunt.com/puzzle/${puzzleId} ): ${hint} <@&1310029428864057504>`;
  await sendBotMessage(hintMessage, "hint");

  return { error: null, id: result.id };
}

/** Edits a hint */
export async function editMessage(
  id: number,
  message: string,
  type: MessageType,
) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Not logged in");
  }

  switch (type) {
    case "request":
      await db
        .update(hints)
        .set({ request: message })
        .where(and(eq(hints.id, id), eq(hints.teamId, session.user.id)))
        .returning({ id: hints.id });
      break;
    case "response":
      await db
        .update(hints)
        .set({ response: message })
        .where(and(eq(hints.id, id), eq(hints.claimer, session.user.id)))
        .returning({ id: hints.id });
      break;
    case "follow-up":
      await db
        .update(followUps)
        .set({ message })
        .where(and(eq(followUps.id, id), eq(followUps.userId, session.user.id)))
        .returning({ id: hints.id });
      break;
  }
}

/** Inserts a follow-up hint into the hint table */
export async function insertFollowUp({
  hintId,
  members,
  teamId,
  teamDisplayName,
  puzzleId,
  puzzleName,
  message,
}: FollowUpEmailTemplateProps & {
  hintId: number;
  teamId?: string;
  members: string;
}) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Not logged in");
  }
  try {
    const result = await db
      .insert(followUps)
      .values({
        hintId,
        userId: session.user.id,
        message,
        time: new Date(),
      })
      .returning({ id: followUps.id });

    if (result[0]?.id) {
      // If there are members, then this is a follow-up by a team
      // So send an email
      if (members) {
        await sendEmail(
          extractEmails(members),
          `Follow-Up Hint [${puzzleName}]`,
          FollowUpEmailTemplate({
            teamDisplayName,
            puzzleId,
            puzzleName,
            message,
          }),
        );
      }
      // Otherwise, notify admin on Discord that there is a follow-up
      else if (message !== "[Claimed]") {
        const hintMessage = `🙏 **Hint** [follow-up](https://www.brownpuzzlehunt.com/admin/hints/${hintId}?reply=true) by [${teamDisplayName}](https://www.brownpuzzlehunt.com/teams/${teamId}) on [${puzzleName}](https://www.brownpuzzlehunt.com/puzzle/${puzzleId} ): ${message} <@&1310029428864057504>`;
        await sendBotMessage(hintMessage, "hint");
      }
      return result[0].id;
    }
    return null;
  } catch (_) {
    return null;
  }
}

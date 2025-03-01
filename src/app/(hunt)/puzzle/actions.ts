"use server";
import { redirect } from "next/navigation";
import { Session } from "next-auth";
import { revalidatePath } from "next/dist/server/web/spec-extension/revalidate";
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
} from "~/hunt.config";
import { sendBotMessage } from "~/lib/utils";

export type TxType = Parameters<Parameters<typeof db.transaction>[0]>[0];
export type MessageType = "request" | "response" | "follow-up";
export type viewStatus = "success" | "not_authenticated" | "not_authorized";

export async function canViewPuzzle(
  puzzleId: string,
  session: Session | null,
): Promise<viewStatus> {
  const currentTime = new Date();

  // If the hunt has ended for everyone, anyone can view the puzzle
  if (currentTime > REMOTE.END_TIME) return "success";
  // Otherwise, they must be signed-in
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
  redirect("/puzzle");
}

/** Checks whether the user can view the solution.
 *  Does not check whether the solution actually exists.
 */
export async function canViewSolution(
  puzzleId: string,
  session: Session | null,
): Promise<viewStatus> {
  // If the hunt has ended, anyone can view solutions
  if (new Date() > REMOTE.END_TIME) return "success";
  // If the hunt has not ended, users must be signed-in
  if (!session?.user?.id) return "not_authenticated";
  // Admin can always view the solution
  if (session.user.role == "admin") return "success";

  // Everyone else needs to have solved the puzzle
  const solved = await db.query.solves.findFirst({
    where: and(
      eq(solves.teamId, session.user.id),
      eq(solves.puzzleId, puzzleId),
    ),
  });

  return solved ? "success" : "not_authorized";
}

export async function handleGuess(puzzleId: string, guess: string) {
  // Check that the user is logged in
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Not logged in!" };
  }
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

  if (!puzzle) return { error: "Puzzle not found!" };

  if (puzzle.guesses.length >= NUMBER_OF_GUESSES_PER_PUZZLE) {
    revalidatePath(`/puzzle/${puzzleId}`);
    return;
  }

  if (puzzle.guesses.find((g) => g.guess === guess)) {
    return { error: "Already guessed!" };
  }

  // Insert the guess into the guess table
  // If the guess is correct, handle the solve
  var correct = puzzle.answer === guess;
  var solveType: (typeof solveTypeEnum.enumValues)[number] = "guess";

  if (!correct) {
    const event = await db.query.events.findFirst({
      where: eq(events.answer, guess),
    });

    if (event) {
      // Check if the team has already submitted a token for this event
      const answerToken = await db.query.answerTokens.findFirst({
        where: and(
          eq(answerTokens.teamId, teamId),
          eq(answerTokens.eventId, event.id),
        ),
      });

      // If there is an answer token and it hasn't been used yet, update it
      if (answerToken && !answerToken.puzzleId) {
        correct = true;
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
      if (!answerToken) {
        correct = true;
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

  await db.transaction(async (tx) => {
    await tx.insert(guesses).values({
      teamId,
      puzzleId,
      guess,
      isCorrect: correct,
      submitTime: currDate,
    });

    if (correct) {
      await handleSolve(tx, teamId, puzzleId, solveType);
    }
  });

  revalidatePath(`/puzzle/${puzzleId}`);

  // Send a message to the bot channel
  const guessMessage = `🧩 **Guess** by [${teamId}](https://www.brownpuzzlehunt.com/teams/${teamId}) on [${puzzleId}](https://www.brownpuzzlehunt.com/puzzle/${puzzleId}): \`${guess}\` [${correct ? (solveType === "guess" ? "✓" : "𝔼 → ✓") : "✕"}]`;
  await sendBotMessage(guessMessage);

  // Refund hints if the guess is correct
  if (correct) {
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
}

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
  if (nextPuzzles) {
    const newUnlocks = nextPuzzles.map((puzzleId) => ({
      teamId,
      puzzleId,
      unlockTime: currDate,
    }));
    await tx.insert(unlocks).values(newUnlocks).onConflictDoNothing();
  }

  // Check if the team has completed the six metas
  if (META_PUZZLES.includes(puzzleId)) {
    const query = await tx
      .select({ count: count() })
      .from(solves)
      .where(
        and(eq(solves.teamId, teamId), inArray(solves.puzzleId, META_PUZZLES)),
      );

    // They win the hunt when the finish the runaround event, not when they solve the last puzzle
    // TODO: make this unlock the runaround, not just the finish time
    if (query[0]?.count === META_PUZZLES.length) {
      await tx
        .update(teams)
        .set({ finishTime: new Date() })
        .where(eq(teams.id, teamId));
    }
  }
}

export async function editMessage(
  id: number,
  message: string,
  type: MessageType,
) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Not logged in" };
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
        .where(and(eq(hints.id, id), eq(hints.claimer, session.user.id)));
      break;
    case "follow-up":
      await db
        .update(followUps)
        .set({ message })
        .where(
          and(eq(followUps.id, id), eq(followUps.userId, session.user.id)),
        );
      break;
  }
}

export async function insertAnswerToken(eventId: string, guess: string) {
  // Check that the user is logged in
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Not logged in!" };
  }
  const teamId = session.user.id;
  const currDate = new Date();

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

  revalidatePath(`/event/${eventId}`);
  return { error: null };
}

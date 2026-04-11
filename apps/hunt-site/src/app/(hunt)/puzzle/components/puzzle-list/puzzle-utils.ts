import { db } from "@/db/index";
import { eq, inArray } from "drizzle-orm";
import { puzzles, unlocks, solves, answerTokens } from "~/server/db/schema";
import { INITIAL_PUZZLES } from "@/config/server";
import type { AvailablePuzzle, AvailableEvent } from "./types";

export async function getAvailablePuzzles(
  teamId?: string,
): Promise<AvailablePuzzle[]> {
  let availablePuzzles: AvailablePuzzle[] = [];

  // If no teamId, assume post-hunt view (all puzzles, no answers)
  if (teamId === undefined) {
    availablePuzzles = (
      await db.query.puzzles.findMany({
        columns: { id: true, name: true },
      })
    ).map((puzzle) => ({ ...puzzle, unlockTime: null, answer: null }));
  }
  // Otherwise, fetch user-specific unlocked/solved puzzles
  else {
    const [initialPuzzles, unlockedPuzzles, solvedPuzzles] = await Promise.all([
      db.query.puzzles.findMany({
        columns: { id: true, name: true, answer: true },
        where: inArray(puzzles.id, INITIAL_PUZZLES),
      }),
      db.query.unlocks.findMany({
        columns: { unlockTime: true },
        where: eq(unlocks.teamId, teamId),
        with: { puzzle: { columns: { id: true, name: true, answer: true } } },
      }),
      // Hide answers for unsolved puzzles
      db.query.solves.findMany({
        columns: { puzzleId: true },
        where: eq(solves.teamId, teamId),
      }),
    ]);

    const allAvailable = [
      ...initialPuzzles.map((puzzle) => ({ ...puzzle, unlockTime: null })),
      ...unlockedPuzzles.map((unlock) => ({
        ...unlock.puzzle,
        unlockTime: unlock.unlockTime,
      })),
    ];

    availablePuzzles = allAvailable.map((puzzle) => ({
      ...puzzle,
      answer: solvedPuzzles.some((sp) => sp.puzzleId === puzzle.id)
        ? puzzle.answer
        : null,
    }));
  }

  return availablePuzzles;
}

export async function getAvailableEvents(
  teamId?: string,
  interactionMode?: string,
): Promise<AvailableEvent[]> {
  if (teamId !== undefined && interactionMode === "remote") return [];

  // Post-hunt view (all events, no answers)
  if (teamId === undefined) {
    // TODO: not a great way to order events
    const events = await db.query.events.findMany({
      orderBy: (events, { asc }) => [asc(events.startTime)],
    });

    return events.map((event) => ({
      ...event,
      answer: null,
      spent: false,
    }));
  }

  // Logged-in, in-person view
  const [events, finishedEvents] = await Promise.all([
    // TODO: not a great way to order events
    db.query.events.findMany({
      orderBy: (events, { asc }) => [asc(events.startTime)],
    }),
    db.query.answerTokens.findMany({
      where: eq(answerTokens.teamId, teamId),
    }),
  ]);

  return events.map((event) => {
    const finishedEvent = finishedEvents.find((fe) => fe.eventId === event.id);
    return {
      ...event,
      answer: finishedEvent ? event.answer : null,
      spent: !!finishedEvent && finishedEvent.puzzleId !== null,
    };
  });
}

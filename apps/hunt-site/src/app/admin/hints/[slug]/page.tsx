import { db } from "@/db/index";
import { replies, guesses, hints, unlocks } from "@/db/schema";
import { and, asc, eq } from "drizzle-orm";
import AdminHintThread from "./AdminHintThread";
import GuessTable from "@/puzzle/components/puzzle/guess/GuessTable";
import { IN_PERSON, REMOTE } from "@/config/client";
import { displayStoredPuzzleGuess } from "~/lib/server";
import { notFound } from "next/navigation";

type PuzzleDataModule = {
  partialSolutions?: Record<string, string>;
  tasks?: Record<string, unknown>;
};

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: number }>;
  searchParams?: { reply?: boolean };
}) {
  // Check if slug is a valid number
  const { slug } = await params;
  const reply = searchParams?.reply;
  const hintId = Number(slug);
  if (isNaN(hintId)) {
    notFound();
  }

  // Get hint data
  const hint = await db.query.hints.findFirst({
    where: eq(hints.id, hintId),
    with: {
      team: {
        columns: {
          displayName: true,
          id: true,
          interactionMode: true,
        },
      },
      puzzle: { columns: { id: true, name: true, answer: true } },
      claimer: { columns: { id: true, displayName: true } },
      replies: {
        columns: { id: true, message: true, userId: true, time: true },
        with: { user: { columns: { id: true, displayName: true } } },
        orderBy: [asc(replies.time)],
      },
    },
    columns: {
      id: true,
      request: true,
      response: true,
      status: true,
      requestTime: true,
      claimTime: true,
      responseTime: true,
    },
  });

  if (!hint) {
    notFound();
  }

  const [unlockRow, previousGuesses, puzzleModule] = await Promise.all([
    db.query.unlocks.findFirst({
      columns: { unlockTime: true },
      where: and(
        eq(unlocks.teamId, hint.team.id),
        eq(unlocks.puzzleId, hint.puzzle.id),
      ),
    }),
    db.query.guesses.findMany({
      where: and(
        eq(guesses.teamId, hint.team.id),
        eq(guesses.puzzleId, hint.puzzle.id),
      ),
    }),
    // Get partial solutions and tasks
    import(`../../../(hunt)/puzzle/${hint.puzzle.id}/data.tsx`)
      .then((loaded) => loaded as PuzzleDataModule)
      .catch(() => null),
  ]);

  // If there is no unlock, the unlock time is the start of the hunt
  const unlockTime =
    unlockRow?.unlockTime ??
    (hint.team.interactionMode === "in-person"
      ? IN_PERSON.START_TIME
      : REMOTE.START_TIME);

  const partialSolutions = puzzleModule?.partialSolutions ?? {};
  const tasks = puzzleModule?.tasks ?? {};

  const processedGuesses = previousGuesses.map(
    ({ guess, isCorrect, submitTime }) => {
      const finalGuess = displayStoredPuzzleGuess(
        guess,
        isCorrect,
        hint.puzzle.answer,
      );
      const status = isCorrect
        ? ("correct" as const)
        : guess in partialSolutions
          ? ("partial" as const)
          : guess in tasks
            ? ("task" as const)
            : ("incorrect" as const);
      const partialTip =
        status === "partial" ? partialSolutions[guess] : undefined;
      return { guess: finalGuess, status, partialTip, submitTime };
    },
  );

  return (
    <div className="mx-auto mb-12 flex max-w-[calc(min(100vw,968px))] flex-col items-center px-4">
      <h1 className="px-4 pb-4">Hint #{hint.id}</h1>
      <div className="w-full pb-4">
        <AdminHintThread
          hint={hint}
          unlockTime={unlockTime}
          reply={reply ? hintId : undefined}
        />
      </div>
      {previousGuesses.length > 0 && (
        <div className="w-full space-y-2">
          <p className="w-full text-center text-sm font-semibold text-zinc-700">
            Team&apos;s Guesses
          </p>
          <GuessTable previousGuesses={processedGuesses} />
        </div>
      )}
    </div>
  );
}

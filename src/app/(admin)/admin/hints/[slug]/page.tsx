import { db } from "@/db/index";
import { followUps, guesses, hints, unlocks } from "@/db/schema";
import { and, asc, eq } from "drizzle-orm";
import Toast from "../components/hint-page/Toast";
import AdminHintThread from "../components/hint-page/AdminHintThread";
import GuessTable from "~/app/(hunt)/puzzle/components/GuessTable";
import { IN_PERSON, REMOTE, ROUNDS } from "~/hunt.config";

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
    return (
      <Toast
        title={"Invalid path"}
        description={`${slug} is not a valid hint ID.`}
      />
    );
  }

  // Get hint data
  const hint = await db.query.hints.findFirst({
    where: eq(hints.id, hintId),
    with: {
      team: {
        columns: {
          displayName: true,
          id: true,
          members: true,
          interactionMode: true,
        },
      },
      puzzle: { columns: { id: true, name: true, answer: true } },
      claimer: { columns: { id: true, displayName: true } },
      followUps: {
        columns: { id: true, message: true, userId: true, time: true },
        with: { user: { columns: { id: true, displayName: true } } },
        orderBy: [asc(followUps.time)],
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
    return (
      <Toast
        title={"Hint not found"}
        description={`No hint with ID ${slug} was found.`}
      />
    );
  }

  // If there is no unlock, the unlock time is the start of the hunt
  const unlockTime =
    (
      await db.query.unlocks.findFirst({
        columns: { unlockTime: true },
        where: and(
          eq(unlocks.teamId, hint.team.id),
          eq(unlocks.puzzleId, hint.puzzle.id),
        ),
      })
    )?.unlockTime ??
    (hint.team.interactionMode === "in-person"
      ? IN_PERSON.START_TIME
      : REMOTE.START_TIME);

  const previousGuesses = await db.query.guesses.findMany({
    where: and(
      eq(guesses.teamId, hint.team.id),
      eq(guesses.puzzleId, hint.puzzle.id),
    ),
  });

  // Get partial solutions and tasks
  const roundName = ROUNDS.find((round) =>
    round.puzzles.includes(hint.puzzle.id),
  )?.name.toLowerCase();

  const module = await import(
    `../../../.../../../(hunt)/puzzle/(${roundName})/${hint.puzzle.id}/data.tsx`
  ).catch(() => null);

  const partialSolutions = module?.partialSolutions ?? {};
  const tasks = module?.tasks ?? {};

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
            Team's Guesses
          </p>
          <GuessTable
            puzzleAnswer={hint.puzzle.answer}
            previousGuesses={previousGuesses}
            partialSolutions={partialSolutions}
            tasks={tasks}
          />
        </div>
      )}
    </div>
  );
}

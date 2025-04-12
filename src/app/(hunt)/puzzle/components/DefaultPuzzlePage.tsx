import { auth } from "@/auth";
import { db } from "~/server/db";
import { eq, and } from "drizzle-orm";
import { teams, puzzles, solves, guesses, errata } from "~/server/db/schema";
import { redirect } from "next/navigation";
import GuessTable from "@/puzzle/components/GuessTable";
import ErratumDialog from "@/puzzle/components/ErratumDialog";
import GuessForm from "@/puzzle/components/GuessForm";
import CopyButton from "@/puzzle/components/CopyButton";
import TokenRefresher from "@/puzzle/components/TokenRefresher";
import { canViewPuzzle } from "@/puzzle/actions";
import { NUMBER_OF_GUESSES_PER_PUZZLE, REMOTE } from "~/hunt.config";
import { cn } from "~/lib/utils";

export default async function DefaultPuzzlePage({
  puzzleId,
  inPersonBody,
  remoteBoxBody,
  remoteBody,
  copyText,
  partialSolutions,
  tasks,
  interactionMode,
}: {
  puzzleId: string;
  inPersonBody: React.ReactNode;
  remoteBoxBody: React.ReactNode;
  remoteBody: React.ReactNode;
  copyText: string | null;
  partialSolutions: Record<string, string>;
  tasks: Record<string, React.ReactNode>;
  interactionMode?: string;
}) {
  // Authentication
  const session = await auth();
  switch (await canViewPuzzle(puzzleId, session)) {
    case "success":
      break;
    case "not_authenticated":
      redirect("/login");
    case "not_authorized":
      redirect("/puzzle");
  }

  // If user is not logged in, show puzzle without errata or guesses
  // TODO: which version should we show?
  if (!session?.user?.id) {
    return (
      <div className="w-full px-4">
        <div className="flex items-start justify-center space-x-2">
          <div className="w-fit">{inPersonBody}</div>
          {copyText && <CopyButton copyText={copyText} />}
        </div>

        {Object.keys(tasks).map((task) => {
          return (
            <div key={task}>
              <hr className="mx-auto my-6 max-w-3xl" />
              <div className="mx-auto w-fit">{tasks[task]}</div>
            </div>
          );
        })}
      </div>
    );
  }

  // Puzzle answer
  const puzzleAnswer = (await db.query.puzzles.findFirst({
    where: eq(puzzles.id, puzzleId),
    columns: { answer: true },
  }))!.answer;

  // Get errata if user is logged in
  const errataList: {
    puzzleId: string;
    id: number;
    timestamp: Date;
    description: string;
  }[] = (
    await db.query.errata.findMany({
      where: eq(errata.puzzleId, puzzleId),
    })
  ).sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());

  // Get previous guesses
  const previousGuesses = await db.query.guesses.findMany({
    where: and(
      eq(guesses.teamId, session.user.id),
      eq(guesses.puzzleId, puzzleId),
    ),
  });

  const isSolved = !!(await db.query.solves.findFirst({
    where: and(
      eq(solves.teamId, session.user.id),
      eq(solves.puzzleId, puzzleId),
    ),
  }));

  const numberOfGuessesLeft =
    NUMBER_OF_GUESSES_PER_PUZZLE -
    previousGuesses.filter(({ guess }) => !(guess in tasks)).length;
  var refresh = false;
  if (typeof session.user.hasBox === "undefined") {
    const user = await db.query.teams.findFirst({
      where: eq(teams.id, session.user.id),
    });
    const hasBox = user!.hasBox;
    session.user.hasBox = hasBox;
    refresh = true;
  }

  // If there is an URL query, use that for admins and after the hunt ends
  // Otherwise, use the session interaction mode
  const actualInteractionMode =
    interactionMode &&
    (session.user.role === "admin" || new Date() > REMOTE.END_TIME)
      ? interactionMode
      : session.user.interactionMode === "in-person"
        ? "in-person"
        : session.user.hasBox
          ? "remote-box"
          : "remote";

  const puzzleBody =
    actualInteractionMode === "remote-box"
      ? remoteBoxBody
      : actualInteractionMode === "in-person"
        ? inPersonBody
        : remoteBody;

  return (
    <div className="w-full px-4">
      {refresh && <TokenRefresher hasBox={session.user.hasBox} />}

      <div className="mx-auto max-w-3xl">
        <ErratumDialog errataList={errataList} />
      </div>

      <div className="no-scrollbar overflow-auto">
        <div className="mx-auto flex w-fit items-start justify-center space-x-2">
          {copyText && <div className="min-w-6" />}
          <div className="w-fit">{puzzleBody}</div>
          {copyText && <CopyButton copyText={copyText} />}
        </div>
      </div>

      {Object.keys(tasks).map((task) => {
        if (previousGuesses.some((guess) => guess.guess === task)) {
          return (
            <div key={task}>
              <hr className="mx-auto my-6 max-w-3xl" />
              <div className="mx-auto w-fit">{tasks[task]}</div>
            </div>
          );
        }
      })}

      <div className={cn("mx-auto mb-4 mt-6 max-w-3xl", copyText && "px-8")}>
        <GuessForm
          puzzleId={puzzleId}
          numberOfGuessesLeft={numberOfGuessesLeft}
          isSolved={isSolved}
        />
      </div>

      <div className="mx-auto max-w-3xl">
        <GuessTable
          puzzleAnswer={puzzleAnswer}
          previousGuesses={previousGuesses}
          partialSolutions={partialSolutions}
          tasks={tasks}
        />
      </div>
    </div>
  );
}

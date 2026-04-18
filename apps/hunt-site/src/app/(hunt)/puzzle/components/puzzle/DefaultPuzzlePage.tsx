import { db } from "~/server/db";
import { eq, and, gt } from "drizzle-orm";
import {
  teams,
  puzzles,
  solves,
  guesses,
  errata,
  unlocks,
} from "~/server/db/schema";
import { redirect } from "next/navigation";
import GuessTable from "@/puzzle/components/puzzle/guess/GuessTable";
import ErratumDialog from "~/app/(hunt)/puzzle/components/puzzle/ErratumDialog";
import GuessForm from "@/puzzle/components/puzzle/guess/GuessForm";
import CopyButton, {
  type CopyData,
} from "@/puzzle/components/puzzle/CopyButton";
import { canViewPuzzle } from "@/puzzle/actions";
import {
  NUMBER_OF_GUESSES_PER_PUZZLE,
  IN_PERSON,
  REMOTE,
} from "@/config/client";
import { ALL_PUZZLES, INITIAL_PUZZLES } from "@/config/server";
import { displayStoredPuzzleGuess } from "~/lib/server";
import DefaultPostHuntPuzzlePage from "./DefaultPostHuntPuzzlePage";
import { checkPermissions } from "~/lib/server";
import SeenSetter from "./SeenSetter";

export type NumberOfGuesses = number | "infinity";

type DefaultPuzzlePageProps = {
  puzzleId: string;
  inPersonBody: React.ReactNode;
  remoteBody: React.ReactNode;
  copyText: string | CopyData | null;
  partialSolutions: Record<string, string>;
  tasks: Record<string, React.ReactNode>;
  interactionMode?: string;
};

export default async function DefaultPuzzlePage({
  puzzleId,
  inPersonBody,
  remoteBody,
  copyText,
  partialSolutions,
  tasks,
  interactionMode,
}: DefaultPuzzlePageProps) {
  // Check if user can view puzzle
  if ((await canViewPuzzle(puzzleId)) !== "success") redirect("/puzzle");

  const [puzzleAnswerRow, { error, user }] = await Promise.all([
    // Puzzle answer
    db.query.puzzles.findFirst({
      where: eq(puzzles.id, puzzleId),
      columns: { answer: true },
    }),
    checkPermissions({ level: "userAny" }),
  ]);
  const puzzleAnswer = puzzleAnswerRow!.answer;
  const puzzleIndex = ALL_PUZZLES.indexOf(puzzleId);

  // If user is not logged in, show puzzle without errata or guesses
  if (error) {
    return (
      <DefaultPostHuntPuzzlePage
        puzzleAnswer={puzzleAnswer}
        inPersonBody={inPersonBody}
        remoteBody={remoteBody}
        copyText={copyText}
        partialSolutions={partialSolutions}
        tasks={tasks}
        interactionMode={interactionMode}
        puzzleIndex={puzzleIndex}
      />
    );
  }
  const { id: teamId, role, interactionMode: actualInteractionMode } = user;

  // Get errata if the errata timestamp is greater than the unlockTime.
  // Here is how to think about the unlockTime:
  // 1. If user is not logged in, they'll have returned above.
  // 2. If user is admin, unlockTime is 0, and they will see all errata.
  // 3. If user is team or testsolver, then:
  //    a. If the puzzle can be unlocked, then use the unlock time
  //    b. If the puzzle is an INITIAL_PUZZLE, then take MIN(teamCreateTime, huntStartTime)
  let unlockTime;
  if (role === "admin") {
    unlockTime = new Date(0);
  } else if (INITIAL_PUZZLES.includes(puzzleId)) {
    const teamCreateTime =
      (
        await db.query.teams.findFirst({
          where: eq(teams.id, teamId),
          columns: { createTime: true },
        })
      )?.createTime ?? new Date();

    const huntStartTime =
      actualInteractionMode === "in-person"
        ? IN_PERSON.START_TIME
        : REMOTE.START_TIME;

    unlockTime = new Date(
      Math.max(teamCreateTime.getTime(), huntStartTime.getTime()),
    );
  } else {
    unlockTime = (await db.query.unlocks.findFirst({
      where: and(eq(unlocks.teamId, teamId), eq(unlocks.puzzleId, puzzleId)),
      columns: { unlockTime: true },
    }))!.unlockTime;
  }

  const errataList: {
    puzzleId: string;
    id: number;
    timestamp: Date;
    description: string;
  }[] = (
    await db.query.errata.findMany({
      where: and(
        eq(errata.puzzleId, puzzleId),
        gt(errata.timestamp, unlockTime),
      ),
    })
  ).sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());

  // Get previous guesses and solve state
  const [previousGuesses, solveRow] = await Promise.all([
    db.query.guesses.findMany({
      columns: { guess: true, isCorrect: true, submitTime: true },
      where: and(eq(guesses.teamId, teamId), eq(guesses.puzzleId, puzzleId)),
    }),
    db.query.solves.findFirst({
      where: and(eq(solves.teamId, teamId), eq(solves.puzzleId, puzzleId)),
    }),
  ]);

  const isSolved = !!solveRow;

  // Get the number of guesses left
  // If it is a puzzle with infinite guessses, set it to -1
  const guessLimit =
    teamId === "wafflesyzygy" && puzzleId === "applied-criminology"
      ? NUMBER_OF_GUESSES_PER_PUZZLE + 10
      : NUMBER_OF_GUESSES_PER_PUZZLE;

  const numberOfGuessesLeft: NumberOfGuesses =
    guessLimit -
    previousGuesses.filter(
      ({ guess }) => !(guess in tasks || guess in partialSolutions),
    ).length;

  // If there is an URL query, use that for admins and after the hunt ends
  // Otherwise, use the session interaction mode
  const huntEnded =
    actualInteractionMode === "in-person"
      ? new Date() > IN_PERSON.END_TIME
      : new Date() > REMOTE.END_TIME;
  const canOverrideInteractionMode = role === "admin" || huntEnded;
  const puzzleInteractionMode =
    interactionMode && canOverrideInteractionMode
      ? interactionMode
      : actualInteractionMode;

  const puzzleBody =
    puzzleInteractionMode === "remote" ? remoteBody : inPersonBody;

  const processedGuesses = previousGuesses.map(
    ({ guess, isCorrect, submitTime }) => {
      const finalGuess = displayStoredPuzzleGuess(
        guess,
        isCorrect,
        puzzleAnswer,
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
    <div className="w-full px-4">
      <SeenSetter index={puzzleIndex} />

      <div className="mx-auto max-w-3xl">
        <ErratumDialog errataList={errataList} />
      </div>

      <div className="no-scrollbar overflow-auto">
        <div className="mx-auto w-fit">{puzzleBody}</div>
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

      <div className="mx-auto mb-4 mt-6 max-w-3xl">
        <GuessForm
          puzzleId={puzzleId}
          numberOfGuessesLeft={numberOfGuessesLeft}
          isSolved={isSolved}
        />
      </div>

      <div className="mx-auto max-w-3xl">
        <GuessTable previousGuesses={processedGuesses} />
      </div>

      {copyText && (
        <div className="fixed bottom-4 right-4 size-10">
          <CopyButton copyText={copyText} />
        </div>
      )}
    </div>
  );
}

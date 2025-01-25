import Link from "next/link";
import { auth } from "~/server/auth/auth";
import { db } from "@/db/index";
import { guesses, hints, unlocks } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Toast from "../components/hint-page/Toast";
import HintStatusBox from "../components/hint-page/HintStatusBox";
import PreviousHintTable from "../components/hint-page/PreviousHintTable";
import PreviousGuessTable from "../components/hint-page/PreviousGuessTable";
import { RequestBox } from "../components/hint-page/RequestBox";
import { ResponseBox } from "../components/hint-page/ResponseBox";
import { FormattedTime, ElapsedTime } from "~/lib/time";
import { IN_PERSON, REMOTE } from "~/hunt.config";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: number }>;
}) {
  // Authentication
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Not authorized.");
  }

  // Check if slug is a valid number
  const { slug } = await params;
  const hintId = Number(slug);
  if (isNaN(hintId)) {
    return (
      <Toast
        title={"Invalid path"}
        description={`${slug} is not a valid hint ID.`}
      />
    );
  }

  const hint = await db.query.hints.findFirst({
    where: eq(hints.id, hintId),
    with: {
      team: { columns: { displayName: true, id: true } },
      claimer: { columns: { id: true, displayName: true } },
      puzzle: { columns: { name: true } },
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
          eq(unlocks.teamId, hint.teamId),
          eq(unlocks.puzzleId, hint.puzzleId),
        ),
      })
    )?.unlockTime ??
    (session?.user?.interactionMode === "in-person"
      ? IN_PERSON.START_TIME
      : REMOTE.START_TIME);

  const previousGuesses = await db.query.guesses.findMany({
    where: and(
      eq(guesses.teamId, hint.teamId),
      eq(guesses.puzzleId, hint.puzzleId),
    ),
  });

  const previousHints = await db.query.hints.findMany({
    where: and(
      eq(hints.teamId, hint.teamId),
      eq(hints.puzzleId, hint.puzzleId),
    ),
    columns: {
      id: true,
      request: true,
      response: true,
      teamId: true,
      claimer: true,
    },
    with: {
      followUps: {
        columns: { id: true, message: true, userId: true },
      },
    },
  });

  return (
    <div>
      <div className="flex min-w-36 grow flex-col">
        <div className="flex flex-col items-center">
          <h1>Answer a Hint</h1>
          <HintStatusBox
            hintId={hint.id}
            claimer={hint.claimer}
            status={hint.status}
            userId={session.user.id}
          />
        </div>

        <div className="flex flex-col items-center overflow-auto rounded-md">
          <div className="flex w-full flex-col justify-between p-6 text-sm text-zinc-700 md:w-2/3 lg:flex-row">
            <div>
              <p>
                <span className="font-semibold">Team </span>
                <Link
                  href={`/admin/teams/${hint.team.id}`}
                  className="text-blue-600 hover:underline"
                >
                  {hint.team.displayName}
                </Link>
              </p>
              <p>
                <span className="font-semibold">Puzzle </span>
                <Link
                  href={`/puzzle/${hint.puzzleId}`}
                  className="text-blue-600 hover:underline"
                >
                  {hint.puzzle.name}
                </Link>
              </p>
              <p>
                <span className="font-semibold">Hint #</span>
                {hint.id}
              </p>
            </div>
            <div>
              <p>
                <span className="font-semibold">Puzzle unlocked </span>
                <FormattedTime time={unlockTime} />
                (<ElapsedTime date={unlockTime} /> ago)
              </p>
              <p>
                <span className="font-semibold">Hint requested </span>
                <FormattedTime time={hint.requestTime} />
                (<ElapsedTime date={hint.requestTime} /> ago)
              </p>
              <p>
                <span className="font-semibold">Hint claimed </span>
                {hint.claimTime && (
                  <>
                    <FormattedTime time={hint.claimTime} />
                    (<ElapsedTime date={hint.claimTime} /> ago)
                  </>
                )}
              </p>
              <p>
                <span className="font-semibold">Hint responded </span>
                {hint.responseTime && (
                  <>
                    <FormattedTime time={hint.responseTime} />
                    (<ElapsedTime date={hint.responseTime} /> ago)
                  </>
                )}
              </p>
            </div>
          </div>

          <div className="w-full p-6 md:w-2/3">
            <RequestBox hint={hint} />
            {(hint.response ||
              (hint.claimer && hint.claimer.id === session.user.id)) && (
              <ResponseBox hint={hint} />
            )}
          </div>

          {previousHints.length > 0 && (
            <div className="w-full md:w-2/3">
              <PreviousHintTable
                previousHints={previousHints}
                teamDisplayName={hint.team.displayName}
              />
            </div>
          )}
        </div>

        {/* Previous guesses and hints hidden in tabs */}
        <div className="flex flex-col items-center">
          <Tabs
            defaultValue="guesses"
            className="w-2/3 overflow-auto rounded-md p-4"
          >
            <TabsList>
              <TabsTrigger value="guesses">
                Guesses ({previousGuesses.length})
              </TabsTrigger>
            </TabsList>
            <TabsContent value="guesses">
              <div className="py-4">
                <PreviousGuessTable previousGuesses={previousGuesses} />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

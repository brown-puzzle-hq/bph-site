import Link from "next/link";
import { auth } from "~/server/auth/auth";
import { db } from "@/db/index";
import { guesses, hints } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Toast from "../components/hint-page/Toast";
import HintStatusBox from "../components/hint-page/HintStatusBox";
import PreviousHintTable from "../components/hint-page/PreviousHintTable";
import PreviousGuessTable from "../components/hint-page/PreviousGuessTable";
import { RequestBox } from "../components/hint-page/RequestBox";
import { ResponseBox } from "../components/hint-page/ResponseBox";
import { FormattedTime } from "~/lib/time";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: number }>;
}) {
  // Authentication
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Not authenticated");
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
      team: { columns: { displayName: true, username: true } },
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
    <>
      <div className="flex w-2/3 min-w-36 grow flex-col">
        <div className="flex flex-col items-center">
          <h1>Answer a Hint</h1>
          <HintStatusBox
            hintId={hint.id}
            claimer={hint.claimer}
            status={hint.status}
            userId={session.user.id}
          />
        </div>

        <div className="flex flex-col items-center overflow-auto rounded-md p-4">
          <div className="flex w-2/3 justify-between p-4 text-zinc-700 sm:flex-col md:flex-col lg:flex-row">
            <div>
              <p>
                <strong>From team </strong>
                <Link
                  href={`/admin/teams/${hint.team.username}`}
                  className="text-blue-600 hover:underline"
                >
                  {hint.team.displayName}
                </Link>
              </p>
              <p>
                <strong>For puzzle </strong>{" "}
                <Link
                  href={`/puzzle/${hint.puzzleId}`}
                  className="text-blue-600 hover:underline"
                >
                  {hint.puzzle.name}
                </Link>
              </p>
              <p>
                <strong>With hint ID </strong>
                {hint.id}
              </p>
            </div>
            <div>
              <p>
                <strong>Requested on </strong>
                <FormattedTime time={hint.requestTime} />
              </p>
              <p>
                <strong>Claimed on </strong>
                <FormattedTime time={hint.claimTime} />
              </p>
              <p>
                <strong>Responded on </strong>
                <FormattedTime time={hint.responseTime} />
              </p>
            </div>
            <div>
              <p>
                {/* TODO */}
                <strong>Unlocked </strong> XX days ago
              </p>
              <p>
                {/* TODO */}
                <strong>Requested</strong> XX hours ago
              </p>
            </div>
          </div>

          <div className="w-2/3 p-4">
            <RequestBox hint={hint} />
            {(hint.response ||
              (hint.claimer && hint.claimer.id === session.user.id)) && (
              <ResponseBox hint={hint} />
            )}
          </div>

          {previousHints.length > 0 && (
            <div className="w-2/3 py-4">
              <PreviousHintTable previousHints={previousHints} />
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
    </>
  );
}

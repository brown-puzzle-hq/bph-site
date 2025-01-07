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
import { FormattedTime } from "~/lib/time";
import { HUNT_START_TIME } from "~/hunt.config";

type Time = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getTimeDifference(date1: Date, date2: Date) {
  const date1ms = date1.getTime();
  const date2ms = date2.getTime();
  const differenceMs = Math.abs(date2ms - date1ms);
  const days = Math.floor(differenceMs / (1000 * 60 * 60 * 24));
  const remainingMs = differenceMs % (1000 * 60 * 60 * 24);
  const hours = Math.floor(remainingMs / (1000 * 60 * 60));
  const remainingMs2 = remainingMs % (1000 * 60 * 60);
  const minutes = Math.floor(remainingMs2 / (1000 * 60));
  const remainingMs3 = remainingMs2 % (1000 * 60);
  const seconds = Math.floor(remainingMs3 / 1000);
  return { days, hours, minutes, seconds };
}

function getTimeDifferenceString(time: Time) {
  if (time.days > 0) {
    return `${time.days} ${time.days === 1 ? "day" : "days"}`;
  } else if (time.hours > 0) {
    return `${time.hours} ${time.hours === 1 ? "hour" : "hours"}`;
  } else if (time.minutes > 0) {
    return `${time.minutes} ${time.minutes === 1 ? "minute" : "minutes"}`;
  } else {
    return `${time.seconds} ${time.seconds === 1 ? "second" : "seconds"}`;
  }
}

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
    )?.unlockTime ?? HUNT_START_TIME;

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
          <div className="flex w-full flex-col justify-between p-6 text-zinc-700 md:w-2/3 lg:flex-row">
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
                <strong>Hint ID </strong>
                {hint.id}
              </p>
            </div>
            <div>
              <p>
                <strong>Requested </strong>
                <FormattedTime time={hint.requestTime} />
              </p>
              <p>
                <strong>Claimed </strong>
                <FormattedTime time={hint.claimTime} />
              </p>
              <p>
                <strong>Responded </strong>
                <FormattedTime time={hint.responseTime} />
              </p>
            </div>
            <div>
              <p>
                <strong>Unlocked </strong>{" "}
                {getTimeDifferenceString(
                  getTimeDifference(new Date(), unlockTime),
                )}{" "}
                ago
              </p>
              <p>
                <strong>Requested</strong>{" "}
                {getTimeDifferenceString(
                  getTimeDifference(new Date(), hint.requestTime),
                )}{" "}
                ago
              </p>
              <p>
                <strong>Responded</strong>{" "}
                {hint.responseTime &&
                  getTimeDifferenceString(
                    getTimeDifference(hint.requestTime, hint.responseTime),
                  ) + " later"}
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

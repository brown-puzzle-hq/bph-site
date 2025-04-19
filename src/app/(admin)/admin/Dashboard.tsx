import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  MessageCircleQuestion,
  PackageOpen,
  Puzzle,
  UsersRound,
} from "lucide-react";

import { ActivityItem, ActivityChart } from "./ActivityChart";
import { db } from "~/server/db/index";
import { guesses, hints, teams } from "~/server/db/schema";
import { count, and, eq, isNull, not, sql } from "drizzle-orm";
import { IN_PERSON, REMOTE } from "~/hunt.config";

type hintLeaderboardItem = {
  id: string;
  displayName: string;
  hintsAnswered: number;
  ranking?: number | null;
};

export async function Dashboard() {
  /* Data cards on the top of the dashboard (chunks 0-3) */
  // Get the number of teams
  const numTeams = (
    await db
      .select({ interactionMode: teams.interactionMode, count: count() })
      .from(teams)
      .where(eq(teams.role, "user"))
      .groupBy(teams.interactionMode)
  ).reduce<Record<string, number>>((acc, item) => {
    acc[item.interactionMode] = item.count;
    return acc;
  }, {});

  const inPersonTeams = numTeams["in-person"] ?? 0;
  const remoteTeams = numTeams["remote"] ?? 0;
  const totalTeams = inPersonTeams + remoteTeams;

  // Get the number of guesses
  const numGuesses = (
    await db
      .select({ isCorrect: guesses.isCorrect, count: count() })
      .from(guesses)
      .groupBy(guesses.isCorrect)
  ).reduce<Record<string, number>>((acc, item) => {
    acc[`${item.isCorrect}`] = item.count;
    return acc;
  }, {});

  const correctGuesses = numGuesses["true"] ?? 0;
  const incorrectGuesses = numGuesses["false"] ?? 0;
  const totalGuesses = correctGuesses + incorrectGuesses;
  const percentCorrectGuesses = ((correctGuesses / totalGuesses) * 100).toFixed(
    2,
  );

  // Get the number of hints
  const numHints = (
    await db
      .select({
        answered:
          sql<Boolean>`CASE WHEN ${hints.response} IS NOT NULL THEN true ELSE false END`.as(
            "answered",
          ),
        count: count(),
      })
      .from(hints)
      .groupBy(sql`answered`)
  ).reduce<Record<string, number>>((acc, item) => {
    acc[`${item.answered}`] = item.count;
    return acc;
  }, {});

  const answeredHints = numHints["true"] ?? 0;
  const unansweredHints = numHints["false"] ?? 0;
  const totalHints = answeredHints + unansweredHints;
  const percentAnsweredHints = ((answeredHints / totalHints) * 100).toFixed(2);

  // Get remote box interest count
  const numBoxesWanted =
    (
      await db
        .select({ count: count() })
        .from(teams)
        .where(
          and(
            eq(teams.role, "user"),
            eq(teams.interactionMode, "remote"),
            eq(teams.wantsBox, true),
          ),
        )
    )[0]?.count ?? 0;
  const numBoxesHad =
    (
      await db
        .select({ count: count() })
        .from(teams)
        .where(
          and(
            eq(teams.role, "user"),
            eq(teams.interactionMode, "remote"),
            eq(teams.hasBox, true),
          ),
        )
    )[0]?.count ?? 0;

  /* Activity Table (chunk 4) */
  const data: Record<number, ActivityItem> = {};
  const startDate = IN_PERSON.START_TIME;
  const endDate = REMOTE.END_TIME;

  // Initialize the data object with all hours between startTime and endTime
  const totalHours =
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);
  for (let hour = 0; hour <= totalHours; hour++) {
    data[hour] = { hour, hints: 0, guesses: 0, solves: 0, registrations: 0 };
  }

  // Count hints by hour since startTime
  (
    await db
      .select({
        hour: hints.requestTime,
        hints: sql<number>`COUNT(*)`.as("count"),
      })
      .from(hints)
      .groupBy(hints.requestTime)
  ).forEach(({ hour, hints }) => {
    const key = Math.floor(
      (hour!.getTime() - startDate.getTime()) / (1000 * 60 * 60),
    );
    if (data[key]) data[key].hints += Number(hints);
  });

  // Count guesses and solves by hour since startTime
  (
    await db
      .select({
        hour: guesses.submitTime,
        guesses: sql<number>`COUNT(*)`.as("count"),
        solves:
          sql<number>`SUM(CASE WHEN ${guesses.isCorrect} THEN 1 ELSE 0 END)`.as(
            "correct",
          ),
      })
      .from(guesses)
      .groupBy(guesses.submitTime)
  ).forEach(({ hour, guesses, solves }) => {
    const key = Math.floor(
      (hour!.getTime() - startDate.getTime()) / (1000 * 60 * 60),
    );
    if (data[key]) {
      data[key].guesses += Number(guesses);
      data[key].solves += Number(solves);
    }
  });

  // Count registrations
  (
    await db
      .select({
        hour: teams.createTime,
        registrations: sql<number>`COUNT(*)`.as("count"),
      })
      .from(teams)
      .groupBy(teams.createTime)
  ).forEach(({ hour, registrations }) => {
    const key = Math.floor(
      (hour!.getTime() - startDate.getTime()) / (1000 * 60 * 60),
    );
    if (data[key]) {
      data[key].registrations += Number(registrations);
    }
  });

  const activityData = Object.values(data);

  /* Hint Leaderboard Table (chunk 5) */
  const hintLeaderboard: hintLeaderboardItem[] = (
    await db.query.teams.findMany({
      columns: { displayName: true, id: true },
      where: eq(teams.role, "admin"),
      with: {
        claimedHints: {
          where: not(isNull(hints.response)),
          columns: { id: true },
        },
      },
    })
  )
    .map((a) => ({
      displayName: a.displayName,
      id: a.id,
      hintsAnswered: a.claimedHints.length,
      ranking: null,
    }))
    .sort((a, b) => b.hintsAnswered - a.hintsAnswered);

  // Initialize rankings with tie-rank displacement
  // So if there are three people in 1st place, the next person will be in 4th place
  var currRanking = 1;
  for (let i = 0; i < hintLeaderboard.length; i++) {
    const curr = hintLeaderboard[i];
    const prev = hintLeaderboard[i - 1];

    if (curr && curr.hintsAnswered > 0) {
      if (i === 0 || (prev && curr.hintsAnswered === prev.hintsAnswered)) {
        curr.ranking = currRanking;
      } else {
        currRanking = i + 1;
        curr.ranking = currRanking;
      }
    }
  }

  return (
    <div className="flex w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 md:pt-4">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card x-chunk="dashboard-01-chunk-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Teams</CardTitle>
              <UsersRound className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalTeams}</div>
              <p className="text-muted-foreground text-xs">
                {remoteTeams} remote & {inPersonTeams} in-person
              </p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Guesses</CardTitle>
              <Puzzle className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalGuesses}</div>
              <p className="text-muted-foreground text-xs">
                {percentCorrectGuesses}% correct
              </p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Hints</CardTitle>
              <MessageCircleQuestion className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalHints}</div>
              <p className="text-muted-foreground text-xs">
                {percentAnsweredHints}% answered
              </p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-3">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Remote Boxes
              </CardTitle>
              <PackageOpen className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{numBoxesHad}</div>
              <p className="text-muted-foreground text-xs">
                {numBoxesWanted} teams interested{" "}
                <span className="text-neutral-300">(frozen 3/27)</span>
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Activity</CardTitle>
                <CardDescription>
                  Hourly counts of guesses, hints, solves, and registrations
                  since the start of the hunt.
                </CardDescription>
              </div>
              {/* <Button asChild size="sm" className="ml-auto gap-1"> */}
              {/*   <Link href="#"> */}
              {/*     View All */}
              {/*     <ArrowUpRight className="h-4 w-4" /> */}
              {/*   </Link> */}
              {/* </Button> */}
            </CardHeader>
            <CardContent>
              <ActivityChart activityData={activityData} />
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-5">
            <CardHeader>
              <CardTitle>Hint Leaderboard</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2">
              <ScrollArea className="no-scrollbar lg:max-h-[75vh]">
                {hintLeaderboard.map((user, index) => (
                  <div className="mb-2 flex items-center gap-4" key={user.id}>
                    <Avatar className="flex h-9 w-9">
                      {/* <AvatarImage src="/avatars/01.png" alt="Avatar" /> */}
                      <AvatarFallback
                        className={
                          user.ranking === 1
                            ? "bg-yellow-500 text-white"
                            : user.ranking === 2
                              ? "bg-slate-400 text-white"
                              : user.ranking === 3
                                ? "bg-yellow-800 text-white"
                                : ""
                        }
                      >
                        {user.ranking ?? ""}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <p className="text-sm font-medium leading-none">
                        {user.displayName}
                      </p>
                      <p className="text-muted-foreground text-sm text-gray-500">
                        {user.id}
                      </p>
                    </div>
                    <div className="ml-auto font-medium">
                      {user.hintsAnswered}
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

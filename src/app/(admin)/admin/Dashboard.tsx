import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  MessageCircleQuestion,
  Puzzle,
  UsersRound,
} from "lucide-react";

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

import { ActivityItem, ActivityChart } from "./ActivityChart";
import { db } from "~/server/db/index";
import { errata, guesses, hints, teams } from "~/server/db/schema";
import { count, eq, isNull, not, sql } from "drizzle-orm";

type hintLeaderboardItem = {
  displayName: string;
  username: string;
  hintsAnswered: number;
  ranking?: number | null;
};

export async function Dashboard() {
  const teamCounts = (
    await db
      .select({ interactionMode: teams.interactionMode, count: count() })
      .from(teams)
      .where(eq(teams.role, "user"))
      .groupBy(teams.interactionMode)
  ).reduce<Record<string, number>>((acc, item) => {
    acc[item.interactionMode] = item.count;
    return acc;
  }, {});

  const inPersonTeams = teamCounts["in-person"] ?? 0;
  const remoteTeams = teamCounts["remote"] ?? 0;
  const totalTeams = inPersonTeams + remoteTeams;

  const guessCounts = (
    await db
      .select({ isCorrect: guesses.isCorrect, count: count() })
      .from(guesses)
      .groupBy(guesses.isCorrect)
  ).reduce<Record<string, number>>((acc, item) => {
    acc[`${item.isCorrect}`] = item.count;
    return acc;
  }, {});

  const correctGuesses = guessCounts["true"] ?? 0;
  const incorrectGuesses = guessCounts["false"] ?? 0;
  const totalGuesses = correctGuesses + incorrectGuesses;
  const percentCorrectGuesses = (
    (correctGuesses / totalGuesses) *
    100
  ).toPrecision(2);

  const hintCounts = (
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

  const answeredHints = hintCounts["true"] ?? 0;
  const unansweredHints = hintCounts["false"] ?? 0;
  const totalHints = answeredHints + unansweredHints;
  const percentAnsweredHints = ((answeredHints / totalHints) * 100).toPrecision(
    2,
  );

  const totalErrata =
    (await db.select({ count: count() }).from(errata))[0]?.count ?? 0;

  // Get hint leaderboard rankings
  const hintLeaderboard: hintLeaderboardItem[] = (
    await db.query.teams.findMany({
      columns: { displayName: true, username: true },
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
      username: a.username,
      hintsAnswered: a.claimedHints.length,
      ranking: null,
    }))
    .sort((a, b) => b.hintsAnswered - a.hintsAnswered);

  // Initialize rankings
  var currRanking = 1;
  for (let i = 0; i < hintLeaderboard.length; i++) {
    const curr = hintLeaderboard[i];
    const prev = hintLeaderboard[i - 1];

    // Make sure that curr is not undefined or 0
    if (curr && curr.hintsAnswered > 0) {
      // Initialize the first medal
      // If curr is equal to prev, then also assign the current ranking to curr
      if (i === 0 || (prev && curr.hintsAnswered === prev.hintsAnswered)) {
        curr.ranking = currRanking;
      } else {
        currRanking = i + 1;
        curr.ranking = currRanking;
      }
    }
  }

  // Get activity data
  const data: Record<number, ActivityItem> = {};
  (
    await db
      .select({
        hour: sql<number>`EXTRACT(EPOCH FROM DATE_TRUNC('hour', ${hints.requestTime}))::bigint`.as(
          "hour",
        ),
        hints: sql<number>`COUNT(*)`.as("count"),
      })
      .from(hints)
      .groupBy(sql`hour`)
      .orderBy(sql`hour`)
  ).forEach(({ hour, hints }) => {
    if (!data[hour]) data[hour] = { hour, hints: 0, guesses: 0 };
    data[hour].hints += hints;
  });
  (
    await db
      .select({
        hour: sql<number>`EXTRACT(EPOCH FROM DATE_TRUNC('hour', ${guesses.submitTime}))::bigint`.as(
          "hour",
        ),
        guesses: sql<number>`COUNT(*)`.as("count"),
      })
      .from(guesses)
      .groupBy(sql`hour`)
      .orderBy(sql`hour`)
  ).forEach(({ hour, guesses }) => {
    if (!data[hour]) data[hour] = { hour, hints: 0, guesses: 0 };
    data[hour].guesses += guesses;
  });
  const activityData = Object.values(data).sort((a, b) => b.hour - a.hour);

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
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
              <CardTitle className="text-sm font-medium">Errata</CardTitle>
              <Activity className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalErrata}</div>
              <p className="text-muted-foreground text-xs">
                2 in the last hour
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
                  Hourly registrations, guesses, hints, and solves.
                </CardDescription>
              </div>
              <Button asChild size="sm" className="ml-auto gap-1">
                <Link href="#">
                  View All
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
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
              <ScrollArea className="lg:max-h-[75vh]">
                {hintLeaderboard.map((user, index) => (
                  <div
                    className="mb-2 flex items-center gap-4"
                    key={user.username}
                  >
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
                        {user.username}
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

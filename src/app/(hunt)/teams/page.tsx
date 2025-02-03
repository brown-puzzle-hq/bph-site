import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { db } from "~/server/db";
import { sql } from "drizzle-orm";
import { and, asc, desc, eq, lt } from "drizzle-orm/expressions";
import { teams, guesses } from "~/server/db/schema";
import { IN_PERSON, REMOTE } from "~/hunt.config";
import { FormattedTime } from "~/lib/time";
export const fetchCache = "force-no-store";

type LeaderboardItem = {
  id: string;
  displayName: string;
  finishTime: Date | null;
  correctGuesses: number;
  lastCorrectGuessTime: Date;
};

function Leaderboard({ data }: { data: LeaderboardItem[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-inherit">
          <TableHead className="text-main-header">#</TableHead>
          <TableHead className="w-[20em] text-main-header">Team Name</TableHead>
          <TableHead className="w-[10em] text-center text-main-header">
            Total Solved
          </TableHead>
          <TableHead className="text-main-header">Finish Time</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, index) => (
          <TableRow key={`${row.id}`} className="hover:bg-inherit">
            <TableCell>{index + 1}</TableCell>
            <TableCell className="w-[20em] break-all">
              {row.displayName}
            </TableCell>
            <TableCell className="text-center">
              {row.correctGuesses ?? 0}
            </TableCell>
            <TableCell>
              <FormattedTime time={row.finishTime} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

const inPersonTeams: LeaderboardItem[] = await db
  .select({
    id: teams.id,
    displayName: teams.displayName,
    // Exclude finish time if it is after hunt end
    finishTime: sql<Date | null>`
        CASE 
          WHEN ${teams.finishTime} > ${IN_PERSON.END_TIME} THEN NULL
          ELSE ${teams.finishTime}
        END`.as("finish_time"),
    correctGuesses:
      sql<number>`COUNT(CASE WHEN ${guesses.isCorrect} = true THEN 1 END)`.as(
        "correct_guesses",
      ),
    lastCorrectGuessTime: sql<Date>`MAX(${guesses.submitTime})`.as(
      "last_correct_guess_time",
    ),
  })
  .from(teams)
  // Filter out admin teams and teams who registered after the hunt end
  .where(
    and(
      eq(teams.interactionMode, "in-person"),
      eq(teams.role, "user"),
      lt(teams.createTime, IN_PERSON.END_TIME),
    ),
  )
  // Get guesses that were submitted before the hunt end
  // This is used for `correctGuesses` and `lastCorrectGuessTime`
  .leftJoin(
    guesses,
    and(
      eq(guesses.teamId, teams.id),
      lt(guesses.submitTime, IN_PERSON.END_TIME),
    ),
  )
  .groupBy(teams.id, teams.displayName, teams.finishTime)
  .orderBy(
    asc(teams.finishTime),
    desc(sql`"correct_guesses"`),
    asc(sql`"last_correct_guess_time"`),
  );

const remoteTeams: LeaderboardItem[] = await db
  .select({
    id: teams.id,
    displayName: teams.displayName,
    // Exclude finish time if it is after hunt end
    finishTime: sql<Date | null>`
        CASE 
          WHEN ${teams.finishTime} > ${REMOTE.END_TIME} THEN NULL
          ELSE ${teams.finishTime}
        END`.as("finish_time"),
    correctGuesses:
      sql<number>`COUNT(CASE WHEN ${guesses.isCorrect} = true THEN 1 END)`.as(
        "correct_guesses",
      ),
    lastCorrectGuessTime: sql<Date>`MAX(${guesses.submitTime})`.as(
      "last_correct_guess_time",
    ),
  })
  .from(teams)
  // Filter out admin teams and teams who registered after the hunt end
  .where(
    and(
      eq(teams.interactionMode, "remote"),
      eq(teams.role, "user"),
      lt(teams.createTime, REMOTE.END_TIME),
    ),
  )
  // Get guesses that were submitted before the hunt end
  // This is used for `correctGuesses` and `lastCorrectGuessTime`
  .leftJoin(
    guesses,
    and(
      eq(guesses.teamId, teams.id),
      lt(guesses.submitTime, REMOTE.END_TIME),
      eq(teams.interactionMode, "remote"),
    ),
  )
  .groupBy(teams.id, teams.displayName, teams.finishTime)
  .orderBy(
    asc(teams.finishTime),
    desc(sql`"correct_guesses"`),
    asc(sql`"last_correct_guess_time"`),
  );

export default async function Home() {
  return (
    <div className="mb-6 flex grow flex-col items-center px-4 pt-6">
      <h1 className="mb-2">Leaderboard!</h1>
      <Tabs
        defaultValue="in-person"
        className="flex max-w-3xl flex-col items-center"
      >
        <TabsList className="grid grid-cols-2 space-x-1 bg-secondary-bg">
          <TabsTrigger value="in-person">In-Person</TabsTrigger>
          <TabsTrigger value="remote">Remote</TabsTrigger>
        </TabsList>
        <TabsContent value="in-person">
          <div className="w-full">
            <Leaderboard data={inPersonTeams} />
          </div>
        </TabsContent>
        <TabsContent value="remote">
          <div className="w-full">
            <Leaderboard data={remoteTeams} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

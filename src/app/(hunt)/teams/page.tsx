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
import { count, max, sql } from "drizzle-orm";
import { and, asc, desc, eq, lt } from "drizzle-orm/expressions";
import { teams, solves } from "~/server/db/schema";
import { IN_PERSON, REMOTE } from "~/hunt.config";
import { FormattedTime } from "~/lib/time";
import { Lock } from "lucide-react";

export const revalidate = 300;

type LeaderboardItem = {
  id: string;
  displayName: string;
  hasBox: boolean;
  finishTime: Date | null;
  solves: number;
  lastSolveTime: Date | null;
};

function Leaderboard({ data }: { data: LeaderboardItem[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-inherit">
          <TableHead className="min-w-11 text-center text-main-header">
            #
          </TableHead>
          <TableHead className="w-full text-main-header">Team Name</TableHead>
          <TableHead className="min-w-fit text-center text-main-header">
            Solved
          </TableHead>
          <TableHead className="hidden min-w-40 text-center text-main-header sm:table-cell">
            Finish Time
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, index) => (
          <TableRow key={`${row.id}`} className="hover:bg-inherit">
            <TableCell className="text-center">{index + 1}</TableCell>
            <TableCell className="w-[20em] break-all">
              {row.displayName}
            </TableCell>
            <TableCell
              className={
                row.finishTime
                  ? "text-center text-yellow-100 sm:text-main-text"
                  : "text-center"
              }
            >
              {row.solves ?? 0}
            </TableCell>
            <TableCell className="hidden text-center sm:block">
              <FormattedTime time={row.finishTime} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default async function Home() {
  const inPersonTeams: LeaderboardItem[] = await db
    .select({
      id: teams.id,
      displayName: teams.displayName,
      hasBox: teams.hasBox,
      // Exclude finish time if it is after hunt end
      finishTime: sql<Date | null>`
      CASE 
        WHEN ${teams.finishTime} > ${IN_PERSON.END_TIME} THEN NULL
        ELSE ${teams.finishTime}
      END`.as("finish_time"),
      solves: count(solves).as("solves"),
      lastSolveTime: max(solves.solveTime).as("last_solve_time"),
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
    // Get solves that were submitted before the hunt end
    // This is used for `solves` and `lastSolveTime`
    .leftJoin(
      solves,
      and(
        eq(solves.teamId, teams.id),
        lt(solves.solveTime, IN_PERSON.END_TIME),
      ),
    )
    .groupBy(teams.id, teams.displayName, teams.finishTime)
    .orderBy(
      asc(sql`finish_time`),
      desc(sql`solves`),
      asc(sql`last_solve_time`),
    );

  const allRemoteTeams: LeaderboardItem[] = await db
    .select({
      id: teams.id,
      displayName: teams.displayName,
      hasBox: teams.hasBox,
      // Exclude finish time if it is after hunt end
      finishTime: sql<Date | null>`
      CASE 
        WHEN ${teams.finishTime} > ${REMOTE.END_TIME} THEN NULL
        ELSE ${teams.finishTime}
      END`.as("finish_time"),
      solves: count(solves).as("solves"),
      lastSolveTime: max(solves.solveTime).as("last_solve_time"),
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
    // Get solves that were submitted before the hunt end
    // This is used for `solves` and `lastSolveTime`
    .leftJoin(
      solves,
      and(eq(solves.teamId, teams.id), lt(solves.solveTime, REMOTE.END_TIME)),
    )
    .groupBy(teams.id, teams.displayName, teams.finishTime, teams.createTime)
    .orderBy(
      asc(sql`finish_time`),
      desc(sql`solves`),
      asc(sql`last_solve_time`),
    );

  const remoteBoxTeams = allRemoteTeams.filter((team) => team.hasBox);
  const remoteTeams = allRemoteTeams.filter((team) => !team.hasBox);
  const now = new Date();

  return (
    <div className="mx-auto mb-12 max-w-2xl px-4 pt-6">
      <h1 className="mb-2 text-center">Leaderboard</h1>
      <Tabs defaultValue="in-person" className="w-full">
        <TabsList className="grid w-full grid-cols-3 space-x-1 bg-footer-bg text-[#6c518e]">
          <TabsTrigger
            className="data-[state=active]:bg-[#5e437e] data-[state=active]:text-main-text"
            value="in-person"
          >
            In-Person
            {now > IN_PERSON.END_TIME && (
              <Lock className="h-[13px] stroke-[3.5]" />
            )}
          </TabsTrigger>
          <TabsTrigger
            className="data-[state=active]:bg-[#5e437e] data-[state=active]:text-main-text"
            value="remote-box"
          >
            <span className="sm:hidden">Has Box</span>
            <span className="hidden sm:block">Remote (Box)</span>
            {now > REMOTE.END_TIME && (
              <Lock className="h-[13px] stroke-[3.5]" />
            )}
          </TabsTrigger>
          <TabsTrigger
            className="data-[state=active]:bg-[#5e437e] data-[state=active]:text-main-text"
            value="remote"
          >
            Remote
            {now > REMOTE.END_TIME && (
              <Lock className="h-[13px] stroke-[3.5]" />
            )}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="in-person">
          <div className="w-full">
            <Leaderboard data={inPersonTeams} />
          </div>
        </TabsContent>
        <TabsContent value="remote-box">
          <div className="w-full">
            <Leaderboard data={remoteBoxTeams} />
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

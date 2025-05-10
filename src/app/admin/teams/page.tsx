import { db } from "@/db/index";
import { columns } from "./Columns";
import { TeamTable } from "./TeamTable";
import { count, sql } from "drizzle-orm";
import { and, asc, desc, eq, ne } from "drizzle-orm/expressions";
import { teams, solves } from "~/server/db/schema";
import { IN_PERSON, REMOTE } from "~/hunt.config";
import { ActualInteractionMode } from "~/server/db/schema";

export const revalidate = 300;

const fetchInPersonUsers = async () =>
  (
    await db
      .select({
        id: teams.id,
        displayName: teams.displayName,
        createTime: teams.createTime,
        finishTime: teams.finishTime,
        solves: count(solves).as("solves"),

        // Categories for leaderboard calculations
        // Exclude finish time if it is after hunt end
        filteredFinishTime: sql<Date | null>`
        CASE 
          WHEN ${teams.finishTime} > ${IN_PERSON.END_TIME} THEN NULL
          ELSE ${teams.finishTime}
        END`.as("filtered_finish_time"),

        // Exclude solves if it is after hunt end
        filtered_solves: sql<number>`
        COUNT(CASE WHEN ${solves.solveTime} < ${IN_PERSON.END_TIME} THEN 1 END)
      `.as("filtered_solves"),

        // Exclude last solve time if it is after hunt end
        lastSolveTime: sql<Date | null>`
        MAX(CASE WHEN ${solves.solveTime} < ${IN_PERSON.END_TIME} THEN ${solves.solveTime} END)
      `.as("last_solve_time"),
      })
      .from(teams)
      // Filter for in-person users
      .where(
        and(eq(teams.interactionMode, "in-person"), eq(teams.role, "user")),
      )
      .leftJoin(solves, eq(solves.teamId, teams.id))
      .groupBy(teams.id, teams.displayName, teams.finishTime)
      .orderBy(
        asc(sql`filtered_finish_time`),
        desc(sql`filtered_solves`),
        asc(sql`last_solve_time`),
      )
  ).map((team, i) => ({
    ...team,
    rank: team.solves > 0 ? i + 1 : null,
    actualInteractionMode: "in-person" as ActualInteractionMode,
    role: "user",
  }));

const fetchRemoteUsers = async () =>
  (
    await db
      .select({
        id: teams.id,
        displayName: teams.displayName,
        createTime: teams.createTime,
        finishTime: teams.finishTime,
        hasBox: teams.hasBox,
        solves: count(solves).as("solves"),

        // Categories for leaderboard calculations
        // Exclude finish time if it is after hunt end
        filteredFinishTime: sql<Date | null>`
        CASE 
          WHEN ${teams.finishTime} > ${REMOTE.END_TIME} THEN NULL
          ELSE ${teams.finishTime}
        END`.as("filtered_finish_time"),

        filtered_solves: sql<number>`
        COUNT(CASE WHEN ${solves.solveTime} < ${REMOTE.END_TIME} THEN 1 END)
      `.as("filtered_solves"),

        lastSolveTime: sql<Date | null>`
        MAX(CASE WHEN ${solves.solveTime} < ${REMOTE.END_TIME} THEN ${solves.solveTime} END)
      `.as("last_solve_time"),
      })
      .from(teams)
      // Filter for remote users
      .where(and(eq(teams.interactionMode, "remote"), eq(teams.role, "user")))
      .leftJoin(solves, and(eq(solves.teamId, teams.id)))
      .groupBy(teams.id, teams.displayName, teams.finishTime, teams.createTime)
      .orderBy(
        asc(sql`finish_time`),
        desc(sql`filtered_solves`),
        asc(sql`last_solve_time`),
      )
  ).map((team) => ({
    ...team,
    actualInteractionMode: (team.hasBox
      ? "remote-box"
      : "remote") as ActualInteractionMode,
    role: "user",
  }));

const fetchNonUsers = async () =>
  (
    await db.query.teams.findMany({
      columns: {
        id: true,
        displayName: true,
        role: true,
        createTime: true,
        finishTime: true,

        interactionMode: true,
        hasBox: true,
      },
      where: ne(teams.role, "user"),
    })
  ).map((team) => ({
    ...team,
    rank: null,
    actualInteractionMode: (team.interactionMode === "remote" && team.hasBox
      ? "remote-box"
      : team.interactionMode) as ActualInteractionMode,
  }));

export default async function Home() {
  const [inPersonUsers, allRemoteUsers, nonUsers] = await Promise.all([
    fetchInPersonUsers(),
    fetchRemoteUsers(),
    fetchNonUsers(),
  ]);

  const remoteBoxUsers = allRemoteUsers
    .filter((team) => team.hasBox)
    .map((team, i) => ({ ...team, rank: team.solves > 0 ? i + 1 : null }));
  const remoteUsers = allRemoteUsers
    .filter((team) => !team.hasBox)
    .map((team, i) => ({ ...team, rank: team.solves > 0 ? i + 1 : null }));

  const data = [
    ...inPersonUsers,
    ...remoteBoxUsers,
    ...remoteUsers,
    ...nonUsers,
  ];

  return (
    // FYI container is important don't be like Alex and spend an hour debugging after removing it
    <div className="container mb-4 md:mb-12">
      <h1 className="mb-2 w-screen text-center">Teams</h1>
      <TeamTable columns={columns} data={data} />
    </div>
  );
}

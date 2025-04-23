"use server";

import { auth } from "@/auth";
import { errata } from "@/db/schema";
import { db } from "@/db/index";
import { eq } from "drizzle-orm";
import { unlocks, puzzles, solves } from "@/db/schema";
import { sendEmail, extractEmails } from "~/lib/comms";
import { INITIAL_PUZZLES } from "~/hunt.config";
import { ErratumEmailTemplate } from "~/lib/email-template";

export async function insertErratum(puzzleId: string, description: string) {
  const session = await auth();
  if (session?.user?.role !== "admin") {
    return {
      error: "Not authenticated, please ensure you're on an admin account.",
    };
  }

  const puzzleName = (
    await db.query.puzzles.findFirst({
      where: eq(puzzles.id, puzzleId),
    })
  )?.name;

  if (!puzzleName) {
    return { error: "Puzzle not found." };
  }

  await db.insert(errata).values({
    puzzleId,
    description,
    timestamp: new Date(),
  });

  const unlockedTeams = INITIAL_PUZZLES.includes(puzzleId)
    ? await db.query.teams.findMany({ columns: { id: true, members: true } })
    : (
        await db.query.unlocks.findMany({
          columns: {},
          where: eq(unlocks.puzzleId, puzzleId),
          with: {
            team: {
              columns: { id: true, members: true },
            },
          },
        })
      ).map((u) => u.team);

  const solvedTeams = await db.query.solves.findMany({
    columns: {},
    where: eq(solves.puzzleId, puzzleId),
    with: {
      team: {
        columns: { id: true },
      },
    },
  });

  const solvedTeamIds = new Set(solvedTeams.map((s) => s.team.id));

  const activeTeams = unlockedTeams.filter(
    (team) => !solvedTeamIds.has(team.id),
  );

  const emails: string[] = activeTeams.flatMap((team) =>
    extractEmails(team.members),
  );

  sendEmail(
    ["brownpuzzlehq@gmail.com"],
    `Erratum Issued [${puzzleName}]`,
    ErratumEmailTemplate({ puzzleName, puzzleId, erratum: description }),
    emails,
  );

  return { error: null };
}

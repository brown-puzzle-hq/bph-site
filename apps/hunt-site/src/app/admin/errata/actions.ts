"use server";

import { errata } from "@/db/schema";
import { db } from "@/db/index";
import { eq } from "drizzle-orm";
import { unlocks, puzzles, solves } from "@/db/schema";
import { sendEmail } from "~/lib/comms";
import { extractEmails } from "~/lib/team-members";
import { HUNT_EMAIL } from "@/config/client";
import { INITIAL_PUZZLES } from "@/config/server";
import { ErratumEmailTemplate } from "~/lib/email-template";
import { assertPermissions } from "~/lib/server";

export async function insertErratum(puzzleId: string, description: string) {
  await assertPermissions({ level: "admin" });

  const puzzleName = (
    await db.query.puzzles.findFirst({
      where: eq(puzzles.id, puzzleId),
    })
  )?.name;

  if (!puzzleName) {
    throw new Error("Puzzle not found.");
  }

  await db.insert(errata).values({
    puzzleId,
    description,
    timestamp: new Date(),
  });

  const unlockedTeams = INITIAL_PUZZLES.includes(puzzleId)
    ? await db.query.teams.findMany({
        columns: { id: true, primaryEmail: true, members: true },
      })
    : (
        await db.query.unlocks.findMany({
          columns: {},
          where: eq(unlocks.puzzleId, puzzleId),
          with: {
            team: {
              columns: { id: true, primaryEmail: true, members: true },
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

  const emails: string[] = [
    ...activeTeams.flatMap((team) => extractEmails(team.members)),
    ...activeTeams.map((team) => team.primaryEmail),
  ];

  await sendEmail(
    [`${HUNT_EMAIL}`],
    `Erratum Issued [${puzzleName}]`,
    ErratumEmailTemplate({ puzzleName, puzzleId, erratum: description }),
    emails,
  );
}

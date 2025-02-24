"use server";

import { auth } from "@/auth";
import { errata } from "@/db/schema";
import { db } from "@/db/index";
import { eq } from "drizzle-orm";
import { unlocks, puzzles } from "@/db/schema";
import { sendEmail, extractEmails } from "~/lib/utils";
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
  });

  let emails: string[] = [];

  if (INITIAL_PUZZLES.includes(puzzleId)) {
    emails = (
      await db.query.teams.findMany({
        columns: { members: true },
      })
    ).flatMap((team) => extractEmails(team.members));
  } else {
    emails = (
      await db.query.unlocks.findMany({
        columns: {},
        where: eq(unlocks.puzzleId, puzzleId),
        with: {
          team: {
            columns: { members: true },
          },
        },
      })
    ).flatMap((team) => extractEmails(team.team.members));
  }

  sendEmail(
    ["brownpuzzlehq@gmail.com"],
    `Erratum Issued [${puzzleName}]`,
    ErratumEmailTemplate({ puzzleName, puzzleId, erratum: description }),
    emails,
  );

  return { error: null };
}

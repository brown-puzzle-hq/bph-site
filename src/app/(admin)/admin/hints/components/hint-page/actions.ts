"use server";

import axios from "axios";
import { and, eq } from "drizzle-orm";
import { getNumberOfHintsRemaining } from "~/hunt.config";
import { auth } from "~/server/auth/auth";
import { db } from "~/server/db/index";
import { followUps, hints, teams } from "~/server/db/schema";

export type MessageType = "request" | "response" | "follow-up";

/** Inserts a hint request into the hint table */
export async function insertHintRequest(puzzleId: string, hint: string) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Not logged in");
  }

  // Checks
  const hasHint = (await getNumberOfHintsRemaining(session.user.id)) > 0;
  const hasUnansweredHint = (await db.query.hints.findFirst({
    columns: { id: true },
    where: and(
      eq(hints.teamId, session.user.id),
      eq(hints.status, "no_response"),
    ),
  }))
    ? true
    : false;

  if (hasHint && !hasUnansweredHint) {
    const result = await db
      .insert(hints)
      .values({
        teamId: session.user.id,
        puzzleId,
        request: hint,
        requestTime: new Date(),
        status: "no_response",
      })
      .returning({ id: hints.id });

    const user = await db.query.teams.findFirst({
      where: eq(teams.id, session.user.id),
    });

    // TODO: get specific hint ID
    if (process.env.DISCORD_WEBHOOK_URL) {
      await axios.post(process.env.DISCORD_WEBHOOK_URL, {
        content: `🙏 **Hint** [request](https://puzzlethon.brownpuzzle.club/admin/hints) by [${user?.username}](https://puzzlethon.brownpuzzle.club/teams/${user?.username}) on [${puzzleId}](https://puzzlethon.brownpuzzle.club/puzzle/${puzzleId}): _${hint}_ <@&1310029428864057504>`,
      });
    }

    return result[0]?.id;
  }
}

/** Edits a hint */
export async function editMessage(
  id: number,
  message: string,
  type: MessageType,
) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Not logged in");
  }

  switch (type) {
    case "request":
      await db
        .update(hints)
        .set({ request: message })
        .where(and(eq(hints.id, id), eq(hints.teamId, session.user.id)))
        .returning({ id: hints.id });
      break;
    case "response":
      await db
        .update(hints)
        .set({ response: message })
        .where(and(eq(hints.id, id), eq(hints.claimer, session.user.id)))
        .returning({ id: hints.id });
      break;
    case "follow-up":
      await db
        .update(followUps)
        .set({ message })
        .where(and(eq(followUps.id, id), eq(followUps.userId, session.user.id)))
        .returning({ id: hints.id });
      break;
  }
}

/** Inserts a follow-up hint into the hint table */
export async function insertFollowUp(hintId: number, message: string) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Not logged in");
  }
  try {
    const result = await db
      .insert(followUps)
      .values({
        hintId,
        userId: session.user.id,
        message,
        time: new Date(),
      })
      .returning({ id: followUps.id });
    return result[0]?.id ?? null;
  } catch (_) {
    return null;
  }
}

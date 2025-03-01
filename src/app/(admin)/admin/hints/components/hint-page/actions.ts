"use server";
import { auth } from "~/server/auth/auth";
import { db } from "~/server/db/index";
import { and, eq } from "drizzle-orm";
import { followUps, hints } from "~/server/db/schema";
import { getNumberOfHintsRemaining } from "~/hunt.config";
import { sendBotMessage, sendEmail, extractEmails } from "~/lib/utils";
import {
  FollowUpEmailTemplate,
  FollowUpEmailTemplateProps,
} from "~/lib/email-template";

export type MessageType = "request" | "response" | "follow-up";

/** Inserts a hint request into the hint table */
export async function insertHintRequest(puzzleId: string, hint: string) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Not logged in");
  }
  const teamId = session.user.id;
  const role = session.user.role;

  // Checks
  const hasHint = (await getNumberOfHintsRemaining(teamId, role)) > 0;
  const hasUnansweredHint = (await db.query.hints.findFirst({
    columns: { id: true },
    where: and(eq(hints.teamId, teamId), eq(hints.status, "no_response")),
  }))
    ? true
    : false;

  if (hasHint && !hasUnansweredHint) {
    const result = await db
      .insert(hints)
      .values({
        teamId: teamId,
        puzzleId,
        request: hint,
        requestTime: new Date(),
        status: "no_response",
      })
      .returning({ id: hints.id });

    // TODO: get specific hint ID
    const hintMessage = `🙏 **Hint** [request](https://www.brownpuzzlehunt.com/admin/hints) by [${teamId}](https://www.brownpuzzlehunt.com/teams/${teamId}) on [${puzzleId}](https://www.brownpuzzlehunt.com/puzzle/${puzzleId}): ${hint} <@&1310029428864057504>`;
    await sendBotMessage(hintMessage);

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
export async function insertFollowUp({
  hintId,
  members,
  teamId,
  teamDisplayName,
  puzzleId,
  puzzleName,
  message,
}: FollowUpEmailTemplateProps & {
  hintId: number;
  teamId?: string;
  members: string;
}) {
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

    if (result[0]?.id) {
      // If there are members, then this is a follow-up by a team
      // So send an email
      if (members) {
        await sendEmail(
          extractEmails(members),
          `Follow-Up Hint [${puzzleName}]`,
          FollowUpEmailTemplate({
            teamDisplayName,
            puzzleId,
            puzzleName,
            message,
          }),
        );
      }
      // Otherwise, notify admin on Discord that there is a follow-up
      else if (message !== "[Claimed]") {
        const hintMessage = `🙏 **Hint** [follow-up](https://www.brownpuzzlehunt.com/admin/hints/${hintId}?reply=true) by [${teamDisplayName}](https://www.brownpuzzlehunt.com/teams/${teamId}) on [${puzzleName}](https://www.brownpuzzlehunt.com/puzzle/${puzzleId}): ${message} <@&1310029428864057504>`;
        await sendBotMessage(hintMessage);
      }
      return result[0].id;
    }
    return null;
  } catch (_) {
    return null;
  }
}

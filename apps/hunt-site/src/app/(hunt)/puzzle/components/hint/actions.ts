"use server";

import { db } from "@/db/index";
import { hints, replies } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { auth } from "@/auth";
import { getNumberOfHintsRemaining } from "@/config/server";
import { sendBotMessage, sendEmail } from "~/lib/comms";
import { extractEmails } from "~/lib/team-members";
import { ReplyEmailTemplate } from "~/lib/email-template";
import { HUNT_URL } from "@/config/client";

export type MessageType = "request" | "response" | "reply";

/** Inserts a hint request into the hint table */
export async function insertHintRequest(puzzleId: string, hint: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not logged in");

  const teamId = session.user.id;
  const role = session.user.role;
  const interactionMode = session.user.interactionMode;

  // Checks
  const hasHint =
    (await getNumberOfHintsRemaining(teamId, role, interactionMode)) > 0;

  if (!hasHint) {
    return {
      error: "No hints remaining.",
    };
  }

  const unansweredHint = await db.query.hints.findFirst({
    columns: { id: true },
    where: and(eq(hints.teamId, teamId), eq(hints.status, "no_response")),
    with: {
      puzzle: {
        columns: { name: true },
      },
    },
  });

  if (unansweredHint) {
    return {
      error: `You have an outstanding hint on the puzzle ${unansweredHint.puzzle.name}.`,
    };
  }

  const result = (
    await db
      .insert(hints)
      .values({
        teamId: teamId,
        puzzleId,
        request: hint,
        requestTime: new Date(),
        status: "no_response",
      })
      .returning({ id: hints.id })
  )?.[0];

  if (!result) {
    return {
      error:
        "Please try again. If the problem persists, contact HQ or use the feedback form.",
    };
  }

  const hintMessage = `🙏 **Hint** [request](${HUNT_URL}/admin/hints/${result.id}) by [${teamId}](${HUNT_URL}/team/${teamId}) on [${puzzleId}](${HUNT_URL}/puzzle/${puzzleId} ): ${hint}`;
  await sendBotMessage(hintMessage, "hint", "@hint");

  return { error: null, id: result.id };
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
    case "reply":
      await db
        .update(replies)
        .set({ message })
        .where(and(eq(replies.id, id), eq(replies.userId, session.user.id)))
        .returning({ id: hints.id });
      break;
  }
}

/** Handles a reply from a team */
export async function insertTeamReply(hintId: number, message: string) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Not logged in");
  }
  try {
    const hint = await db.query.hints.findFirst({
      where: eq(hints.id, hintId),
      with: {
        team: {
          columns: {
            id: true,
            displayName: true,
            members: true,
            primaryEmail: true,
          },
        },
        puzzle: {
          columns: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!hint) {
      return null;
    }

    const result = await db
      .insert(replies)
      .values({
        hintId,
        userId: session.user.id,
        message,
        time: new Date(),
      })
      .returning({ id: replies.id });

    if (result[0]?.id) {
      let emails = [
        hint.team.primaryEmail,
        ...extractEmails(hint.team.members),
      ];
      await sendEmail(
        emails,
        `Reply [${hint.puzzle.name}]`,
        ReplyEmailTemplate({
          teamDisplayName: hint.team.displayName,
          puzzleId: hint.puzzle.id,
          puzzleName: hint.puzzle.name,
          message,
        }),
      );
    }
    return result?.[0]?.id ?? null;
  } catch (_) {
    return null;
  }
}

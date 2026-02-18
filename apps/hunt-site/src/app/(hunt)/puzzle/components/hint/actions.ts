"use server";

import { db } from "@/db/index";
import { hints, replies } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { getNumberOfHintsRemaining } from "@/config/server";
import { sendBotMessage } from "~/lib/comms";
import { HUNT_URL } from "@/config/client";
import { assertPermissions } from "~/lib/server";
import { assertCanViewPuzzle } from "../../actions";

export type MessageType = "request" | "reply";

/** Inserts a hint request into the hint table */
export async function insertHintRequest(puzzleId: string, hint: string) {
  const {
    id: teamId,
    role,
    interactionMode,
  } = await assertPermissions({ level: "userAny" });

  // Check validity
  const hasHint =
    (await getNumberOfHintsRemaining(teamId, role, interactionMode)) > 0;

  if (!hasHint) throw new Error("No hints remaining.");

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
    throw new Error(
      `You have an outstanding hint on the puzzle ${unansweredHint.puzzle.name}.`,
    );
  }

  await assertCanViewPuzzle(puzzleId);

  const [request] = await db
    .insert(hints)
    .values({
      teamId,
      puzzleId,
      request: hint,
      requestTime: new Date(),
      status: "no_response",
    })
    .returning({ id: hints.id });

  if (!request) throw new Error("An unexpected error occurred.");

  const hintMessage = `🙏 **Hint** [request](${HUNT_URL}/admin/hints/${request.id}) by [${teamId}](${HUNT_URL}/team/${teamId}) on [${puzzleId}](${HUNT_URL}/puzzle/${puzzleId} ): ${hint}`;
  await sendBotMessage(hintMessage, "hint", "@hint");

  return request;
}

/** Edits a hint */
export async function editTeamMessage(
  id: number,
  message: string,
  type: MessageType,
) {
  const { id: teamId } = await assertPermissions({ level: "userAny" });

  switch (type) {
    case "request":
      await db
        .update(hints)
        .set({ request: message })
        .where(and(eq(hints.id, id), eq(hints.teamId, teamId)));
      break;
    case "reply":
      await db
        .update(replies)
        .set({ message })
        .where(and(eq(replies.id, id), eq(replies.userId, teamId)));
      break;
  }
}

/** Handles a reply from a team */
export async function insertTeamReply(hintId: number, message: string) {
  const { id: teamId, displayName } = await assertPermissions({
    level: "userAny",
  });

  const hint = await db.query.hints.findFirst({
    where: and(eq(hints.id, hintId), eq(hints.teamId, teamId)),
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

  if (!hint) throw new Error("Hint not found.");

  const [reply] = await db
    .insert(replies)
    .values({
      hintId,
      userId: teamId,
      message,
      time: new Date(),
    })
    .returning({ id: replies.id });

  if (!reply) throw new Error("Unable to insert reply.");

  const hintMessage = `🙏 **Hint** [reply](${HUNT_URL}/admin/hints/${hintId}?reply=true) by [${displayName}](${HUNT_URL}/team/${teamId}) on [${hint.puzzle.name}](${HUNT_URL}/puzzle/${hint.puzzle.id} ): ${message}`;
  await sendBotMessage(hintMessage, "hint", "@hint");
  return { replyId: reply.id };
}

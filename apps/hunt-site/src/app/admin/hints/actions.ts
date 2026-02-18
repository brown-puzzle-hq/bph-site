"use server";

import { auth } from "@/auth";
import { hints, replies } from "@/db/schema";
import { db } from "@/db/index";
import { eq, and, isNull, ne } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { sendEmail } from "~/lib/comms";
import { extractEmails } from "~/lib/team-members";
import { HintEmailTemplate } from "~/lib/email-template";
import { ReplyEmailTemplate } from "~/lib/email-template";
import { HintStatus } from "@/config/client";
import { assertPermissions } from "~/lib/server";

export type MessageType = "response" | "reply";

export async function editHintStatus(hintId: number, status: HintStatus) {
  await assertPermissions({ level: "admin" });

  let [result] = await db
    .update(hints)
    .set({ status })
    .where(eq(hints.id, hintId))
    .returning({ id: hints.id });

  revalidatePath("/admin/hints");

  if (!result) throw new Error(`Hint ${hintId} not found.`);
}

export async function claimHint(hintId: number) {
  const { id: teamId } = await assertPermissions({ level: "admin" });

  // For a hint to be claimed, the claimer must be null
  // And the hint status must be "no_response"
  const [result] = await db
    .update(hints)
    .set({
      claimer: teamId,
      claimTime: new Date(),
    })
    .where(
      and(
        eq(hints.id, hintId),
        isNull(hints.claimer),
        eq(hints.status, "no_response"),
      ),
    )
    .returning({ id: hints.id });

  revalidatePath("/admin/hints");

  // Error-handling
  if (!result) {
    let hint = await db.query.hints.findFirst({ where: eq(hints.id, hintId) });
    if (!hint) {
      throw new Error(`Hint ${hintId} not found.`);
    }
    if (hint.claimer !== null) {
      throw new Error(`Hint ${hintId} claimed by ${hint.claimer}.`);
    }
    if (hint.status !== "no_response") {
      throw new Error(`Hint ${hintId} has status ${hint.status}`);
    }
    throw new Error("An unexpected error occurred.");
  }
}

export async function unclaimHint(hintId: number) {
  const { id: teamId } = await assertPermissions({ level: "admin" });

  // For a hint to be unclaimed, the claimer must be the user
  // And the hint status must be "no_response"
  const [result] = await db
    .update(hints)
    .set({ claimer: null, claimTime: null })
    .where(
      and(
        eq(hints.id, hintId),
        eq(hints.claimer, teamId),
        eq(hints.status, "no_response"),
      ),
    )
    .returning({ id: hints.id });

  revalidatePath("/admin/hints");

  // Error-handling
  if (!result) {
    let hint = await db.query.hints.findFirst({ where: eq(hints.id, hintId) });
    if (!hint) {
      throw new Error(`Hint ${hintId} not found.`);
    }
    if (hint.claimer !== teamId) {
      throw new Error(`Hint ${hintId} not claimed by user.`);
    }
    if (hint.status !== "no_response") {
      throw new Error(`Hint ${hintId} has status ${hint.status}`);
    }
    throw new Error("An unexpected error occurred.");
  }
}

export async function editAdminMessage(
  id: number,
  message: string,
  type: MessageType,
) {
  const { id: teamId } = await assertPermissions({ level: "admin" });

  let result;
  switch (type) {
    case "response":
      [result] = await db
        .update(hints)
        .set({ response: message })
        .where(and(eq(hints.id, id), eq(hints.claimer, teamId)))
        .returning({ id: hints.id });
      break;
    case "reply":
      [result] = await db
        .update(replies)
        .set({ message })
        .where(and(eq(replies.id, id), eq(replies.userId, teamId)))
        .returning({ id: hints.id });
      break;
  }

  if (!result) throw new Error("Message not found.");
}

// TODO: not gonna do much error-handling here for now
// this function should be gone once we fix hinting
export async function insertAdminReply(
  hintId: number,
  message: string,
  emailTeam: boolean,
) {
  const { id: teamId } = await assertPermissions({ level: "admin" });

  try {
    // Query the hint with team and puzzle relations to get all needed data
    const hint = await db.query.hints.findFirst({
      where: eq(hints.id, hintId),
      with: {
        team: {
          columns: {
            id: true,
            displayName: true,
            primaryEmail: true,
            members: true,
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
        userId: teamId,
        message,
        time: new Date(),
      })
      .returning({ id: replies.id });

    if (result[0]?.id) {
      if (emailTeam) {
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
      return result[0].id;
    }
    return null;
  } catch (_) {
    return null;
  }
}

export async function insertHintResponse(hintId: number, response: string) {
  const { id: teamId } = await assertPermissions({ level: "admin" });

  if (!response) throw new Error("Response is empty.");

  const hint = await db.query.hints.findFirst({
    where: eq(hints.id, hintId),
    with: {
      team: {
        columns: {
          id: true,
          displayName: true,
          primaryEmail: true,
          members: true,
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

  if (!hint) throw new Error(`Hint ${hintId} not found.`);

  // For a response to go through, the hint claimer must be the user and
  // the hint status must be no_response
  const [result] = await db
    .update(hints)
    .set({
      response,
      responseTime: new Date(),
      status: "answered",
    })
    .where(
      and(
        eq(hints.id, hintId),
        eq(hints.claimer, teamId),
        eq(hints.status, "no_response"),
      ),
    )
    .returning({
      id: hints.id,
      request: hints.request,
      puzzleId: hints.puzzleId,
    });

  revalidatePath("/admin/");

  // Error-handling
  if (!result) {
    if (hint.claimer === null) {
      throw new Error(`Hint ${hintId} is unclaimed.`);
    }
    if (hint.claimer !== teamId) {
      throw new Error(`Hint ${hintId} claimed by ${hint.claimer}.`);
    }
    if (hint.status !== "no_response") {
      throw new Error(`Hint ${hintId} has status ${hint.status}`);
    }
    throw new Error("An unexpected error occurred.");
  }

  // Send email
  const emails = [hint.team.primaryEmail, ...extractEmails(hint.team.members)];
  await sendEmail(
    emails,
    `Hint Answered [${hint.puzzle.name}]`,
    HintEmailTemplate({
      teamDisplayName: hint.team.displayName,
      puzzleName: hint.puzzle.name,
      puzzleId: result.puzzleId,
      request: result.request,
      response,
    }),
  );
}

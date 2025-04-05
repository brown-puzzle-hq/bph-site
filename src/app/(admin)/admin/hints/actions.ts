"use server";

import { auth } from "@/auth";
import { hints, followUps, hintStatusEnum } from "@/db/schema";
import { db } from "@/db/index";
import { eq, and, isNull, ne } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { sendBotMessage, sendEmail, extractEmails } from "~/lib/comms";
import { HintEmailTemplate } from "~/lib/email-template";
import {
  FollowUpEmailTemplate,
  FollowUpEmailTemplateProps,
} from "~/lib/email-template";

export type MessageType = "request" | "response" | "follow-up";

export async function editHintStatus(
  hintId: number,
  status: (typeof hintStatusEnum.enumValues)[number],
) {
  const session = await auth();
  if (session?.user?.role !== "admin") {
    throw new Error("Not authorized");
  }

  let result = await db
    .update(hints)
    .set({ status })
    .where(eq(hints.id, hintId))
    .returning({ id: hints.id });

  revalidatePath("/admin/hints");

  if (result.length != 1) {
    return {
      title: "Error updating hint status",
      error: "Hint entry not found",
    };
  }

  return { error: null };
}

export async function claimHint(hintId: number) {
  const session = await auth();
  if (session?.user?.role !== "admin") {
    throw new Error("Not authorized");
  }

  // For a hint to be claimed, the claimer must be null
  // And the hint status must be "no_response"
  let result = await db
    .update(hints)
    .set({
      claimer: session.user.id,
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
  if (result.length != 1) {
    let hint = await db.query.hints.findFirst({ where: eq(hints.id, hintId) });
    if (!hint) {
      return {
        title: "Error claiming hint",
        error: "Hint entry not found",
      };
    } else if (hint.claimer !== null) {
      return {
        title: "Error claiming hint",
        error: "Hint already claimed",
      };
    } else if (hint.status !== "no_response") {
      return {
        title: "error claiming hint",
        error: `Hint status is not no_response. It is ${hint.status}.`,
      };
    } else {
      return {
        title: "Error claiming hint",
        error: "Unexpected error occured",
      };
    }
  }

  return { error: null };
}

export async function unclaimHint(hintId: number) {
  const session = await auth();
  if (session?.user?.role !== "admin") {
    throw new Error("Not authorized");
  }

  // For a hint to be unclaimed, the claimer must be the user
  // And the hint status must be "no_response"
  let user = session.user.id ? session.user.id : "";
  let result = await db
    .update(hints)
    .set({ claimer: null, claimTime: null })
    .where(
      and(
        eq(hints.id, hintId),
        eq(hints.claimer, user),
        eq(hints.status, "no_response"),
      ),
    )
    .returning({ id: hints.id });

  revalidatePath("/admin/hints");

  if (result.length != 1) {
    let hint = await db.query.hints.findFirst({ where: eq(hints.id, hintId) });
    if (!hint) {
      return {
        title: "Error unclaiming hint",
        error: "Hint entry not found",
      };
    } else if (hint.claimer !== user) {
      return {
        title: "Error unclaiming hint",
        error: "Hint not currently claimed by user",
      };
    } else if (hint.status !== "no_response") {
      return {
        title: "Error unclaiming hint",
        error: `Hint status is not no_response. It is ${hint.status}.`,
      };
    } else {
      return {
        title: "Error unclaiming hint",
        error: "Unexpected error occured",
      };
    }
  }

  return { error: null };
}

export async function refundHint(hintId: number) {
  const session = await auth();
  if (session?.user?.role !== "admin") {
    throw new Error("Not authorized");
  }

  // For a hint to be refunded, the claimer must be the user
  // And the hint status must not be "no_response"
  let user = session.user.id ? session.user.id : "";
  let result = await db
    .update(hints)
    .set({ status: "refunded" })
    .where(
      and(
        eq(hints.id, hintId),
        eq(hints.claimer, user),
        ne(hints.status, "no_response"),
      ),
    )
    .returning({ id: hints.id });

  revalidatePath("/admin/hints");

  if (result.length != 1) {
    let hint = await db.query.hints.findFirst({ where: eq(hints.id, hintId) });
    if (!hint) {
      return {
        title: "Error refunding hint",
        error: "Hint entry not found",
      };
    } else if (hint.claimer !== user) {
      return {
        title: "Error refunding hint",
        error: "Hint not currently claimed by user",
      };
    } else if (hint.status === "no_response") {
      return {
        title: "Error refunding hint",
        error: "Hint status is no_response",
      };
    } else {
      return {
        title: "Error refunding hint",
        error: "Unexpected error occured",
      };
    }
  }

  return { error: null };
}

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

export async function insertHintResponse(
  hintId: number,
  teamDisplayName: string,
  puzzleName: string,
  response: string,
  members: string,
) {
  const session = await auth();
  if (session?.user?.role !== "admin") {
    throw new Error("Not authorized");
  }

  // For a response to go through, the hint claimer must be the user and
  // the hint status must be no_response
  let user = session.user.id ? session.user.id : "";
  let result = (
    await db
      .update(hints)
      .set({
        response,
        responseTime: new Date(),
        status: "answered",
      })
      .where(
        and(
          eq(hints.id, hintId),
          eq(hints.claimer, user),
          eq(hints.status, "no_response"),
        ),
      )
      .returning({
        id: hints.id,
        request: hints.request,
        puzzleId: hints.puzzleId,
      })
  )?.[0];

  revalidatePath("/admin/");

  // Error-handling
  if (!result) {
    let hintSearch = await db.query.hints.findFirst({
      where: eq(hints.id, hintId),
    });
    if (!hintSearch) {
      return {
        title: "Error responding to hint",
        error: "Hint entry not found",
        response: response,
      };
    } else if (hintSearch.claimer !== user) {
      return {
        title: "Error responding to hint",
        error: hintSearch.claimer
          ? `Hint claimed by ${hintSearch.claimer}.`
          : "Hint is currently unclaimed.",
        response: response,
      };
    } else if (hintSearch.status != "no_response") {
      return {
        title: "Error responding to hint",
        error: `Hint status is not no_response. It is ${hintSearch.status}.`,
        response: response,
      };
    } else {
      return {
        title: "Error responding to hint",
        error: "Unexpected error occured",
        response: response,
      };
    }
  }

  // Send email
  await sendEmail(
    extractEmails(members),
    `Hint Answered [${puzzleName}]`,
    HintEmailTemplate({
      teamDisplayName: teamDisplayName,
      puzzleName: puzzleName,
      puzzleId: result.puzzleId,
      request: result.request,
      response,
    }),
  );

  return { error: null, id: result.id };
}

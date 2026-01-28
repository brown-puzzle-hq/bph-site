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

export type MessageType = "request" | "response" | "reply";

export async function editHintStatus(hintId: number, status: HintStatus) {
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
    case "reply":
      await db
        .update(replies)
        .set({ message })
        .where(and(eq(replies.id, id), eq(replies.userId, session.user.id)))
        .returning({ id: hints.id });
      break;
  }
}

export async function insertAdminReply(
  hintId: number,
  message: string,
  emailTeam: boolean,
) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Not logged in");
  }

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
        userId: session.user.id,
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
  const session = await auth();
  if (session?.user?.role !== "admin") {
    throw new Error("Not authorized");
  }

  if (!response) {
    return {
      title: "Error responding to hint",
      error: "Response is empty",
    };
  }

  let hint = await db.query.hints.findFirst({
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
    return {
      title: "Error responding to hint",
      error: "Hint entry not found",
      response: response,
    };
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
    if (hint.claimer !== user) {
      return {
        title: "Error responding to hint",
        error: hint.claimer
          ? `Hint claimed by ${hint.claimer}.`
          : "Hint is currently unclaimed.",
        response,
      };
    }
    if (hint.status != "no_response") {
      return {
        title: "Error responding to hint",
        error: `Hint status is not no_response. It is ${hint.status}.`,
        response,
      };
    } else {
      return {
        title: "Error responding to hint",
        error: "Unexpected error occured",
        response,
      };
    }
  }

  // Send email
  let emails = [hint.team.primaryEmail, ...extractEmails(hint.team.members)];
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

  return { error: null, id: result.id };
}

"use server";

import { auth } from "@/auth";
import { feedback, teams } from "@/db/schema";
import { db } from "@/db/index";
import { eq } from "drizzle-orm";
import { sendBotMessage } from "~/lib/utils";

export async function insertFeedback(description: string) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Not authenticated, please ensure you're logged in." };
  }

  await db.insert(feedback).values({
    teamId: session.user.id,
    description,
  });

  const user = await db.query.teams.findFirst({
    where: eq(teams.id, session.user.id),
  });

  const feedbackMessage = `📝 **Feedback** by [${user?.id}](https://puzzlethon.brownpuzzle.club/teams/${user?.id}): ${description}`;
  await sendBotMessage(feedbackMessage);

  return { error: null };
}

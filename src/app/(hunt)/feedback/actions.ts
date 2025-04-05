"use server";
import { auth } from "@/auth";
import { feedback } from "@/db/schema";
import { db } from "@/db/index";
import { sendBotMessage } from "~/lib/comms";

export async function insertFeedback(description: string, timestamp: Date) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Not authenticated, please ensure you're logged in." };
  }
  const teamId = session.user.id;

  await db.insert(feedback).values({
    teamId,
    description,
    timestamp,
  });

  const feedbackMessage = `📝 **Feedback** by [${teamId}](https://www.brownpuzzlehunt.com/teams/${teamId}): ${description}`;
  await sendBotMessage(feedbackMessage);
  return { error: null };
}

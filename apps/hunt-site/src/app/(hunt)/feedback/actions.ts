"use server";
import { auth } from "@/auth";
import { feedback } from "@/db/schema";
import { db } from "@/db/index";
import { sendBotMessage } from "~/lib/comms";
import { ensureError } from "~/lib/server";
import { HUNT_DOMAIN } from "@/config/client";

export async function insertFeedback(description: string, timestamp: Date) {
  const session = await auth();
  if (!session?.user?.id)
    return { error: "Not authenticated, please ensure you're logged in." };
  const teamId = session.user.id;

  try {
    // Insert feedback into the database
    await db.insert(feedback).values({
      teamId,
      description,
      timestamp,
    });
  } catch (e) {
    // Message the dev channel
    const error = ensureError(e);
    const errorMessage = `🐛 Feedback insertion for ${teamId} failed: ${error.message}`;
    await sendBotMessage(errorMessage, "dev", "@tech");
    return { error: "Failed to submit feedback." };
  }

  // Message the feedback channel and ping HQ
  const feedbackMessage = `📝 **Feedback** by [${teamId}](https://www.${HUNT_DOMAIN}/team/${teamId} ): ${description}`;
  await sendBotMessage(feedbackMessage, "feedback", "@HQ");
  return { error: null };
}

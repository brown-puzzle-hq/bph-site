"use server";
import { feedback } from "@/db/schema";
import { db } from "@/db/index";
import { sendBotMessage } from "~/lib/comms";
import { assertPermissions } from "~/lib/server";
import { HUNT_URL } from "@/config/client";

export async function insertFeedback(description: string) {
  const { id: teamId } = await assertPermissions({ level: "userAny" });

  const timestamp = new Date();
  await db.insert(feedback).values({
    teamId,
    description,
    timestamp,
  });

  // Message the feedback channel and ping HQ
  const feedbackMessage = `📝 **Feedback** by [${teamId}](${HUNT_URL}/team/${teamId} ): ${description}`;
  await sendBotMessage(feedbackMessage, "feedback", "@HQ");

  return { timestamp };
}

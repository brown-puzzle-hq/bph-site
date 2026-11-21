"use server";
import { revalidatePath } from "next/cache";
import { db } from "@/db/index";
import { events, answerTokens } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { assertPermissions } from "~/lib/server";

/** Inserts an answer token into the token table */
export async function insertAnswerToken(eventId: string, guess: string) {
  // Check that the user is logged in
  const { id: teamId } = await assertPermissions({ level: "userAny" });
  const currDate = new Date();

  // Check that the team has not already had a token
  const [token, event] = await Promise.all([
    db.query.answerTokens.findFirst({
      where: and(
        eq(answerTokens.teamId, teamId),
        eq(answerTokens.eventId, eventId),
      ),
    }),
    // Check that the token is valid
    db.query.events.findFirst({
      where: eq(events.id, eventId),
    }),
  ]);

  if (token) {
    revalidatePath("/puzzle");
    return { error: "Token already used!" };
  }

  if (!event) throw new Error("Event not found.");
  if (event.answer.replace(/\s+/g, "") !== guess)
    return { error: "Incorrect token!" };

  // Insert a token into the token table
  await db.insert(answerTokens).values({
    teamId,
    eventId,
    timestamp: currDate,
  });

  revalidatePath("/puzzle");

  return { error: null };
}

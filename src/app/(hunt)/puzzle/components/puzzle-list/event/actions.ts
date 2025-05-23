"use server";
import { revalidatePath } from "next/cache";
import { db } from "@/db/index";
import { events, answerTokens } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { auth } from "@/auth";

/** Inserts an answer token into the token table */
export async function insertAnswerToken(eventId: string, guess: string) {
  // Check that the user is logged in
  const session = await auth();
  if (!session?.user?.id) return { error: "Not logged in!" };

  const teamId = session.user.id;
  const currDate = new Date();

  // Check that the team has not already had a token
  const token = await db.query.answerTokens.findFirst({
    where: and(
      eq(answerTokens.teamId, teamId),
      eq(answerTokens.eventId, eventId),
    ),
  });
  if (token) {
    revalidatePath(`/puzzle`);
    return { error: "Token already used!" };
  }

  // Check that the token is valid
  const event = await db.query.events.findFirst({
    where: eq(events.id, eventId),
  });
  if (!event) return { error: "Event not found!" };
  if (event.answer !== guess) return { error: "Incorrect token!" };

  // Insert a token into the token table
  await db.insert(answerTokens).values({
    teamId,
    eventId,
    timestamp: currDate,
  });

  revalidatePath(`/puzzle`);
  return { error: null };
}

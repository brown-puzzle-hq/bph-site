"use server";
import { db } from "~/server/db";
import { eq, and, sql } from "drizzle-orm";
import { mnk } from "~/server/db/schema";
import { auth } from "~/server/auth/auth";
import { MNKDecision, MNKDecisionType } from "~/server/db/schema";

const coolDownTime = 30 * 60 * 1000; // 30 minutes

export async function insertMNKDecision(
  run: number,
  scenario: number,
  decision: MNKDecision,
  decisionType: MNKDecisionType,
) {
  const session = await auth();
  if (!session?.user?.id) return;
  const teamId = session.user.id;
  if (scenario > 4) return { error: "Scenario must be between 1 and 4" };

  try {
    // Check that the cooldown time has passed
    const lastFinalDecision = await db.query.mnk.findFirst({
      where: and(
        eq(mnk.teamId, teamId),
        eq(mnk.decisionType, "final"),
        eq(mnk.scenario, 4),
      ),
      orderBy: ({ time }, { desc }) => desc(time),
    });

    if (
      lastFinalDecision &&
      Date.now() < lastFinalDecision.time.getTime() + coolDownTime
    ) {
      return {
        error: "You must wait 30 minutes before playing the interaction again.",
      };
    }

    const result = await db
      .insert(mnk)
      .values({
        teamId,
        run,
        scenario,
        decision,
        decisionType,
        time: new Date(),
      })
      .returning({
        run: mnk.run,
        scenario: mnk.scenario,
        decision: mnk.decision,
        decisionType: mnk.decisionType,
        time: mnk.time,
      });
    return { row: result?.[0] || null };
  } catch (error) {
    const lastRun = await db
      .select()
      .from(mnk)
      .where(
        eq(
          mnk.run,
          sql`(SELECT MAX(${mnk.run}) FROM ${mnk} WHERE ${mnk.teamId} = ${teamId})`,
        ),
      );

    return {
      error:
        "An error occurred while processing your request. Updating to latest puzzle state.",
      lastRun,
    };
  }
}

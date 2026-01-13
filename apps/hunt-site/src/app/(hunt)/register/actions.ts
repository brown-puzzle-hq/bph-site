"use server";

import { db } from "@/db/index";
import { teams, type interactionModeEnum } from "@/db/schema";
import { hashSync } from "bcryptjs";
import { eq } from "drizzle-orm";
import { IN_PERSON, HUNT_DOMAIN } from "~/hunt.config";
import { sendBotMessage } from "~/lib/comms";
import { ensureError } from "~/lib/server";

export type TeamProperties = {
  id: string;
  displayName: string;
  password: string;
  members: string;
  interactionMode: (typeof interactionModeEnum.enumValues)[number];
};

export async function insertTeam(teamProperties: TeamProperties) {
  teamProperties.id = teamProperties.id.toLowerCase();

  const duplicateId = await db.query.teams.findFirst({
    columns: { id: true },
    where: eq(teams.id, teamProperties.id),
  });

  if (duplicateId) return { error: "Username already taken" };

  // If the in-person end time has passed, force
  // interactionMode to be remote
  if (new Date() > IN_PERSON.END_TIME)
    teamProperties.interactionMode = "remote";

  try {
    const hashedPassword = hashSync(teamProperties.password, 10);

    await db.insert(teams).values({
      ...teamProperties,
      password: hashedPassword,
      role: "user" as const,
      createTime: new Date(),
    });

    // Message registration channel
    const teamMessage = `:busts_in_silhouette: **New Team**: ${teamProperties.displayName} ([${teamProperties.id}](https://www.${HUNT_DOMAIN}/team/${teamProperties.id}))`;
    await sendBotMessage(teamMessage, "team");
    return { error: null };
  } catch (e) {
    // Message dev channel
    const error = ensureError(e);
    const errorMessage = `🐛 Registration for ${teamProperties.id} failed: ${error.message}`;
    await sendBotMessage(errorMessage, "dev", "@tech");
    return { error: "An unexpected error occurred." };
  }
}

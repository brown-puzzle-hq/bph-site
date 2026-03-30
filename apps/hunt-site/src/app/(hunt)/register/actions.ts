"use server";

import { db } from "@/db/index";
import { teams } from "@/db/schema";
import { hashSync } from "bcryptjs";
import { IN_PERSON, HUNT_URL } from "@/config/client";
import { sendBotMessage } from "~/lib/comms";
import { type Team } from "@/db/types";
import { ensureError } from "~/lib/server";

type TeamProperties = Pick<
  Team,
  | "id"
  | "displayName"
  | "password"
  | "primaryEmail"
  | "members"
  | "interactionMode"
  | "numCommunity"
  | "phoneNumber"
  | "roomNeeded"
  | "solvingLocation"
>;

export async function insertTeam(teamProperties: TeamProperties) {
  teamProperties.id = teamProperties.id.toLowerCase();

  // If the in-person end time has passed, force
  // interactionMode to be remote
  if (new Date() > IN_PERSON.END_TIME)
    teamProperties.interactionMode = "remote";

  const hashedPassword = hashSync(teamProperties.password, 10);

  try {
    await db.insert(teams).values({
      ...teamProperties,
      password: hashedPassword,
      role: "user" as const,
      createTime: new Date(),
    });
  } catch (e) {
    const error = ensureError(e);
    // PostgreSQL error code 23505 is a unique constraint violation
    // This occurs when a team tries to register a duplicate username
    if ("code" in error && error.code === "23505") {
      return { error: "Username already taken." };
    }

    const errorMessage = `🐛 Error registering team ${teamProperties.id}: ${error.message}`;
    sendBotMessage(errorMessage, "dev");
    throw error;
  }

  // Message registration channel
  const teamMessage = `:busts_in_silhouette: **New Team**: ${teamProperties.displayName} ([${teamProperties.id}](${HUNT_URL}/team/${teamProperties.id}))`;
  await sendBotMessage(teamMessage, "team");

  return { error: null };
}

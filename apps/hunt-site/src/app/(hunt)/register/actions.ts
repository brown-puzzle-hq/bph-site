"use server";

import { db } from "@/db/index";
import { teams } from "@/db/schema";
import { hashSync } from "bcryptjs";
import { IN_PERSON, HUNT_URL } from "@/config/client";
import { sendBotMessage } from "~/lib/comms";
import { type Team } from "@/db/types";

type TeamProperties = Pick<
  Team,
  | "id"
  | "displayName"
  | "primaryEmail"
  | "members"
  | "interactionMode"
  | "password"
>;

export async function insertTeam(teamProperties: TeamProperties) {
  teamProperties.id = teamProperties.id.toLowerCase();

  // If the in-person end time has passed, force
  // interactionMode to be remote
  if (new Date() > IN_PERSON.END_TIME)
    teamProperties.interactionMode = "remote";

  const hashedPassword = hashSync(teamProperties.password, 10);

  // Duplicate username will throw error
  await db.insert(teams).values({
    ...teamProperties,
    password: hashedPassword,
    role: "user" as const,
    createTime: new Date(),
  });

  // Message registration channel
  const teamMessage = `:busts_in_silhouette: **New Team**: ${teamProperties.displayName} ([${teamProperties.id}](${HUNT_URL}/team/${teamProperties.id}))`;
  await sendBotMessage(teamMessage, "team");
}

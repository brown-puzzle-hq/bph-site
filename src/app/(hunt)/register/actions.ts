"use server";

import { db } from "@/db/index";
import { teams, type interactionModeEnum } from "@/db/schema";
import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";
import { login } from "../login/actions";
import { IN_PERSON } from "~/hunt.config";
import { sendBotMessage } from "~/lib/comms";
import { ensureError } from "~/lib/utils";

export type TeamProperties = {
  id: string;
  displayName: string;
  password: string;
  members: string;
  interactionMode: (typeof interactionModeEnum.enumValues)[number];
  numCommunity?: string;
  phoneNumber?: string;
  roomNeeded?: boolean;
  solvingLocation?: string;
  wantsBox?: boolean;
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
    const hashedPassword = await new Promise<string>((resolve, reject) => {
      hash(teamProperties.password, 10, (err, hash) => {
        if (err) reject(err);
        resolve(hash);
      });
    });

    await db.insert(teams).values({
      ...teamProperties,
      password: hashedPassword,
      role: "user" as const,
      hasBox: false,
      createTime: new Date(),
    });

    // Message registration channel
    const teamMessage = `:busts_in_silhouette: **New Team**: ${teamProperties.displayName} ([${teamProperties.id}](https://www.brownpuzzlehunt.com/teams/${teamProperties.id}))`;
    await sendBotMessage(teamMessage, "team");

    // Automatically log in the user
    const { error, session } = await login(
      teamProperties.id,
      teamProperties.password,
    );
    return { error, session };
  } catch (e) {
    // Message dev channel
    const error = ensureError(e);
    const errorMessage = `Registration for ${teamProperties.id} failed: ${error.message}`;
    await sendBotMessage(errorMessage, "dev");

    return { error: "An unexpected error occurred." };
  }
}

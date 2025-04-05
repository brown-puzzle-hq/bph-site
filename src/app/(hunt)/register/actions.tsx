"use server";

import { db } from "@/db/index";
import { teams, type interactionModeEnum } from "@/db/schema";
import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";
import { login } from "../login/actions";
import { IN_PERSON } from "~/hunt.config";
import { sendBotMessage } from "~/lib/comms";

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
  if (new Date() > IN_PERSON.END_TIME) {
    teamProperties.interactionMode = "remote";
  }

  const duplicateId = await db.query.teams.findFirst({
    columns: { id: true },
    where: eq(teams.id, teamProperties.id),
  });

  if (duplicateId) {
    return { error: "Username already taken" };
  }

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

    const teamMessage = `:busts_in_silhouette: **New Team**: ${teamProperties.displayName} ([${teamProperties.id}](https://www.brownpuzzlehunt.com/teams/${teamProperties.id}))`;
    await sendBotMessage(teamMessage);
    const { error, session } = await login(
      teamProperties.id,
      teamProperties.password,
    );
    return { error, session };
  } catch (error) {
    return { error: "An unexpected error occurred." };
  }
}

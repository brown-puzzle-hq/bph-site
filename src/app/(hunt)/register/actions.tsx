"use server";

import { db } from "@/db/index";
import { teams, type interactionModeEnum } from "@/db/schema";
import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";
import { login } from "../login/actions";
import axios from "axios";
import { IN_PERSON } from "~/hunt.config";

export type TeamProperties = {
  username: string;
  displayName: string;
  password: string;
  members: string;
  interactionMode: (typeof interactionModeEnum.enumValues)[number];
  numCommunity?: string;
  phoneNumber?: string;
  roomNeeded?: boolean;
  solvingLocation?: string;
  remoteBox?: boolean;
};

export async function insertTeam(teamProperties: TeamProperties) {
  teamProperties.username = teamProperties.username.toLowerCase();
  if (new Date() > IN_PERSON.END_TIME) {
    teamProperties.interactionMode = "remote";
  }

  const duplicateUsername = await db.query.teams.findFirst({
    columns: { id: true },
    where: eq(teams.username, teamProperties.username),
  });

  if (duplicateUsername) {
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
      createTime: new Date(),
    });

    if (process.env.DISCORD_WEBHOOK_URL) {
      await axios.post(process.env.DISCORD_WEBHOOK_URL, {
        content: `:busts_in_silhouette: **New Team**: ${teamProperties.displayName} ([${teamProperties.username}](https://puzzlethon.brownpuzzle.club/teams/${teamProperties.username}))`,
      });
    }
    const result = await login(
      teamProperties.username,
      teamProperties.password,
    );
    return result;
  } catch (error) {
    return { error: "An unexpected error occurred." };
  }
}

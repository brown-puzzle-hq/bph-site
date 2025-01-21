"use server";

import { db } from "@/db/index";
import { teams, type interactionModeEnum } from "@/db/schema";
import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";
import { login } from "../login/actions";
import axios from "axios";

export type TeamProperties = {
  username: string;
  displayName: string;
  password: string;
  interactionMode: (typeof interactionModeEnum.enumValues)[number];
  members: string;
  numCommunity?: string;
  phoneNumber?: string;
  roomNeeded?: boolean;
  solvingLocation?: string;
};

export async function insertTeam(teamProperties: TeamProperties) {
  teamProperties.username = teamProperties.username.toLowerCase();

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

    return login(teamProperties.username, teamProperties.password);
  } catch (error) {
    return { error: "An unexpected error occurred." };
  }
}

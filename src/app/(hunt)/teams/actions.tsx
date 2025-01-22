"use server";

import { teams, type interactionModeEnum, type roleEnum } from "@/db/schema";
import { db } from "~/server/db";
import { eq } from "drizzle-orm";
import { hash } from "bcryptjs";
import { auth } from "~/server/auth/auth";

export type TeamProperties = {
  displayName?: string;
  password?: string;
  role?: (typeof roleEnum.enumValues)[number];
  members?: string;
  interactionMode?: (typeof interactionModeEnum.enumValues)[number];
  numCommunity?: string;
  phoneNumber?: string;
  roomNeeded?: boolean;
  solvingLocation?: string;
  remoteBox?: boolean;
};

export async function updateTeam(
  username: string,
  teamProperties: TeamProperties,
) {
  // Check that the user is either an admin or the user being updated
  const session = await auth();
  if (session?.user?.username !== username && session?.user?.role !== "admin") {
    return {
      error: "You are not authorized to update this team.",
    };
  }

  // Do not allow non-admins to update the role
  if (session?.user?.role !== "admin") {
    delete teamProperties.role;
  }

  // Update the password
  if (teamProperties.password) {
    const hashedPassword = await new Promise<string>((resolve, reject) => {
      hash(teamProperties.password!, 10, (err, hash) => {
        if (err) reject(err);
        resolve(hash);
      });
    });
    teamProperties.password = hashedPassword;
  }

  try {
    const result = await db
      .update(teams)
      .set(teamProperties)
      .where(eq(teams.username, username))
      .returning({ username: teams.username });
    if (result.length === 0) {
      return { error: "No team matching the given ID was found." };
    }
    return { error: null };
  } catch (error) {
    return { error: "An unexpected error occurred." };
  }
}

"use server";

import { teams, type interactionModeEnum, type roleEnum } from "@/db/schema";
import { db } from "~/server/db";
import { eq } from "drizzle-orm";
import { hash } from "bcryptjs";
import { auth } from "~/server/auth/auth";
import { IN_PERSON } from "~/hunt.config";

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
  wantsBox?: boolean;
  hasBox: boolean;
};

export async function updateTeam(id: string, teamProperties: TeamProperties) {
  // Check that the user is either an admin or the user being updated
  const session = await auth();
  if (session?.user?.id !== id && session?.user?.role !== "admin") {
    return {
      error: "You are not authorized to update this team.",
    };
  }

  // Do not allow non-admins to update the role
  if (session?.user?.role !== "admin") {
    delete teamProperties.role;
  }

  // Restrict interaction mode updates
  if (
    new Date() > IN_PERSON.END_TIME ||
    (new Date() > IN_PERSON.START_TIME &&
      teamProperties.interactionMode === "remote")
  ) {
    teamProperties.interactionMode = undefined;
  }

  // Update the password
  if (
    (session?.user?.role === "admin" || session?.user?.id === id) &&
    teamProperties.password &&
    teamProperties.password.length >= 8
  ) {
    const hashedPassword = await new Promise<string>((resolve, reject) => {
      hash(teamProperties.password!, 10, (err, hash) => {
        if (err) reject(err);
        resolve(hash);
      });
    });
    teamProperties.password = hashedPassword;
  } else {
    delete teamProperties.password;
  }

  try {
    const result = await db
      .update(teams)
      .set(teamProperties)
      .where(eq(teams.id, id))
      .returning({ id: teams.id });
    if (result.length === 0) {
      return { error: "No team matching the given ID was found." };
    }
    return { error: null };
  } catch (error) {
    return { error: "An unexpected error occurred." };
  }
}

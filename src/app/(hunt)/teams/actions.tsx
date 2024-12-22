"use server";
import {
  teams,
  members,
  type interactionModeEnum,
  type roleEnum,
} from "@/db/schema";
import { db } from "~/server/db";
import { eq } from "drizzle-orm";
import { hash } from "bcryptjs";
import { auth } from "~/server/auth/auth";

export type TeamProperties = {
  displayName?: string;
  interactionMode?: (typeof interactionModeEnum.enumValues)[number];
  role?: (typeof roleEnum.enumValues)[number];
  password?: string;
};

type Member = { id?: number; name?: string | null; email?: string | null };

export async function updateMembers(username: string, memberList: Member[]) {
  // Check that the user is either an admin or the user being updated
  const session = await auth();
  if (session?.user?.username !== username && session?.user?.role !== "admin") {
    return {
      error: "You are not authorized to update this team.",
    };
  }

  const teamId = db.query.teams.findFirst({
    columns: { id: true },
    where: eq(teams.username, username),
  });

  if (!teamId) {
    return {
      error: "No team matching the given ID was found",
    };
  }

  // Update members with team
  const memberListWithTeamId = memberList.map((item) => ({ ...item, teamId }));

  try {
    // TODO: update all members

    // const result = await db
    //   .update(members)
    //   .set(memberListWithTeamId)
    //   .returning({ username: teams.username });

    // if (result.length === 0) {
    //   return { error: "No team matching the given ID was found" };
    // }
    return { error: null };
  } catch (error) {
    return { error: "Unexpected error occurred" };
  }

  return { error: null };
}

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
  if (teamProperties.role && session?.user?.role !== "admin") {
    return {
      error: "You are not authorized to update the role of this team.",
    };
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
      return { error: "No team matching the given ID was found" };
    }
    return { error: null };
  } catch (error) {
    return { error: "Unexpected error occurred" };
  }
}

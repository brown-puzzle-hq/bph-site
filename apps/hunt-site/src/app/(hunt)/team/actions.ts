"use server";

import { teams } from "@/db/schema";
import { db } from "~/server/db";
import { eq } from "drizzle-orm";
import { hashSync } from "bcryptjs";
import { auth } from "@/auth";
import { IN_PERSON } from "@/config/client";
import { sendBotMessage } from "~/lib/comms";
import { ensureError } from "~/lib/server";
import { type Team } from "@/db/types";
import { revalidatePath } from "next/cache";

type TeamProperties = Partial<
  Pick<
    Team,
    "displayName" | "role" | "members" | "interactionMode" | "password"
  >
>;

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
    delete teamProperties.interactionMode;
  }

  // Update the password
  if (teamProperties.password && teamProperties.password.length >= 8) {
    const hashedPassword = hashSync(teamProperties.password, 10);
    teamProperties.password = hashedPassword;
  } else {
    delete teamProperties.password;
  }

  try {
    const result = await db
      .update(teams)
      .set(teamProperties)
      .where(eq(teams.id, id))
      .returning({
        displayName: teams.displayName,
        role: teams.role,
        members: teams.members,
        interactionMode: teams.interactionMode,
      });
    if (result.length === 0) {
      return { error: "No team matching the given ID was found." };
    }
    revalidatePath(`/team/${id}`, "page");
    return { error: null, updatedTeam: result[0]! };
  } catch (e) {
    const error = ensureError(e);
    const errorMessage = `🐛 Update for ${id} failed: ${error.message}`;
    await sendBotMessage(errorMessage, "dev", "@tech");
    return { error: "An unexpected error occurred." };
  }
}

export async function deleteTeam(id: string) {
  // Check that the user is either an admin or the user being updated
  const session = await auth();
  if (session?.user?.id !== id && session?.user?.role !== "admin") {
    return {
      error: "You are not authorized to delete this team.",
    };
  }

  try {
    const result = await db
      .delete(teams)
      .where(eq(teams.id, id))
      .returning({ displayName: teams.displayName });
    if (result.length === 0) {
      return { error: "No team matching the given ID was found." };
    }
    const teamMessage = `:skull: **Deleted Team**: ${result[0]?.displayName}`;
    await sendBotMessage(teamMessage, "team");
    return { error: null };
  } catch (e) {
    const error = ensureError(e);
    const errorMessage = `🐛 Deletion for ${id} failed: ${error.message}`;
    await sendBotMessage(errorMessage, "dev", "@tech");
    return { error: "An unexpected error occurred." };
  }
}

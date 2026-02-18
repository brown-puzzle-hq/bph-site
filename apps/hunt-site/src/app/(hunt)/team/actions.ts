"use server";

import { teams } from "@/db/schema";
import { db } from "~/server/db";
import { eq } from "drizzle-orm";
import { hashSync } from "bcryptjs";
import { IN_PERSON } from "@/config/client";
import { sendBotMessage } from "~/lib/comms";
import { type Team } from "@/db/types";
import { revalidatePath } from "next/cache";
import { assertPermissions } from "~/lib/server";

type TeamProperties = Partial<
  Pick<
    Team,
    | "displayName"
    | "primaryEmail"
    | "role"
    | "members"
    | "interactionMode"
    | "password"
  >
>;

export async function updateTeam(id: string, teamProperties: TeamProperties) {
  const { role } = await assertPermissions({ level: "userExact", teamId: id });

  // Do not allow non-admins to update the role
  if (role !== "admin") {
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

  const [updatedTeam] = await db
    .update(teams)
    .set(teamProperties)
    .where(eq(teams.id, id))
    .returning({
      displayName: teams.displayName,
      primaryEmail: teams.primaryEmail,
      role: teams.role,
      members: teams.members,
      interactionMode: teams.interactionMode,
    });

  if (!updatedTeam) {
    throw new Error("No team matching the given ID was found.");
  }

  revalidatePath(`/team/${id}`, "page");
  return { updatedTeam };
}

export async function deleteTeam(id: string) {
  await assertPermissions({ level: "userExact", teamId: id });

  const [deletedTeam] = await db
    .delete(teams)
    .where(eq(teams.id, id))
    .returning({ displayName: teams.displayName });

  if (!deletedTeam) {
    throw new Error("No team matching the given ID was found.");
  }

  const teamMessage = `:skull: **Deleted Team**: ${deletedTeam.displayName}`;
  await sendBotMessage(teamMessage, "team");
}

"use server";

import { db } from "~/server/db";
import { eq } from "drizzle-orm";
import { teams } from "~/server/db/schema";
import { revalidatePath } from "next/cache";
import { type Role, type InteractionMode } from "@/config/client";

export type EditableFields = {
  role: Role;
  interactionMode: InteractionMode;
};

export type EditedTeam = {
  [K in keyof EditableFields]?: EditableFields[K];
};

export async function updateTeam(edits: Record<string, EditedTeam>) {
  await Promise.all(
    Object.entries(edits).map(async ([teamId, fields]) => {
      await db.update(teams).set(fields).where(eq(teams.id, teamId));
    }),
  );
  revalidatePath("/admin/team");
}

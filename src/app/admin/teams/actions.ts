"use server";

import { db } from "~/server/db";
import { eq } from "drizzle-orm";
import { teams } from "~/server/db/schema";
import { roleEnum, interactionModeEnum } from "~/server/db/schema";
import { revalidatePath } from "next/cache";

export type Role = (typeof roleEnum.enumValues)[number];
export type InteractionMode = (typeof interactionModeEnum.enumValues)[number];

export type EditableFields = {
  role: Role;
  interactionMode: InteractionMode;
  hasBox: boolean;
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
  revalidatePath("/admin/teams");
}

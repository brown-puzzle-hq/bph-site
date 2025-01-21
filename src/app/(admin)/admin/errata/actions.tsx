"use server";

import { auth } from "@/auth";
import { errata } from "@/db/schema";
import { db } from "@/db/index";

export async function insertErratum(puzzleId: string, description: string) {
  const session = await auth();
  if (session?.user?.role !== "admin") {
    return {
      error: "Not authenticated, please ensure you're on an admin account.",
    };
  }

  await db.insert(errata).values({
    puzzleId,
    description,
  });

  return { error: null };
}

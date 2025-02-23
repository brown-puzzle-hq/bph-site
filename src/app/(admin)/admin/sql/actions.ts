"use server";
import { auth } from "~/server/auth/auth";
import { db } from "@/db/index";
import { sql } from "drizzle-orm";

export async function queryDatabase(query: string) {
  const session = await auth();
  if (session?.user?.role !== "admin") {
    throw new Error("Not authorized");
  }
  const result = await db.execute(sql.raw(query));
  return JSON.stringify(result, null, 2);
}

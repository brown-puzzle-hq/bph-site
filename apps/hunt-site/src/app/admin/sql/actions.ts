"use server";

import { db } from "@/db/index";
import { sql } from "drizzle-orm";
import { assertPermissions } from "~/lib/server";

export async function queryDatabase(query: string) {
  await assertPermissions({ level: "admin" });

  const result = await db.execute(sql.raw(query));
  return JSON.stringify(result, null, 2);
}

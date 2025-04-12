import DefaultPuzzlePage from "@/puzzle/components/DefaultPuzzlePage";
import * as data from "./data";

import { db } from "~/server/db";
import { and, eq, sql } from "drizzle-orm";
import { mnk } from "~/server/db/schema";
import { auth } from "~/server/auth/auth";
import RemoteBody from "./RemoteBody";
import { redirect } from "next/navigation";

export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const session = await auth();
  const teamId = session?.user?.id;
  if (!teamId) redirect("/login");

  const lastRun = await db
    .select()
    .from(mnk)
    .where(
      and(
        eq(
          mnk.run,
          sql`(SELECT MAX(${mnk.run}) FROM ${mnk} WHERE ${mnk.teamId} = ${teamId})`,
        ),
        eq(mnk.teamId, teamId),
      ),
    );

  // TODO: doesn't work if not logged in
  return (
    <DefaultPuzzlePage
      puzzleId={data.puzzleId}
      inPersonBody={data.inPersonBody}
      remoteBoxBody={<RemoteBody run={lastRun} />}
      remoteBody={<RemoteBody run={lastRun} />}
      copyText={data.copyText}
      partialSolutions={data.partialSolutions}
      tasks={data.tasks}
      interactionMode={searchParams?.interactionMode}
    />
  );
}

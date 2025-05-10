import DefaultPuzzlePage from "@/puzzle/components/puzzle/DefaultPuzzlePage";
import * as data from "./data";

import { db } from "~/server/db";
import { and, eq, sql } from "drizzle-orm";
import { mnk } from "~/server/db/schema";
import { auth } from "~/server/auth/auth";
import RemoteBody from "./RemoteBody";

export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const session = await auth();
  const teamId = session?.user?.id;

  if (!teamId) {
    return (
      <DefaultPuzzlePage
        puzzleId={data.puzzleId}
        inPersonBody={data.inPersonBody}
        remoteBoxBody={<RemoteBody loggedIn={false} />}
        remoteBody={<RemoteBody loggedIn={false} />}
        copyText={data.copyText}
        partialSolutions={data.partialSolutions}
        tasks={data.tasks}
        interactionMode={searchParams?.interactionMode}
      />
    );
  }

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

  return (
    <DefaultPuzzlePage
      puzzleId={data.puzzleId}
      inPersonBody={data.inPersonBody}
      remoteBoxBody={<RemoteBody run={lastRun} loggedIn={true} />}
      remoteBody={<RemoteBody run={lastRun} loggedIn={true} />}
      copyText={data.copyText}
      partialSolutions={data.partialSolutions}
      tasks={data.tasks}
      interactionMode={searchParams?.interactionMode}
    />
  );
}

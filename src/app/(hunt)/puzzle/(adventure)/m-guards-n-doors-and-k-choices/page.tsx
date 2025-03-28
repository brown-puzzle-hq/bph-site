import DefaultPuzzlePage from "@/puzzle/components/DefaultPuzzlePage";
import * as data from "./data";

import { db } from "~/server/db";
import { eq, sql } from "drizzle-orm";
import { mnk } from "~/server/db/schema";
import { auth } from "~/server/auth/auth";
import RemoteBody from "./RemoteBody";
import { redirect } from "next/navigation";

export const metadata = {
  title: data.puzzleId
    .split("-")
    .map((word) => {
      // Uppercase every letter in a roman numeral
      const romanRegex =
        /^(M{0,4})(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;
      if (romanRegex.test(word.toUpperCase())) {
        return word.toUpperCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" "),
};

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
      eq(
        mnk.run,
        sql`(SELECT MAX(${mnk.run}) FROM ${mnk} WHERE ${mnk.teamId} = ${teamId})`,
      ),
    );

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

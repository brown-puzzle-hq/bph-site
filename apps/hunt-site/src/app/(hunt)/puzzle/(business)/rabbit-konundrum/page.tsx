import DefaultPuzzlePage from "@/puzzle/components/puzzle/DefaultPuzzlePage";
import * as data from "./data";
import { checkPermissions } from "~/lib/server";
import { IN_PERSON, REMOTE } from "~/config/client";

export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const interactionMode = searchParams?.interactionMode;
  let puzzleInteractionMode = null;

  const { error, user } = await checkPermissions({ level: "userAny" });
  if (!error) {
    const { role, interactionMode: actualInteractionMode } = user;
    const huntEnded =
      actualInteractionMode === "in-person"
        ? new Date() > IN_PERSON.END_TIME
        : new Date() > REMOTE.END_TIME;
    const canOverrideInteractionMode = role === "admin" || huntEnded;
    puzzleInteractionMode =
      interactionMode && canOverrideInteractionMode
        ? interactionMode
        : actualInteractionMode;
  }

  return (
    <DefaultPuzzlePage
      puzzleId={data.puzzleId}
      inPersonBody={data.inPersonBody}
      remoteBody={data.remoteBody}
      copyText={data.copyText}
      partialSolutions={data.partialSolutions}
      tasks={puzzleInteractionMode === "remote" ? data.remoteTasks : data.tasks}
      interactionMode={searchParams?.interactionMode}
    />
  );
}

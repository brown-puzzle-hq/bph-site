import { auth } from "@/auth";
import { IN_PERSON, REMOTE } from "~/hunt.config";
import DefaultPuzzlePage from "@/puzzle/components/DefaultPuzzlePage";
import * as data from "./data";

export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const session = await auth();
  const interactionMode = searchParams?.interactionMode
  const actualInteractionMode =
    interactionMode &&
    (session?.user?.role === "admin" ||
      (session?.user?.interactionMode === "in-person" &&
        new Date() > IN_PERSON.END_TIME) ||
      new Date() > REMOTE.END_TIME)
      ? interactionMode
      : session?.user?.interactionMode === "in-person"
        ? "in-person"
        : session?.user?.hasBox
          ? "remote-box"
          : "remote";
  return (
    <DefaultPuzzlePage
      puzzleId={data.puzzleId}
      inPersonBody={data.inPersonBody}
      remoteBoxBody={data.remoteBoxBody}
      remoteBody={data.remoteBody}
      copyText={actualInteractionMode === "remote" ? data.remoteCopyText : data.boxCopyText}
      partialSolutions={data.partialSolutions}
      tasks={data.tasks}
      interactionMode={interactionMode}
    />
  );
}

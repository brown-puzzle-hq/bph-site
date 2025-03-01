import DefaultPuzzlePage from "@/puzzle/components/DefaultPuzzlePage";
import {
  puzzleId,
  puzzleBody,
  copyText,
  partialSolutions,
  tasks,
} from "./data";

export default async function Page() {
  return (
    <DefaultPuzzlePage
      puzzleId={puzzleId}
      puzzleBody={puzzleBody}
      copyText={copyText}
      partialSolutions={partialSolutions}
      tasks={tasks}
    />
  );
}

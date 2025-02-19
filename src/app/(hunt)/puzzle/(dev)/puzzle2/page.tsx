import DefaultPuzzlePage from "@/puzzle/components/DefaultPuzzlePage";
import { PuzzleBody } from "./data";
import { puzzleId, copyText } from "./data";

export default async function Page() {
  return (
    <DefaultPuzzlePage
      puzzleId={puzzleId}
      puzzleBody={PuzzleBody()}
      copyText={copyText}
    />
  );
}

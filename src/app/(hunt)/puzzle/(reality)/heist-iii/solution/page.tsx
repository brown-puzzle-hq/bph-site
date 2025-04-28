import DefaultSolutionPage from "@/puzzle/components/DefaultSolutionPage";
import { puzzleId, solutionBody, authors } from "../data";

export default async function Page() {
  return (
    <DefaultSolutionPage puzzleId={puzzleId} solutionBody={solutionBody} authors={authors} />
  );
}

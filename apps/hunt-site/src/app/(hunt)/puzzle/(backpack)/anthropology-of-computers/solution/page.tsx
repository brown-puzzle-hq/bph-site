import DefaultSolutionPage from "~/app/(hunt)/puzzle/components/solution/DefaultSolutionPage";
import { puzzleId, solutionBody, authors } from "../data";
import Solution from "./solution.mdx";

export default async function Page() {
  return (
    <DefaultSolutionPage
      puzzleId={puzzleId}
      solutionBody={<Solution />}
      authors={authors}
    />
  );
}

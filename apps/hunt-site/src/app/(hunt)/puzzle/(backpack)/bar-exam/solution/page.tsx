import DefaultSolutionPage from "~/app/(hunt)/puzzle/components/solution/DefaultSolutionPage";
import Solution from "./solution.mdx";
import { puzzleId, authors } from "../data";

export default async function Page() {
  return (
    <DefaultSolutionPage
      puzzleId={puzzleId}
      solutionBody={<Solution />}
      authors={authors}
    />
  );
}

import DefaultStatsPage from "~/app/(hunt)/puzzle/components/stats/DefaultStatsPage";
import { puzzleId } from "../data";

export default async function Page() {
  return <DefaultStatsPage puzzleId={puzzleId} />;
}

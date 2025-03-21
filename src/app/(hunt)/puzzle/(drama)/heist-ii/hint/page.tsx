import DefaultHintPage from "@/puzzle/components/DefaultHintPage";
import { puzzleId } from "../data";

export default async function Page() {
  return <DefaultHintPage puzzleId={puzzleId} />;
}

import DefaultHintPage from "@/puzzle/components/hint/DefaultHintPage";
import { puzzleId } from "../data";

export default async function Page() {
  return <DefaultHintPage puzzleId={puzzleId} />;
}

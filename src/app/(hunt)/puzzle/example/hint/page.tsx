import DefaultHintPage from "../../components/DefaultHintPage";
import { puzzleId } from "../data";

export default async function Page() {
  return <DefaultHintPage puzzleId={puzzleId} />;
}

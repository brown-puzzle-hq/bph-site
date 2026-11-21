import { db } from "@/db/index";
import ErratumForm from "./ErratumForm";

export const fetchCache = "force-no-store";

export default async function Home() {
  const [puzzleList, errataRows] = await Promise.all([
    db.query.puzzles.findMany({
      columns: { id: true, name: true },
    }),
    db.query.errata.findMany(),
  ]);

  const errataList = errataRows.sort(
    (a, b) => a.timestamp.getTime() - b.timestamp.getTime(),
  );

  return (
    <div className="mx-auto mb-4 w-full max-w-3xl px-4 md:mb-12">
      <h1 className="mb-4 text-center">Errata</h1>
      <ErratumForm puzzleList={puzzleList} errataList={errataList} />
    </div>
  );
}

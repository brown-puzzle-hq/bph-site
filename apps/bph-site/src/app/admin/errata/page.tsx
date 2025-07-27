import { db } from "@/db/index";
import ErratumForm from "./ErratumForm";
import ErratumDialog from "./ErratumDialog";

export const fetchCache = "force-no-store";

export default async function Home() {
  const puzzleList = await db.query.puzzles.findMany({
    columns: { id: true, name: true },
  });

  const errataList = (await db.query.errata.findMany()).sort(
    (a, b) => a.timestamp.getTime() - b.timestamp.getTime(),
  );

  return (
    <div className="mx-auto mb-4 w-full max-w-3xl px-4 md:mb-12">
      <h1 className="mb-4 text-center">Errata</h1>
      <div className="w-full pb-8">
        <ErratumDialog errataList={errataList} />
      </div>
      <ErratumForm puzzleList={puzzleList} errataList={errataList} />
    </div>
  );
}

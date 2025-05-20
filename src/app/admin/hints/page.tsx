import { db } from "@/db/index";
import { asc, desc } from "drizzle-orm";
import { hints, replies } from "@/db/schema";
import { columns } from "./Columns";
import { HintTable } from "./HintTable";

export const fetchCache = "force-no-store";

export default async function Home() {
  const data = await db.query.hints.findMany({
    with: {
      team: { columns: { displayName: true } },
      claimer: { columns: { id: true, displayName: true } },
      replies: {
        columns: { id: true, userId: true },
        orderBy: [asc(replies.time)],
      },
      puzzle: { columns: { name: true } },
    },
    orderBy: [desc(hints.requestTime)],
  });

  return (
    <div className="container mx-auto mb-4 md:mb-12">
      <h1 className="mb-2 text-center">Hints</h1>
      <HintTable columns={columns} data={data} />
    </div>
  );
}

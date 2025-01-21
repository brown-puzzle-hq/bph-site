import { db } from "~/server/db";
import DefaultHintPage from "../../components/DefaultHintPage";

// Send to 404 if route was not generated at build-time
export const dynamicParams = false;

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const puzzles = await db.query.puzzles.findMany();
  return puzzles.map((puzzle) => ({ slug: puzzle.id }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <DefaultHintPage puzzleId={slug} />;
}

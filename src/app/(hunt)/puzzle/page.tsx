"use server";
import { auth } from "@/auth";
import { HUNT_START_TIME } from "@/hunt.config";
import Link from "next/link";
import { db } from "@/db/index";

// NOTE: eventually, we probably want to create a layout for puzzle pages

export default async function Home() {
  const session = await auth();
  return (
    <div className="flex grow flex-col items-center justify-center">
      <h1 className="mb-2">Puzzles!</h1>
      {new Date() < HUNT_START_TIME ? (
        <p>The hunt has not started yet.</p>
      ) : !session?.user?.id ? (
        <div>
          <Link href="/login" className="text-blue-500 hover:underline">
            Login
          </Link>{" "}
          to access puzzles
        </div>
      ) : (
        <>
          <p>Available puzzles:</p>
          <ul>
            {(
              await db.query.puzzles.findMany({
                columns: {
                  id: true,
                  name: true,
                },
              })
            )
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((puzzle) => (
                <li key={puzzle.id}>
                  <Link
                    className="hover:underline"
                    href={`/puzzle/${puzzle.id}`}
                  >
                    {puzzle.name}
                  </Link>
                </li>
              ))}
          </ul>
        </>
      )}
    </div>
  );
}

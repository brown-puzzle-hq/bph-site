import { auth } from "@/auth";
import { db } from "@/db/index";
import FeedbackForm from "./FeedbackForm";
import { or, eq } from "drizzle-orm";
import { feedback } from "~/server/db/schema";
import Link from "next/link";

export default async function Home() {
  const session = await auth();
  if (!session?.user?.id) {
    return (
      <div className="flex grow flex-col items-center justify-center">
        <h1 className="mb-2">Feedback</h1>
        <div>
          <Link href="/login" className="text-secondary hover:underline">
            Login
          </Link>{" "}
          to submit feedback.
        </div>
      </div>
    );
  }

  const feedbackList = await db.query.feedback.findMany({
    where: eq(feedback.teamId, session.user.id),
    orderBy: feedback.timestamp,
  });

  return (
    <div className="mx-auto mb-8 flex max-w-4xl grow flex-col px-4">
      <h1 className="mb-2">Feedback</h1>
      <FeedbackForm teamId={session.user.id} feedbackList={feedbackList} />
    </div>
  );
}

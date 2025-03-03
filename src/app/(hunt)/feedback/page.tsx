import Link from "next/link";
import { auth } from "@/auth";
import { db } from "@/db/index";
import { eq } from "drizzle-orm";
import { feedback } from "~/server/db/schema";
import FeedbackForm from "./FeedbackForm";

export default async function Home() {
  const session = await auth();
  if (!session?.user?.id) {
    return (
      <div className="mb-12 px-4 pt-6 text-center">
        <h1 className="mb-2">Feedback</h1>
        <div>
          <Link href="/login" className="text-link hover:underline">
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
    <div className="mx-auto mb-12 flex max-w-4xl grow flex-col px-4 pt-6">
      <h1 className="mb-2">Feedback</h1>
      <FeedbackForm teamId={session.user.id} feedbackList={feedbackList} />
    </div>
  );
}

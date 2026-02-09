import Link from "next/link";
import { db } from "@/db/index";
import { eq } from "drizzle-orm";
import { feedback } from "~/server/db/schema";
import FeedbackForm from "./FeedbackForm";
import { checkPermissions } from "~/lib/server";

export default async function Home() {
  const { error, user } = await checkPermissions({ level: "userAny" });
  
  if (error) {
    return (
      <div className="mb-12 px-4 pt-6 text-center">
        <h1 className="mb-2">Feedback</h1>
        <div>
          <Link
            href="/login"
            className="text-link hover:underline"
            prefetch={false}
          >
            Login
          </Link>{" "}
          to submit feedback.
        </div>
      </div>
    );
  }
  const { id: teamId } = user;

  const feedbackList = await db.query.feedback.findMany({
    where: eq(feedback.teamId, teamId),
    orderBy: feedback.timestamp,
  });

  return (
    <div className="mx-auto mb-12 flex max-w-4xl grow flex-col px-4 pt-6">
      <h1 className="mb-2">Feedback</h1>
      <FeedbackForm teamId={teamId} feedbackList={feedbackList} />
    </div>
  );
}

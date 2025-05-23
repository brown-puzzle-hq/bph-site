import { db } from "@/db/index";
import { feedback } from "@/db/schema";
import FeedbackDialog from "./FeedbackDialog";

export default async function Home() {
  const feedbackList = await db.query.feedback.findMany({
    orderBy: feedback.timestamp,
  });

  return (
    <div className="mx-auto mb-4 flex max-w-4xl grow flex-col px-4 md:mb-12">
      <h1 className="mb-4 text-center">Feedback</h1>
      <FeedbackDialog teamSide={false} feedbackList={feedbackList} />
    </div>
  );
}

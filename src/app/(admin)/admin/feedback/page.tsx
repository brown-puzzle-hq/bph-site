import { db } from "@/db/index";
import { feedback } from "@/db/schema";
import FeedbackDialog from "./FeedbackDialog";

export default async function Home() {
  const feedbackList = await db.query.feedback.findMany({
    orderBy: feedback.timestamp,
  });

  return (
    <div className="mx-auto mb-6 flex max-w-4xl grow flex-col p-4">
      <h1 className="mb-2">Feedback</h1>
      <FeedbackDialog showTeam={true} feedbackList={feedbackList} />
    </div>
  );
}

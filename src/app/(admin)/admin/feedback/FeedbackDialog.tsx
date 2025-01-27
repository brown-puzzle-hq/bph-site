import { useRemarkSync } from "react-remark";
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
} from "@/components/ui/card";
import { FormattedTime } from "~/lib/time";
// import remarkGfm from "remark-gfm";

export default function FeedbackDialog({
  showTeam,
  feedbackList,
}: {
  showTeam: boolean;
  feedbackList: {
    id: number;
    teamId: string;
    description: string;
    timestamp: Date;
  }[];
}) {
  return (
    <>
      {feedbackList.length > 0 &&
        feedbackList.map((feedback) => (
          <Card className="mt-4 bg-secondary-bg" key={feedback.id}>
            <CardHeader className="p-4">
              <CardDescription>
                <strong>
                  <FormattedTime time={feedback.timestamp} />
                </strong>
                {showTeam && <p> ({feedback.teamId})</p>}
              </CardDescription>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <article className="prose">
                {useRemarkSync(
                  feedback.description,
                  //   {
                  //   remarkPlugins: [remarkGfm],
                  // }
                ) || <></>}
              </article>
            </CardContent>
          </Card>
        ))}
    </>
  );
}

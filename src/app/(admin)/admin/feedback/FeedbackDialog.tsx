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
  teamSide,
  feedbackList,
}: {
  teamSide: boolean;
  feedbackList: {
    id: number;
    teamId: string;
    description: string;
    timestamp: Date;
  }[];
}) {
  return (
    <div className="space-y-4">
      {feedbackList.length > 0 &&
        feedbackList.map((feedback) => (
          <Card className="bg-inherit shadow-none" key={feedback.id}>
            <CardHeader className="p-4 pb-0.5">
              <CardDescription className={teamSide ? "text-main-header" : ""}>
                <strong>
                  {!teamSide && <span className="rounded-sm bg-slate-200 px-1 py-0.5 mr-1">{feedback.teamId}</span>}
                  <FormattedTime time={feedback.timestamp} />
                </strong>
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <article className={teamSide ? "prose prose-custom" : "prose"}>
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
    </div>
  );
}

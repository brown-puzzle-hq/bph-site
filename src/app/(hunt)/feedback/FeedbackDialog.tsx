import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { formatTime } from "~/lib/time";

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
  if (feedbackList.length > 0) {
    return (
      <Alert className="mt-7 bg-gray-100">
        {feedbackList.map((e, index) => (
          <AlertDescription key={e.id} className="overflow-hidden break-words">
            {index != 0 && <br />}
            <p className="whitespace-normal">
              <span className="font-semibold">{formatTime(e.timestamp)}</span>
              {showTeam && <> ({e.teamId})</>}: {e.description}
            </p>
          </AlertDescription>
        ))}
      </Alert>
    );
  }

  return;
}

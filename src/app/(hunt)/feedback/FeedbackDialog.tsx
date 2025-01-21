import { Alert, AlertDescription } from "~/components/ui/alert";
import { FormattedTime } from "~/lib/time";

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
      <Alert className="bg-gray-100">
        {feedbackList.map((e, index) => (
          <AlertDescription key={e.id} className="overflow-hidden break-words">
            {index != 0 && <br />}
            <p className="whitespace-normal">
              <span className="font-semibold">
                <FormattedTime time={e.timestamp} />
              </span>
              {showTeam && <> ({e.teamId})</>}: {e.description}
            </p>
          </AlertDescription>
        ))}
      </Alert>
    );
  }
  return <></>;
}

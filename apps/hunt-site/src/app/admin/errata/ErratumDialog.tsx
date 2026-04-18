import { Alert, AlertDescription } from "~/components/ui/alert";
import { FormattedTime } from "~/lib/time";
import { Erratum } from "@/db/types";

export default function ErratumDialog({
  errataList,
}: {
  errataList: Erratum[];
}) {
  return (
    <>
      {errataList.map((e) => (
        <Alert className="my-2 bg-inherit text-inherit" key={e.id}>
          <AlertDescription key={e.id} className="overflow-hidden break-words">
            <p className="whitespace-pre-wrap">
              <strong>
                Erratum <FormattedTime time={e.timestamp} />
              </strong>{" "}
              ({`${e.puzzleId}`}): {e.description}
            </p>
          </AlertDescription>
        </Alert>
      ))}
    </>
  );
}

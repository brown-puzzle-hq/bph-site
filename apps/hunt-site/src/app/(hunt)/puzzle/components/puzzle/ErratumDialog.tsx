import { Alert, AlertDescription } from "~/components/ui/alert";
import { FormattedTime } from "~/lib/time";
import { Erratum } from "@/db/types";

export default function ErratumDialog({
  errataList,
}: {
  errataList: Erratum[];
}) {
  if (errataList.length > 0) {
    return (
      <Alert className="mb-6 mt-2 bg-inherit text-inherit">
        {errataList.map((e, index) => (
          <AlertDescription key={e.id} className="overflow-hidden break-words">
            {index != 0 && <br />}
            <p className="whitespace-pre-wrap">
              <strong>
                Erratum <FormattedTime time={e.timestamp} />
              </strong>
              : {e.description}
            </p>
          </AlertDescription>
        ))}
      </Alert>
    );
  }

  return;
}

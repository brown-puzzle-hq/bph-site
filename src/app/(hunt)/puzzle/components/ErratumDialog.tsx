import { Alert, AlertDescription } from "~/components/ui/alert";
import { FormattedTime } from "~/lib/time";
import { errata } from "~/server/db/schema";

export default function ErratumDialog({
  errataList,
}: {
  errataList: (typeof errata.$inferSelect)[];
}) {
  if (errataList.length > 0) {
    return (
      <Alert className="mb-6 mt-2 bg-inherit text-inherit">
        {errataList.map((e, index) => (
          <AlertDescription key={e.id} className="overflow-hidden break-words">
            {index != 0 && <br />}
            <p className="whitespace-normal">
              <strong>
                Erratum <FormattedTime time={e.timestamp} />
              </strong>
              : <div className="whitespace-pre-wrap">{e.description}</div>
            </p>
          </AlertDescription>
        ))}
      </Alert>
    );
  }

  return;
}

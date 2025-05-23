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
      <>
        {errataList.map((e) => (
          <Alert className="mb-2 mt-2 bg-inherit text-inherit">
            <AlertDescription
              key={e.id}
              className="overflow-hidden break-words"
            >
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

  return;
}

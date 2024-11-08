"use client";

import { AutosizeTextarea } from "~/components/ui/autosize-textarea";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { respondToHint } from "../../actions";
import { useSession } from "next-auth/react";
import { HintWithRelations } from "../hint-table/Columns";

export function ResponseBox({ hint }: { hint: HintWithRelations }) {
  const { data: session } = useSession();
  const currHinter = session?.user?.id;

  if (hint.response) {
    return (
      <div className="grid w-full gap-1.5">
        <Label htmlFor={`hint-response-${hint.id}`}>Response</Label>
        <AutosizeTextarea
          maxHeight={500}
          value={hint.response}
          id={`hint-response-${hint.id}`}
          readOnly
        />
      </div>
    );
  }

  if (hint.claimer?.id == currHinter)
    return (
      <div className="full grid gap-1.5">
        <Label htmlFor={`hint-response-${hint.id}`}>Response</Label>
        <AutosizeTextarea
          maxHeight={500}
          className="resize-none"
          placeholder="No response yet"
          id={`hint-response-${hint.id}`}
        />
        <Button
          className="mt-4 w-fit"
          onClick={() => {
            const textarea = document.getElementById(
              `hint-response-${hint.id}`,
            ) as HTMLTextAreaElement;
            respondToHint(hint.id, textarea.value);
          }}
        >
          Respond
        </Button>
      </div>
    );
}

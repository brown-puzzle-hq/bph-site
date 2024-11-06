import { Row } from "@tanstack/react-table";
import { claimHint, unclaimHint } from "../../actions";
import { toast } from "~/hooks/use-toast";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { HintClaimer, HintWithRelations } from "./Columns";

// TODO: Add refund hint functionality
// TODO: Actually keep track of number of hints claimed

export default function ClaimBox<TData>({
  row,
}: {
  row: Row<HintWithRelations>;
}) {
  const { data: session } = useSession();
  const userId = session?.user?.id as string;

  const hintId = row.getValue("id") as number;
  const claimer: HintClaimer = row.getValue("claimer");

  if (!claimer) {
    return (
      <button
        className="rounded-md border border-emerald-600 text-emerald-600"
        onClick={async () => {
          try {
            await claimHint(hintId);
          } catch (error: any) {
            toast({
              variant: "destructive",
              title: "Error claiming hint",
              description: error.message,
            });
          }
        }}
      >
        <p className="px-1">CLAIM</p>
      </button>
    );
  } else if (claimer.id === userId && row.getValue("responseTime") === null) {
    return (
      <button
        className="rounded-md border border-red-600 text-red-600"
        onClick={async () => await unclaimHint(hintId)}
      >
        <p className="px-1">UNCLAIM</p>
      </button>
    );
  } else {
    return <p>{claimer.displayName as string}</p>;
  }
}

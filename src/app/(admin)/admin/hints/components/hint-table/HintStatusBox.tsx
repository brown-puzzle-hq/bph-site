import { Row } from "@tanstack/react-table";
import { claimHint, unclaimHint, refundHint } from "../../actions";
import { toast } from "~/hooks/use-toast";
import { useSession } from "next-auth/react";
import { FollowUpHint, HintClaimer } from "./Columns";
import { useTransition } from "react";

export default function ClaimBox<TData>({ row }: { row: Row<TData> }) {
  const { data: session } = useSession();
  const userId = session?.user?.id as string;
  const hintId = row.getValue("id") as number;
  const claimer: HintClaimer = row.getValue("claimer");
  const status = row.getValue("status");
  const followUps: FollowUpHint[] = row.getValue("followUps");
  const teamId: string = row.getValue("teamId");
  const [isPending, startTransition] = useTransition();

  const handleClaim = () => {
    startTransition(async () => {
      const { error, title } = await claimHint(hintId);
      if (error) {
        toast({
          variant: "destructive",
          title,
          description: error,
        });
      } else {
        window.open(`/admin/hints/${row.getValue("id")}`, "_blank");
      }
    });
  };

  const handleUnclaim = () => {
    startTransition(async () => {
      const { error, title } = await unclaimHint(hintId);
      if (error) {
        toast({
          variant: "destructive",
          title,
          description: error,
        });
      }
    });
  };

  const handleRefund = () => {
    startTransition(async () => {
      const { error, title } = await refundHint(hintId);
      if (error) {
        toast({
          variant: "destructive",
          title,
          description: error,
        });
      }
    });
  };

  if (status == "refunded") {
    return <p>Refunded</p>;
  } else if (!claimer) {
    return (
      <button
        className="hint-button rounded-md border border-emerald-600 text-emerald-600 disabled:pointer-events-none disabled:opacity-50"
        onClick={handleClaim}
        disabled={isPending}
      >
        <p className="hint-button px-1">CLAIM</p>
      </button>
    );
  } else if (claimer?.id && claimer.id == userId) {
    if (status == "no_response")
      return (
        <button
          className="hint-button rounded-md border border-red-600 text-red-600 disabled:pointer-events-none disabled:opacity-50"
          onClick={handleUnclaim}
          disabled={isPending}
        >
          <p className="hint-button px-1">UNCLAIM</p>
        </button>
      );
    else if (status == "answered") {
      return followUps[followUps.length - 1]?.userId === teamId ? (
        <button
          className="rounded-md border border-yellow-600 text-yellow-600"
          onClick={() =>
            (window.location.href = `/admin/hints/${hintId}?reply=true`)
          }
        >
          <p className="px-1">REPLY</p>
        </button>
      ) : (
        <button
          className="hint-button rounded-md border border-gray-600 text-gray-600 disabled:pointer-events-none disabled:opacity-50"
          onClick={handleRefund}
          disabled={isPending}
        >
          <p className="hint-button px-1">REFUND</p>
        </button>
      );
    }
  } else {
    if (status == "no_response") {
      return <p>Claimed</p>;
    } else if (status == "answered") {
      return followUps[followUps.length - 1]?.userId === teamId ? (
        <button
          className="rounded-md border border-gray-600 text-gray-600"
          onClick={() =>
            (window.location.href = `/admin/hints/${hintId}?reply=true`)
          }
        >
          <p className="px-1">REPLY</p>
        </button>
      ) : (
        <p>Answered</p>
      );
    }
  }
}

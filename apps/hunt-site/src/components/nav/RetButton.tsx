"use client";

import { useSession } from "next-auth/react";
import { Eye, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "~/lib/utils";

export default function RetButton() {
  const { data: session, update } = useSession();
  const router = useRouter();

  const handleReturn = async () => {
    await update({ ret: true });
    router.push("/admin/team");
  };

  return (
    <div
      className={cn(
        "fixed bottom-4 left-4 z-20 flex max-w-[calc(100vw-32px)] items-center space-x-2 rounded bg-neutral-100 pr-1 text-black transition-transform",
        session?.user.sub ? "translate-y-0" : "translate-y-20",
      )}
    >
      <div className="rounded bg-neutral-300 p-2">
        <Eye className="size-5" />
      </div>
      <p className="truncate text-nowrap">{session?.user.displayName}</p>
      <button
        onClick={handleReturn}
        className="rounded p-1 hover:bg-neutral-200"
      >
        <X className="size-5" />
      </button>
    </div>
  );
}

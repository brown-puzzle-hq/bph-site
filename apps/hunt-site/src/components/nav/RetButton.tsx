"use client";

import { useSession } from "next-auth/react";
import { Eye, X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RetButton() {
  const { data: session, update } = useSession();
  const router = useRouter();

  const handleReturn = async () => {
    await update({ ret: true });
    router.push("/admin/team");
  };

  if (!session?.user.sub || session?.user.sub === session?.user.id) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 flex items-center space-x-2 rounded bg-neutral-100 pr-1 text-black">
      <div className="rounded bg-neutral-300 p-2">
        <Eye className="size-5" />
      </div>
      <p>{session.user.displayName}</p>
      <button
        onClick={handleReturn}
        className="rounded p-1 hover:bg-neutral-200"
      >
        <X className="size-5" />
      </button>
    </div>
  );
}

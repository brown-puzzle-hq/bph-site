"use client";
import { Clipboard } from "lucide-react";
import { toast } from "~/hooks/use-toast";

export default function CopyButton({ copyText }: { copyText: string }) {
  return (
    <button
      className="flex"
      onClick={() => {
        navigator.clipboard.writeText(copyText);
        toast({
          title: "Puzzle copied to clipboard!",
        });
      }}
    >
      <Clipboard className="hover:opacity-75" />
    </button>
  );
}

"use client";
import { Clipboard } from "lucide-react";
import { toast } from "~/hooks/use-toast";

export default function CopyButton({ copyText }: { copyText: string }) {
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(copyText);
        toast({
          title: "Copied to clipboard!",
          description: (
            <span className="block max-w-[calc(100vw-64px)] truncate md:max-w-[356px]">
              {copyText}
            </span>
          ),
        });
      }}
    >
      <Clipboard className="size-5 text-yellow-800" />
    </button>
  );
}

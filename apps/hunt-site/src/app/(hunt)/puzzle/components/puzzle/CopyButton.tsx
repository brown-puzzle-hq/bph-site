"use client";

import { Check, Clipboard } from "lucide-react";
import { type CopyData, useCopyToClipboard } from "~/lib/copy";
import { cn } from "~/lib/utils";

export type { CopyData };

export default function CopyButton({
  copyText,
}: {
  copyText: string | CopyData;
}) {
  const { didCopy, handleCopy } = useCopyToClipboard(copyText);

  return (
    <button
      className="relative size-10 rounded-full bg-black/50 shadow-md shadow-black hover:opacity-90"
      onClick={handleCopy}
    >
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Clipboard
          className={cn(
            "transition-all duration-200",
            didCopy && "scale-90 opacity-0",
          )}
        />
      </div>
      <div className="absolute left-1/2 top-1/2 mt-0.5 -translate-x-1/2 -translate-y-1/2">
        <Check
          className={cn(
            "transition-all duration-200",
            !didCopy && "scale-90 opacity-0",
          )}
        />
      </div>
    </button>
  );
}

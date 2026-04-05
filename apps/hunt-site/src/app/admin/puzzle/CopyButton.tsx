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
    <button className="relative size-5" onClick={handleCopy}>
      <span
        className={cn(
          "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-200",
          didCopy && "scale-90 opacity-0",
        )}
      >
        <Clipboard className="size-5 text-yellow-800" />
      </span>
      <span
        className={cn(
          "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-200",
          !didCopy && "scale-90 opacity-0",
        )}
      >
        <Check className="size-5 text-yellow-800" />
      </span>
    </button>
  );
}

"use client";

import { Check, Clipboard } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { cn, renderTableToPlainText } from "~/lib/utils";

export default function CopyButton({ copyText }: { copyText: string }) {
  const isHtml = /<\/?[a-z][\s\S]*>/i.test(copyText);
  const [didCopy, setDidCopy] = useState(false);
  const resetTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current !== null) {
        window.clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  async function handleCopy() {
    try {
      const plainText = isHtml ? renderTableToPlainText(copyText) : copyText;

      if (isHtml) {
        const blobHtml = new Blob([copyText], { type: "text/html" });
        const blobText = new Blob([plainText], { type: "text/plain" });
        const clipboardItem = new ClipboardItem({
          "text/html": blobHtml,
          "text/plain": blobText,
        });
        await navigator.clipboard.write([clipboardItem]);
      } else {
        await navigator.clipboard.writeText(copyText);
      }

      setDidCopy(true);
      if (resetTimerRef.current !== null) {
        window.clearTimeout(resetTimerRef.current);
      }
      resetTimerRef.current = window.setTimeout(() => {
        setDidCopy(false);
        resetTimerRef.current = null;
      }, 1500);
    } catch (error) {
      toast.error("Failed to copy. Please try again.");
    }
  }

  return (
    <button className="relative hover:opacity-80" onClick={handleCopy}>
      <span
        className={cn(
          "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-200",
          didCopy && "scale-90 opacity-0",
        )}
      >
        <Clipboard />
      </span>
      <Check
        className={cn(
          "transition-all duration-200",
          !didCopy && "scale-90 opacity-0",
        )}
      />
    </button>
  );
}

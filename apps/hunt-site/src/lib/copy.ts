import { useEffect, useRef, useState } from "react";

/** Map of MIME type to content. */
export type CopyData = {
  "text/plain": string;
  "text/html"?: string;
};

export function useCopyToClipboard(copyText: string | CopyData) {
  const copyData =
    typeof copyText === "string" ? { "text/plain": copyText } : copyText;

  const [didCopy, setDidCopy] = useState(false);
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => clearTimeout(resetTimerRef.current ?? undefined), []);

  async function handleCopy() {
    try {
      await navigator.clipboard.write([
        new ClipboardItem({
          "text/plain": new Blob([copyData["text/plain"]], {
            type: "text/plain",
          }),
          "text/html": new Blob([copyData["text/html"] ?? ""], {
            type: "text/html",
          }),
        }),
      ]);

      setDidCopy(true);
      if (resetTimerRef.current !== null) {
        clearTimeout(resetTimerRef.current);
      }
      resetTimerRef.current = setTimeout(() => {
        setDidCopy(false);
        resetTimerRef.current = null;
      }, 1000);
    } catch (e) {
      console.warn("Clipboard copy failed:", e);
    }
  }

  return { didCopy, handleCopy };
}

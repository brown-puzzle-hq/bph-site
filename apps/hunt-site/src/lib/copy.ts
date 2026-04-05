import { useEffect, useMemo, useRef, useState } from "react";
import { renderTableToPlainText } from "~/lib/utils";

/** Map of MIME type to content. "text/plain" is required; all others are optional. */
export type CopyData = {
  "text/plain": string;
  [mimeType: string]: string;
};

export function normalizeCopyData(copyText: string | CopyData): CopyData {
  if (typeof copyText === "string") {
    const isHtml = /<\/?[a-z][\s\S]*>/i.test(copyText);
    if (isHtml) {
      return {
        "text/plain": renderTableToPlainText(copyText),
        "text/html": copyText,
      };
    }
    return { "text/plain": copyText };
  }
  return copyText;
}

export function useCopyToClipboard(copyText: string | CopyData) {
  const copyData = useMemo(() => normalizeCopyData(copyText), [copyText]);
  const plainText = copyData["text/plain"];

  const [didCopy, setDidCopy] = useState(false);
  const resetTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current !== null) {
        window.clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  function handleCopy() {
    try {
      // execCommand('copy') requires a focused, selected element to fire
      // the copy event. We create a hidden textarea for this purpose.
      // Unlike navigator.clipboard.write(), this approach writes data
      // accessible via e.clipboardData in paste events for any MIME type,
      // and HTML is not sanitized at write time.
      const textarea = document.createElement("textarea");
      textarea.value = plainText;
      textarea.style.cssText =
        "position:fixed;top:-9999px;left:-9999px;opacity:0";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();

      textarea.addEventListener(
        "copy",
        (e) => {
          if (!e.clipboardData) return;
          e.preventDefault();
          for (const [mimeType, content] of Object.entries(copyData)) {
            e.clipboardData.setData(mimeType, content);
          }
        },
        { once: true },
      );

      const success = document.execCommand("copy");
      document.body.removeChild(textarea);
      if (!success) throw new Error("execCommand copy failed");

      setDidCopy(true);
      if (resetTimerRef.current !== null) {
        window.clearTimeout(resetTimerRef.current);
      }
      resetTimerRef.current = window.setTimeout(() => {
        setDidCopy(false);
        resetTimerRef.current = null;
      }, 1500);
    } catch {
      // copy failed silently
    }
  }

  return { didCopy, handleCopy };
}

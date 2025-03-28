"use client";
import { Clipboard } from "lucide-react";
import { toast } from "~/hooks/use-toast";

export default function CopyButton({ copyText }: { copyText: string }) {
  const isHtml = /<\/?[a-z][\s\S]*>/i.test(copyText);
  const plainText = copyText.replace(/<[^>]+>/g, "");

  return (
    <button
      onClick={() => {
        try {
          if (isHtml) {
            const blob = new Blob([copyText], { type: "text/html" });
            const clipboardItem = new ClipboardItem({ "text/html": blob });
            navigator.clipboard.write([clipboardItem]);
          } else {
            navigator.clipboard.writeText(copyText);
          }
          toast({
            title: "Puzzle copied to clipboard!",
            description: (
              <span className="block max-w-[calc(100vw-64px)] truncate md:max-w-[356px]">
                {plainText}
              </span>
            ),
          });
        } catch (error) {
          toast({
            variant: "destructive",
            title: "Failed to copy",
            description: "An error occurred while copying."
          });
        }
      }}
    >
      <Clipboard className="hover:opacity-75" />
    </button>
  );
}

"use client";
import { Clipboard } from "lucide-react";
import { toast } from "~/hooks/use-toast";

function renderTableToPlainText(html: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const rows = doc.querySelectorAll("table tr");

  const table: string[][] = [];

  for (const row of rows) {
    const cells = Array.from(row.querySelectorAll("th, td")).map(
      (cell) => cell.textContent?.trim() ?? "",
    );
    table.push(cells);
  }

  // Find the max width of each column
  const colWidths: number[] = [];
  table.forEach((row) =>
    row.forEach((cell, i) => {
      colWidths[i] = Math.max(colWidths[i] || 0, cell.length);
    }),
  );

  // Format rows
  const formatted = table
    .map((row) =>
      row
        .map((cell, i) => cell.padEnd(colWidths[i]!))
        .join(" | ")
        .trimEnd(),
    )
    .join("\n");

  return formatted;
}

export default function CopyButton({ copyText }: { copyText: string }) {
  const isHtml = /<\/?[a-z][\s\S]*>/i.test(copyText);
  
  return (
    <button
      onClick={() => {
        try {
          const plainText = isHtml ? renderTableToPlainText(copyText) : copyText;
          if (isHtml) {
            const blobHtml = new Blob([copyText], { type: "text/html" });
            const blobText = new Blob([plainText], { type: "text/plain" });
            const clipboardItem = new ClipboardItem({
              "text/html": blobHtml,
              "text/plain": blobText,
            });
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
            description: "An error occurred while copying.",
          });
        }
      }}
    >
      <Clipboard className="hover:opacity-75" />
    </button>
  );
}

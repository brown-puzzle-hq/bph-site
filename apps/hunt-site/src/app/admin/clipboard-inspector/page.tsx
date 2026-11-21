"use client";

import { useState, useCallback } from "react";
import { toast } from "sonner";

type ClipboardEntry = { mimeType: string; content: string };

function formatAsTypeScript(entries: ClipboardEntry[]): string {
  const lines = entries.map(({ mimeType, content }) => {
    const escaped = content
      .replace(/\\/g, "\\\\")
      .replace(/`/g, "\\`")
      .replace(/\$\{/g, "\\${");
    return `  "${mimeType}": \`${escaped}\``;
  });
  return `export const copyText: CopyData = {\n${lines.join(",\n")},\n};`;
}

export default function Page() {
  const [entries, setEntries] = useState<ClipboardEntry[] | null>(null);

  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    e.preventDefault();
    const { clipboardData } = e;
    if (!clipboardData) return;

    const seen = new Set<string>();
    const result: ClipboardEntry[] = [];
    for (const type of Array.from(clipboardData.types)) {
      if (seen.has(type)) continue;
      seen.add(type);
      result.push({ mimeType: type, content: clipboardData.getData(type) });
    }
    setEntries(result);
  }, []);

  const formatted = entries ? formatAsTypeScript(entries) : null;

  return (
    <div className="mx-auto mb-4 w-full max-w-3xl px-4 md:mb-12">
      <h1 className="text-2xl font-bold">Clipboard Inspector</h1>
      <p className="mb-4 text-gray-600">
        Paste anything below to inspect all MIME types in the clipboard.
      </p>

      <div
        onPaste={handlePaste}
        tabIndex={0}
        className="mb-6 flex min-h-24 cursor-text items-center justify-center rounded border-2 border-dashed border-gray-300 p-4 text-gray-400 focus:border-blue-400 focus:outline-none"
      >
        {entries === null ? (
          <span>Click here, then paste (Ctrl+V / ⌘V)</span>
        ) : (
          <span className="text-green-600">
            Pasted — {entries.length} MIME type{entries.length !== 1 ? "s" : ""}{" "}
            detected
          </span>
        )}
      </div>

      {entries && (
        <div className="space-y-4">
          {entries.map(({ mimeType, content }) => (
            <div key={mimeType} className="rounded border">
              <div className="flex items-center justify-between border-b bg-gray-100 px-3 py-1.5">
                <span className="font-mono text-sm font-semibold text-gray-700">
                  {mimeType}
                </span>
                <span className="text-xs text-gray-400">
                  {content.length} chars
                </span>
              </div>
              <pre className="max-h-48 overflow-auto whitespace-pre-wrap break-all p-3 text-xs text-gray-800">
                {content || <span className="text-gray-400">(empty)</span>}
              </pre>
            </div>
          ))}

          <div className="rounded border">
            <div className="flex items-center justify-between border-b bg-gray-100 px-3 py-1.5">
              <span className="font-mono text-sm font-semibold text-gray-700">
                TypeScript export
              </span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(formatted!).then(() => {
                    toast("Copied to clipboard!");
                  });
                }}
                className="rounded bg-blue-500 px-2 py-0.5 text-xs text-white hover:opacity-90"
              >
                Copy
              </button>
            </div>
            <pre className="max-h-96 overflow-auto whitespace-pre-wrap break-all p-3 text-xs text-gray-800">
              {formatted}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}

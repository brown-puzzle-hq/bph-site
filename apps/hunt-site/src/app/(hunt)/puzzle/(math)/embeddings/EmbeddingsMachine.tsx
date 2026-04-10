"use client";

import { useState, useTransition } from "react";

function Var({ letter }: { letter: string }) {
  return <span className="font-bold text-red-400">{letter}</span>;
}

type AnalogyPart = string | { var: string };

function renderParts(parts: AnalogyPart[]) {
  return parts.map((p, i) =>
    typeof p === "string" ? (
      <span key={i}>{p}</span>
    ) : (
      <Var key={i} letter={p.var} />
    ),
  );
}

function AnalogyLine({
  left,
  right,
  separator = "::",
}: {
  left: AnalogyPart[];
  right: AnalogyPart[];
  separator?: string;
}) {
  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 font-mono text-xs leading-relaxed">
      <div className="text-right">{renderParts(left)}</div>
      <div className="min-w-[2.5rem] text-center font-bold">{separator}</div>
      <div className="text-left">{renderParts(right)}</div>
    </div>
  );
}

export default function EmbeddingsMachine() {
  const [word1, setWord1] = useState("");
  const [word2, setWord2] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const w1 = word1.trim();
    if (!w1) return;

    setResult(null);
    setError(null);

    startTransition(async () => {
      try {
        const res = await fetch("/api/embeddings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ word1: w1, word2: word2.trim() || undefined }),
        });
        const data = (await res.json()) as { result?: string; error?: string };
        if (data.result) {
          setResult(data.result);
        } else {
          setError(data.error ?? "Unknown error");
        }
      } catch {
        setError("Network error");
      }
    });
  }

  return (
    <div className="flex w-full max-w-3xl flex-col gap-4 md:flex-row md:items-stretch">
      {/* Puzzle display */}
      <div className="flex-[1.25] rounded-xl border-2 border-blue-900 bg-white/10 px-2 py-6">
        <AnalogyLine
          left={["man : woman"]}
          right={[{ var: "A" }, " : herself"]}
        />
        <AnalogyLine
          left={["italy : mussolini"]}
          right={[{ var: "B" }, " : franco"]}
        />
        <AnalogyLine
          left={[{ var: "B" }, " : mexico"]}
          right={["portugal : ", { var: "C" }]}
        />
        <AnalogyLine
          left={[{ var: "A" }, " : ", { var: "C" }]}
          right={["herself : ", { var: "D" }]}
        />
        <AnalogyLine
          left={["goober : ", { var: "D" }]}
          right={[{ var: "E" }, " : route"]}
        />
        <AnalogyLine
          left={[{ var: "D" }, " : ", { var: "E" }]}
          right={[{ var: "F" }, " : environmentalists"]}
        />
        <AnalogyLine
          left={["copper : ", { var: "F" }]}
          right={["(", { var: "G" }, " : help) : saint"]}
        />
        <AnalogyLine
          left={[{ var: "G" }, " : freckle"]}
          right={[
            "(",
            { var: "D" },
            " : ",
            { var: "E" },
            ") : (",
            { var: "A" },
            " : ",
            { var: "H" },
            ")",
          ]}
        />
        <AnalogyLine
          left={[{ var: "B" }, " : ", { var: "H" }]}
          right={[
            { var: "I" },
            " : (",
            { var: "C" },
            " : (",
            { var: "A" },
            " : ",
            { var: "F" },
            "))",
          ]}
        />
        <AnalogyLine
          left={[
            "(",
            { var: "I" },
            " : ",
            { var: "G" },
            ") : (",
            { var: "D" },
            " : ",
            { var: "F" },
            ")",
          ]}
          right={[
            "(",
            { var: "C" },
            " : ",
            { var: "H" },
            ") : (",
            { var: "E" },
            " : ",
            { var: "J" },
            ")",
          ]}
        />
        <AnalogyLine
          left={[{ var: "J" }, " + ", { var: "I" }]}
          right={["_____"]}
          separator="="
        />
      </div>

      {/* Machine */}
      <div className="flex flex-1 flex-col rounded-xl border-2 border-blue-900 bg-white/10 px-4 py-6">
        <div className="mb-1 text-center text-2xl font-bold">Machine</div>
        <div className="mb-5 text-center text-sm">Enter up to two words</div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={word1}
              onChange={(e) => setWord1(e.target.value)}
              placeholder="Word 1"
              className="min-w-0 flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm text-neutral-600"
            />
            <span className="text-xl font-bold">:</span>
            <input
              type="text"
              value={word2}
              onChange={(e) => setWord2(e.target.value)}
              placeholder="Word 2"
              className="min-w-0 flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm text-neutral-600"
            />
          </div>
          <button
            type="submit"
            disabled={isPending || !word1.trim()}
            className="w-full rounded-md border-2 border-blue-900 bg-blue-900 py-2 text-sm font-medium transition-all enabled:hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPending ? "Running…" : "Run machine"}
          </button>
        </form>

        <div className="mt-4 flex flex-1 flex-col justify-end">
          <div
            className={`rounded-lg ${(result === null && error === null) || "border border-white/80"} min-h-[3rem] px-4 py-3 font-mono`}
          >
            {result ??
              (error ? (
                <span className="text-sm text-red-300">{error}</span>
              ) : null)}
          </div>
        </div>
      </div>
    </div>
  );
}

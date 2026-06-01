import fs from "fs";
import path from "path";
import v8 from "v8";
import { NextResponse } from "next/server";

type Vec3 = [number, number, number];

let lookup: Map<string, Vec3> | null = null;
let wordsLimited: string[] | null = null;
let vectorsLimited: Vec3[] | null = null;

const BIN_PATH = path.join(
  process.cwd(),
  "src",
  "app",
  "api",
  "analogical-semantics",
  "glove_top_10000.bin",
);

function loadEmbeddings() {
  if (lookup) return;
  const data = v8.deserialize(fs.readFileSync(BIN_PATH)) as {
    words: string[];
    vectors: Vec3[];
  };
  wordsLimited = data.words;
  vectorsLimited = data.vectors;
  lookup = new Map(data.words.map((w, i) => [w, data.vectors[i]!]));
}

function dot(a: Vec3, b: Vec3) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

function norm(v: Vec3) {
  return Math.sqrt(dot(v, v));
}

function isBotUserAgent(userAgent: string) {
  return /(bot|crawler|spider|slurp|bingpreview|headless|phantomjs|curl|wget|python-requests|axios)/i.test(
    userAgent,
  );
}

function machine(word1?: string, word2?: string): string {
  loadEmbeddings();
  const w1 = word1?.trim().toLowerCase();
  const w2 = word2?.trim().toLowerCase();

  const v1 = w1 ? lookup!.get(w1) : ([0, 0, 0] as Vec3);
  const v2 = w2 ? lookup!.get(w2) : ([0, 0, 0] as Vec3);

  if (!v1) throw new Error(`Word not found: "${w1}"`);
  if (!v2) throw new Error(`Word not found: "${w2}"`);

  let query: Vec3;
  query = [v2[0] - v1[0], v2[1] - v1[1], v2[2] - v1[2]];

  const queryNorm = norm(query);
  if (queryNorm === 0) throw new Error("Input vector must be nonzero.");

  // const exclude = new Set([w1, w2].filter(Boolean) as string[]);

  let bestWord = "";
  let bestDist = Infinity;
  for (let i = 0; i < wordsLimited!.length; i++) {
    const word = wordsLimited![i]!;
    // if (exclude.has(word)) continue;
    const emb = vectorsLimited![i]!;
    const dist = norm([
      emb[0] - query[0],
      emb[1] - query[1],
      emb[2] - query[2],
    ]);
    if (dist < bestDist) {
      bestDist = dist;
      bestWord = word;
    }
  }
  return bestWord;
}

export async function POST(request: Request) {
  try {
    const userAgent = request.headers.get("user-agent") || "";
    if (isBotUserAgent(userAgent)) {
      return NextResponse.json({ error: "No botting please" }, { status: 403 });
    }

    const { word1, word2 } = (await request.json()) as {
      word1: string;
      word2?: string;
    };
    if (!word1 && !word2) {
      return NextResponse.json(
        { error: "At least one word is required" },
        { status: 400 },
      );
    }
    const result = machine(word1, word2 || undefined);
    return NextResponse.json({ result });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}

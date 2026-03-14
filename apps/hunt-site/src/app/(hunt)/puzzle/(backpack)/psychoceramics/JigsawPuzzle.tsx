"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  JigsawCanvas,
  type JigsawDrawParams,
} from "@/components/jigsaw/JigsawCanvas";
import { JigsawCursor } from "@/components/jigsaw/cursor";
import {
  JigsawProvider,
  useJigsaw,
  type Vec2,
} from "@/components/jigsaw/state";
import { JIGSAW_EXAMPLE_PIECES } from "./media/manifest";
import { JIGSAW_ADJACENCY, type RelativeDir } from "./jigsaw-config/adjacency";

type Tile = {
  id: string;
  idx: number;
  x: number;
  y: number;
  w: number;
  h: number;
  imgIndex: number;
  z: number;
  groupId: number;
};

type Side = "left" | "right" | "up" | "down";

type NeighborIdx = number | number[];

function toNeighborList(v: NeighborIdx | null | undefined): number[] {
  if (v == null) return [];
  return Array.isArray(v) ? v : [v];
}

function oppositeSide(side: Side): Side {
  switch (side) {
    case "left":
      return "right";
    case "right":
      return "left";
    case "up":
      return "down";
    case "down":
      return "up";
  }
}

function sideFromRelative(dir: RelativeDir): Side {
  // `dir` describes where A is relative to B.
  // We need the side from A -> B.
  switch (dir) {
    case "left-of":
      return "right";
    case "right-of":
      return "left";
    case "up":
      return "down";
    case "down":
      return "up";
  }
}

function addNeighbor(
  map: Map<
    number,
    {
      left?: NeighborIdx;
      right?: NeighborIdx;
      up?: NeighborIdx;
      down?: NeighborIdx;
    }
  >,
  aIdx: number,
  side: Side,
  bIdx: number,
) {
  const cur = map.get(aIdx) ?? {};
  const existing = cur[side];
  if (existing == null) {
    cur[side] = bIdx;
  } else if (Array.isArray(existing)) {
    if (!existing.includes(bIdx)) existing.push(bIdx);
  } else if (existing !== bIdx) {
    cur[side] = [existing, bIdx];
  }
  map.set(aIdx, cur);
}

const DEFAULT_CANVAS_SIZE: { width: number; height: number } = {
  width: 896,
  height: 650,
};

function mulberry32(seed: number) {
  return () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function overlap1d(a0: number, a1: number, b0: number, b1: number) {
  const lo = Math.max(a0, b0);
  const hi = Math.min(a1, b1);
  return Math.max(0, hi - lo);
}

type AlphaMask = {
  w: number;
  h: number;
  alpha: Uint8ClampedArray;
};

function buildAlphaMask(
  img: HTMLImageElement,
  maxDim: number,
): AlphaMask | null {
  const iw = img.naturalWidth;
  const ih = img.naturalHeight;
  if (!iw || !ih) return null;

  const scale = Math.min(1, maxDim / Math.max(iw, ih));
  const w = Math.max(1, Math.round(iw * scale));
  const h = Math.max(1, Math.round(ih * scale));

  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d", { willReadFrequently: true });
  if (!ctx) return null;

  ctx.clearRect(0, 0, w, h);
  ctx.drawImage(img, 0, 0, w, h);

  const data = ctx.getImageData(0, 0, w, h).data;
  const alpha = new Uint8ClampedArray(w * h);
  for (let i = 0, j = 0; i < data.length; i += 4, j += 1) {
    alpha[j] = data[i + 3] ?? 0;
  }
  return { w, h, alpha };
}

function usePlaceholderImages(urls: string[]) {
  const [ready, setReady] = useState(false);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    let cancelled = false;
    setReady(false);

    const imgs = urls.map((url) => {
      const img = new window.Image();
      img.src = url;
      return img;
    });
    imagesRef.current = imgs;

    const check = () => {
      if (cancelled) return;
      if (imgs.every((img) => img.complete && img.naturalWidth > 0)) {
        setReady(true);
      }
    };

    const cleanupFns: Array<() => void> = [];
    for (const img of imgs) {
      const onLoad = () => check();
      img.addEventListener("load", onLoad);
      cleanupFns.push(() => img.removeEventListener("load", onLoad));
    }

    const interval = window.setInterval(check, 50);
    check();

    return () => {
      cancelled = true;
      window.clearInterval(interval);
      for (const fn of cleanupFns) fn();
    };
  }, [urls]);

  return { ready, images: imagesRef };
}

function JigsawPuzzleInner() {
  const { state, dispatch } = useJigsaw();

  const canvasHostRef = useRef<HTMLDivElement | null>(null);
  const [canvasSize, setCanvasSize] = useState(() => ({
    width: DEFAULT_CANVAS_SIZE.width,
    height: DEFAULT_CANVAS_SIZE.height,
  }));

  useEffect(() => {
    const el = canvasHostRef.current;
    if (!el) return;

    const ro = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const w = Math.max(600, Math.floor(entry.contentRect.width));
      const h = Math.max(450, Math.floor(entry.contentRect.height));

      setCanvasSize((prev) => {
        if (prev.width === w && prev.height === h) return prev;
        return { width: w, height: h };
      });
    });

    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const CANVAS_W = canvasSize.width;
  const CANVAS_H = canvasSize.height;

  const PIECE_W = 220;
  const PIECE_H = Math.max(18, Math.floor(PIECE_W * (1640 / 2360)));

  const snapThreshold = 20;
  const snapMinOverlap = Math.max(
    6,
    Math.round(Math.min(PIECE_W, PIECE_H) * 0.25),
  );

  const zCounterRef = useRef(1);
  const tilesRef = useRef<Tile[]>([]);

  const prevDownRef = useRef(false);

  const dragGroupRef = useRef<
    | {
        active: boolean;
        groupId: number;
        pointerStart: Vec2;
        initialPositions: Map<string, Vec2>;
      }
    | { active: false }
  >({ active: false });

  const exampleIdToIdx = useMemo(() => {
    const m = new Map<string, number>();
    for (let i = 0; i < JIGSAW_EXAMPLE_PIECES.length; i++) {
      const id = JIGSAW_EXAMPLE_PIECES[i]?.id;
      if (id) m.set(id, i);
    }
    return m;
  }, []);

  const correctNeighbors = useMemo(() => {
    const m = new Map<
      number,
      {
        left?: NeighborIdx;
        right?: NeighborIdx;
        up?: NeighborIdx;
        down?: NeighborIdx;
      }
    >();

    for (const [folder, edges] of Object.entries(JIGSAW_ADJACENCY)) {
      for (const e of edges) {
        const aIdx = exampleIdToIdx.get(`${folder}/${e.a}`);
        const bIdx = exampleIdToIdx.get(`${folder}/${e.b}`);
        if (aIdx == null || bIdx == null) continue;

        const sideAtoB = sideFromRelative(e.dir);
        addNeighbor(m, aIdx, sideAtoB, bIdx);
        addNeighbor(m, bIdx, oppositeSide(sideAtoB), aIdx);
      }
    }

    return m;
  }, [exampleIdToIdx]);

  const [tiles, setTiles] = useState<Tile[]>([]);
  const initializedRef = useRef(false);

  const generateInitialTiles = useCallback(
    (hostW: number, hostH: number): Tile[] => {
      const padding = 16;
      const rand = mulberry32(20260308);

      const maxX = Math.max(padding, hostW - PIECE_W - padding);
      const maxY = Math.max(padding, hostH - PIECE_H - padding);

      const initial: Tile[] = [];
      for (let idx = 0; idx < JIGSAW_EXAMPLE_PIECES.length; idx++) {
        const asset = JIGSAW_EXAMPLE_PIECES[idx];
        if (!asset) continue;

        const x = padding + Math.floor(rand() * (maxX - padding + 1));
        const y = padding + Math.floor(rand() * (maxY - padding + 1));

        initial.push({
          id: asset.id,
          idx,
          x,
          y,
          w: PIECE_W,
          h: PIECE_H,
          imgIndex: idx,
          z: idx,
          groupId: idx,
        });
      }
      return initial;
    },
    [PIECE_H, PIECE_W],
  );

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    zCounterRef.current = 1;
    dragGroupRef.current = { active: false };
    setTiles(generateInitialTiles(CANVAS_W, CANVAS_H));
  }, [CANVAS_H, CANVAS_W, generateInitialTiles]);

  useEffect(() => {
    tilesRef.current = tiles;
  }, [tiles]);

  const urls = useMemo(() => JIGSAW_EXAMPLE_PIECES.map((p) => p.url), []);

  const { ready, images } = usePlaceholderImages(urls);
  const alphaMasksRef = useRef<Array<AlphaMask | null>>([]);
  const urlsKey = useMemo(() => urls.join("|"), [urls]);

  useEffect(() => {
    alphaMasksRef.current = [];
    if (!ready) return;

    alphaMasksRef.current = images.current.map((img) =>
      buildAlphaMask(img, 512),
    );
  }, [images, ready, urlsKey]);

  const hitTest = useCallback(
    (pt: Vec2) => {
      const sorted = [...tilesRef.current].sort((a, b) => a.z - b.z);
      for (let i = sorted.length - 1; i >= 0; i--) {
        const t = sorted[i]!;
        if (pt.x < t.x || pt.x > t.x + t.w || pt.y < t.y || pt.y > t.y + t.h)
          continue;

        if (!ready) return t;

        const mask = alphaMasksRef.current[t.imgIndex];
        if (!mask) return t;

        const u = (pt.x - t.x) / t.w;
        const v = (pt.y - t.y) / t.h;
        const mx = Math.floor(u * mask.w);
        const my = Math.floor(v * mask.h);
        if (mx < 0 || mx >= mask.w || my < 0 || my >= mask.h) continue;
        const a = mask.alpha[my * mask.w + mx] ?? 0;
        if (a > 16) return t;
      }
      return null;
    },
    [ready],
  );

  const clampGroupDelta = (
    initialPositions: Map<string, Vec2>,
    dx: number,
    dy: number,
  ): { dx: number; dy: number } => {
    let minX = Number.POSITIVE_INFINITY;
    let minY = Number.POSITIVE_INFINITY;
    let maxX = Number.NEGATIVE_INFINITY;
    let maxY = Number.NEGATIVE_INFINITY;

    for (const t of tilesRef.current) {
      const p0 = initialPositions.get(t.id);
      if (!p0) continue;
      minX = Math.min(minX, p0.x);
      minY = Math.min(minY, p0.y);
      maxX = Math.max(maxX, p0.x + t.w);
      maxY = Math.max(maxY, p0.y + t.h);
    }

    if (!Number.isFinite(minX) || !Number.isFinite(minY))
      return { dx: 0, dy: 0 };

    let nextMinX = minX + dx;
    let nextMinY = minY + dy;
    let nextMaxX = maxX + dx;
    let nextMaxY = maxY + dy;

    if (nextMinX < 0) {
      dx -= nextMinX;
      nextMinX = 0;
      nextMaxX = maxX + dx;
    }
    if (nextMaxX > CANVAS_W) {
      dx -= nextMaxX - CANVAS_W;
      nextMaxX = CANVAS_W;
      nextMinX = minX + dx;
    }
    if (nextMinY < 0) {
      dy -= nextMinY;
      nextMinY = 0;
      nextMaxY = maxY + dy;
    }
    if (nextMaxY > CANVAS_H) {
      dy -= nextMaxY - CANVAS_H;
    }

    return { dx, dy };
  };

  const trySnapGroupToCorrectNeighbor = useCallback(
    (dragGroupId: number) => {
      setTiles((prev) => {
        const next = prev.map((t) => ({ ...t }));

        let activeGroupId = dragGroupId;
        let didAnyChange = false;

        type Candidate = {
          score: number;
          tx: number;
          ty: number;
          targetGroupId: number;
        };

        const sides: Side[] = ["left", "right", "up", "down"];
        const ideal = { dx: 0, dy: 0 } as const;

        for (let iter = 0; iter < 12; iter++) {
          const groupTiles = next.filter((t) => t.groupId === activeGroupId);
          const otherTiles = next.filter((t) => t.groupId !== activeGroupId);
          if (groupTiles.length === 0 || otherTiles.length === 0) break;

          let best: Candidate | null = null;

          for (const a of groupTiles) {
            const neighbors = correctNeighbors.get(a.idx);
            if (!neighbors) continue;

            for (const side of sides) {
              for (const neighborIdx of toNeighborList(neighbors[side])) {
                const b = otherTiles.find((t) => t.idx === neighborIdx);
                if (!b) continue;

                // Prevent snapping from far away.
                if (side === "left" || side === "right") {
                  const overlap = overlap1d(a.y, a.y + a.h, b.y, b.y + b.h);
                  if (overlap < snapMinOverlap) continue;
                } else {
                  const overlap = overlap1d(a.x, a.x + a.w, b.x, b.x + b.w);
                  if (overlap < snapMinOverlap) continue;
                }

                const tx = b.x - (a.x + ideal.dx);
                const ty = b.y - (a.y + ideal.dy);

                if (
                  Math.abs(tx) <= snapThreshold &&
                  Math.abs(ty) <= snapThreshold
                ) {
                  const score = Math.abs(tx) + Math.abs(ty);
                  if (!best || score < best.score) {
                    best = { score, tx, ty, targetGroupId: b.groupId };
                  }
                }
              }
            }
          }

          if (!best) break;

          {
            const moved: Tile[] = [];
            for (const t of next) {
              if (t.groupId !== activeGroupId) continue;
              t.x += best.tx;
              t.y += best.ty;
              moved.push(t);
            }

            let minX = Number.POSITIVE_INFINITY;
            let minY = Number.POSITIVE_INFINITY;
            let maxX = Number.NEGATIVE_INFINITY;
            let maxY = Number.NEGATIVE_INFINITY;
            for (const t of moved) {
              minX = Math.min(minX, t.x);
              minY = Math.min(minY, t.y);
              maxX = Math.max(maxX, t.x + t.w);
              maxY = Math.max(maxY, t.y + t.h);
            }

            let dx = 0;
            let dy = 0;
            if (minX + dx < 0) dx -= minX + dx;
            if (maxX + dx > CANVAS_W) dx -= maxX + dx - CANVAS_W;
            if (minY + dy < 0) dy -= minY + dy;
            if (maxY + dy > CANVAS_H) dy -= maxY + dy - CANVAS_H;

            if (dx !== 0 || dy !== 0) {
              for (const t of moved) {
                t.x += dx;
                t.y += dy;
              }
            }
          }

          for (const t of next) {
            if (t.groupId === activeGroupId) t.groupId = best.targetGroupId;
          }

          activeGroupId = best.targetGroupId;
          didAnyChange = true;
        }

        return didAnyChange ? next : prev;
      });
    },
    [CANVAS_H, CANVAS_W, correctNeighbors, snapMinOverlap, snapThreshold],
  );

  useEffect(() => {
    const down = state.pointer.isDown;
    const pt = state.pointer.canvas;
    const wasDown = prevDownRef.current;
    prevDownRef.current = down;

    if (!pt) {
      dispatch({ type: "piece/hover", pieceId: null });
      return;
    }

    const hovered = hitTest(pt);
    dispatch({ type: "piece/hover", pieceId: hovered?.id ?? null });

    if (wasDown && !down) {
      const dragSession = dragGroupRef.current;
      if (dragSession.active) {
        trySnapGroupToCorrectNeighbor(dragSession.groupId);
      }
      dragGroupRef.current = { active: false };
      return;
    }

    if (!down || wasDown) return;
    if (state.dragging) return;
    if (!hovered) return;

    const groupId = hovered.groupId;
    const groupSize = tilesRef.current.filter(
      (t) => t.groupId === groupId,
    ).length;
    const currentMaxZ = Math.max(0, ...tilesRef.current.map((t) => t.z));
    const baseZ = currentMaxZ + groupSize + 1;
    zCounterRef.current = baseZ;

    setTiles((prev) => {
      let z = baseZ - groupSize;
      return prev.map((t) => {
        if (t.groupId !== groupId) return t;
        z += 1;
        return { ...t, z };
      });
    });

    const initialPositions = new Map<string, Vec2>();
    for (const t of tilesRef.current) {
      if (t.groupId !== groupId) continue;
      initialPositions.set(t.id, { x: t.x, y: t.y });
    }

    dragGroupRef.current = {
      active: true,
      groupId,
      pointerStart: { x: pt.x, y: pt.y },
      initialPositions,
    };

    dispatch({
      type: "drag/start",
      pieceId: hovered.id,
      offset: { x: pt.x - hovered.x, y: pt.y - hovered.y },
    });
  }, [
    dispatch,
    hitTest,
    state.dragging,
    state.pointer.canvas,
    state.pointer.isDown,
    trySnapGroupToCorrectNeighbor,
  ]);

  useEffect(() => {
    const drag = state.dragging;
    const pt = state.pointer.canvas;
    if (!drag || !pt) return;

    const dragSession = dragGroupRef.current;
    if (!dragSession.active) return;

    const rawDx = pt.x - dragSession.pointerStart.x;
    const rawDy = pt.y - dragSession.pointerStart.y;
    const { dx, dy } = clampGroupDelta(
      dragSession.initialPositions,
      rawDx,
      rawDy,
    );

    setTiles((prev) =>
      prev.map((t) => {
        if (t.groupId !== dragSession.groupId) return t;
        const p0 = dragSession.initialPositions.get(t.id);
        if (!p0) return t;
        return { ...t, x: p0.x + dx, y: p0.y + dy };
      }),
    );
  }, [state.dragging, state.pointer.canvas, CANVAS_W, CANVAS_H]);

  const onDraw = ({ ctx, size, state: providerState }: JigsawDrawParams) => {
    ctx.clearRect(0, 0, size.width, size.height);
    const draggingId = providerState?.dragging?.pieceId ?? null;

    const sorted = [...tilesRef.current].sort((a, b) => a.z - b.z);
    for (const t of sorted) {
      const isDragging = t.id === draggingId;

      ctx.save();

      const img = ready
        ? images.current[t.imgIndex % images.current.length]
        : null;
      if (img) {
        ctx.globalAlpha = isDragging ? 0.35 : 0.25;
        ctx.drawImage(img, t.x + 4, t.y + 8, t.w, t.h);

        ctx.globalAlpha = isDragging ? 0.98 : 0.94;
        ctx.drawImage(img, t.x, t.y, t.w, t.h);
      }

      // No bounding-box outlines for alpha-cutout pieces.
      ctx.restore();
    }
  };

  return (
    <div
      ref={canvasHostRef}
      className="relative h-[650px] w-[896px] rounded-md border border-main-text/20"
    >
      <JigsawCanvas
        width={CANVAS_W}
        height={CANVAS_H}
        className="block rounded-md"
        onDraw={onDraw}
      />
      <JigsawCursor />
    </div>
  );
}

export default function JigsawPuzzle() {
  return (
    <JigsawProvider>
      <JigsawPuzzleInner />
    </JigsawProvider>
  );
}

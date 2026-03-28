"use client";

import React, { useEffect, useRef } from "react";

type PuzzlePlayerProps = {
  puzzleData?: Record<string, unknown>;
  options?: { mode?: string } & Record<string, unknown>;
  onReady?: () => void;
  className?: string;
  puzzleId?: string;
  showCommands?: boolean; // expose PuzzleJS toolbar (undo/redo/reset/about)
};

type PuzzleEntryInstance = {
  rebuildContents?: () => void;
};

type PuzzleEntryCtor = new (
  container: Element,
  index: number,
) => PuzzleEntryInstance;

type CrosswordEntryLike = {
  setDxDy?: (dx: number, dy: number) => void;
  mark?: (cell: HTMLElement) => void;
  unmark?: (cell: HTMLElement) => void;
};

function loadScript(src: string) {
  // Avoid inserting the same script multiple times (HMR or multiple mounts).
  return new Promise<void>((resolve) => {
    try {
      // If the library already created its global, skip loading.
      if ((window as unknown as { PuzzleEntry?: unknown }).PuzzleEntry) {
        console.log(
          `PuzzlePlayer: PuzzleEntry already present, skipping load ${src}`,
        );
        resolve();
        return;
      }

      const existing = document.querySelector<HTMLScriptElement>(
        `script[src="${src}"]`,
      );
      if (existing) {
        // If an identical script tag is already in the document, hook its load/error if needed.
        if (existing.dataset.puzzleLoaded === "true") {
          console.log(`PuzzlePlayer: script tag ${src} already loaded`);
          resolve();
          return;
        }
        const onLoad = () => {
          try {
            console.log(`PuzzlePlayer: existing script ${src} loaded`);
          } catch {}
          existing.dataset.puzzleLoaded = "true";
          cleanup();
          resolve();
        };
        const onErr = () => {
          try {
            console.warn(`PuzzlePlayer: existing script ${src} failed to load`);
          } catch {}
          cleanup();
          resolve();
        };
        const cleanup = () => {
          existing.removeEventListener("load", onLoad);
          existing.removeEventListener("error", onErr);
        };
        existing.addEventListener("load", onLoad);
        existing.addEventListener("error", onErr);
        return;
      }

      const s = document.createElement("script");
      s.src = src;
      s.async = true;
      const onLoadNew = () => {
        try {
          console.log(`PuzzlePlayer: loaded script ${src}`);
        } catch {}
        s.dataset.puzzleLoaded = "true";
        cleanupNew();
        resolve();
      };
      const onErrNew = () => {
        try {
          console.warn(`PuzzlePlayer: failed to load script ${src}`);
        } catch {}
        cleanupNew();
        resolve();
      };
      const cleanupNew = () => {
        s.removeEventListener("load", onLoadNew);
        s.removeEventListener("error", onErrNew);
      };
      s.addEventListener("load", onLoadNew);
      s.addEventListener("error", onErrNew);
      document.head.appendChild(s);
    } catch (err) {
      console.warn("PuzzlePlayer: loadScript error", err);
      resolve();
    }
  });
}

function loadCSS(href: string) {
  return new Promise<void>((resolve) => {
    const l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = href;
    l.onload = () => {
      console.log(`PuzzlePlayer: loaded css ${href}`);
      resolve();
    };
    l.onerror = () => {
      console.warn(`PuzzlePlayer: failed to load css ${href}`);
      resolve();
    };
    document.head.appendChild(l);
  });
}

export default function PuzzlePlayer({
  puzzleData,
  options,
  onReady,
  className,
  puzzleId,
  showCommands = true,
}: PuzzlePlayerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const jsonNodeRef = useRef<Text | null>(null);
  const returnKeyNavHandlerRef = useRef<((e: KeyboardEvent) => void) | null>(
    null,
  );

  useEffect(() => {
    let mounted = true;
    const containerForCleanup = containerRef.current;
    const installCrosswordReturnKeyNav = (container: HTMLElement) => {
      if ((options?.mode ?? "default") !== "crossword") return;
      if (returnKeyNavHandlerRef.current) return;

      const handler = (e: KeyboardEvent) => {
        const active = document.activeElement as HTMLElement | null;
        if (!active || !container.contains(active)) return;

        const cell =
          active.closest<HTMLElement>(".cell") ??
          (active.classList.contains("cell") ? active : null);
        if (!cell) return;

        const isArrow =
          e.key === "ArrowLeft" ||
          e.key === "ArrowRight" ||
          e.key === "ArrowUp" ||
          e.key === "ArrowDown";

        if (isArrow) {
          const isVertical = container.classList.contains("advance-vertical");
          const toggleToVertical =
            !isVertical && (e.key === "ArrowUp" || e.key === "ArrowDown");
          const toggleToHorizontal =
            isVertical && (e.key === "ArrowLeft" || e.key === "ArrowRight");

          if (toggleToVertical || toggleToHorizontal) {
            const entry = (container as unknown as { puzzleEntry?: unknown })
              .puzzleEntry as CrosswordEntryLike | undefined;

            e.preventDefault();
            e.stopPropagation();

            try {
              if (toggleToVertical) entry?.setDxDy?.(0, 1);
              else entry?.setDxDy?.(1, 0);
            } catch {}

            // Focus didn't change, so force the highlighted clue to refresh.
            try {
              entry?.unmark?.(cell);
              entry?.mark?.(cell);
            } catch {}

            try {
              container.dispatchEvent(
                new CustomEvent("puzzlejs:focus-or-direction-changed"),
              );
            } catch {}

            return;
          }

          // Otherwise let PuzzleJS handle arrow navigation to adjacent boxes.
          return;
        }

        const isEnter = e.key === "Enter";
        const isTab = e.key === "Tab";
        if (!isEnter && !isTab) return;

        const acrossAttr = "data-across-cluenumber";
        const downAttr = "data-down-cluenumber";
        const dirAttr = container.classList.contains("advance-vertical")
          ? downAttr
          : acrossAttr;

        const currentStr = cell.getAttribute(dirAttr);

        const clueNums = Array.from(
          container.querySelectorAll<HTMLElement>(`.cell[${dirAttr}]`),
        )
          .map((el) => parseInt(el.getAttribute(dirAttr) ?? "", 10))
          .filter((n) => Number.isFinite(n));

        const uniqueSorted = Array.from(new Set(clueNums)).sort(
          (a, b) => a - b,
        );
        if (uniqueSorted.length === 0) return;

        const currentNum = currentStr ? parseInt(currentStr, 10) : NaN;
        const idx = Number.isFinite(currentNum)
          ? uniqueSorted.indexOf(currentNum)
          : -1;

        const backwards = e.shiftKey;
        const nextIdx = backwards
          ? idx >= 0
            ? (idx - 1 + uniqueSorted.length) % uniqueSorted.length
            : uniqueSorted.length - 1
          : idx >= 0
            ? (idx + 1) % uniqueSorted.length
            : 0;
        const next = uniqueSorted[nextIdx]!;

        const nextCell = container.querySelector<HTMLElement>(
          `.cell[${dirAttr}='${next}']`,
        );
        if (!nextCell) return;

        e.preventDefault();
        e.stopPropagation();
        nextCell.focus();
      };

      returnKeyNavHandlerRef.current = handler;
      container.addEventListener("keydown", handler, true);
    };

    // Guard against double init (React StrictMode or accidental multiple mounts)
    const existingContainer = containerRef.current;
    if (
      existingContainer &&
      existingContainer.dataset.puzzlePlayerInitialized === "1"
    ) {
      console.log("PuzzlePlayer: initialization skipped (already initialized)");
      try {
        installCrosswordReturnKeyNav(existingContainer);
      } catch {}
      return () => {
        mounted = false;
        try {
          const handler = returnKeyNavHandlerRef.current;
          if (handler) {
            existingContainer.removeEventListener("keydown", handler, true);
            returnKeyNavHandlerRef.current = null;
          }
        } catch {}
      };
    }
    if (containerRef.current)
      containerRef.current.dataset.puzzlePlayerInitialized = "1";

    async function init() {
      try {
        console.log("PuzzlePlayer: init() starting");

        const container = containerRef.current;
        if (!container) return;

        if (!(window as unknown as { PuzzleEntry?: unknown }).PuzzleEntry) {
          console.log("PuzzlePlayer: loading /puzzlejs assets");
          await loadCSS("/puzzlejs/puzzle.css");
          await loadCSS("/puzzlejs/puzzle-box.css");
          await loadScript("/puzzlejs/puzzle.js");
        }

        const PuzzleEntry = (
          window as unknown as { PuzzleEntry?: PuzzleEntryCtor }
        ).PuzzleEntry;
        if (!PuzzleEntry) {
          console.warn(
            "PuzzleJS not available. Ensure /public/puzzlejs assets are present.",
          );
          return;
        }

        // If puzzleData is an object, inject a text node with the JSON so the
        // library can pick it up if it reads inline JSON.
        // Inject JSON options; ensure show-commands flag if requested
        let mergedData: Record<string, unknown> | undefined =
          puzzleData && typeof puzzleData === "object"
            ? { ...puzzleData }
            : undefined;
        if (showCommands) {
          if (!mergedData) {
            // create one if absent so we can set the flag
            mergedData = { "data-show-commands": "1" };
          } else if (!("data-show-commands" in mergedData)) {
            mergedData["data-show-commands"] = "1";
          }
        }
        if (mergedData) {
          try {
            if (jsonNodeRef.current) {
              jsonNodeRef.current.textContent = JSON.stringify(mergedData);
            } else {
              const node = document.createTextNode(JSON.stringify(mergedData));
              container.insertBefore(node, container.firstChild);
              jsonNodeRef.current = node;
            }
          } catch {
            // ignore
          }
        }

        const entry = new PuzzleEntry(container, 0);
        console.log("PuzzlePlayer: PuzzleEntry instantiated", { entry });
        try {
          if (entry && typeof entry.rebuildContents === "function")
            entry.rebuildContents();
        } catch {}

        installCrosswordReturnKeyNav(container);

        if (mounted) onReady?.();
      } catch (err) {
        console.error("Error initializing PuzzleJS player:", err);
      }
    }

    void init();

    return () => {
      mounted = false;
      try {
        const container = containerForCleanup;
        const handler = returnKeyNavHandlerRef.current;
        if (container && handler) {
          container.removeEventListener("keydown", handler, true);
          returnKeyNavHandlerRef.current = null;
        }
      } catch {}
      try {
        if (
          jsonNodeRef.current &&
          containerForCleanup &&
          containerForCleanup.firstChild === jsonNodeRef.current
        ) {
          containerForCleanup.removeChild(jsonNodeRef.current);
          jsonNodeRef.current = null;
        }
      } catch {}
    };
  }, [puzzleData, onReady, puzzleId, showCommands, options?.mode]);

  return (
    <div
      ref={containerRef}
      className={`puzzle-entry puzzle-player ${className ?? ""}`}
      data-mode={options?.mode ?? "default"}
      data-puzzle-id={puzzleId ?? ""}
      {...(showCommands ? { "data-show-commands": "1" } : {})}
    />
  );
}

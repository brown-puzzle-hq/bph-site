"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

type Props = {
  puzzleId: string;
};

type PuzzleGridLike = {
  options?: Record<string, unknown>;
  canHaveAllChars?: boolean;
};

type PuzzleEntryLike = {
  activeGrid?: PuzzleGridLike;
};

function getPuzzleContainer(puzzleId: string): HTMLElement | null {
  return document.querySelector<HTMLElement>(
    `.puzzle-player[data-puzzle-id="${CSS.escape(puzzleId)}"]`,
  );
}

function getPuzzleEntry(container: HTMLElement): PuzzleEntryLike | null {
  return (
    (container as unknown as { puzzleEntry?: PuzzleEntryLike }).puzzleEntry ??
    null
  );
}

function isRebusAllowedCell(target: EventTarget | null): boolean {
  const el = target instanceof HTMLElement ? target : null;
  const cell = el?.closest<HTMLElement>(".cell");
  if (!cell) return false;
  return cell.classList.contains("rebus-cell");
}

export default function RebusControlsClient({ puzzleId }: Props) {
  const [rebusLocked, setRebusLocked] = useState(false);
  const installedRef = useRef(false);
  const pendingRestoreRef = useRef<null | (() => void)>(null);

  const inputId = useMemo(() => `rebus-toggle-${puzzleId}`, [puzzleId]);

  // Install the rebus restriction + initialize toggle state once PuzzleJS is ready.
  useEffect(() => {
    const container = getPuzzleContainer(puzzleId);
    if (!container) return;

    let cancelled = false;

    const install = () => {
      if (cancelled || installedRef.current) return;

      const entry = getPuzzleEntry(container);
      const activeGrid = entry?.activeGrid;
      if (!entry || !activeGrid || !activeGrid.options) return;

      installedRef.current = true;

      // Initialize toggle UI from current grid options.
      setRebusLocked(Boolean(activeGrid.options["data-text-shift-lock"]));

      const onKeyDownCapture = (e: KeyboardEvent) => {
        try {
          const grid = getPuzzleEntry(container)?.activeGrid;
          if (!grid?.options) return;

          const shiftKeyMode = grid.options["data-text-shift-key"];
          const shiftLockOn = Boolean(grid.options["data-text-shift-lock"]);
          const shiftActive = e.shiftKey || shiftLockOn;

          // Only relevant for crossword-style grids where shift == rebus append.
          if (shiftKeyMode !== "rebus") return;
          if (grid.canHaveAllChars) return;
          if (!shiftActive) return;

          // If you are NOT in a specified rebus square, force Shift-type to behave like normal typing.
          if (isRebusAllowedCell(e.target)) return;

          const prev = grid.options["data-text-shift-key"];
          grid.options["data-text-shift-key"] = "none";

          // Restore after PuzzleJS processes the keydown.
          queueMicrotask(() => {
            try {
              const gridNow = getPuzzleEntry(container)?.activeGrid;
              if (gridNow?.options)
                gridNow.options["data-text-shift-key"] = prev;
            } catch {}
          });
        } catch {}
      };

      container.addEventListener("keydown", onKeyDownCapture, true);

      pendingRestoreRef.current = () => {
        container.removeEventListener("keydown", onKeyDownCapture, true);
      };
    };

    const rafLoop = () => {
      if (cancelled) return;
      install();
      if (!installedRef.current) requestAnimationFrame(rafLoop);
    };

    rafLoop();

    return () => {
      cancelled = true;
      installedRef.current = false;
      try {
        pendingRestoreRef.current?.();
      } catch {}
      pendingRestoreRef.current = null;
    };
  }, [puzzleId]);

  // Keep PuzzleJS shift-lock option in sync with the toggle.
  useEffect(() => {
    const container = getPuzzleContainer(puzzleId);
    if (!container) return;
    const entry = getPuzzleEntry(container);
    const grid = entry?.activeGrid;
    if (!grid?.options) return;

    grid.options["data-text-shift-lock"] = rebusLocked;
  }, [puzzleId, rebusLocked]);

  return (
    <div className="mt-2 flex items-center gap-2 text-sm">
      <Switch
        id={inputId}
        checked={rebusLocked}
        onCheckedChange={setRebusLocked}
      />
      <Label htmlFor={inputId}>Rebus mode</Label>
    </div>
  );
}

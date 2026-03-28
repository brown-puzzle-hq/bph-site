"use client";
import { FC, useEffect, useState, useCallback } from "react";

export type Clue = {
  num: number;
  answerLength: number;
  row: number;
  col: number;
  direction: "A" | "D";
};

type CrosswordEntryLike = {
  setDxDy?: (dx: number, dy: number) => void;
  mark?: (cell: HTMLElement) => void;
  unmark?: (cell: HTMLElement) => void;
};

interface Props {
  puzzleId: string;
  across: Clue[];
  down: Clue[];
  acrossClues?: Record<number, string>;
  downClues?: Record<number, string>;
}

function injectStyleOnce() {
  if (typeof document === "undefined") return;
  if (document.getElementById("crossword-hover-style")) return;
  const style = document.createElement("style");
  style.id = "crossword-hover-style";
  style.textContent = `.clue-hover-highlight, .entry-active-highlight { background: rgba(255,221,0,0.55) !important; position: relative; }
  .clue-hover-highlight::after, .entry-active-highlight::after { content:''; position:absolute; inset:0; outline:2px solid #ffdd00; pointer-events:none; }`;
  document.head.appendChild(style);
}

function highlightCells(puzzleId: string, clue: Clue, on: boolean) {
  const container = document.querySelector(
    `.puzzle-player[data-puzzle-id='${puzzleId}']`,
  );
  if (!container) return;
  const rows = Array.from(
    container.querySelectorAll("table.puzzle-grid-content tr"),
  );
  const targets: HTMLElement[] = [];
  for (let i = 0; i < clue.answerLength; i++) {
    const r = clue.row + (clue.direction === "D" ? i : 0);
    const c = clue.col + (clue.direction === "A" ? i : 0);
    const rowEl = rows[r];
    if (!rowEl) continue;
    const tds = Array.from(rowEl.querySelectorAll("td"));
    const cell = tds[c];
    if (
      cell instanceof HTMLElement &&
      !cell.className.toLowerCase().includes("block")
    )
      targets.push(cell);
  }
  targets.forEach((cell) => {
    if (on) cell.classList.add("clue-hover-highlight");
    else cell.classList.remove("clue-hover-highlight");
  });
}

function focusClue(puzzleId: string, clue: Clue) {
  const container = document.querySelector<HTMLElement>(
    `.puzzle-player[data-puzzle-id='${puzzleId}']`,
  );
  if (!container) return;

  const entry = (container as unknown as { puzzleEntry?: unknown })
    .puzzleEntry as CrosswordEntryLike | undefined;

  try {
    if (clue.direction === "A") entry?.setDxDy?.(1, 0);
    else entry?.setDxDy?.(0, 1);
  } catch {}

  const cell = container.querySelector<HTMLElement>(
    `#cell-${clue.row}-${clue.col}`,
  );
  if (!cell) return;

  cell.focus();
  try {
    entry?.unmark?.(cell);
    entry?.mark?.(cell);
  } catch {}
}

const CrosswordCluesClient: FC<Props> = ({
  puzzleId,
  across,
  down,
  acrossClues,
  downClues,
}) => {
  injectStyleOnce();

  const [activeClue, setActiveClue] = useState<{
    dir: "A" | "D";
    num: number;
  } | null>(null);

  const [panelHeight, setPanelHeight] = useState<number | null>(null);

  const updateActiveFromDom = useCallback(() => {
    const container = document.querySelector<HTMLElement>(
      `.puzzle-player[data-puzzle-id='${puzzleId}']`,
    );
    if (!container) return;

    const activeEl = document.activeElement as HTMLElement | null;
    if (!activeEl || !container.contains(activeEl)) return;

    const cell =
      activeEl.closest<HTMLElement>(".cell") ??
      (activeEl.classList.contains("cell") ? activeEl : null);
    if (!cell) return;

    const isVertical = container.classList.contains("advance-vertical");
    const dir: "A" | "D" = isVertical ? "D" : "A";
    const attr = isVertical ? "data-down-cluenumber" : "data-across-cluenumber";
    const str = cell.getAttribute(attr);
    const num = str ? parseInt(str, 10) : NaN;
    if (!Number.isFinite(num)) return;
    setActiveClue({ dir, num });
  }, [puzzleId]);

  useEffect(() => {
    const container = document.querySelector<HTMLElement>(
      `.puzzle-player[data-puzzle-id='${puzzleId}']`,
    );
    if (!container) return;

    const onFocusIn = () => {
      requestAnimationFrame(updateActiveFromDom);
    };
    const onCustom = () => {
      requestAnimationFrame(updateActiveFromDom);
    };

    container.addEventListener("focusin", onFocusIn, true);
    container.addEventListener("puzzlejs:focus-or-direction-changed", onCustom);

    requestAnimationFrame(updateActiveFromDom);

    return () => {
      container.removeEventListener("focusin", onFocusIn, true);
      container.removeEventListener(
        "puzzlejs:focus-or-direction-changed",
        onCustom,
      );
    };
  }, [puzzleId, updateActiveFromDom]);

  useEffect(() => {
    const container = document.querySelector<HTMLElement>(
      `.puzzle-player[data-puzzle-id='${puzzleId}']`,
    );
    if (!container) return;

    const getGridTable = () =>
      container.querySelector<HTMLElement>("table.puzzle-grid-content");

    const measure = () => {
      const table = getGridTable();
      if (!table) return;
      const h = Math.round(table.getBoundingClientRect().height);
      if (h > 0) setPanelHeight(h);
    };

    measure();

    const table = getGridTable();
    let ro: ResizeObserver | null = null;
    if (table && typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => measure());
      ro.observe(table);
    }

    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("resize", measure);
      ro?.disconnect();
    };
  }, [puzzleId]);

  return (
    <div className="grid w-full max-w-xl gap-6 text-left md:grid-cols-2">
      <div>
        <h3 className="mb-2 font-semibold">Across</h3>
        <div
          className="overflow-y-auto pr-2"
          style={panelHeight ? { height: `${panelHeight}px` } : undefined}
        >
          <ul className="space-y-1 text-sm">
            {across.map((c) => {
              const isActive =
                activeClue?.dir === "A" && activeClue.num === c.num;
              return (
                <li
                  key={`A${c.num}`}
                  data-clue-id={`A-${c.num}`}
                  className={`group flex cursor-pointer select-none gap-2 ${
                    isActive ? "font-semibold" : ""
                  }`}
                  onMouseEnter={() => highlightCells(puzzleId, c, true)}
                  onMouseLeave={() => highlightCells(puzzleId, c, false)}
                  onClick={() => {
                    setActiveClue({ dir: "A", num: c.num });
                    focusClue(puzzleId, c);
                  }}
                  onFocus={() => highlightCells(puzzleId, c, true)}
                  onBlur={() => highlightCells(puzzleId, c, false)}
                  tabIndex={0}
                  aria-current={isActive ? "true" : undefined}
                >
                  <span
                    className={`w-8 font-mono group-hover:text-amber-300 ${
                      isActive ? "text-amber-300" : ""
                    }`}
                  >
                    {c.num}A
                  </span>
                  <span
                    className={`text-muted-foreground flex-1 italic group-hover:text-amber-200 ${
                      isActive ? "text-amber-200" : ""
                    }`}
                  >
                    {acrossClues?.[c.num] ??
                      `(length ${c.answerLength}) Placeholder clue`}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div>
        <h3 className="mb-2 font-semibold">Down</h3>
        <div
          className="overflow-y-auto pr-2"
          style={panelHeight ? { height: `${panelHeight}px` } : undefined}
        >
          <ul className="space-y-1 text-sm">
            {down.map((c) => {
              const isActive =
                activeClue?.dir === "D" && activeClue.num === c.num;
              return (
                <li
                  key={`D${c.num}`}
                  data-clue-id={`D-${c.num}`}
                  className={`group flex cursor-pointer select-none gap-2 ${
                    isActive ? "font-semibold" : ""
                  }`}
                  onMouseEnter={() => highlightCells(puzzleId, c, true)}
                  onMouseLeave={() => highlightCells(puzzleId, c, false)}
                  onClick={() => {
                    setActiveClue({ dir: "D", num: c.num });
                    focusClue(puzzleId, c);
                  }}
                  onFocus={() => highlightCells(puzzleId, c, true)}
                  onBlur={() => highlightCells(puzzleId, c, false)}
                  tabIndex={0}
                  aria-current={isActive ? "true" : undefined}
                >
                  <span
                    className={`w-8 font-mono group-hover:text-amber-300 ${
                      isActive ? "text-amber-300" : ""
                    }`}
                  >
                    {c.num}D
                  </span>
                  <span
                    className={`text-muted-foreground flex-1 italic group-hover:text-amber-200 ${
                      isActive ? "text-amber-200" : ""
                    }`}
                  >
                    {downClues?.[c.num] ??
                      `(length ${c.answerLength}) Placeholder clue`}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CrosswordCluesClient;

"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useMemo, useRef, useState } from "react";
import featherSvg from "./feather.svg";
import heartSvg from "./heart.svg";

type Zone = "tray" | "left" | "right";
type Container = "bank" | "left" | "right";

type Item = {
  id: string;
  label: string;
  weight: number;
};

type SimItem = {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  container: Container;
  settled: boolean;
};

type TrayRect = {
  left: number;
  right: number;
  top: number;
  bottom: number;
};

const HEART_IDS = new Set([
  // "beta",
  // "epsilon",
  // "mu",
  // "gamma",
  // "eta",
  // "omicron",
  // "iota",
  // "kappa",
  "alpha",
  "delta",
  "zeta",
  "theta",
  "lambda",
  "nu",
  "xi",
]);

const ITEMS: Item[] = [
  { id: "beta", label: "beta", weight: 1 },
  { id: "epsilon", label: "epsilon", weight: 1 },
  { id: "mu", label: "mu", weight: 2 },
  { id: "gamma", label: "gamma", weight: 3 },
  { id: "eta", label: "eta", weight: 4 },
  { id: "omicron", label: "omicron", weight: 4 },
  { id: "iota", label: "iota", weight: 7 },
  { id: "kappa", label: "kappa", weight: 8 },
  { id: "xi", label: "xi", weight: 9 },
  { id: "alpha", label: "alpha", weight: 10 },
  { id: "delta", label: "delta", weight: 11 },
  { id: "zeta", label: "zeta", weight: 12 },
  { id: "theta", label: "theta", weight: 15 },
  { id: "nu", label: "nu", weight: 18 },
  { id: "lambda", label: "lambda", weight: 25 },
];

const itemById = new Map(ITEMS.map((item) => [item.id, item]));

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

const WORLD_WIDTH = 1000;
const WORLD_HEIGHT = 680;
const TOKEN_RADIUS = 27;
const TOKEN_WIDTH = 76;
const TOKEN_HEIGHT = 52;
const GRAVITY = 1800;

const BEAM_LEFT = 120;
const BEAM_RIGHT = 880;
const BEAM_TOP = 188;
const BEAM_HEIGHT = 16;
const PIVOT_X = 500;
const PIVOT_APEX_Y = BEAM_TOP + BEAM_HEIGHT;
const PIVOT_WIDTH = 300;
const PIVOT_HEIGHT = 170;

const TRAY_WIDTH = 220;
const TRAY_DEPTH = 94;
const TRAY_BOTTOM_Y = BEAM_TOP + BEAM_HEIGHT;
const TRAY_ATTACH_RAISE = 6;

const BANK_RECT: TrayRect = {
  left: 50,
  right: 950,
  top: 500,
  bottom: 678,
};

const BASE_LEFT_TRAY: TrayRect = {
  left: BEAM_LEFT - TRAY_WIDTH / 2,
  right: BEAM_LEFT + TRAY_WIDTH / 2,
  top: TRAY_BOTTOM_Y - TRAY_DEPTH,
  bottom: TRAY_BOTTOM_Y,
};

const BASE_RIGHT_TRAY: TrayRect = {
  left: BEAM_RIGHT - TRAY_WIDTH / 2,
  right: BEAM_RIGHT + TRAY_WIDTH / 2,
  top: TRAY_BOTTOM_Y - TRAY_DEPTH,
  bottom: TRAY_BOTTOM_Y,
};

function chipAsset(id: string) {
  return HEART_IDS.has(id) ? heartSvg.src : featherSvg.src;
}

//Heart by Vicons Design from <a href="https://thenounproject.com/browse/icons/term/heart/" target="_blank" title="Heart Icons">Noun Project</a> (CC BY 3.0)
//feather by Yon ten from <a href="https://thenounproject.com/browse/icons/term/feather/" target="_blank" title="feather Icons">Noun Project</a> (CC BY 3.0)

const inRect = (x: number, y: number, rect: TrayRect) =>
  x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;

const inRectX = (x: number, rect: TrayRect) =>
  x >= rect.left && x <= rect.right;

const pickContainerForPoint = (
  x: number,
  y: number,
  beamAngleDeg: number,
): Container => {
  const { left: leftTray, right: rightTray } =
    getTrayRectsForBeam(beamAngleDeg);

  if (inRectX(x, leftTray) && y <= leftTray.bottom + TOKEN_RADIUS)
    return "left";
  if (inRectX(x, rightTray) && y <= rightTray.bottom + TOKEN_RADIUS) {
    return "right";
  }

  if (inRect(x, y, leftTray)) return "left";
  if (inRect(x, y, rightTray)) return "right";
  return "bank";
};

const getInitialSimItems = (): SimItem[] => {
  const columns = 8;
  const startX = 85;
  const xGap = 118;
  const y1 = 548;
  const y2 = 632;

  return ITEMS.map((item, index) => {
    const row = Math.floor(index / columns);
    const col = index % columns;
    return {
      id: item.id,
      x: startX + col * xGap,
      y: row === 0 ? y1 : y2,
      vx: 0,
      vy: 0,
      container: "bank",
      settled: true,
    };
  });
};

const BANK_HOME_BY_ID = new Map(
  getInitialSimItems().map((item) => [item.id, { x: item.x, y: item.y }]),
);

const xPct = (x: number) => `${(x / WORLD_WIDTH) * 100}%`;
const yPct = (y: number) => `${(y / WORLD_HEIGHT) * 100}%`;

const rotatePoint = (
  x: number,
  y: number,
  pivotX: number,
  pivotY: number,
  angleDeg: number,
) => {
  const theta = (angleDeg * Math.PI) / 180;
  const cos = Math.cos(theta);
  const sin = Math.sin(theta);
  const dx = x - pivotX;
  const dy = y - pivotY;
  return {
    x: pivotX + dx * cos - dy * sin,
    y: pivotY + dx * sin + dy * cos,
  };
};

const getTrayRectsForBeam = (beamAngleDeg: number) => {
  const beamY = BEAM_TOP + BEAM_HEIGHT;
  const leftEnd = rotatePoint(
    BEAM_LEFT,
    beamY,
    PIVOT_X,
    PIVOT_APEX_Y,
    beamAngleDeg,
  );
  const rightEnd = rotatePoint(
    BEAM_RIGHT,
    beamY,
    PIVOT_X,
    PIVOT_APEX_Y,
    beamAngleDeg,
  );

  const left: TrayRect = {
    left: leftEnd.x - TRAY_WIDTH / 2,
    right: leftEnd.x + TRAY_WIDTH / 2,
    top: leftEnd.y - TRAY_DEPTH - TRAY_ATTACH_RAISE,
    bottom: leftEnd.y - TRAY_ATTACH_RAISE,
  };

  const right: TrayRect = {
    left: rightEnd.x - TRAY_WIDTH / 2,
    right: rightEnd.x + TRAY_WIDTH / 2,
    top: rightEnd.y - TRAY_DEPTH - TRAY_ATTACH_RAISE,
    bottom: rightEnd.y - TRAY_ATTACH_RAISE,
  };

  return {
    left,
    right,
  };
};

export default function ScaleSimulator() {
  const [items, setItems] = useState<SimItem[]>(() => getInitialSimItems());
  const [draggingItemId, setDraggingItemId] = useState<string | null>(null);
  const [failedAssets, setFailedAssets] = useState<Record<string, boolean>>({});

  const sceneRef = useRef<HTMLDivElement | null>(null);
  const pointerOffsetRef = useRef({ x: 0, y: 0 });
  const latestBeamAngleRef = useRef(0);

  const leftWeight = useMemo(() => {
    return items
      .filter(
        (item) =>
          item.container === "left" &&
          item.id !== draggingItemId &&
          item.settled,
      )
      .reduce((sum, item) => sum + (itemById.get(item.id)?.weight ?? 0), 0);
  }, [items, draggingItemId]);

  const rightWeight = useMemo(() => {
    return items
      .filter(
        (item) =>
          item.container === "right" &&
          item.id !== draggingItemId &&
          item.settled,
      )
      .reduce((sum, item) => sum + (itemById.get(item.id)?.weight ?? 0), 0);
  }, [items, draggingItemId]);

  const balanceDelta = leftWeight - rightWeight;
  // const beamRotationDeg = clamp((rightWeight - leftWeight) * 0.9, -10, 10);
  const beamRotationDeg = balanceDelta === 0 ? 0 : balanceDelta < 0 ? 10 : -10;
  // clamp((rightWeight - leftWeight) * 0.9, -10, 10);

  latestBeamAngleRef.current = beamRotationDeg;

  const trayRects = useMemo(
    () => ({
      ...getTrayRectsForBeam(beamRotationDeg),
      bank: BANK_RECT,
    }),
    [beamRotationDeg],
  );

  const toWorldPoint = (clientX: number, clientY: number) => {
    const scene = sceneRef.current;
    if (!scene) return null;
    const rect = scene.getBoundingClientRect();
    if (!rect.width || !rect.height) return null;
    const x = ((clientX - rect.left) / rect.width) * WORLD_WIDTH;
    const y = ((clientY - rect.top) / rect.height) * WORLD_HEIGHT;
    return { x, y };
  };

  const handlePointerMove = (event: PointerEvent) => {
    if (!draggingItemId) return;
    const point = toWorldPoint(event.clientX, event.clientY);
    if (!point) return;

    const nextContainer = pickContainerForPoint(
      point.x,
      point.y,
      latestBeamAngleRef.current,
    );

    setItems((current) =>
      current.map((item) => {
        if (item.id !== draggingItemId) return item;
        return {
          ...item,
          x: point.x - pointerOffsetRef.current.x,
          y: point.y - pointerOffsetRef.current.y,
          vx: 0,
          vy: 0,
          container: nextContainer,
          settled: false,
        };
      }),
    );
  };

  const handlePointerUp = (event: PointerEvent) => {
    if (!draggingItemId) return;
    const point = toWorldPoint(event.clientX, event.clientY);
    if (!point) {
      setDraggingItemId(null);
      return;
    }

    const targetContainer = pickContainerForPoint(
      point.x,
      point.y,
      latestBeamAngleRef.current,
    );

    setItems((current) =>
      current.map((item) =>
        item.id === draggingItemId
          ? {
              ...item,
              container: targetContainer,
              vx: 0,
              vy: 0,
              settled: targetContainer === "bank",
            }
          : item,
      ),
    );

    setDraggingItemId(null);
  };

  useEffect(() => {
    if (!draggingItemId) return;
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [draggingItemId]);

  useEffect(() => {
    let frameId = 0;
    let lastTs = performance.now();

    const applyContainerBounds = (item: SimItem, dt: number): SimItem => {
      const next = { ...item };
      const { left: leftTray, right: rightTray } = getTrayRectsForBeam(
        latestBeamAngleRef.current,
      );
      const tray =
        next.container === "left"
          ? leftTray
          : next.container === "right"
            ? rightTray
            : BANK_RECT;

      const floorY = tray.bottom - TOKEN_RADIUS;

      if (next.y > floorY) {
        next.y = floorY;
        next.vy *= next.container === "bank" ? 0 : -0.18;
        next.vx *= 0.92;
        if (Math.abs(next.vy) < 20) next.vy = 0;
        if (next.container !== "bank") {
          next.settled = true;
        }
      }

      if (
        next.container !== "bank" &&
        next.y >= tray.top + TOKEN_RADIUS * 0.6
      ) {
        const minX = tray.left + TOKEN_RADIUS;
        const maxX = tray.right - TOKEN_RADIUS;
        if (next.x < minX) {
          next.x = minX;
          next.vx *= -0.22;
        }
        if (next.x > maxX) {
          next.x = maxX;
          next.vx *= -0.22;
        }
      } else if (next.container === "bank") {
        const minX = BANK_RECT.left + TOKEN_RADIUS;
        const maxX = BANK_RECT.right - TOKEN_RADIUS;
        if (next.x < minX) {
          next.x = minX;
          next.vx *= -0.18;
        }
        if (next.x > maxX) {
          next.x = maxX;
          next.vx *= -0.18;
        }
      }

      next.vx *= Math.pow(next.container === "bank" ? 0.82 : 0.985, dt * 60);
      return next;
    };

    const tick = (ts: number) => {
      const dt = Math.min((ts - lastTs) / 1000, 1 / 30);
      lastTs = ts;

      setItems((current) => {
        const nextItems = current.map((item) => {
          if (item.id === draggingItemId) return item;

          if (item.container === "bank") {
            const home = BANK_HOME_BY_ID.get(item.id);
            const targetX = home?.x ?? item.x;
            const targetY = home?.y ?? item.y;
            const settle = Math.min(1, dt * 10);
            return {
              ...item,
              x: item.x + (targetX - item.x) * settle,
              y: item.y + (targetY - item.y) * settle,
              vx: 0,
              vy: 0,
              settled: true,
            };
          }

          let next: SimItem = {
            ...item,
            vy: item.vy + GRAVITY * dt,
            x: item.x + item.vx * dt,
            y: item.y + item.vy * dt,
            settled: item.settled,
          };
          next = applyContainerBounds(next, dt);
          return next;
        });

        for (let pass = 0; pass < 2; pass += 1) {
          for (let i = 0; i < nextItems.length; i += 1) {
            for (let j = i + 1; j < nextItems.length; j += 1) {
              const a = nextItems[i];
              const b = nextItems[j];
              if (!a || !b) continue;
              if (a.container !== b.container) continue;
              if (a.container === "bank") continue;

              const dx = b.x - a.x;
              const dy = b.y - a.y;
              const distSq = dx * dx + dy * dy;
              const minDist = TOKEN_RADIUS * 2 - 1;
              if (distSq >= minDist * minDist) continue;

              const safeDistSq = Math.max(distSq, 0.0001);
              const dist = Math.sqrt(safeDistSq);
              const nx = dx / dist;
              const ny = dy / dist;
              const overlap = Math.min(minDist - dist, 8);
              if (overlap <= 0) continue;

              const aIsDragging = a.id === draggingItemId;
              const bIsDragging = b.id === draggingItemId;

              if (aIsDragging && !bIsDragging) {
                b.x += nx * overlap;
                b.y += ny * overlap;
              } else if (!aIsDragging && bIsDragging) {
                a.x -= nx * overlap;
                a.y -= ny * overlap;
              } else if (!aIsDragging && !bIsDragging) {
                a.x -= nx * (overlap / 2);
                a.y -= ny * (overlap / 2);
                b.x += nx * (overlap / 2);
                b.y += ny * (overlap / 2);
              }

              a.vx *= 0.94;
              a.vy *= 0.94;
              b.vx *= 0.94;
              b.vy *= 0.94;
            }
          }
        }

        const { left: leftTray, right: rightTray } = getTrayRectsForBeam(
          latestBeamAngleRef.current,
        );

        const settleBySupport = (container: Container, tray: TrayRect) => {
          let changed = true;
          while (changed) {
            changed = false;
            for (const item of nextItems) {
              if (item.container !== container || item.settled) continue;

              const floorY = tray.bottom - TOKEN_RADIUS;
              if (item.y >= floorY - 1.5) {
                item.y = Math.min(item.y, floorY);
                item.vx *= 0.7;
                item.vy = 0;
                item.settled = true;
                changed = true;
                continue;
              }

              const supported = nextItems.some((other) => {
                if (other.id === item.id) return false;
                if (other.container !== container || !other.settled)
                  return false;
                if (other.y <= item.y) return false;

                const verticalGap = other.y - item.y;
                const horizontalGap = Math.abs(other.x - item.x);

                return (
                  Math.abs(verticalGap - TOKEN_RADIUS * 2) <= 8 &&
                  horizontalGap <= TOKEN_RADIUS * 1.35
                );
              });

              if (supported) {
                item.vx *= 0.7;
                item.vy = 0;
                item.settled = true;
                changed = true;
              }
            }
          }
        };

        settleBySupport("left", leftTray);
        settleBySupport("right", rightTray);

        return nextItems;
      });

      frameId = window.requestAnimationFrame(tick);
    };

    frameId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frameId);
  }, [draggingItemId]);

  const reset = () => {
    setItems(getInitialSimItems());
    setDraggingItemId(null);
  };

  const zoneItems = useMemo(
    () => ({
      left: items.filter((item) => item.container === "left").length,
      right: items.filter((item) => item.container === "right").length,
      bank: items.filter((item) => item.container === "bank").length,
    }),
    [items],
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={reset}
          className="text-black"
        >
          Reset
        </Button>
      </div>

      <div className="bg-muted/20 flex justify-center overflow-visible rounded-md p-3">
        <div
          ref={sceneRef}
          className="relative min-w-[1000px] select-none overflow-hidden rounded-md"
          style={{ width: `${WORLD_WIDTH}px`, height: `${WORLD_HEIGHT}px` }}
        >
          <div className="bg-background/90 absolute left-1/2 top-[64%] h-[3px] w-36 -translate-x-1/2 rounded-full" />
          <div
            className="absolute z-10 bg-white"
            style={{
              left: xPct(PIVOT_X - PIVOT_WIDTH / 2),
              top: yPct(PIVOT_APEX_Y),
              width: xPct(PIVOT_WIDTH),
              height: yPct(PIVOT_HEIGHT),
              clipPath: "polygon(50% 0, 0 100%, 100% 100%)",
            }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute z-30 flex items-center justify-center text-base font-semibold text-black"
            style={{
              left: xPct(PIVOT_X - PIVOT_WIDTH / 2),
              top: yPct(PIVOT_APEX_Y),
              width: xPct(PIVOT_WIDTH),
              height: yPct(PIVOT_HEIGHT),
              clipPath: "polygon(50% 0, 0 100%, 100% 100%)",
            }}
          >
            <span className="mt-12 text-center">
              {balanceDelta === 0
                ? "Balanced"
                : balanceDelta > 0
                  ? "Left side is heavier"
                  : "Right side is heavier"}
            </span>
          </div>

          <div
            className="absolute inset-0 z-20"
            style={{
              transform: `rotate(${beamRotationDeg}deg)`,
              transformOrigin: `${xPct(PIVOT_X)} ${yPct(PIVOT_APEX_Y)}`,
              transition: "transform 260ms ease",
            }}
          >
            <div
              className="bg-background border-foreground/40 absolute rounded-full border shadow-lg"
              style={{
                left: xPct(BEAM_LEFT),
                top: yPct(BEAM_TOP),
                width: xPct(BEAM_RIGHT - BEAM_LEFT),
                height: yPct(BEAM_HEIGHT),
              }}
            />
            <div
              className="bg-background absolute rounded-full"
              style={{
                left: xPct(PIVOT_X - 1.5),
                top: yPct(BEAM_TOP - 30),
                width: xPct(3),
                height: yPct(30),
              }}
            />
          </div>

          <UTray rect={trayRects.left} isEmpty={zoneItems.left === 0} />
          <UTray rect={trayRects.right} isEmpty={zoneItems.right === 0} />
          <BankZone rect={BANK_RECT} isEmpty={zoneItems.bank === 0} />

          {items.map((simItem) => {
            const item = itemById.get(simItem.id);
            if (!item) return null;
            const assetPath = chipAsset(item.id);
            const isHeart = HEART_IDS.has(item.id);
            const isDragging = draggingItemId === simItem.id;

            return (
              <div
                key={simItem.id}
                onPointerDown={(event) => {
                  const point = toWorldPoint(event.clientX, event.clientY);
                  if (!point) return;
                  pointerOffsetRef.current = {
                    x: point.x - simItem.x,
                    y: point.y - simItem.y,
                  };
                  setDraggingItemId(simItem.id);
                }}
                className="absolute touch-none"
                style={{
                  left: `${(simItem.x / WORLD_WIDTH) * 100}%`,
                  top: `${(simItem.y / WORLD_HEIGHT) * 100}%`,
                  width: `${(TOKEN_WIDTH / WORLD_WIDTH) * 100}%`,
                  height: `${(TOKEN_HEIGHT / WORLD_HEIGHT) * 100}%`,
                  transform: "translate(-50%, -50%)",
                  zIndex: isDragging ? 30 : 20,
                  opacity: isDragging ? 0.88 : 1,
                  cursor: isDragging ? "grabbing" : "grab",
                }}
              >
                {!failedAssets[simItem.id] ? (
                  <img
                    src={assetPath}
                    alt={`${item.label} token`}
                    className={`h-full w-full object-contain ${
                      isHeart ? "text-rose-800" : "text-slate-800"
                    }`}
                    draggable={false}
                    onError={() =>
                      setFailedAssets((current) => ({
                        ...current,
                        [simItem.id]: true,
                      }))
                    }
                  />
                ) : (
                  <div className="bg-muted flex h-full w-full items-center justify-center rounded-md text-[10px] font-semibold uppercase">
                    {item.label.slice(0, 2)}
                  </div>
                )}
                <span className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 text-center text-[11px] font-bold uppercase tracking-wide text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.65)]">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function UTray({ rect, isEmpty }: { rect: TrayRect; isEmpty: boolean }) {
  const left = (rect.left / WORLD_WIDTH) * 100;
  const width = ((rect.right - rect.left) / WORLD_WIDTH) * 100;
  const top = (rect.top / WORLD_HEIGHT) * 100;
  const height = ((rect.bottom - rect.top) / WORLD_HEIGHT) * 100;

  return (
    <div
      className="border-muted-foreground bg-background/10 pointer-events-none absolute border-b-4 border-l-4 border-r-4 border-t-0"
      style={{
        left: `${left}%`,
        width: `${width}%`,
        top: `${top}%`,
        height: `${height}%`,
      }}
    >
      {isEmpty ? (
        <div className="text-muted-foreground/90 absolute inset-0 grid place-items-center text-sm font-medium">
          Drop here
        </div>
      ) : null}
    </div>
  );
}

function BankZone({ rect, isEmpty }: { rect: TrayRect; isEmpty: boolean }) {
  const left = (rect.left / WORLD_WIDTH) * 100;
  const width = ((rect.right - rect.left) / WORLD_WIDTH) * 100;
  const top = (rect.top / WORLD_HEIGHT) * 100;
  const height = ((rect.bottom - rect.top) / WORLD_HEIGHT) * 100;

  return (
    <div
      className="bg-card/80 pointer-events-none absolute rounded-xl border shadow-sm"
      style={{
        left: `${left}%`,
        width: `${width}%`,
        top: `${top}%`,
        height: `${height}%`,
      }}
    >
      {isEmpty ? (
        <div className="text-muted-foreground/80 absolute inset-0 grid place-items-center text-sm">
          Bank
        </div>
      ) : null}
    </div>
  );
}

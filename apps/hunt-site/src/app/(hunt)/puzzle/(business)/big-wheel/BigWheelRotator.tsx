"use client";

import { useCallback, useMemo, useRef, useState } from "react";

type WheelAsset = {
  label: string;
  src?: string;
  alt?: string;
  letters?: string[];
};

type DragState = {
  pointerId: number;
  wheelIndex: number;
  lastAngleDeg: number;
};

type BigWheelRotatorProps = {
  wheels?: WheelAsset[];
};

const WHEEL_COUNT = 9;
const LETTER_ANGLES_DEG = [0, 45, 90, 135, 180, 225, 270, 315] as const;
// Column order matches LETTER_ANGLES_DEG:
// [0, 45, 90, 135, 180, 225, 270, 315]
// Tune these arrays to fix per-column visual alignment.
const LETTER_POSITION_ANGLE_OFFSET_DEG = [0, 0, 0, 0, 0, 0, 0, 0] as const;
const LETTER_RADIUS_BY_COLUMN_PCT = [48, 47, 48, 48, 48, 48, 47, 47] as const;
const LETTER_ROTATION_BY_COLUMN_DEG = [
  270, 225, 180, 135, 90, 45, 0, 315,
] as const;
// Tuned to match the physical build: larger inner disk and evenly spaced rings.
const WHEEL_SIZES_PCT = [34, 42, 50, 58, 66, 74, 82, 90, 98]; // inner -> outer

const normalizeDegrees = (deg: number) => {
  const normalized = deg % 360;
  return normalized < 0 ? normalized + 360 : normalized;
};

const normalizeDelta = (deltaDeg: number) => {
  if (deltaDeg > 180) return deltaDeg - 360;
  if (deltaDeg < -180) return deltaDeg + 360;
  return deltaDeg;
};

const WHEEL_RADIUS_PCT = WHEEL_SIZES_PCT.map((sizePct) => sizePct / 2);

const getAngleDegFromCenter = (
  event: React.PointerEvent<HTMLDivElement>,
  container: HTMLDivElement,
) => {
  const rect = container.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const dx = event.clientX - centerX;
  const dy = event.clientY - centerY;
  return (Math.atan2(dy, dx) * 180) / Math.PI;
};

const getWheelIndexForPointer = (
  event: React.PointerEvent<HTMLDivElement>,
  container: HTMLDivElement,
) => {
  const rect = container.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const dx = event.clientX - centerX;
  const dy = event.clientY - centerY;
  const radiusPct =
    (Math.sqrt(dx * dx + dy * dy) / Math.max(rect.width, rect.height)) * 100;

  let bestIndex = 0;
  let bestDistance = Number.POSITIVE_INFINITY;

  WHEEL_RADIUS_PCT.forEach((wheelRadius, index) => {
    const distance = Math.abs(radiusPct - wheelRadius);
    if (distance < bestDistance) {
      bestDistance = distance;
      bestIndex = index;
    }
  });

  return bestIndex;
};

const getLetterPositionPct = (angleDeg: number, radiusPct: number) => {
  const theta = (angleDeg * Math.PI) / 180;
  const xPct = 50 + radiusPct * Math.cos(theta);
  const yPct = 50 - radiusPct * Math.sin(theta);
  return { xPct, yPct };
};

export default function BigWheelRotator({ wheels }: BigWheelRotatorProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const dragStateRef = useRef<DragState | null>(null);

  const wheelAssets = useMemo<WheelAsset[]>(() => {
    const defaults: WheelAsset[] = Array.from(
      { length: WHEEL_COUNT },
      (_, index) => {
        if (index === 0) return { label: "Wheel 1 (inner)" };
        if (index === WHEEL_COUNT - 1) {
          return { label: `Wheel ${WHEEL_COUNT} (outer)` };
        }
        return { label: `Wheel ${index + 1}` };
      },
    );

    if (!wheels?.length) return defaults;

    return defaults.map((fallback, index) => {
      const provided = wheels[index];
      if (!provided) return fallback;
      return {
        label: provided.label ?? fallback.label,
        src: provided.src,
        alt: provided.alt ?? `${provided.label ?? fallback.label} SVG`,
        letters: provided.letters,
      };
    });
  }, [wheels]);

  const [rotationsDeg, setRotationsDeg] = useState<number[]>(
    Array.from({ length: WHEEL_COUNT }, () => 0),
  );

  const rotateWheelAndInners = useCallback(
    (wheelIndex: number, deltaDeg: number) => {
      setRotationsDeg((prev) =>
        prev.map((currentDeg, index) => {
          if (index > wheelIndex) return currentDeg;
          return normalizeDegrees(currentDeg + deltaDeg);
        }),
      );
    },
    [],
  );

  const onWheelPointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const container = containerRef.current;
      if (!container) return;

      const wheelIndex = getWheelIndexForPointer(event, container);
      const angleDeg = getAngleDegFromCenter(event, container);
      dragStateRef.current = {
        pointerId: event.pointerId,
        wheelIndex,
        lastAngleDeg: angleDeg,
      };

      event.currentTarget.setPointerCapture(event.pointerId);
    },
    [],
  );

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const dragState = dragStateRef.current;
      const container = containerRef.current;
      if (!dragState || !container) return;
      if (event.pointerId !== dragState.pointerId) return;

      const angleDeg = getAngleDegFromCenter(event, container);
      const deltaDeg = normalizeDelta(angleDeg - dragState.lastAngleDeg);
      if (deltaDeg !== 0) {
        rotateWheelAndInners(dragState.wheelIndex, deltaDeg);
        dragStateRef.current = { ...dragState, lastAngleDeg: angleDeg };
      }
    },
    [rotateWheelAndInners],
  );

  const clearDragState = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const dragState = dragStateRef.current;
      if (!dragState) return;
      if (event.pointerId !== dragState.pointerId) return;
      dragStateRef.current = null;
    },
    [],
  );

  const shuffleWheels = useCallback(() => {
    setRotationsDeg(
      Array.from({ length: WHEEL_COUNT }, () =>
        Math.floor(Math.random() * 360),
      ),
    );
  }, []);

  return (
    <div className="mx-auto mb-4 w-[min(48rem,calc(100vw-2rem))] rounded-lg border border-neutral-200 p-4 dark:border-neutral-800">
      <div
        ref={containerRef}
        className="relative mx-auto aspect-square w-full max-w-[38rem] select-none"
        onPointerDown={onWheelPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={clearDragState}
        onPointerCancel={clearDragState}
      >
        {[...wheelAssets]
          .map((asset, index) => ({
            asset,
            index,
            sizePct: WHEEL_SIZES_PCT[index],
            rotationDeg: rotationsDeg[index] ?? 0,
          }))
          .reverse()
          .map(({ asset, index, sizePct, rotationDeg }) => (
            <div
              key={asset.label}
              className="absolute left-1/2 top-1/2"
              style={{
                width: `${sizePct}%`,
                height: `${sizePct}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <div
                className="relative size-full rounded-full bg-white"
                style={{
                  transform: `rotate(${rotationDeg}deg)`,
                  transformOrigin: "center",
                }}
              >
                {asset.src ? (
                  <img
                    src={asset.src}
                    alt={asset.alt ?? asset.label}
                    className="size-full rounded-full"
                    draggable={false}
                  />
                ) : (
                  <div className="size-full rounded-full border border-dashed border-neutral-400 bg-white" />
                )}

                {LETTER_ANGLES_DEG.map((angleDeg, letterIndex) => {
                  const letter = asset.letters?.[letterIndex] ?? "";
                  if (!letter) return null;
                  const adjustedAngleDeg =
                    angleDeg +
                    (LETTER_POSITION_ANGLE_OFFSET_DEG[letterIndex] ?? 0);
                  const radiusPct =
                    LETTER_RADIUS_BY_COLUMN_PCT[letterIndex] ?? 43;
                  const letterRotationDeg =
                    LETTER_ROTATION_BY_COLUMN_DEG[letterIndex] ?? 90;
                  const { xPct, yPct } = getLetterPositionPct(
                    adjustedAngleDeg,
                    radiusPct,
                  );
                  return (
                    <div
                      key={`${asset.label}-${angleDeg}`}
                      className="absolute -translate-x-1/2 -translate-y-1/2 select-none text-sm font-semibold text-black"
                      style={{
                        left: `${xPct}%`,
                        top: `${yPct}%`,
                        transform: `translate(-50%, -50%) rotate(${letterRotationDeg}deg)`,
                        transformOrigin: "center",
                      }}
                    >
                      {letter}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
      </div>

      <div className="mt-3 flex justify-end">
        <button
          type="button"
          className="rounded border border-neutral-300 bg-white px-3 py-1.5 text-sm text-black hover:bg-neutral-100 dark:border-neutral-700 dark:bg-white dark:text-black dark:hover:bg-neutral-100"
          onClick={shuffleWheels}
        >
          Shuffle
        </button>
      </div>
    </div>
  );
}

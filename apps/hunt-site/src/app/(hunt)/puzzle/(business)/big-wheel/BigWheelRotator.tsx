"use client";

import { useCallback, useMemo, useRef, useState } from "react";

type WheelAsset = {
  label: string;
  letters: string[];
};

type DragState = {
  pointerId: number;
  wheelIndex: number;
  lastAngleDeg: number;
};

type BigWheelRotatorProps = {
  wheels: WheelAsset[];
};

const WHEEL_SIZES_PCT = [36, 44, 52, 60, 68, 76, 84, 92, 100]; // inner -> outer
const WHEEL_RADIUS_PCT = WHEEL_SIZES_PCT.map((sizePct) => sizePct / 2);
const INITIAL_ROTATIONS_DEG = [
  211, 37, 294, 123, 279, 16, 332, 88, 246,
] as const;

const normalizeDegrees = (deg: number) => {
  const normalized = deg % 360;
  return normalized < 0 ? normalized + 360 : normalized;
};

const normalizeDelta = (deltaDeg: number) => {
  if (deltaDeg > 180) return deltaDeg - 360;
  if (deltaDeg < -180) return deltaDeg + 360;
  return deltaDeg;
};

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
  const radiusPct = (Math.sqrt(dx * dx + dy * dy) / rect.width) * 100;
  return WHEEL_RADIUS_PCT.findIndex(
    (wheelRadiusPct) => radiusPct <= wheelRadiusPct,
  );
};

const getLetterPositionPct = (angleDeg: number, radiusPct: number) => {
  const theta = (angleDeg * Math.PI) / 180;
  const xPct = 50 + radiusPct * Math.cos(theta);
  const yPct = 50 - radiusPct * Math.sin(theta);
  return { xPct, yPct };
};

const createRandomRotations = (count: number) =>
  Array.from({ length: count }, () => Math.floor(Math.random() * 360));

export default function BigWheelRotator({ wheels }: BigWheelRotatorProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const dragStateRef = useRef<DragState | null>(null);
  const [hoveredWheelIndex, setHoveredWheelIndex] = useState<number | null>(
    null,
  );
  const [dragWheelIndex, setDragWheelIndex] = useState<number | null>(null);

  const [rotationsDeg, setRotationsDeg] = useState<number[]>(() =>
    INITIAL_ROTATIONS_DEG.slice(0, wheels.length),
  );

  const wheelsReversed = useMemo(() => [...wheels].reverse(), [wheels]);

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
      if (wheelIndex < 0) return;
      const angleDeg = getAngleDegFromCenter(event, container);
      dragStateRef.current = {
        pointerId: event.pointerId,
        wheelIndex,
        lastAngleDeg: angleDeg,
      };

      setDragWheelIndex(wheelIndex);
      setHoveredWheelIndex(wheelIndex);

      event.currentTarget.setPointerCapture(event.pointerId);
    },
    [],
  );

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const container = containerRef.current;
      if (!container) return;

      const pointerWheelIndex = getWheelIndexForPointer(event, container);
      if (dragStateRef.current == null) {
        setHoveredWheelIndex(pointerWheelIndex >= 0 ? pointerWheelIndex : null);
        return;
      }

      const dragState = dragStateRef.current;
      if (!dragState) return;
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
      setDragWheelIndex(null);
      setHoveredWheelIndex(null);
    },
    [],
  );

  const onPointerLeave = useCallback(() => {
    if (dragStateRef.current == null) setHoveredWheelIndex(null);
  }, []);

  const shuffleWheels = useCallback(() => {
    setRotationsDeg(createRandomRotations(wheels.length));
  }, [wheels.length]);

  return (
    <div className="relative size-[min(38rem,calc(100vw-32px))] rounded-lg p-4">
      <div
        ref={containerRef}
        className="relative size-full"
        onPointerDown={onWheelPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={clearDragState}
        onPointerCancel={clearDragState}
        onPointerLeave={onPointerLeave}
      >
        {wheelsReversed.map((asset, i) => {
          const index = wheels.length - 1 - i;
          const sizePct = WHEEL_SIZES_PCT[index]!;
          const letterPct = (sizePct - 4) / 2;
          const rotationDeg = rotationsDeg[index] ?? 0;
          const isHovered = hoveredWheelIndex === index;
          const isDragged = dragWheelIndex === index;
          return (
            <div key={asset.label}>
              {/* Border */}
              <div
                className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none rounded-full border border-dashed bg-white ${
                  isDragged
                    ? "border-2 border-neutral-800"
                    : isHovered
                      ? "border-2 border-neutral-600"
                      : "border-neutral-400"
                }`}
                style={{
                  width: `${sizePct}%`,
                  height: `${sizePct}%`,
                }}
              />
              {/* Letters */}
              {Array.from({ length: 8 }).map((_, letterIndex) => {
                const angleDeg = letterIndex * 45;
                const letter = asset.letters[letterIndex];
                if (!letter) return null;
                const letterRotationDeg = rotationDeg - angleDeg - 90;
                const { xPct, yPct } = getLetterPositionPct(
                  angleDeg - rotationDeg,
                  letterPct,
                );
                return (
                  <p
                    key={`${asset.label}-${letterIndex}`}
                    className="absolute select-none text-sm font-semibold leading-none text-black"
                    style={{
                      left: `${xPct}%`,
                      top: `${yPct}%`,
                      transform: `translate(-50%, -50%) rotate(${letterRotationDeg}deg)`,
                      transformOrigin: "center",
                    }}
                  >
                    {letter}
                  </p>
                );
              })}
            </div>
          );
        })}
      </div>

      <div className="absolute bottom-4 right-4">
        <button
          className="rounded border border-neutral-300 bg-white px-3 py-1.5 text-sm text-black hover:bg-neutral-100"
          onClick={shuffleWheels}
        >
          Shuffle
        </button>
      </div>
    </div>
  );
}

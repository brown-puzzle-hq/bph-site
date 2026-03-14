"use client";

import { useMemo, type ReactNode } from "react";
import { cn } from "~/lib/utils";
import { motion, type DragHandlers, type HTMLMotionProps } from "framer-motion";
import { useJigsawOptional } from "@/components/jigsaw/state";

export type Position = { x: number; y: number };

type MotionProps = Omit<
  HTMLMotionProps<"div">,
  "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"
>;

export type AnimatedObjectProps = {
  pos: Position;
  drag?: boolean;
  zIndex?: number;
  onDrag?: DragHandlers["onDrag"];
  onDragStart?: DragHandlers["onDragStart"];
  onDragEnd?: DragHandlers["onDragEnd"];
  dropShadowColor?: string;
};

/** Spring-animated object (useful for cursors or held pieces). */
export function AnimatedObject({
  pos,
  zIndex = 50,
  onDrag,
  onDragStart,
  onDragEnd,
  dropShadowColor = "transparent",
  animate = true,
  children,
  ...props
}: AnimatedObjectProps & MotionProps) {
  return (
    <motion.div
      style={{
        position: "absolute",
        top: "0",
        left: "0",
        zIndex,
      }}
      initial={pos}
      animate={{
        ...pos,
        filter: `drop-shadow(0 0 0.25rem ${dropShadowColor})`,
      }}
      transition={
        animate
          ? { type: "spring", damping: 30, mass: 0.8, stiffness: 350 }
          : { duration: 0 }
      }
      onDrag={onDrag}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      {...props}
    >
      {children}
    </motion.div>
  );
}

function hashUuid(uuid: string) {
  return uuid.split("").reduce((a, b) => a + b.charCodeAt(0), 0) % 360;
}

export type MultiplayerCursorProps = Position & {
  uuid: string;
  cursorSrc: string;
};

/** Hue-rotated cursor image for multiplayer cursors. */
export function MultiplayerCursor({
  uuid,
  x,
  y,
  cursorSrc,
}: MultiplayerCursorProps) {
  const hueRotate = useMemo(() => hashUuid(uuid), [uuid]);
  return (
    <AnimatedObject pos={{ x, y }} zIndex={50}>
      <img
        alt=""
        src={cursorSrc}
        className="pointer-events-none select-none opacity-50"
        style={{ filter: `hue-rotate(${hueRotate}deg)` }}
      />
    </AnimatedObject>
  );
}

export type JigsawCursorProps = {
  className?: string;

  /**
   * Defaults to a small dot. Provide children to render a custom cursor.
   * The wrapper is `position: fixed` with `pointer-events: none`.
   */
  children?: ReactNode;

  /** If true, only show while pointer is inside the canvas. */
  onlyWhenOverCanvas?: boolean;
};

export function JigsawCursor({
  className,
  children,
  onlyWhenOverCanvas = true,
}: JigsawCursorProps) {
  const jigsaw = useJigsawOptional();
  const pointer = jigsaw?.state.pointer ?? null;

  const shouldShow = onlyWhenOverCanvas ? !!pointer?.canvas : !!pointer?.client;

  if (!shouldShow || !pointer?.client) return null;

  return (
    <div
      className={cn("pointer-events-none fixed left-0 top-0 z-50", className)}
      style={{
        transform: `translate(${pointer.client.x}px, ${pointer.client.y}px)`,
      }}
    >
      {children ?? (
        <div className="h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-main-text/80" />
      )}
    </div>
  );
}

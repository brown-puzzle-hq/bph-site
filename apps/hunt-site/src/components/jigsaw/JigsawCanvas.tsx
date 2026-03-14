"use client";

import { useEffect, useMemo, useRef } from "react";
import { cn } from "~/lib/utils";
import { useJigsawOptional, type JigsawState, type Vec2 } from "./state";

export type JigsawDrawParams = {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  dpr: number;
  size: { width: number; height: number };
  state: JigsawState | null;
  timeMs: number;
};

export type JigsawCanvasProps = {
  className?: string;
  width: number;
  height: number;
  ariaLabel?: string;

  /**
   * Called on every animation frame (if provided). `ctx` is already scaled so
   * that coordinates are in CSS pixels (not device pixels).
   */
  onDraw?: (params: JigsawDrawParams) => void;
};

function getCanvasPoint(canvas: HTMLCanvasElement, client: Vec2): Vec2 {
  const rect = canvas.getBoundingClientRect();
  return {
    x: client.x - rect.left,
    y: client.y - rect.top,
  };
}

export function JigsawCanvas({
  className,
  width,
  height,
  ariaLabel = "Jigsaw puzzle canvas",
  onDraw,
}: JigsawCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const jigsaw = useJigsawOptional();

  const size = useMemo(() => ({ width, height }), [width, height]);

  // Keep the backing store sized to the device pixel ratio.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.max(1, Math.floor(size.width * dpr));
    canvas.height = Math.max(1, Math.floor(size.height * dpr));
    canvas.style.width = `${size.width}px`;
    canvas.style.height = `${size.height}px`;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Reset and scale so drawing is done in CSS pixels.
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }, [size.width, size.height]);

  // Animation loop for drawing.
  useEffect(() => {
    if (!onDraw) return;

    let raf = 0;
    const tick = (timeMs: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const dpr = window.devicePixelRatio || 1;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      onDraw({
        canvas,
        ctx,
        dpr,
        size,
        state: jigsaw?.state ?? null,
        timeMs,
      });

      raf = window.requestAnimationFrame(tick);
    };

    raf = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(raf);
  }, [onDraw, size, jigsaw?.state]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("touch-none select-none", className)}
      role="img"
      aria-label={ariaLabel}
      onPointerDown={(e) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        canvas.setPointerCapture(e.pointerId);

        if (!jigsaw) return;
        const client = { x: e.clientX, y: e.clientY };
        const canvasPt = getCanvasPoint(canvas, client);
        jigsaw.dispatch({
          type: "pointer/down",
          pointerId: e.pointerId,
          buttons: e.buttons,
          client,
          canvas: canvasPt,
        });
      }}
      onPointerMove={(e) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        if (!jigsaw) return;

        const client = { x: e.clientX, y: e.clientY };
        const canvasPt = getCanvasPoint(canvas, client);
        jigsaw.dispatch({
          type: "pointer/move",
          buttons: e.buttons,
          client,
          canvas: canvasPt,
        });
      }}
      onPointerUp={(e) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        if (!jigsaw) return;

        const client = { x: e.clientX, y: e.clientY };
        const canvasPt = getCanvasPoint(canvas, client);
        jigsaw.dispatch({
          type: "pointer/up",
          buttons: e.buttons,
          client,
          canvas: canvasPt,
        });
      }}
      onPointerLeave={() => {
        jigsaw?.dispatch({ type: "pointer/leave" });
      }}
    />
  );
}

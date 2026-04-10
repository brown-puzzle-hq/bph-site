"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import overlayImg from "./overlay.png";

type Props = {
  puzzleId: string;
  scale?: number;
};

type Box = {
  left: number;
  top: number;
  width: number;
  height: number;
};

function getPuzzleContainer(puzzleId: string) {
  return document.querySelector<HTMLElement>(
    `.puzzle-player[data-puzzle-id='${puzzleId}']`,
  );
}

export default function CrosswordOverlay({ puzzleId, scale = 1 }: Props) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [box, setBox] = useState<Box | null>(null);
  const [processedSrc, setProcessedSrc] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.decoding = "async";
    img.src = overlayImg.src;

    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) return;
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // Key out near-white pixels (overlay background) to transparency.
        // Use a "near-neutral white" test so we keep faint pink/red border.
        const whiteMin = 245;
        const whiteDelta = 6;
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i] ?? 0;
          const g = data[i + 1] ?? 0;
          const b = data[i + 2] ?? 0;
          const min = Math.min(r, g, b);
          const max = Math.max(r, g, b);
          if (min >= whiteMin && max - min <= whiteDelta) {
            data[i + 3] = 0;
          }
        }
        ctx.putImageData(imageData, 0, 0);

        const url = canvas.toDataURL("image/png");
        if (!cancelled) setProcessedSrc(url);
      } catch {
        // If anything goes wrong, fall back to the original image.
        if (!cancelled) setProcessedSrc(null);
      }
    };

    img.onerror = () => {
      if (!cancelled) setProcessedSrc(null);
    };

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const wrapper = root?.parentElement;
    if (!root || !wrapper) return;

    const container = getPuzzleContainer(puzzleId);
    if (!container) return;

    let ro: ResizeObserver | null = null;
    let mo: MutationObserver | null = null;
    let cancelled = false;

    const getTable = () =>
      container.querySelector<HTMLElement>("table.puzzle-grid-content");

    const attach = (table: HTMLElement) => {
      if (cancelled) return;

      const measure = () => {
        const wrapRect = wrapper.getBoundingClientRect();
        const tableRect = table.getBoundingClientRect();
        const next: Box = {
          left: tableRect.left - wrapRect.left,
          top: tableRect.top - wrapRect.top,
          width: tableRect.width,
          height: tableRect.height,
        };
        if (next.width > 0 && next.height > 0) setBox(next);
      };

      // Delay one frame to ensure layout is final.
      requestAnimationFrame(measure);

      if (typeof ResizeObserver !== "undefined") {
        ro = new ResizeObserver(() => measure());
        ro.observe(table);
      }

      window.addEventListener("resize", measure);

      return () => {
        window.removeEventListener("resize", measure);
      };
    };

    let detachWindow: (() => void) | undefined;

    const maybeAttach = () => {
      const table = getTable();
      if (!table) return false;
      detachWindow = attach(table);
      return true;
    };

    if (!maybeAttach()) {
      // PuzzleJS builds the grid asynchronously; watch for the table to appear.
      if (typeof MutationObserver !== "undefined") {
        mo = new MutationObserver(() => {
          if (maybeAttach()) mo?.disconnect();
        });
        mo.observe(container, { childList: true, subtree: true });
      } else {
        // Last-resort polling.
        const id = window.setInterval(() => {
          if (maybeAttach()) window.clearInterval(id);
        }, 50);
        return () => {
          window.clearInterval(id);
        };
      }
    }

    return () => {
      cancelled = true;
      detachWindow?.();
      ro?.disconnect();
      mo?.disconnect();
    };
  }, [puzzleId]);

  const scaleClamped = Number.isFinite(scale)
    ? Math.min(2, Math.max(0.5, scale))
    : 1;

  return (
    <div ref={rootRef} className="pointer-events-none absolute inset-0 z-20">
      {box
        ? (() => {
            const width = box.width * scaleClamped;
            const height = box.height * scaleClamped;
            const left = box.left + (box.width - width) / 2;
            const top = box.top + (box.height - height) / 2;

            return (
              <div
                className="absolute"
                style={{
                  left,
                  top,
                  width,
                  height,
                }}
              >
                <Image
                  src={processedSrc ?? overlayImg}
                  alt=""
                  fill
                  sizes={`${Math.ceil(width)}px`}
                  className="select-none object-fill"
                  priority
                  draggable={false}
                  unoptimized={typeof processedSrc === "string"}
                />
              </div>
            );
          })()
        : null}
    </div>
  );
}

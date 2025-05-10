"use client";
import { useState, useEffect } from "react";
import { getCookie, setCookie } from "typescript-cookie";

export default function Partial({
  partialSolution,
}: {
  partialSolution: string;
}) {
  const [hasHovered, setHasHovered] = useState(true);
  useEffect(() => {
    setHasHovered(getCookie("hasHovered") === "true");
  }, []);
  return (
    <div
      className="group relative"
      onMouseOver={() => {
        setHasHovered(true);
        setCookie("hasHovered", "true");
      }}
    >
      <p
        className={`${!hasHovered && "animate-subtlePulse"} font-medium text-partial-guess hover:cursor-help`}
      >
        PARTIAL
      </p>
      <span className="pointer-events-none absolute -bottom-7 left-1/2 z-10 w-max -translate-x-1/2 rounded bg-tooltip-bg px-2 py-1 text-xs font-medium text-main-text opacity-0 group-hover:opacity-100">
        <div className="absolute -top-1 left-1/2 h-0 w-0 -translate-x-1/2 border-b-4 border-l-4 border-r-4 border-transparent border-b-tooltip-bg" />
        {partialSolution}
      </span>
    </div>
  );
}

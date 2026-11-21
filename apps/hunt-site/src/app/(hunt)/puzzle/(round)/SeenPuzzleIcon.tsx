"use client";

import { useEffect, useState } from "react";
import { getCookie, setCookie } from "typescript-cookie";
import { X } from "lucide-react";
import { cn, decodeSeen, encodeSeen } from "~/lib/utils";

export default function SeenPuzzleIcon({ index }: { index: number }) {
  const [isSeen, setIsSeen] = useState(false);
  const [isDisappearing, setIsDisappearing] = useState(false);

  useEffect(() => {
    const checkSeen = () => {
      const seen = decodeSeen(getCookie("seen"));
      setIsSeen(seen[index] === "1");
    };

    checkSeen();

    const handleFocus = () => {
      checkSeen();
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [index]);

  if (isSeen) return null;

  return (
    <button
      className={cn(
        "pointer-events-auto absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 transition-all duration-200 ease-out",
        isDisappearing && "scale-125 opacity-0 blur-sm",
      )}
      onClick={() => {
        const seen = decodeSeen(getCookie("seen"));
        const updatedSeen = seen.slice(0, index) + "1" + seen.slice(index + 1);
        setCookie("seen", encodeSeen(updatedSeen), {
          expires: 365,
          path: "/",
        });
        setIsDisappearing(true);
        setTimeout(() => setIsSeen(true), 200);
      }}
    >
      <div className="group relative">
        <img className="size-7" src="/circle-alert.svg" />
        <X className="pointer-events-none absolute -right-0.5 -top-0.5 size-3 rounded-full bg-red-800 text-main-text opacity-0 transition-opacity group-hover:opacity-100" />
      </div>
    </button>
  );
}

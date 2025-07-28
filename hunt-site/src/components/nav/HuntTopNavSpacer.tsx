"use client";
import { usePathname } from "next/navigation";

export function HuntTopNavSpacer() {
  return <div className={usePathname() === "/" ? "" : "min-h-[56px]"}></div>;
}

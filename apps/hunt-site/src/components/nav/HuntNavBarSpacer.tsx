"use client";

import { usePathname } from "next/navigation";

export function HuntNavBarSpacer() {
  return <div className={usePathname() === "/" ? "" : "min-h-[56px]"}></div>;
}

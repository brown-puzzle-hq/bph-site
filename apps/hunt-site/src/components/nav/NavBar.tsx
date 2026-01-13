"use client";

import * as React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { cn } from "~/lib/utils";

export type MenuItem = {
  title: string;
  href?: string;
  element?: JSX.Element;
  type: "link" | "element";
};

const colorMap: Record<string, string> = {
  hunt: "bg-nav-bg text-main-text",
  admin: "bg-white",
};

type Props = {
  leftMenuItems: MenuItem[];
  middleMenuItems?: MenuItem[];
  rightMenuItems: MenuItem[];
  hamburgerMenuItems: MenuItem[];
  side: "hunt" | "admin";
};

export function NavBar({
  leftMenuItems,
  middleMenuItems = [],
  rightMenuItems,
  hamburgerMenuItems,
  side,
}: Props) {
  const pathName = usePathname();
  const [optimisticPath, setOptimisticPath] = React.useState<string>(pathName);
  const handleClick = (href: string) => {
    setOptimisticPath(href);
  };
  const elementClassName =
    "cursor-pointer rounded-md bg-opacity-0 hover:bg-opacity-20 hover:bg-slate-400 bg-slate-400 transition-all";
  const linkClassName = (href: string | undefined) =>
    cn(
      elementClassName,
      "px-1.5 py-[7px]",
      optimisticPath === href
        ? side === "hunt"
          ? "bg-opacity-30 bg-black"
          : "bg-opacity-15"
        : "",
    );

  const buildMenu = (items: MenuItem[]) => {
    return (
      <ul className="flex list-none items-center space-x-2">
        {items.map((item) => (
          <li key={item.title}>
            {item.type === "element" ? (
              <div className={elementClassName}>{item.element!}</div>
            ) : (
              <Link
                href={item.href!}
                prefetch={false}
                className={linkClassName(item.href)}
                onClick={() => handleClick(item.href!)}
              >
                {item.title}
              </Link>
            )}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <nav
      className={`fixed z-50 flex w-full items-center justify-between ${colorMap[side]} h-14 bg-opacity-30 p-3 backdrop-blur-md backdrop-filter`}
    >
      {/* Left menu items */}
      <div className="hidden md:block">{buildMenu(leftMenuItems)}</div>

      {/* Middle menu items */}
      <div className="absolute left-1/2 hidden -translate-x-1/2 md:block">
        {buildMenu(middleMenuItems)}
      </div>

      {/* Right menu items */}
      <div className="hidden md:block">{buildMenu(rightMenuItems)}</div>

      {/* Hamburger */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="flex items-center justify-center hover:bg-white/15 hover:text-current md:hidden"
          >
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="top"
          className={`w-full ${colorMap[side]} border-0`}
        >
          <ul className="flex list-none flex-col items-center space-y-2">
            {hamburgerMenuItems.map((item) => (
              <SheetTrigger asChild key={item.title}>
                {item.type === "element" ? (
                  item.element!
                ) : (
                  <Link href={item.href!} prefetch={false}>
                    {item.title}
                  </Link>
                )}
              </SheetTrigger>
            ))}
          </ul>
        </SheetContent>
      </Sheet>
    </nav>
  );
}

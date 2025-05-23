"use client";
import * as React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
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
  hunt: "bg-nav-bg",
  admin: "bg-white",
};

type Props = {
  leftMenuItems: MenuItem[];
  rightMenuItems: MenuItem[];
  hamburgerMenuItems: MenuItem[];
  side: "hunt" | "admin";
  middleElement?: JSX.Element;
};

export function HamburgerMenu({
  leftMenuItems,
  rightMenuItems,
  middleElement,
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
          : "bg-opacity-20"
        : "",
    );
  return (
    <nav
      className={`fixed z-50 flex w-full items-center justify-between ${colorMap[side]} bg-opacity-30 p-[10px] backdrop-blur-md backdrop-filter md:p-3`}
    >
      {/* Left menu items */}
      <div className="hidden md:block">
        <NavigationMenu>
          <NavigationMenuList className="flex h-[32px] space-x-2">
            {leftMenuItems.map((item) => (
              <NavigationMenuItem key={item.title}>
                {item.type == "element" ? (
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
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Middle element */}
      <div className="absolute left-1/2 hidden -translate-x-1/2 md:block">
        {middleElement}
      </div>

      {/* Right menu items */}
      <div className="hidden md:block">
        <NavigationMenu>
          <NavigationMenuList className="flex h-[32px] space-x-2">
            {rightMenuItems.map((item) => (
              <NavigationMenuItem key={item.title}>
                {item.type == "element" ? (
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
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Hamburger */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="flex items-center justify-center hover:bg-transparent hover:text-current md:hidden"
          >
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="top"
          className={`w-full ${colorMap[side]} border-0 ${side == "hunt" ? "bg-opacity-30 backdrop-blur-md backdrop-filter" : ""}`}
        >
          <nav className="flex flex-col items-center space-y-2">
            {hamburgerMenuItems.map((item) => (
              <React.Fragment key={item.title}>
                <SheetTrigger asChild>
                  {item.type == "element" ? (
                    item.element!
                  ) : (
                    <Link href={item.href!} prefetch={false}>
                      {item.title}
                    </Link>
                  )}
                </SheetTrigger>
              </React.Fragment>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </nav>
  );
}

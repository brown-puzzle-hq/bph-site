"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { cn } from "~/lib/utils";

export type MenuItem =
  | {
      title: string;
      href: string;
      type: "link";
    }
  | {
      title: string;
      element: React.JSX.Element;
      type: "element";
    };

export type NavBarStyle = {
  item: string;
  bar: string;
  sheet: string;
};

type Props = {
  leftMenuItems: MenuItem[];
  middleMenuItems?: MenuItem[];
  rightMenuItems: MenuItem[];
  hamburgerMenuItems: MenuItem[];
  style: NavBarStyle;
};

export function NavBar({
  leftMenuItems,
  middleMenuItems = [],
  rightMenuItems,
  hamburgerMenuItems,
  style,
}: Props) {
  const pathName = usePathname();

  const buildMenu = (items: MenuItem[]) => {
    return (
      <ul className="flex list-none items-center space-x-2">
        {items.map((item) => (
          <li key={item.title}>
            {item.type === "element" ? (
              item.element
            ) : (
              <Link
                href={item.href}
                prefetch={false}
                data-active={pathName === item.href}
                className={cn(
                  "cursor-pointer rounded-md px-[6px] py-[6.5px]",
                  style.item,
                )}
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
      className={cn(
        "fixed z-50 flex h-14 w-full items-center justify-between p-3",
        style.bar,
      )}
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
          <button className="flex size-8 items-center justify-center md:hidden">
            <Menu />
          </button>
        </SheetTrigger>
        <SheetContent
          side="top"
          className={cn("border-0 shadow-none", style.sheet)}
        >
          <ul className="flex list-none flex-col items-center space-y-2">
            {hamburgerMenuItems.map((item) => (
              <SheetTrigger asChild key={item.title}>
                {item.type === "element" ? (
                  item.element
                ) : (
                  <Link href={item.href} prefetch={false}>
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

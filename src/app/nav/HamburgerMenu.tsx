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
  hambergerMenuItems: MenuItem[];
  side: "hunt" | "admin";
};

export function HamburgerMenu({
  leftMenuItems,
  rightMenuItems,
  hambergerMenuItems,
  side,
}: Props) {
  return (
    <nav
      className={`fixed z-50 flex w-full items-center justify-between ${colorMap[side]} bg-opacity-30 p-[10px] backdrop-blur-md backdrop-filter md:p-4`}
    >
      {/* Left menu items */}
      <div className="hidden md:block">
        <NavigationMenu>
          <NavigationMenuList className="flex space-x-4">
            {leftMenuItems.map((item) => (
              <NavigationMenuItem key={item.title}>
                {item.type == "element" ? (
                  item.element!
                ) : (
                  <Link
                    href={item.href!}
                    className="hover:underline"
                    prefetch={false}
                  >
                    {item.title}
                  </Link>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      {/* Right menu items */}
      <div className="hidden md:block">
        <NavigationMenu>
          <NavigationMenuList className="flex space-x-4">
            {rightMenuItems.map((item) => (
              <NavigationMenuItem key={item.title}>
                {item.type == "element" ? (
                  item.element!
                ) : (
                  <Link
                    href={item.href!}
                    className="hover:underline"
                    prefetch={false}
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
            {hambergerMenuItems.map((item) => (
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

import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import { HamburgerMenu, MenuItem } from "@/components/nav/HamburgerMenu";

export default async function DocsHamburgerMenu() {
  const leftMenuItems: MenuItem[] = [
    {
      title: "Docs",
      href: "/docs",
      type: "link",
    },
    {
      title: "Postprod",
      href: "/docs/postprod",
      type: "link",
    },
    {
      title: "Develop",
      href: "/docs/develop",
      type: "link",
    },
    {
      title: "Administer",
      href: "/docs/administer",
      type: "link",
    },
  ];

  const rightMenuItems: MenuItem[] = [
    {
      title: "Hunt",
      href: "/",
      type: "link",
    },
  ];

  const hamburgerMenuItems: MenuItem[] = [
    {
      title: "Docs",
      href: "/docs",
      type: "link",
    },
    {
      title: "Postprod",
      href: "/docs/postprod",
      type: "link",
    },
    {
      title: "Develop",
      href: "/docs/develop",
      type: "link",
    },
    {
      title: "Administer",
      href: "/docs/administer",
      type: "link",
    },
    {
      title: "Hunt",
      href: "/",
      type: "link",
    },
  ];

  return (
    <HamburgerMenu
      leftMenuItems={leftMenuItems}
      rightMenuItems={rightMenuItems}
      hamburgerMenuItems={hamburgerMenuItems}
      side="admin"
    />
  );
}

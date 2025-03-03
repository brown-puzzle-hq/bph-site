import { auth } from "~/server/auth/auth";
import Link from "next/link";
import { LogoutButton } from "~/app/nav/LogoutButton";
import { HamburgerMenu, MenuItem } from "~/app/nav/HamburgerMenu";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";

export default async function AdminHamburgerMenu() {
  const OtherMenuItems = () => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className="align-middle">
          <Ellipsis className="mb-0.5 h-[20px]" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <Link href="/admin/errata">
            <DropdownMenuItem>Errata</DropdownMenuItem>
          </Link>
          <Link href="/admin/feedback">
            <DropdownMenuItem>Feedback</DropdownMenuItem>
          </Link>
          <Link href="/admin/sql">
            <DropdownMenuItem>Queries</DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  const leftMenuItems: MenuItem[] = [
    {
      title: "Dashboard",
      href: "/admin",
      type: "link",
    },
    {
      title: "Puzzles",
      href: "/admin/solutions",
      type: "link",
    },
    {
      title: "Teams",
      href: "/admin/teams",
      type: "link",
    },
    {
      title: "Hints",
      href: "/admin/hints",
      type: "link",
    },
    {
      title: "Other",
      element: <OtherMenuItems />,
      type: "element",
    },
  ];

  const rightMenuItems: MenuItem[] = [
    {
      title: "Hunt",
      href: "/",
      type: "link",
    },
    {
      title: "Logout",
      element: <LogoutButton />,
      type: "element",
    },
  ];

  const hambergerMenuItems: MenuItem[] = [
    {
      title: "Dashboard",
      href: "/admin",
      type: "link",
    },
    {
      title: "Puzzles",
      href: "/admin/solutions",
      type: "link",
    },
    {
      title: "Teams",
      href: "/admin/teams",
      type: "link",
    },
    {
      title: "Hints",
      href: "/admin/hints",
      type: "link",
    },
    {
      title: "Errata",
      href: "/admin/errata",
      type: "link",
    },
    {
      title: "Feedback",
      href: "/admin/feedback",
      type: "link",
    },
    {
      title: "Queries",
      href: "/admin/sql",
      type: "link",
    },
    {
      title: "Hunt",
      href: "/",
      type: "link",
    },
    {
      title: "Logout",
      element: <LogoutButton />,
      type: "element",
    },
  ];

  return (
    <HamburgerMenu
      leftMenuItems={leftMenuItems}
      rightMenuItems={rightMenuItems}
      hambergerMenuItems={hambergerMenuItems}
      side="admin"
    />
  );
}

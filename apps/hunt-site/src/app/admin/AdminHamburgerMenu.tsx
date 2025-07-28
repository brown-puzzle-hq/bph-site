import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import { LogoutButton } from "@/components/nav/LogoutButton";
import { HamburgerMenu, MenuItem } from "@/components/nav/HamburgerMenu";

export default async function AdminHamburgerMenu() {
  const OtherMenuItems = () => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className="px-1.5 py-1 align-middle">
          <Ellipsis className="mb-0.5 h-[20px]" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <Link href="/admin/errata" prefetch={false}>
            <DropdownMenuItem className="hover:cursor-pointer">
              Errata
            </DropdownMenuItem>
          </Link>
          <Link href="/admin/feedback" prefetch={false}>
            <DropdownMenuItem className="hover:cursor-pointer">
              Feedback
            </DropdownMenuItem>
          </Link>
          <Link href="/admin/graph" prefetch={false}>
            <DropdownMenuItem className="hover:cursor-pointer">
              Graph
            </DropdownMenuItem>
          </Link>
          <Link href="/admin/sql" prefetch={false}>
            <DropdownMenuItem className="hover:cursor-pointer">
              Queries
            </DropdownMenuItem>
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
      href: "/admin/puzzle",
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

  const hamburgerMenuItems: MenuItem[] = [
    {
      title: "Dashboard",
      href: "/admin",
      type: "link",
    },
    {
      title: "Puzzles",
      href: "/admin/puzzle",
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
      title: "Graph",
      href: "/admin/graph",
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
      hamburgerMenuItems={hamburgerMenuItems}
      side="admin"
    />
  );
}

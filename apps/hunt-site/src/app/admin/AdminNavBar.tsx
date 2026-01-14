import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import { LogoutButton } from "@/components/nav/LogoutButton";
import { NavBar, MenuItem, NavBarStyle } from "@/components/nav/NavBar";
import { cn } from "~/lib/utils";

export default async function AdminNavBar() {
  const style: NavBarStyle = {
    item: "data-[active=true]:bg-slate-400/15 hover:!bg-slate-400/20 transition-all",
    bar: "bg-white/30 backdrop-blur-md backdrop-filter",
    sheet: "bg-white",
  };
  const logoutSizing = "cursor-pointer rounded-md px-[6px] py-[4px]";

  const otherLinks = {
    Errata: "/admin/errata",
    Feedback: "/admin/feedback",
    Graph: "/admin/graph",
    Queries: "/admin/sql",
    Websockets: "/admin/websockets",
  };

  const OtherMenuItems = () => (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-md p-1.5 align-middle hover:bg-slate-400/20">
        <Ellipsis className="h-[20px]" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {Object.entries(otherLinks).map(([title, href]) => (
          <Link key={title} href={href} prefetch={false}>
            <DropdownMenuItem className="hover:cursor-pointer">
              {title}
            </DropdownMenuItem>
          </Link>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );

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
      href: "/admin/team",
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
      element: <LogoutButton className={cn(logoutSizing, style.item)} />,
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
      href: "/admin/team",
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
      title: "Websockets",
      href: "/admin/websockets",
      type: "link",
    },
    {
      title: "Hunt",
      href: "/",
      type: "link",
    },
    {
      title: "Logout",
      element: <LogoutButton className="hover:cursor-pointer" />,
      type: "element",
    },
  ];

  return (
    <NavBar
      leftMenuItems={leftMenuItems}
      rightMenuItems={rightMenuItems}
      hamburgerMenuItems={hamburgerMenuItems}
      style={style}
    />
  );
}

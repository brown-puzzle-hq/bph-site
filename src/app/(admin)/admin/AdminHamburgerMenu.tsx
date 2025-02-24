import { auth } from "~/server/auth/auth";
import { LogoutButton } from "~/app/nav/LogoutButton";
import { HamburgerMenu, MenuItem } from "~/app/nav/HamburgerMenu";

export default async function AdminHamburgerMenu() {
  const session = await auth();
  const leftMenuItems: MenuItem[] = [
    {
      title: "Home",
      href: "/admin",
      type: "link",
    },
    {
      title: "Solutions",
      href: "/admin/solutions",
      type: "link",
    },
    {
      title: "Teams",
      href: "/admin/teams",
      type: "link",
    },
    {
      title: "Hinting",
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
      title: "SQL",
      href: "/admin/sql",
      type: "link",
    },
  ];

  const rightMenuItems: MenuItem[] = [
    {
      title: session!.user!.displayName,
      href: `/teams/${session!.user!.id}`,
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
      side="admin"
    />
  );
}

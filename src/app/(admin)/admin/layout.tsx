import "~/styles/globals.css";
import { Toaster } from "@/components/ui/toaster";
import { auth } from "~/server/auth/auth";
import { LogoutButton } from "~/app/nav/LogoutButton";
import { HamburgerMenu, MenuItem } from "~/app/nav/HamburgerMenu";

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
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
  ];

  const rightMenuItems: MenuItem[] = [
    {
      title: session!.user!.displayName,
      href: `/${session!.user!.username}`,
      type: "link",
    },
    {
      title: "Hunt",
      href: "/",
      type: "link",
    },
    {
      title: "logout",
      element: <LogoutButton />,
      type: "element",
    },
  ];

  return (
    <>
      <HamburgerMenu
        leftMenuItems={leftMenuItems}
        rightMenuItems={rightMenuItems}
      />
      {/* Navbar spacer */}
      <div className="min-h-56px"></div>
      <main className="flex pt-4 min-h-[calc(100vh-56px)]">{children}</main>
      <Toaster />
    </>
  );
}

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
      title: "Admin",
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
      title: "Hunt",
      href: "/",
      type: "link",
    },
    {
      title: session!.user!.displayName,
      href: `/teams/${session!.user!.username}`,
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
      <main className="flex min-h-[calc(100vh-56px)] pt-4">{children}</main>
      <Toaster />
    </>
  );
}

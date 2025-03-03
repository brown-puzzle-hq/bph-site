import { auth } from "~/server/auth/auth";
import { LogoutButton } from "../nav/LogoutButton";
import { HamburgerMenu, MenuItem } from "../nav/HamburgerMenu";

export async function HuntHamburgerMenu() {
  const session = await auth();

  const leftMenuItems: MenuItem[] = [
    {
      title: "Home",
      href: "/",
      type: "link",
    },
    {
      title: "Info",
      href: "/info",
      type: "link",
    },
    {
      title: "Puzzles",
      href: "/puzzle",
      type: "link",
    },
    {
      title: "Teams",
      href: "/teams",
      type: "link",
    },
  ];

  const rightMenuItems: MenuItem[] = [];

  if (session?.user?.id) {
    leftMenuItems.push({
      title: "Feedback",
      href: "/feedback",
      type: "link",
    });

    rightMenuItems.push({
      title: "Profile",
      href: `/teams/${session.user.id}`,
      type: "link",
    });

    if (session?.user?.role == "admin") {
      rightMenuItems.push({
        title: "Admin",
        href: "/admin",
        type: "link",
      });
    }

    rightMenuItems.push({
      title: "Logout",
      element: <LogoutButton />,
      type: "element",
    });
  } else {
    rightMenuItems.push({
      title: "Login",
      href: "/login",
      type: "link",
    });
  }

  const hambergerMenuItems = [...leftMenuItems, ...rightMenuItems];

  return (
    <HamburgerMenu
      leftMenuItems={leftMenuItems}
      rightMenuItems={rightMenuItems}
      hambergerMenuItems={hambergerMenuItems}
      side="hunt"
    />
  );
}

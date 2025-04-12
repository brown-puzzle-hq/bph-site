import { auth } from "~/server/auth/auth";
import { LogoutButton } from "../nav/LogoutButton";
import { HamburgerMenu, MenuItem } from "../nav/HamburgerMenu";
import Countdown from "./Countdown";
import { IN_PERSON, REMOTE } from "~/hunt.config";

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

  const hamburgerMenuItems = [...leftMenuItems, ...rightMenuItems];

  const middleElement = session?.user?.id ? (
    <div>
      <Countdown
        targetDate={
          session.user.interactionMode === "in-person"
            ? IN_PERSON.START_TIME
            : REMOTE.START_TIME
        }
      />
      <p className="hidden text-center font-mono text-sm lg:block">
        PUSHED BACK TO 1:30 PM
      </p>
    </div>
  ) : undefined;

  return (
    <HamburgerMenu
      leftMenuItems={leftMenuItems}
      rightMenuItems={rightMenuItems}
      hamburgerMenuItems={hamburgerMenuItems}
      middleElement={middleElement}
      side="hunt"
    />
  );
}

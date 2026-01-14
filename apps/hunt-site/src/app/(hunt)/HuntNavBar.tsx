"use client";

import { LogoutButton } from "@/components/nav/LogoutButton";
import { NavBar, MenuItem, NavBarStyle } from "@/components/nav/NavBar";
import Countdown from "@/components/nav/Countdown";
import { IN_PERSON, REMOTE } from "~/config/client";
import { cn } from "~/lib/utils";
import { useSession } from "next-auth/react";

export function HuntNavBar() {
  const { data: session } = useSession();
  const now = new Date();

  const style: NavBarStyle = {
    item: "data-[active=true]:bg-black/30 hover:!bg-slate-400/15 transition-all",
    bar: "bg-nav-bg/30 backdrop-blur-md backdrop-filter",
    sheet: "bg-nav-bg",
  };
  const logoutSizing = "cursor-pointer rounded-md px-[6px] py-[4px]";

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
      href: "/team",
      type: "link",
    },
  ];

  const middleMenuItems: MenuItem[] = [];

  if (session?.user) {
    const targetDate =
      session.user.interactionMode === "in-person"
        ? IN_PERSON.START_TIME
        : REMOTE.START_TIME;

    middleMenuItems.push({
      title: "countdown",
      element: <Countdown targetDate={targetDate} />,
      type: "element",
    });
  }

  const rightMenuItems: MenuItem[] = [];

  if (now > REMOTE.WRAPUP_TIME) {
    leftMenuItems.push({
      title: "Wrapup",
      href: "/wrapup",
      type: "link",
    });
  }

  if (session?.user?.id) {
    if (now < REMOTE.WRAPUP_TIME) {
      leftMenuItems.push({
        title: "Feedback",
        href: "/feedback",
        type: "link",
      });
    }

    rightMenuItems.push({
      title: "Profile",
      href: `/team/${session.user.id}`,
      type: "link",
    });

    if (session?.user?.role === "admin") {
      rightMenuItems.push({
        title: "Admin",
        href: "/admin",
        type: "link",
      });
    }

    rightMenuItems.push({
      title: "Logout",
      element: <LogoutButton className={cn(logoutSizing, style.item)} />,
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

  if (session?.user?.id) {
    hamburgerMenuItems.splice(-1, 1, {
      title: "Logout",
      element: <LogoutButton className="hover:cursor-pointer" />,
      type: "element",
    });
  }

  return (
    <NavBar
      leftMenuItems={leftMenuItems}
      middleMenuItems={middleMenuItems}
      rightMenuItems={rightMenuItems}
      hamburgerMenuItems={hamburgerMenuItems}
      style={style}
    />
  );
}

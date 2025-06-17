import { HamburgerMenu, MenuItem } from "@/components/nav/HamburgerMenu";

export default async function DocsHamburgerMenu() {
  const leftMenuItems: MenuItem[] = [
    {
      title: "Contents",
      href: "/docs",
      type: "link",
    },
    {
      title: "Manage",
      href: "/docs/manage",
      type: "link",
    },
    {
      title: "Develop",
      href: "/docs/develop",
      type: "link",
    },
    {
      title: "Postprod",
      href: "/docs/postprod",
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
      title: "Manage",
      href: "/docs/manage",
      type: "link",
    },
    {
      title: "Develop",
      href: "/docs/develop",
      type: "link",
    },
    {
      title: "Postprod",
      href: "/docs/postprod",
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

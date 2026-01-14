import { NavBar, MenuItem, NavBarStyle } from "@/components/nav/NavBar";

export default async function DocsNavBar() {
  const style: NavBarStyle = {
    item: "data-[active=true]:bg-slate-400/15 hover:!bg-slate-400/20 transition-all",
    bar: "bg-white/30 backdrop-blur-md backdrop-filter",
    sheet: "bg-white",
  };

  const leftMenuItems: MenuItem[] = [
    {
      title: "Home",
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

  const hamburgerMenuItems: MenuItem[] = [...leftMenuItems, ...rightMenuItems];

  return (
    <NavBar
      leftMenuItems={leftMenuItems}
      rightMenuItems={rightMenuItems}
      hamburgerMenuItems={hamburgerMenuItems}
      style={style}
    />
  );
}

import "~/styles/globals.css";
import { HuntHamburgerMenu } from "./HuntHamburgerMenu";
import { HuntTopNavSpacer } from "@/components/nav/HuntTopNavSpacer";

export default async function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="bg-main-bg bg-gradient-to-t from-[#872C3E] to-main-bg text-main-text">
      {/* Navbar */}
      <div className="bg-nav-bg">
        <HuntHamburgerMenu />
      </div>

      {/* Navbar spacer */}
      <HuntTopNavSpacer />
      <main className="min-h-[calc(100vh-56px-32px)]">{children}</main>
      <footer className="min-h-1rem bg-footer-bg py-2 text-center text-xs">
        Powered by{" "}
        <a
          href="https://github.com/brown-puzzle-hq/bph-site"
          className="hover:underline"
        >
          bph-site
        </a>
      </footer>
    </div>
  );
}

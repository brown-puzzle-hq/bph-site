import "~/styles/globals.css";
import { auth } from "@/auth";
import { GeistSans } from "geist/font/sans";
import { Providers } from "~/app/providers";
import { type Metadata } from "next";
import { Toaster } from "sonner";
import { CommandPalette } from "~/components/nav/CommandPalette";
import { HUNT_NAME } from "~/hunt.config";
import { HuntNavBar } from "./HuntNavBar"
import { HuntNavBarSpacer } from "@/components/nav/HuntNavBarSpacer";

export const metadata: Metadata = {
  title: HUNT_NAME,
  description: "",
  icons: [{ rel: "icon", url: "/favicon.png" }],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();
  return (
    <html lang="en" className={GeistSans.variable}>
      <body className="bg-main-bg text-main-text">
        <Providers session={session}>
          {session?.user?.role === "admin" && <CommandPalette />}
          <Toaster expand={true} visibleToasts={10} />
          <div className="bg-main-bg bg-gradient-to-t from-[#872C3E] to-main-bg">
            {/* Navbar */}
            <div className="bg-nav-bg">
              <HuntNavBar />
            </div>

            {/* Navbar spacer */}
            <HuntNavBarSpacer />
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
        </Providers>
      </body>
    </html>
  );
}

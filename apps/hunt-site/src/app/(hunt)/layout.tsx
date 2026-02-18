import "~/styles/globals.css";
import Link from "next/link";
import { auth } from "@/auth";
import { GeistSans } from "geist/font/sans";
import { Providers } from "~/app/providers";
import { type Metadata } from "next";
import { Toaster } from "sonner";
import { CommandPalette } from "~/components/nav/CommandPalette";
import { HUNT_NAME } from "@/config/client";
import { HuntNavBar } from "./HuntNavBar";
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
          {session?.user.role === "admin" && <CommandPalette />}
          <Toaster expand={true} visibleToasts={10} />
          <div className="bg-main-bg bg-gradient-to-t from-main-bottom to-main-bg">
            {/* Navbar */}
            <HuntNavBar />

            {/* Navbar spacer */}
            <HuntNavBarSpacer />
            <main className="min-h-[calc(100vh-56px-32px)]">{children}</main>
            <footer className="bg-footer-bg py-2 text-center text-xs">
              <p className="hidden lg:block">
                Having a good time? Want support more puzzlehunts like this in
                the future? Consider{" "}
                <Link
                  href="https://bbis.advancement.brown.edu/BBPhenix/give-now?did=05732af4-d994-4d40-bcd6-fb42d07b6eab"
                  className="text-link hover:underline"
                >
                  donating
                </Link>{" "}
                to your friendly neighborhood{" "}
                <Link
                  href="https://brownpuzzle.club/"
                  className="text-link hover:underline"
                >
                  puzzle club
                </Link>{" "}
                or checking out our{" "}
                <Link
                  href="https://brownpuzzle.club/archive/"
                  className="text-link hover:underline"
                >
                  archive
                </Link>
                !
              </p>
              <p className="lg:hidden">
                Having fun? Consider{" "}
                <Link
                  href="https://bbis.advancement.brown.edu/BBPhenix/give-now?did=05732af4-d994-4d40-bcd6-fb42d07b6eab"
                  className="text-link hover:underline"
                >
                  donating
                </Link>{" "}
                or viewing our{" "}
                <Link
                  href="https://brownpuzzle.club/archive/"
                  className="text-link hover:underline"
                >
                  archive
                </Link>
                !
              </p>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}

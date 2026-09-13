import "~/styles/globals.css";
import Link from "next/link";
import { auth } from "@/auth";
import { GeistSans } from "geist/font/sans";
import { Providers } from "~/app/providers";
import { type Metadata } from "next";
import { Toaster } from "sonner";
import { CommandPalette } from "~/components/nav/CommandPalette";
import RetButton from "~/components/nav/RetButton";
import { HUNT_NAME } from "@/config/client";
import { HuntNavBar } from "./HuntNavBar";

export const metadata: Metadata = {
  title: HUNT_NAME,
  description:
    "Brown Puzzlehunt is an introductory puzzlehunt run by Brown and RISD students.",
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
          <RetButton />
          {session?.user.role === "admin" && <CommandPalette />}
          <Toaster
            expand={true}
            visibleToasts={10}
            toastOptions={{
              classNames: {
                toast: "!bg-[#1C0770] !border-blue-300 !border-2",
                title: "!text-main-text !text-sm !font-semibold",
                description: "!text-main-text",
                icon: "!text-main-text",
              },
            }}
          />
          <div className="bg-main-bg bg-gradient-to-t from-main-bottom to-main-bg">
            <HuntNavBar />
            {/* No extra component since we don't need Landing art to reach top */}
            <div className="min-h-[56px]" />
            <main className="min-h-[calc(100vh-56px-32px)]">{children}</main>
            <footer className="bg-footer-bg py-2 text-center text-xs">
              <p className="hidden lg:block">
                Having a good time? Want to support more puzzlehunts like this
                in the future? Consider{" "}
                <Link
                  href="https://bbis.advancement.brown.edu/BBPhenix/give-now?did=05732af4-d994-4d40-bcd6-fb42d07b6eab"
                  className="text-link hover:underline"
                >
                  donating
                </Link>{" "}
                to your friendly neighborhood{" "}
                <Link
                  href="https://brownpuzzleclub.com/"
                  className="text-link hover:underline"
                >
                  puzzle club
                </Link>{" "}
                or checking out our{" "}
                <Link
                  href="https://brownpuzzleclub.com/archive/"
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
                  href="https://brownpuzzleclub.com/archive/"
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

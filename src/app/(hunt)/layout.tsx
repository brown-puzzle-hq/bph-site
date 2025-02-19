import "~/styles/globals.css";
import Link from "next/link";
import { Toaster } from "@/components/ui/toaster";
import { HuntHamburgerMenu } from "./HuntHamburgerMenu";

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <body className="bg-main-bg text-main-text">
      {/* Navbar */}
      <div className="bg-nav-bg">
        <HuntHamburgerMenu />
      </div>

      {/* Navbar spacer */}
      <div className="min-h-[56px]" />

      <main className="min-h-[calc(100vh-56px-32px)]">{children}</main>
      <Toaster />

      <footer className="bg-footer-bg py-2 text-center text-xs">
        <p>
          Having a good time? Want support more puzzlehunts like this in the
          future? Consider{" "}
          <Link
            href="https://bbis.advancement.brown.edu/BBPhenix/give-now?did=05732af4-d994-4d40-bcd6-fb42d07b6eab"
            className="text-link hover:underline"
          >
            donating
          </Link>{" "}
          to your friendly neighborhood{" "}
          <Link
            href="http://brownpuzzle.club/"
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
      </footer>
    </body>
  );
}

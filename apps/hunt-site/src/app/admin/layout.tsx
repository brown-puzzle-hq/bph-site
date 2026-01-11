import "~/styles/globals.css";
import { auth } from "@/auth";
import { GeistSans } from "geist/font/sans";
import { Providers } from "~/app/providers";
import { type Metadata } from "next";
import { Toaster } from "sonner";
import { CommandPalette } from "~/components/nav/CommandPalette";
import { HUNT_NAME } from "~/hunt.config";
import AdminHamburgerMenu from "./AdminHamburgerMenu";

export const metadata: Metadata = {
  title: `${HUNT_NAME}`,
  description: "",
  icons: [{ rel: "icon", url: "/favicon.png" }],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <Providers session={session}>
          <CommandPalette />
          <Toaster expand={true} visibleToasts={10} />
          <AdminHamburgerMenu />
          <div className="min-h-[56px]" />
          <main className="flex min-h-[calc(100vh-56px)] pt-6">{children}</main>
        </Providers>
      </body>
    </html>
  );
}

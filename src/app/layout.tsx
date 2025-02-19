import "~/styles/globals.css";
import { Providers } from "~/app/nav/providers";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { CommandPalette } from "./CommandPalette";
import { Analytics } from "@vercel/analytics/react";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "Brown Puzzlehunt",
  description: "",
  icons: [{ rel: "icon", url: "/favicon.png" }],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <Providers session={session}>
        <CommandPalette />
        {children}
        <Analytics />
      </Providers>
    </html>
  );
}

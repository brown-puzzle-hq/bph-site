import "~/styles/globals.css";
import { Providers } from "~/app/nav/providers";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { CommandPalette } from "./CommandPalette";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "Brown Puzzlehunt",
  description: "",
  icons: [{ rel: "icon", url: "/favicon.png" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <Providers>
        <CommandPalette />
        <body className="bg-main-bg">{children}</body>
        <Analytics />
      </Providers>
    </html>
  );
}

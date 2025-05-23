import "~/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { Providers } from "~/app/providers";
import { type Metadata } from "next";
import { CommandPalette } from "~/components/nav/CommandPalette";
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
      </Providers>
    </html>
  );
}

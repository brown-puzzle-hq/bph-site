import "~/styles/globals.css";
import { auth } from "@/auth";
import { GeistSans } from "geist/font/sans";
import { Providers } from "~/app/providers";
import { type Metadata } from "next";
import { Toaster } from "sonner";
import { CommandPalette } from "~/components/nav/CommandPalette";

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
        <body>
          <CommandPalette />
          <Toaster expand={true} />
          {children}
        </body>
      </Providers>
    </html>
  );
}

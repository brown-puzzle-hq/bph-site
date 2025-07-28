import "~/styles/globals.css";
import { auth } from "@/auth";
import { GeistSans } from "geist/font/sans";
import { Providers } from "~/app/providers";
import { type Metadata } from "next";
import { Toaster } from "sonner";
import { CommandPalette } from "~/components/nav/CommandPalette";
import { HUNT_NAME } from "~/hunt.config";

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

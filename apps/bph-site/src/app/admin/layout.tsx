import "~/styles/globals.css";
import AdminHamburgerMenu from "./AdminHamburgerMenu";

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="bg-white">
      <AdminHamburgerMenu />
      <div className="min-h-[56px]" />
      <main className="flex min-h-[calc(100vh-56px)] pt-6">{children}</main>
    </div>
  );
}

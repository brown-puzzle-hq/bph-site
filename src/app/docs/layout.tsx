import "~/styles/globals.css";
import "~/styles/github-markdown.css";
import DocsHamburgerMenu from "./DocsHamburgerMenu";

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <body className="bg-white">
      {/* Navbar */}
      <div className="bg-nav-bg">
        <DocsHamburgerMenu />
      </div>
      <main className="markdown-body min-h-[calc(100vh-56px-32px)] max-w-3xl p-16">
        {children}
      </main>
    </body>
  );
}

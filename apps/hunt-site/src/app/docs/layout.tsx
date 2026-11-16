import "~/styles/globals.css";
import "~/styles/github-markdown.css";
import DocsNavBar from "./DocsNavBar";

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <DocsNavBar />
        <div className="min-h-[56px]" />
        <main className="markdown-body min-h-[calc(100vh-56px)] max-w-4xl p-16 pt-8">
          {children}
        </main>
      </body>
    </html>
  );
}

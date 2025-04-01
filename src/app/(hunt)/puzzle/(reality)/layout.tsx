export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex">
      <div className="hidden min-h-[calc(100vh-56px-32px)] w-1/5 bg-[url('/metas/reality.png')] bg-[length:80px_80px] bg-repeat lg:block" />
      <div className="min-h-[calc(100vh-56px-32px)] w-full bg-[#607D9F] pt-8">
        {children}
      </div>
      <div className="hidden min-h-[calc(100vh-56px-32px)] w-1/5 bg-[url('/metas/reality.png')] bg-[length:80px_80px] bg-repeat lg:block" />
    </div>
  );
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex">
      <div className="hidden min-h-[calc(100vh-56px-32px)] w-1/5 bg-[url('/metas/drama.png')] bg-[length:130px_130px] bg-repeat lg:block" />
      <div className="min-h-[calc(100vh-56px-32px)] w-full bg-[#A05638] pt-8">
        {children}
      </div>
      <div className="hidden min-h-[calc(100vh-56px-32px)] w-1/5 bg-[url('/metas/drama.png')] bg-[length:130px_130px] bg-repeat lg:block" />
    </div>
  );
}

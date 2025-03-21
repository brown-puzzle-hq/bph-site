export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex">
      <div className="hidden h-screen w-1/5 bg-[url('/metas/cerebral.png')] bg-[length:130px_130px] bg-repeat lg:block" />
      <div className="min-h-[calc(100vh-80px)] w-full bg-[#372825] py-8">
        {children}
      </div>
      <div className="hidden h-screen w-1/5 bg-[url('/metas/cerebral.png')] bg-[length:130px_130px] bg-repeat lg:block" />
    </div>
  );
}

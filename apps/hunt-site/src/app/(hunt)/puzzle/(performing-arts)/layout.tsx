import { ChevronsLeft } from "lucide-react";
import Link from "next/link";

export default async function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="relative">
      <Link
        href={"/puzzle/performing-arts"}
        className="fixed left-4 top-[72px] z-10 flex items-center space-x-0.5 rounded-md bg-[#1C0770] p-1 sm:pr-2"
      >
        <ChevronsLeft className="size-6 fill-white" />
        <p className="hidden font-semibold sm:block">Performing Arts</p>
      </Link>
      {children}
    </div>
  );
}

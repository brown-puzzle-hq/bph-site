import { puzzleId, SolutionBody } from "./data";
import DefaultHeader from "@/puzzle/components/DefaultHeader";

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const hasSolution = !!SolutionBody();

  return (
    <div className="flex min-w-36 grow flex-col items-center">
      <DefaultHeader puzzleId={puzzleId} hasSolution={hasSolution} />
      {children}
    </div>
  );
}

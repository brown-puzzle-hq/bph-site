import { puzzleId, solutionBody } from "./data";
import DefaultHeader from "@/puzzle/components/DefaultHeader";

export const metadata = {
  title: "You've Got This Covered - Brown Puzzlehunt"
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const hasSolution = !!solutionBody;

  return (
    <div className="flex min-w-36 grow flex-col items-center">
      <DefaultHeader puzzleId={puzzleId} hasSolution={hasSolution} />
      {children}
    </div>
  );
}

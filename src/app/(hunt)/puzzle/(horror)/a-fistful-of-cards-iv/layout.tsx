import { puzzleId, solutionBody } from "./data";
import DefaultHeader from "~/app/(hunt)/puzzle/components/puzzle/DefaultHeader";

export const metadata = {
  title: "A Fistful of Cards IV - Brown Puzzlehunt",
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

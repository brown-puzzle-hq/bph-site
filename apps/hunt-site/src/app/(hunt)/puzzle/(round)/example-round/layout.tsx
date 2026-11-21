import { ROUND_BACKGROUND_COLORS } from "~/config/styles";
import { roundId, roundName } from "./data";

export const metadata = {
  title: `${roundName} - Puzzlehunt`,
};

export default async function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Undefined when the round has no override, which leaves the site background
  // from src/app/(hunt)/layout.tsx in place.
  const backgroundColor = ROUND_BACKGROUND_COLORS[roundId];

  return (
    <div className="flex min-h-dvh flex-col" style={{ backgroundColor }}>
      {children}
    </div>
  );
}

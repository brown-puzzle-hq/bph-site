import { ROUND_BACKGROUND_COLORS } from "~/config/styles";
import { roundName } from "./data";

export const metadata = {
  title: `${roundName} - Brown Puzzlehunt`,
};

export default async function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div
      className="flex min-h-dvh flex-col"
      style={{ backgroundColor: ROUND_BACKGROUND_COLORS["performing-arts"] }}
    >
      {children}
    </div>
  );
}

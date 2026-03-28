import { roundName } from "./data";

export const metadata = {
  title: `${roundName} - Brown Puzzlehunt`,
};

export default async function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}

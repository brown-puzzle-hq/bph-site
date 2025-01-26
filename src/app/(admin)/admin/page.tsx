import { Dashboard } from "./Dashboard";

export default async function Home() {
  return (
    <div className="w-full">
      <h1 className="mb-2 text-center">Dashboard!</h1>
      <Dashboard />
    </div>
  );
}

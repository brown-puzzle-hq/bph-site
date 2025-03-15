import dynamic from "next/dynamic";
const Graph = dynamic(() => import("./Graph"), { ssr: false });

export default async function Page() {
  return (
    <div className="relative h-screen w-screen p-4">
      <Graph />
    </div>
  );
}

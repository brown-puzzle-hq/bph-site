import dynamic from "next/dynamic";
const Graph = dynamic(() => import("./Graph"), { ssr: false });

export default async function Page() {
  return <Graph />;
}

import DefaultPuzzlePage from "@/puzzle/components/DefaultPuzzlePage";
import * as data from "./data";

export default async function Page() {
  // In-person body
  // const res = await fetch("http://localhost:3000/api/heist", {
  //   cache: "no-store",
  // });
  // const htmlContent = await res.text();
  // <iframe>
  //   <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
  // </iframe>

  return (
    <DefaultPuzzlePage
      puzzleId={data.puzzleId}
      inPersonBody={data.inPersonBody}
      remoteBoxBody={data.remoteBoxBody}
      remoteBody={data.remoteBody}
      copyText={data.copyText}
      partialSolutions={data.partialSolutions}
      tasks={data.tasks}
    />
  );
}

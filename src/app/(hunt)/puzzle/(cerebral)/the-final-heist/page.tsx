import DefaultPuzzlePage from "@/puzzle/components/DefaultPuzzlePage";
import * as data from "./data";

export const metadata = {
  title: data.puzzleId
    .split("-")
    .map((word) => {
      // Uppercase every letter in a roman numeral
      const romanRegex =
        /^(M{0,4})(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;
      if (romanRegex.test(word.toUpperCase())) {
        return word.toUpperCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" "),
};

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

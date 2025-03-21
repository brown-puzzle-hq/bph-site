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

export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  return (
    <DefaultPuzzlePage
      puzzleId={data.puzzleId}
      inPersonBody={data.inPersonBody}
      remoteBoxBody={data.remoteBoxBody}
      remoteBody={data.remoteBody}
      copyText={data.copyText}
      partialSolutions={data.partialSolutions}
      tasks={data.tasks}
      interactionMode={searchParams?.interactionMode}
    />
  );
}
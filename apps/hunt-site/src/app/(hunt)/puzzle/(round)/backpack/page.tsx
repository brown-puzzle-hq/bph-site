import DefaultRoundPage from "../DefaultRoundPage";
import * as data from "./data";

export default async function Page() {
  return (
    <DefaultRoundPage
      roundName={data.roundName}
      background={data.background}
      icons={data.icons}
    />
  );
}

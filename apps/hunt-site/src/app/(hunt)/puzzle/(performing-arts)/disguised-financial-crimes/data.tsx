import Image from "next/image";
import image1 from "./image1.png";
import image2 from "./image2.png";
import image3 from "./image3.png";
import image4 from "./image4.png";
import image5 from "./image5.png";
import image6 from "./image6.png";
import image7 from "./image7.png";
import image8 from "./image8.png";
import { CopyData } from "../../components/puzzle/CopyButton";

export const puzzleId = "disguised-financial-crimes";

export const inPersonBody = (
  <div className="max-w-3xl space-y-4">
    <div className="text-center">
      <b>
        This puzzle can be found on the 3rd floor of Page-Robinson Hall. You
        should bring your tape. If you are a non-Brown team whose solving room
        is not located in this building, please call us to get access.
      </b>
    </div>
    <div className="text-center">
      <b>We recommend using online tools to solve this puzzle.</b>
    </div>
    <div className="mb-4">
      <i>
        You and your partner, Detective Rolfsen, have finally unknotted the
        whole conspiracy: APMA-Econ majors are taxonomically lizards in
        disguise.
      </i>
    </div>
  </div>
);

export const remoteBody = (
  <div className="max-w-3xl">
    <div className="mb-4">
      <i>
        You and your partner, Detective Rolfsen, have finally unknotted the
        whole conspiracy: APMA-Econ majors are taxonomically lizards in
        disguise.
      </i>
    </div>
    <div className="flex justify-around">
      <div className="flex flex-col gap-4">
        <span>
          <Image src={image1} alt="" height="200" />
        </span>
        <span>
          <Image src={image3} alt="" height="200" />
        </span>
        <span>
          <Image src={image5} alt="" height="200" />
        </span>
        <span>
          <Image src={image7} alt="" height="200" />
        </span>
      </div>
      <div className="flex flex-col gap-4">
        <span>
          <Image src={image2} alt="" height="200" />
        </span>
        <span>
          <Image src={image4} alt="" height="200" />
        </span>
        <span>
          <Image src={image6} alt="" height="200" />
        </span>
        <span>
          <Image src={image8} alt="" height="200" />
        </span>
      </div>
    </div>
  </div>
);

import Solution from "./solution/solution.mdx";
export const solutionBody = <Solution />;

export const authors = null;

export const copyText = `Disguised Financial Crimes
This puzzle can be found on the 3rd floor of Page-Robinson Hall. You should bring your tape and red string. If you are a non-Brown team whose solving room is not located in this building, please call us to get access.

We recommend using online tools to solve this puzzle.

You and your partner, Detective Rolfsen, have finally unknotted the whole conspiracy: APMA-Econ majors are taxonomically lizards in disguise.`;

export const partialSolutions: Record<string, string> = {};

export const tasks: Record<string, JSX.Element> = {};

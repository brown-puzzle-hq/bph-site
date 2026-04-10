import background from "./math.png";
export { background };

export const roundName = "Math";

import math1 from "./icons/math-1.png";
import math2 from "./icons/math-2.png";
import math3 from "./icons/math-3.png";
import math4 from "./icons/math-4.png";
import math5 from "./icons/math-5.png";

import { type PuzzleIcon } from "../DefaultRoundPage";

export const icons: Record<string, PuzzleIcon> = {
  "primary-investigation": {
    icon: math1,
    x: 39.6985,
    y: 25.8393,
    w: 13.9028,
    h: 19.4844,
  },
  "herculean-math": {
    icon: math2,
    x: 14.0285,
    y: 68.1055,
    w: 8.459,
    h: 14.2086,
  },
  "itty-bitty-kitties": {
    icon: math3,
    x: 61.474,
    y: 50.1199,
    w: 10.4271,
    h: 15.5875,
  },
  "analogical-semantics": {
    icon: math4,
    x: 75.1675,
    y: 9.7122,
    w: 10.6365,
    h: 17.506,
  },
  "linear-algebra": {
    icon: math5,
    x: 15.2429,
    y: 18.5851,
    w: 9.3384,
    h: 11.9904,
  },
};

import background from "./risd.jpg";
export { background };

export const roundName = "RISD";

import fish from "./icons/fish.png";
import fisherman from "./icons/fisherman.png";
import french from "./icons/french.png";
import pencil from "./icons/pencil.png";
import swan from "./icons/swan.png";

import { type PuzzleIcon } from "../DefaultRoundPage";

export const icons: Record<string, PuzzleIcon> = {
  "culinary-chemistry-lab": {
    icon: fish,
    x: 66.8886,
    y: 27.1174,
    w: 3.1477,
    h: 11.7385,
  },
  "editing-practice": {
    icon: fisherman,
    x: 45.6416,
    y: 31.7236,
    w: 6.7797,
    h: 12.0357,
    labelPosition: "top",
  },
  "advanced-logical-cooking-techniques": {
    icon: french,
    x: 47.155,
    y: 68.3507,
    w: 8.8983,
    h: 13.4473,
  },
  "how-to-get-your-heart-broken": {
    icon: pencil,
    x: 53.5714,
    y: 44.0565,
    w: 7.2034,
    h: 15.4532,
  },
  "topics-in-guard-door-theory": {
    icon: swan,
    x: 8.0508,
    y: 58.2467,
    w: 14.2857,
    h: 19.3165,
  },
};

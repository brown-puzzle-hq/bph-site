import background from "./humanities.png";
export { background };

export const roundName = "Humanities";

import bottom from "./icons/bottom.png";
import columns from "./icons/columns.png";
import gladiator from "./icons/gladiator.png";
import map from "./icons/map.png";
import top from "./icons/top.png";

import { type PuzzleIcon } from "../DefaultRoundPage";

export const icons: Record<string, PuzzleIcon> = {
  "sunk-modern-naval-investigative-methodology": {
    icon: bottom,
    x: 44.7266,
    y: 76.0382,
    w: 35.5469,
    h: 22.5914,
    labelPosition: "top",
    labelDx: -5.9,
  },
  "multi-clef-composition": {
    icon: columns,
    x: 70.2148,
    y: 23.0897,
    w: 20.3369,
    h: 39.0365,
    labelPosition: "top",
  },
  "card-game-theory": {
    icon: gladiator,
    x: 9.4482,
    y: 46.7608,
    w: 24.4873,
    h: 39.0365,
  },
  "mischievous-literature": {
    icon: map,
    x: 19.8242,
    y: 0.0,
    w: 21.4844,
    h: 15.5731,
  },
  "avionic-intersectionality": {
    icon: top,
    x: 43.6768,
    y: 3.7375,
    w: 23.8525,
    h: 21.2625,
  },
};

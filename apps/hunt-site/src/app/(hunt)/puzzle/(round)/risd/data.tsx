import background from "./risd.png";
export { background };

export const roundName = "RISD";

import placeholder1 from "./icons/placeholder1.png";
import placeholder2 from "./icons/placeholder2.png";
import placeholder3 from "./icons/placeholder3.png";
import placeholder4 from "./icons/placeholder4.png";
import placeholder5 from "./icons/placeholder5.png";

import { type PuzzleIcon } from "../DefaultRoundPage";

export const icons: Record<string, PuzzleIcon> = {
  "culinary-chemistry-lab": {
    icon: placeholder1,
    x: 5.0049,
    y: 15.9053,
    w: 16.6748,
    h: 12.5415,
  },
  "editing-practice": {
    icon: placeholder2,
    x: 69.3359,
    y: 50.4568,
    w: 16.6748,
    h: 12.5415,
  },
  "advanced-logical-cooking-techniques": {
    icon: placeholder3,
    x: 34.4971,
    y: 27.4502,
    w: 16.6748,
    h: 12.5415,
  },
  "date-everything-brown": {
    icon: placeholder4,
    x: 75.7812,
    y: 22.2176,
    w: 16.6748,
    h: 12.5415,
  },
  "one-guard-no-doors": {
    icon: placeholder5,
    x: 12.5488,
    y: 69.7259,
    w: 16.6748,
    h: 12.5415,
  },
};

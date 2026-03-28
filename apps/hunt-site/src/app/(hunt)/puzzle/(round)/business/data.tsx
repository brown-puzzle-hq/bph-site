import background from "./business.png";
export { background };

export const roundName = "Business";

import blueno from "./icons/blueno.png";
import crayon from "./icons/crayon.png";
import money from "./icons/money.png";
import salt from "./icons/salt.png";
import stonks from "./icons/stonks.png";

import { type PuzzleIcon } from "../DefaultRoundPage";

export const icons: Record<string, PuzzleIcon> = {
  "schmear-campaign": {
    icon: blueno,
    x: 21.5088,
    y: 39.5349,
    w: 18.7744,
    h: 40.2824,
  },
  "big-wheel": { icon: crayon, x: 10.5713, y: 14.3272, w: 25.2686, h: 26.1628 },
  "rabbit-konundrum": {
    icon: money,
    x: 71.2158,
    y: 46.1379,
    w: 18.6768,
    h: 34.5515,
  },
  "applied-probability": {
    icon: salt,
    x: 85.6201,
    y: 2.0764,
    w: 13.9893,
    h: 27.5748,
  },
  "sword-placeholder": {
    icon: stonks,
    x: 58.0078,
    y: 16.196,
    w: 17.9932,
    h: 22.6329,
  },
};

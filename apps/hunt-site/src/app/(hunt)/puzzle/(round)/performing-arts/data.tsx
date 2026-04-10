import background from "./performing-arts.png";
export { background };

export const roundName = "Performing Arts";

import hammer from "./icons/hammer.png";
import ladder from "./icons/ladder.png";
import lights from "./icons/lights.png";
import moon from "./icons/moon.png";
import paint from "./icons/paint.png";

import { type PuzzleIcon } from "../DefaultRoundPage";

export const icons: Record<string, PuzzleIcon> = {
  "serialized-storytelling": {
    icon: hammer,
    x: 46.1055,
    y: 68.4652,
    w: 7.2446,
    h: 6.5348,
  },
  "escapism-in-cinema": {
    icon: ladder,
    x: 61.474,
    y: 33.4532,
    w: 20.8124,
    h: 41.9664,
  },
  "going-in-circles": {
    icon: lights,
    x: 53.9363,
    y: 0.0,
    w: 10.0084,
    h: 15.4676,
  },
  "disguised-financial-crimes": {
    icon: moon,
    x: 66.4992,
    y: 9.1727,
    w: 12.1859,
    h: 15.2278,
  },
  "characters-in-flight": {
    icon: paint,
    x: 18.6348,
    y: 63.2494,
    w: 5.8208,
    h: 14.0887,
  },
};

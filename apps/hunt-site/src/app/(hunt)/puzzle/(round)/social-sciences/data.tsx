import background from "./social-sciences.png";
export { background };

export const roundName = "Social Sciences";

import bearing from "./icons/bearing.png";
import cards from "./icons/cards.png";
import meeple from "./icons/meeple.png";
import stamp from "./icons/stamp.png";
import teacup from "./icons/teacup.png";

import { type PuzzleIcon } from "../DefaultRoundPage";

export const icons: Record<string, PuzzleIcon> = {
  "movable-chorale": {
    icon: bearing,
    x: 63.1592,
    y: 0.0,
    w: 36.8408,
    h: 38.7043,
    labelDx: 5,
  },
  "intro-to-ubpcosu-final-exam": {
    icon: cards,
    x: 3.0762,
    y: 43.4385,
    w: 20.8984,
    h: 45.0997,
    labelDy: -10,
  },
  "trap-streets": {
    icon: meeple,
    x: 84.4727,
    y: 45.6395,
    w: 10.5713,
    h: 9.4684,
  },
  "intro-to-ubpcosu-first-lecture": {
    icon: stamp,
    x: 65.0879,
    y: 26.1628,
    w: 5.8838,
    h: 8.4718,
    z: 1,
    labelPosition: "top",
  },
  "year-of-the-honse": {
    icon: teacup,
    x: 0.0,
    y: 0.0,
    w: 18.7012,
    h: 33.9701,
    labelDx: -10,
    labelDy: -5,
  },
};

import background from "./physical-sciences.png";
export { background };

export const roundName = "Physical Sciences";

import beaker from "./icons/beaker.png";
import galaxy from "./icons/galaxy.png";
import gloves from "./icons/gloves.png";
import molecules from "./icons/molecules.png";
import pipette from "./icons/pipette.png";

import { type PuzzleIcon } from "../DefaultRoundPage";

export const icons: Record<string, PuzzleIcon> = {
  "voting-dynamics": {
    icon: beaker,
    x: 5.5908,
    y: 0.9551,
    w: 32.5928,
    h: 48.2143,
    labelDx: -6.6,
    labelDy: -17,
  },
  "scacchic-fabrication": {
    icon: galaxy,
    x: 46.4111,
    y: 26.7027,
    w: 19.4092,
    h: 28.9867,
    labelPosition: "top",
  },
  dirt: {
    icon: gloves,
    x: 4.4189,
    y: 55.2326,
    w: 34.8145,
    h: 43.7292,
    labelPosition: "top",
  },
  "linesman-training": {
    icon: molecules,
    x: 43.4814,
    y: 51.4535,
    w: 15.6738,
    h: 25.0415,
  },
  "experimental-cardiac-measurement": {
    icon: pipette,
    x: 75.9033,
    y: 55.3987,
    w: 19.7998,
    h: 38.5797,
    labelPosition: "top",
    labelDx: -9.5,
  },
};

import background from "./dorm.png";
export { background };

import backpack from "./icons/backpack.png";
import business from "./icons/business.png";
import humanities from "./icons/humanities.png";
import math from "./icons/math.png";
import performing_arts from "./icons/performing-arts.png";
import physical_sciences from "./icons/physical-sciences.png";
import risd from "./icons/risd.png";
import social_sciences from "./icons/social-sciences.png";

import { type PuzzleIcon } from "@/puzzle/(round)/DefaultRoundPage";

export const icons: Record<string, PuzzleIcon> = {
  backpack: {
    icon: backpack,
    x: 61.0972,
    y: 78.6571,
    w: 21.9849,
    h: 21.3429,
    labelPosition: "top",
  },
  business: { icon: business, x: 50.7538, y: 65.7674, w: 4.1039, h: 16.1271 },
  humanities: { icon: humanities, x: 4.1457, y: 58.753, w: 7.3283, h: 11.1511 },
  math: { icon: math, x: 74.665, y: 38.1295, w: 15.4104, h: 12.2902 },
  "performing-arts": {
    icon: performing_arts,
    x: 16.541,
    y: 81.7146,
    w: 15.1173,
    h: 18.2854,
    labelPosition: "top",
  },
  "physical-sciences": {
    icon: physical_sciences,
    x: 14.6147,
    y: 58.5132,
    w: 4.6064,
    h: 5.3957,
    labelPosition: "top",
  },
  risd: {
    icon: risd,
    x: 13.1072,
    y: 39.3885,
    w: 3.5176,
    h: 13.5492,
    labelPosition: "top",
  },
  "social-sciences": {
    icon: social_sciences,
    x: 31.7002,
    y: 37.9496,
    w: 5.5695,
    h: 11.5108,
    labelPosition: "top",
  },
};

import puddle from "./rotating-objects/puddle.png";
import headphones from "./rotating-objects/headphones.png";
import pages from "./rotating-objects/pages.png";
import banana from "./rotating-objects/banana.png";
import sock from "./rotating-objects/sock.png";

export const rotatingObjects = [puddle, headphones, pages, banana, sock];

import cheez_its from "./whiteboard/cheez-its.png";
import { type StaticImageData } from "next/image";

export const allWhiteboardObjects: StaticImageData[][] = [
  // Category 0
  [cheez_its],
  // Category 1
  [cheez_its],
  // Category 2
  [cheez_its],
  // Category 3
  [cheez_its],
];

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
    x: 61.8928,
    y: 78.0576,
    w: 15.9129,
    h: 21.9424,
    labelPosition: "top",
    labelDx: 10,
  },
  business: { icon: business, x: 50.4606, y: 67.8657, w: 3.3082, h: 12.7698 },
  humanities: {
    icon: humanities,
    x: 3.7688,
    y: 58.6331,
    w: 6.4489,
    h: 11.0911,
  },
  math: { icon: math, x: 74.0369, y: 38.1295, w: 16.0385, h: 12.1703 },
  "performing-arts": {
    icon: performing_arts,
    x: 16.3317,
    y: 76.8585,
    w: 18.4255,
    h: 23.1415,
    labelPosition: "top",
  },
  "physical-sciences": {
    icon: physical_sciences,
    x: 14.531,
    y: 58.6331,
    w: 4.6482,
    h: 5.2158,
    labelPosition: "top",
  },
  risd: {
    icon: risd,
    x: 12.7722,
    y: 39.3885,
    w: 3.9782,
    h: 13.5492,
    labelPosition: "top",
  },
  "social-sciences": {
    icon: social_sciences,
    x: 31.407,
    y: 37.8897,
    w: 6.072,
    h: 11.8705,
    labelPosition: "top",
  },
};

import puddle from "./rotating-objects/puddle.png";
import headphones from "./rotating-objects/headphones.png";
import books from "./rotating-objects/books.png";
import banana from "./rotating-objects/banana.png";
import sock from "./rotating-objects/sock.png";

export const rotatingObjects = [puddle, headphones, books, banana, sock];

import whiteboard_1 from "./whiteboard/whiteboard-1.png";
import whiteboard_2 from "./whiteboard/whiteboard-2.png";
import whiteboard_3 from "./whiteboard/whiteboard-3.png";
import whiteboard_4 from "./whiteboard/whiteboard-4.png";
import whiteboard_5 from "./whiteboard/whiteboard-5.png";
import whiteboard_6 from "./whiteboard/whiteboard-6.png";
import whiteboard_7 from "./whiteboard/whiteboard-7.png";
import whiteboard_8 from "./whiteboard/whiteboard-8.png";
import whiteboard_9 from "./whiteboard/whiteboard-9.png";
import whiteboard_10 from "./whiteboard/whiteboard-10.png";
import whiteboard_11 from "./whiteboard/whiteboard-11.png";
import whiteboard_12 from "./whiteboard/whiteboard-12.png";
import whiteboard_13 from "./whiteboard/whiteboard-13.png";
import whiteboard_14 from "./whiteboard/whiteboard-14.png";
import whiteboard_15 from "./whiteboard/whiteboard-15.png";
import whiteboard_16 from "./whiteboard/whiteboard-16.png";
import whiteboard_17 from "./whiteboard/whiteboard-17.png";
import whiteboard_18 from "./whiteboard/whiteboard-18.png";

import { type StaticImageData } from "next/image";

export const allWhiteboardObjects: StaticImageData[][] = [
  // Category 0
  [
    whiteboard_1,
    whiteboard_2,
    whiteboard_3,
    whiteboard_4,
    whiteboard_5,
    whiteboard_6,
  ],
  // Category 1
  [
    whiteboard_7,
    whiteboard_8,
    whiteboard_9,
    whiteboard_10,
    whiteboard_11,
    whiteboard_12,
  ],
  // Category 2
  [whiteboard_13, whiteboard_14, whiteboard_15, whiteboard_16, whiteboard_17],
  // Category 3
  [whiteboard_18],
];

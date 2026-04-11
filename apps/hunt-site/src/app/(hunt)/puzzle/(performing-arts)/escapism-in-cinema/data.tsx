import Game from "./Game";
import { ChainConfig } from "./ChainsGraph";

export const puzzleId = "escapism-in-cinema";

export const CHAINS: ChainConfig[] = [
  {
    nodes: [
      { type: "small", text: "" },
      { type: "big", text: "Conan the Barbarian" },
      { type: "small", text: "" },
      { type: "big", text: "Twins" },
      { type: "small", text: "Danny DeVito" },
      { type: "big", text: "" },
      { type: "small", text: "" },
    ],
  },
  {
    nodes: [
      { type: "small", text: "" },
      { type: "big", text: "" },
      { type: "small", text: "" },
    ],
  },
  {
    nodes: [
      { type: "small", text: "Bruce Willis" },
      { type: "big", text: "" },
      { type: "small", text: "Toni Collette" },
      { type: "big", text: "Changing Lanes" },
      { type: "small", text: "" },
    ],
  },
  {
    nodes: [
      { type: "small", text: "" },
      { type: "big", text: "Hail, Caesar!" },
      { type: "small", text: "" },
      { type: "big", text: "Ocean's Eleven" },
      { type: "small", text: "Brad Pitt" },
    ],
  },
  {
    nodes: [
      { type: "small", text: "Jack Nicholson" },
      { type: "big", text: "Easy Rider" },
      { type: "small", text: "" },
      { type: "big", text: "Sleepwalking" },
      { type: "small", text: "" },
      { type: "big", text: "" },
      { type: "small", text: "Sean Bean" },
      {
        type: "big",
        text: "The Lord of the Rings: The Two Towers (Extended Edition)",
      },
      { type: "small", text: "" },
    ],
  },
  {
    nodes: [
      { type: "small", text: "" },
      { type: "big", text: "Paradise Road" },
      { type: "small", text: "Frances McDormand" },
      { type: "big", text: "" },
      { type: "small", text: "Sam Rockwell" },
      { type: "big", text: "IF" },
      { type: "small", text: "" },
      { type: "big", text: "Deadpool & Wolverine" },
      { type: "small", text: "" },
    ],
  },
  {
    nodes: [
      { type: "small", text: "Anthony Mackie" },
      { type: "big", text: "" },
      { type: "small", text: "" },
      { type: "big", text: "Clueless" },
      { type: "small", text: "" },
    ],
  },
  {
    nodes: [
      { type: "small", text: "" },
      { type: "big", text: "" },
      { type: "small", text: "Bruce Willis" },
      { type: "big", text: "The Bonfire of the Vanities" },
      { type: "small", text: "" },
    ],
  },
  {
    nodes: [
      { type: "small", text: "" },
      { type: "big", text: "" },
      { type: "small", text: "Juliette Binoche" },
      { type: "big", text: "Paradise Highway" },
      { type: "small", text: "" },
      { type: "big", text: "" },
      { type: "small", text: "Gwyneth Paltrow" },
      { type: "big", text: "" },
      { type: "small", text: "" },
    ],
  },
  {
    nodes: [
      { type: "small", text: "" },
      { type: "big", text: "The Bourne Identity" },
      { type: "small", text: "" },
      { type: "big", text: "" },
      { type: "small", text: "" },
      { type: "big", text: "G.I. Joe: The Rise of Cobra" },
      { type: "small", text: "Channing Tatum" },
    ],
  },
  {
    nodes: [
      { type: "small", text: "" },
      { type: "big", text: "" },
      { type: "small", text: "Jessica Alba" },
      { type: "big", text: "Killers Anonymous" },
      { type: "small", text: "Gary Oldman" },
    ],
  },
  {
    nodes: [
      { type: "small", text: "" },
      { type: "big", text: "Ghostbusters: Afterlife" },
      { type: "small", text: "Sigourney Weaver" },
      { type: "big", text: "" },
      { type: "small", text: "Elizabeth Olsen" },
      { type: "big", text: "" },
      { type: "small", text: "Sharlto Copley" },
      { type: "big", text: "" },
      { type: "small", text: "Sharlto Copley" },
      { type: "big", text: "" },
      { type: "small", text: "Matt Damon" },
    ],
  },
  {
    nodes: [
      { type: "small", text: "Tom Hanks" },
      { type: "big", text: "" },
    ],
  },
];

export const inPersonBody = <Game chains={CHAINS} />;

export const remoteBody = inPersonBody;

export const solutionBody = null;

export const authors = null;

export const copyText = null;

export const partialSolutions: Record<string, string> = {};

export const tasks: Record<string, JSX.Element> = {};

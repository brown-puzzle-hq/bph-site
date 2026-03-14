import Game from "./Game";
import { ChainConfig } from "./ChainsGraph";

/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "escapism-in-cinema";

/**
 * The body renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */

export const CHAINS: ChainConfig[] = [
  {
    nodes: [
      { type: "big", text: "Conan the Barbarian" },
      { type: "small", text: "" },
      { type: "big", text: "Twins" },
      { type: "small", text: "Danny DeVito" },
      { type: "big", text: "" },
    ],
  },
  {
    nodes: [{ type: "big", text: "" }],
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
      { type: "big", text: "Hail Caesar!" },
      { type: "small", text: "" },
      { type: "big", text: "Oceans 11" },
      { type: "small", text: "Brad Pitt" },
    ],
  },
  {
    nodes: [
      { type: "small", text: "Jack Nicholson" },
      { type: "big", text: "Easy Rider" },
      { type: "small", text: "" },
      { type: "big", text: "Sleepwalking" },
      { type: "small", text: "Charlize Theron" },
      { type: "big", text: "" },
      { type: "small", text: "" },
      {
        type: "big",
        text: "The Lord of the Rings: The Two Towers (Extended Edition)",
      },
    ],
  },
  {
    nodes: [
      { type: "small", text: "" },
      { type: "big", text: "Paradise Road" },
      { type: "small", text: "Frances McDormand" },
      { type: "big", text: "" },
      { type: "small", text: "Sam Rockwell" },
      { type: "big", text: "Iron Man 2" },
      { type: "small", text: "" },
      { type: "big", text: "The Nanny Diaries" },
    ],
  },
  {
    nodes: [
      { type: "small", text: "Anthony Mackie" },
      { type: "big", text: "" },
      { type: "small", text: "" },
      { type: "big", text: "Clueless" },
      { type: "small", text: "Paul Rudd" },
    ],
  },
  {
    nodes: [
      { type: "big", text: "" },
      { type: "small", text: "Bruce Willis" },
      { type: "big", text: "Bonfire of the Vanities" },
    ],
  },
  {
    nodes: [
      { type: "big", text: "" },
      { type: "small", text: "Holly Hunter" },
      { type: "big", text: "Levity" },
      { type: "small", text: "" },
      { type: "big", text: "" },
      { type: "small", text: "Gwyneth Paltrow" },
      { type: "big", text: "" },
    ],
  },
  {
    nodes: [
      { type: "big", text: "The Bourne Identity" },
      { type: "small", text: "Julia Stiles" },
      { type: "big", text: "" },
      { type: "small", text: "" },
      { type: "big", text: "G.I. Joe: The Rise of Cobra" },
      { type: "small", text: "Sharlto Copley" },
    ],
  },
  {
    nodes: [
      { type: "small", text: "" },
      { type: "big", text: "" },
      { type: "small", text: "Jessica Alba" },
      { type: "big", text: "Killer Anonymous" },
      { type: "small", text: "Gary Oldman" },
    ],
  },
  {
    nodes: [
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

/**
 * The `solutionBody` renders in the solution page.
 * If there are no solutions available, set it null.
 */
export const solutionBody = null;

/**
 * The `authors` string renders below the `solutionBody`.
 */
export const authors = null;

/**
 * The `copyText` should provide a convenient text representation of the puzzle
 * that can be copied to the clipboard. Set this to `null` to remove the copy button.
 */
export const copyText = null;

/**
 * The `partialSolutions` object is used to prompt solutions with significant progress.
 * Each key is a partial solution, and the value is the prompt to be displayed. Keys must
 * be in all caps, no spaces.
 */
export const partialSolutions: Record<string, string> = {};

/**
 * The `tasks` object is used for multi-part puzzles. When a certain answer is submitted,
 * more content will be added to the puzzle body. Keys must be in all caps, no spaces.
 */
export const tasks: Record<string, JSX.Element> = {};

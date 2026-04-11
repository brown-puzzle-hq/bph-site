/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "herculean-math";

/**
 * The body renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = (
  <div className="max-w-3xl">
    <div className="mb-4">
      <p>f(😎, 🕶️, ∅) = 🙂</p>
      <p>f(🍺, ∅, 🍺) = 🍻</p>
      <p>f(🌕, ☀️, ∅) = 🌑</p>
      <p>f(🏝️, 🌴, ⛱️) = 🏖️</p>
      <p>f(🪨, ∅, Z) = 🗿</p>
    </div>
    <div className="mb-4">
      <p>g(🪑, 🦵) = 4</p>
      <p>g(🙂, 👁️) = 2</p>
      <p>g(🐍, ✋) = 0</p>
      <p>g(⏱️, #️⃣) = 12</p>
      <p>g(🪙, Z) = 1</p>
    </div>
    <div className="mb-4">
      <p>g(X, Z) = 9</p>
      <p>f(X, Z, ∅) = X</p>
      <p>g(f(X, Z, ∅), Z) = 10</p>
      <p>f(X, Z, Y) = X</p>
      <p>g(f(X, Z, Y), Z) = 8</p>
    </div>
    <div className="mb-4">
      <p>🔑 = Y + X + f(🐜, 🅰️, ∅)</p>
    </div>
  </div>
);

export const remoteBody = inPersonBody;

/**
 * The `solutionBody` renders in the solution page.
 * If there are no solutions available, set it null.
 */
import Solution from "./solution/solution.mdx";
export const solutionBody = <Solution />;

/**
 * The `authors` string renders below the `solutionBody`.
 */
export const authors = null;

/**
 * The `copyText` should provide a convenient text representation of the puzzle
 * that can be copied to the clipboard. Set this to `null` to remove the copy button.
 */
export const copyText = `Herculean Math

f(😎,🕶️,∅)=🙂
f(🍺,∅,🍺)=🍻
f(🌕,☀️,∅)=🌑
f(🏝️,🌴,⛱️)=🏖️
f(🪨,∅,Z)=🗿

g(🪑,🦵)=4
g(🙂,👁️)=2
g(🐍,✋)=0
g(⏱️,#️⃣)=12
g(🪙,Z)=1

g(X,Z)=9
f(X,Z,∅)=X
g(f(X,Z,∅),Z)=10
f(X,Z,Y)=X
g(f(X,Z,Y),Z)=8

🔑=Y+X+ f(🐜,🅰️,∅)`;

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

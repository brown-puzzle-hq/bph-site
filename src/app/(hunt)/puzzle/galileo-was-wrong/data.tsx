//TODO: make the bold g bold in copytext, why is not not centered...
/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "galileo-was-wrong";

/**
 * The body renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = (
  <div className="max-w-3xl space-y-4">
    <p className="italic">Those curious about the bolded letter will note that closer objects fall more slowly.</p>
    <div className="mx-auto grid w-fit grid-cols-6 gap-0 overflow-x-auto border-2 border-white font-mono">
      {[
        "g","n","e","x","l","o",
        "a","p","z","l","w","c",
        "l","o","l","z","e","d",
        "i","z","l","e","k","d",
        "l","x","q","u","l","m",
        "e","v","v","h","u","y",
        "o","g","j","l","x","m",
        "w","q","e","e","s","c",
        "a","e","z","h","r","b",
        "s","y","m","o","n","l",
        "w","i","m","h","b","m",
        "r","o","m","y","v","b",
        "o","a","s","v","s","v",
        "n","i","v","l","p","a",
        "g","q","x","j","n","n",
        "a","g","n","e","x","l",
        "b","a","o","z","l","w",
        "o","l","o","l","z","e",
        "u","r","z","l","e","k",
        "t","l","x","q","u","l",
        "t","g","v","v","h","u",
        "h","j","g","o","l","x",
        "e","w","q","e","e","s",
        "w","p","i","z","h","r",
        "a","s","a","m","o","n",
        "y","w","r","m","h","b",
        "o","e","g","m","o","v",
        "b","o","a","s","v","s",
        "j","n","p","v","l","p",
        "e","s","q","x","j","n",
        "c","t","g","n","e","x",
        "t","b","a","p","z","o",
        "s","o","l","g","l","z",
        "f","c","s","i","l","e",
        "a","t","l","x","q","u",
        "l","t","e","v","v","h",
        "l","h","c","g","j","l",
        "t","y","w","q","e","e",
        "h","w","p","e","g","h",
        "e","a","s","c","r","o",
        "i","y","w","i","a","h",
        "r","o","t","o","m","y",
        "v","b","o","a","c","v",
        "e","j","n","p","i","l",
        "l","e","s","q","x","g",
        "o","c","a","g","n","c",
        "c","t","b","a","p","r",
        "i","s","o","l","o","l",
        "t","f","u","s","z","a",
        "i","a","y","l","x","q",
        "e","l","t","e","v","v",
        "s","v","h","j","g","j",
        "m","t","e","t","q","e",
        "a","m","w","p","e","i",
        "y","e","m","s","y","m",
        "n","i","y","m","i","m",
        "o","r","o","e","m","m",
        "t","r","b","o","a","m",
        "i","e","j","n","p","v",
        "n","l","e","s","q","x",
        "c","i","v","a","g","n",
        "r","c","t","y","a","p",
        "e","g","i","o","l","o",
        "a","t","f","u","t","z",
        "s","i","a","i","l","x",
        "e","r","l","t","e","v",
        "a","s","l","h","i","g",
        "n","s","t","e","w","q",
        "d","a","h","w","p","i",
        "m","y","r","v","s","y",
        "a","n","i","y","w","i",
        "y","o","r","o","e","o",
        "d","t","r","b","o","a",
        "i","n","e","r","y","p",
        "f","n","l","e","s","t",
        "f","c","o","c","a","g",
        "e","b","c","t","b","a",
        "r","e","g","s","r","l",
        "b","a","t","f","v","s",
        "y","s","i","a","t","l",
        "o","e","e","l","t","e",
        "b","a","s","l","h","r",
        "j","n","s","t","e","w",
        "e","d","a","h","w","p",
        "c","m","y","e","a","s",
        "t","a","n","i","y","y",
        "!","y","o","r","o","e",
        "!","d","t","r","b","v",
        "!","i","n","e","j","n",
        "!","f","n","l","e","s"
      ].map((cell, index) => (
        <div
          key={index}
          className={`flex h-10 w-10 items-center justify-center border border-white text-lg ${index === 195 ? "font-bold" : ""} ${
            cell === "⬜" ? "bg-white" : "bg-transparent"
          }`}
        >
          {cell !== "⬜" && cell}
        </div>
      ))}
    </div>
  </div>
);

export const remoteBoxBody = inPersonBody;

export const remoteBody = inPersonBody;

/**
 * The `solutionBody` renders in the solution page.
 * If there are no solutions available, set it null.
 */
export const solutionBody = null;

/**
 * The `copyText` should provide a convenient text representation of the puzzle
 * that can be copied to the clipboard. Set this to `null` to remove the copy button.
 */
export const copyText = `g\tn\te\tx\tl\to
a\tp\tz\tl\tw\tc
l\to\tl\tz\te\td
i\tz\tl\te\tk\td
l\tx\tq\tu\tl\tm
e\tv\tv\th\tu\ty
o\tg\tj\tl\tx\tm
w\tq\te\te\ts\tc
a\te\tz\th\tr\tb
s\ty\tm\to\tn\tl
w\ti\tm\th\tb\tm
r\to\tm\ty\tv\tb
o\ta\ts\tv\ts\tv
n\ti\tv\tl\tp\ta
g\tq\tx\tj\tn\tn
a\tg\tn\te\tx\tl
b\ta\to\tz\tl\tw
o\tl\to\tl\tz\te
u\tr\tz\tl\te\tk
t\tl\tx\tq\tu\tl
t\tg\tv\tv\th\tu
h\tj\tg\to\tl\tx
e\tw\tq\te\te\ts
w\tp\ti\tz\th\tr
a\ts\ta\tm\to\tn
y\tw\tr\tm\th\tb
o\te\tg\tm\to\tv
b\to\ta\ts\tv\ts
j\tn\tp\tv\tl\tp
e\ts\tq\tx\tj\tn
c\tt\tg\tn\te\tx
t\tb\ta\tp\tz\to
s\to\tl\tg\tl\tz
f\tc\ts\ti\tl\te
a\tt\tl\tx\tq\tu
l\tt\te\tv\tv\th
l\th\tc\tg\tj\tl
t\ty\tw\tq\te\te
h\tw\tp\te\tg\th
e\ta\ts\tc\tr\to
i\ty\tw\ti\ta\th
r\to\tt\to\tm\ty
v\tb\to\ta\tc\tv
e\tj\tn\tp\ti\tl
l\te\ts\tq\tx\tg
o\tc\ta\tg\tn\tc
c\tt\tb\ta\tp\tr
i\ts\to\tl\to\tl
t\tf\tu\ts\tz\ta
i\ta\ty\tl\tx\tq
e\tl\tt\te\tv\tv
s\tv\th\tj\tg\tj
m\tt\te\tt\tq\te
a\tm\tw\tp\te\ti
y\te\tm\ts\ty\tm
n\ti\ty\tm\ti\tm
o\tr\to\te\tm\tm
t\tr\tb\to\ta\tm
i\te\tj\tn\tp\tv
n\tl\te\ts\tq\tx
c\ti\tv\ta\tg\tn
r\tc\tt\ty\ta\tp
e\tg\ti\to\tl\to
a\tt\tf\tu\tt\tz
s\ti\ta\ti\tl\tx
e\tr\tl\tt\te\tv
a\ts\tl\th\ti\tg
n\ts\tt\te\tw\tq
d\ta\th\tw\tp\ti
m\ty\tr\tv\ts\ty
a\tn\ti\ty\tw\ti
y\to\tr\to\te\to
d\tt\tr\tb\to\ta
i\tn\te\tr\ty\tp
f\tn\tl\te\ts\tt
f\tc\to\tc\ta\tg
e\tb\tc\tt\tb\ta
r\te\tg\ts\tr\tl
b\ta\tt\tf\tv\ts
y\ts\ti\ta\tt\tl
o\te\te\tl\tt\te
b\ta\ts\tl\th\tr
j\tn\ts\tt\te\tw
e\td\ta\th\tw\tp
c\tm\ty\te\ta\ts
t\ta\tn\ti\ty\ty
!\ty\to\tr\to\te
!\td\tt\tr\tb\tv
!\ti\tn\te\tj\tn
!\tf\tn\tl\te\ts`;

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

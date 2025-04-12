import Image from "next/image";
import GALILEO from "./galileo.png";

/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "connect-the-dots";

/**
 * The body renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = (
  <div className="max-w-3xl space-y-4">
    <p className="italic">
      In our experiments, it seems that there are two letters — one extremely
      light, and one just a little lighter — that are less heavy than all the
      others.
    </p>
    <Image className="mx-auto" src={GALILEO} alt="" />
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

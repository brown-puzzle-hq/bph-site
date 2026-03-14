import Image from "next/image";
import image1 from "./image1.png";

/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "advanced-logical-cooking-techniques";

/**
 * The body renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = (
  <div className="max-w-3xl">
    <div className="mb-4 font-bold">
      ⚠️ Warning! This puzzle is difficult, especially compared to the other
      puzzles in the hunt. This message is not part of the puzzle. ⚠️
    </div>
    <div className="mb-4">
      <p>
        Sudoku, thermometer, and sandwich rules apply, but some sandwiches are
        missing!
      </p>
      <p>
        <a
          className="text-link hover:underline"
          href="https://sudokupad.app/97jsrc5i1u"
        >
          Play this puzzle in SudokuPad!
        </a>
      </p>
      <p>
        <a
          className="text-link hover:underline"
          href="https://swaroopg92.github.io/penpa-edit/#m=solve&p=zZVtT+M4EMff91Oc/HZH2jiOnQcJncrTSmgpcFuOgyhCoU1pIW120xZQKvaz74ztkqQt3MOrUxvnn5/tmXEmY8+Xw+JxCZzTXwTgACrwpNIX566+DHWgP1nkWfQbdJeLcVGiADg7PoZRms8zOLl+2D987D4fdf/6LG+EuOyNPj0cXlw+DK/+5BfO5HPp9PJgdnp+uJ9/+lLdnI67T9lRps7nxWCcZ+kwrW6uTl7y2XFwPx7xg5PxQTBKZ878R9APn/Yv9vY6MYWBv6QTM86AuXhxlvysej81cJPOqvojWlW3UZy8QnVZy6CW36IVtr1oxYTHopi5gqFRplgCTEgivzeAT8BvgIAA92riORtzPD3HlTVRrp4U1MTXY5ok1GMaZrirCbY1ksZQI2KutKW3ebg0rhd4rdtj3bq67UdxrDzwQvCCBEgqiffAgYBD4ILy8cnngJmXEqRHfR4ENIbrL8SBUEKo9LMA7pIVziVwB3tCevAR+/jRSB+4h1NcmSRQCXzxUB3q1tGt1O1XHdYRZsJVDrg+vnwXs+pLcEN8qaRDB4RjON5BuIbjHQQli7RALi2XyJXlCnlgOS5ShNa+EugL06h9BehLWF8CfRmOd/RlON7Rl+VYI0JaLpEryxXywPIAebi246JNyx2yj5+c1l57XY6yWqHGjGrtt+NxQqtDENyuC3MiODfaw/GeHe/heM+Ox4S33o+04yWWPH1QWmOczXVJG6fEOKWNEz8KISlOTNqVTt2Bbj3dKp1Sn2qs04nRvy3Wtx9+Ev8nQptIf5yV04LhtsHmRX47X5ajdJDdZi/pYMEis681e1pstpzeZWUL5UXxPZ/MdllYd7Xg5H5WlNnOLoLZ8P49U9S1w9RdUQ43YnpO87y9lh/LtGxPHkzKQd5Gi3LSek7LsnhukWm6GLfAXbrA82E+nnxvW8pmGy9zkbZDTB/TDW/T+nW8dtgL01eMdUt5W1VhVHWh+kJbYX0MQHWBm/xpxMyhxminjxnui7hLTpf5YjIo8gId26OCtp83eVTLKyO5g/rAapQ9lMrIa5TGR7YYGHQexVUfGAWxr52SZNPiCVdhgqTnQTG9w3Wuba4DxblnUJ3R1t3VK6h678du/NnQRR06SQrdqHXgtAiK3K6NIje5vv36nwJvpJj81CugoWHyapLl/Ktj+OMT658cH3+7H73YAi/KD2q87tzEOyod6QfF3ujdxd+p60bvJt8qYgp2u46R7ihlpJvVjGi7oBFu1TSyd8qarG5WNkW1Wdzkaqu+yVWzxOOko9Uv"
        >
          Play this puzzle in Penpa!
        </a>
      </p>
    </div>
    <div className="mb-4 flex justify-center">
      <Image src={image1} alt="A logic puzzle" width={500} height={500} />
    </div>
  </div>
);

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

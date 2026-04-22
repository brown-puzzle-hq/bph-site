import Image from "next/image";
import image1 from "./image1.png";
import { CopyData } from "../../components/puzzle/CopyButton";

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
    <div className="mb-4 text-center font-bold">
      Warning! This puzzle is difficult, especially compared to the other
      puzzles in the hunt. This message is not part of the puzzle.
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
export const copyText: CopyData = {
  "text/plain": `Advanced Logical Cooking Techniques				
Warning! This puzzle is difficult, especially compared to the other puzzles in the hunt. This message is not part of the puzzle. 				
Sudoku, thermometer, and sandwich rules apply, but some sandwiches are missing!				
Play this puzzle in SudokuPad!				
Play this puzzle in Penpa!				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				`,
  "text/html": `<meta charset='utf-8'><google-sheets-html-origin><style type="text/css"><!--td {border: 1px solid #cccccc;}br {mso-data-placement:same-cell;}--></style><table xmlns="http://www.w3.org/1999/xhtml" cellspacing="0" cellpadding="0" dir="ltr" border="1" style="table-layout:fixed;font-size:10pt;font-family:Arial;width:0px;border-collapse:collapse;border:none" data-sheets-root="1" data-sheets-baot="1"><colgroup><col width="100"/><col width="100"/><col width="100"/><col width="100"/><col width="100"/></colgroup><tbody><tr style="height:21px;"><td style="border-right:1px solid transparent;overflow:visible;padding:2px 0px 2px 0px;vertical-align:bottom;"><div style="white-space:nowrap;overflow:hidden;position:relative;width:297px;left:3px;"><div style="float:left;">Advanced Logical Cooking Techniques</div></div></td><td style="border-right:1px solid transparent;overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td></tr><tr style="height:21px;"><td style="border-right:1px solid transparent;overflow:visible;padding:2px 0px 2px 0px;vertical-align:bottom;"><div style="white-space:nowrap;overflow:hidden;position:relative;width:802px;left:3px;"><div style="float:left;">Warning! This puzzle is difficult, especially compared to the other puzzles in the hunt. This message is not part of the puzzle.</div></div></td><td style="border-right:1px solid transparent;overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="border-right:1px solid transparent;overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="border-right:1px solid transparent;overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="border-right:1px solid transparent;overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td></tr><tr style="height:21px;"><td style="border-right:1px solid transparent;overflow:visible;padding:2px 0px 2px 0px;vertical-align:bottom;"><div style="white-space:nowrap;overflow:hidden;position:relative;width:499px;left:3px;"><div style="float:left;">Sudoku, thermometer, and sandwich rules apply, but some sandwiches are missing!</div></div></td><td style="border-right:1px solid transparent;overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="border-right:1px solid transparent;overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="border-right:1px solid transparent;overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td></tr><tr style="height:21px;"><td style="border-right:1px solid transparent;overflow:visible;padding:2px 0px 2px 0px;vertical-align:bottom;text-decoration:underline;color:#1155cc;"><div style="white-space:nowrap;overflow:hidden;position:relative;width:196px;left:3px;"><div style="float:left;"><a class="in-cell-link" href="https://sudokupad.app/97jsrc5i1u" target="_blank"><span style="font-size:10pt;font-family:Arial;font-style:normal;text-decoration:underline;text-decoration-skip-ink:none;-webkit-text-decoration-skip:none;color:#1155cc;"><a class="in-cell-link" target="_blank" href="https://sudokupad.app/97jsrc5i1u">Play this puzzle in SudokuPad!</a></span></a></div></div></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td></tr><tr style="height:21px;"><td style="border-right:1px solid transparent;overflow:visible;padding:2px 0px 2px 0px;vertical-align:bottom;text-decoration:underline;color:#1155cc;"><div style="white-space:nowrap;overflow:hidden;position:relative;width:196px;left:3px;"><div style="float:left;"><a class="in-cell-link" href="https://swaroopg92.github.io/penpa-edit/#m=solve&amp;p=zZVtT+M4EMff91Oc/HZH2jiOnQcJncrTSmgpcFuOgyhCoU1pIW120xZQKvaz74ztkqQt3MOrUxvnn5/tmXEmY8+Xw+JxCZzTXwTgACrwpNIX566+DHWgP1nkWfQbdJeLcVGiADg7PoZRms8zOLl+2D987D4fdf/6LG+EuOyNPj0cXlw+DK/+5BfO5HPp9PJgdnp+uJ9/+lLdnI67T9lRps7nxWCcZ+kwrW6uTl7y2XFwPx7xg5PxQTBKZ878R9APn/Yv9vY6MYWBv6QTM86AuXhxlvysej81cJPOqvojWlW3UZy8QnVZy6CW36IVtr1oxYTHopi5gqFRplgCTEgivzeAT8BvgIAA92riORtzPD3HlTVRrp4U1MTXY5ok1GMaZrirCbY1ksZQI2KutKW3ebg0rhd4rdtj3bq67UdxrDzwQvCCBEgqiffAgYBD4ILy8cnngJmXEqRHfR4ENIbrL8SBUEKo9LMA7pIVziVwB3tCevAR+/jRSB+4h1NcmSRQCXzxUB3q1tGt1O1XHdYRZsJVDrg+vnwXs+pLcEN8qaRDB4RjON5BuIbjHQQli7RALi2XyJXlCnlgOS5ShNa+EugL06h9BehLWF8CfRmOd/RlON7Rl+VYI0JaLpEryxXywPIAebi246JNyx2yj5+c1l57XY6yWqHGjGrtt+NxQqtDENyuC3MiODfaw/GeHe/heM+Ox4S33o+04yWWPH1QWmOczXVJG6fEOKWNEz8KISlOTNqVTt2Bbj3dKp1Sn2qs04nRvy3Wtx9+Ev8nQptIf5yV04LhtsHmRX47X5ajdJDdZi/pYMEis681e1pstpzeZWUL5UXxPZ/MdllYd7Xg5H5WlNnOLoLZ8P49U9S1w9RdUQ43YnpO87y9lh/LtGxPHkzKQd5Gi3LSek7LsnhukWm6GLfAXbrA82E+nnxvW8pmGy9zkbZDTB/TDW/T+nW8dtgL01eMdUt5W1VhVHWh+kJbYX0MQHWBm/xpxMyhxminjxnui7hLTpf5YjIo8gId26OCtp83eVTLKyO5g/rAapQ9lMrIa5TGR7YYGHQexVUfGAWxr52SZNPiCVdhgqTnQTG9w3Wuba4DxblnUJ3R1t3VK6h678du/NnQRR06SQrdqHXgtAiK3K6NIje5vv36nwJvpJj81CugoWHyapLl/Ktj+OMT658cH3+7H73YAi/KD2q87tzEOyod6QfF3ujdxd+p60bvJt8qYgp2u46R7ihlpJvVjGi7oBFu1TSyd8qarG5WNkW1Wdzkaqu+yVWzxOOko9Uv" target="_blank"><span style="font-size:10pt;font-family:Arial;font-style:normal;text-decoration:underline;text-decoration-skip-ink:none;-webkit-text-decoration-skip:none;color:#1155cc;"><a class="in-cell-link" target="_blank" href="https://swaroopg92.github.io/penpa-edit/#m=solve&amp;p=zZVtT+M4EMff91Oc/HZH2jiOnQcJncrTSmgpcFuOgyhCoU1pIW120xZQKvaz74ztkqQt3MOrUxvnn5/tmXEmY8+Xw+JxCZzTXwTgACrwpNIX566+DHWgP1nkWfQbdJeLcVGiADg7PoZRms8zOLl+2D987D4fdf/6LG+EuOyNPj0cXlw+DK/+5BfO5HPp9PJgdnp+uJ9/+lLdnI67T9lRps7nxWCcZ+kwrW6uTl7y2XFwPx7xg5PxQTBKZ878R9APn/Yv9vY6MYWBv6QTM86AuXhxlvysej81cJPOqvojWlW3UZy8QnVZy6CW36IVtr1oxYTHopi5gqFRplgCTEgivzeAT8BvgIAA92riORtzPD3HlTVRrp4U1MTXY5ok1GMaZrirCbY1ksZQI2KutKW3ebg0rhd4rdtj3bq67UdxrDzwQvCCBEgqiffAgYBD4ILy8cnngJmXEqRHfR4ENIbrL8SBUEKo9LMA7pIVziVwB3tCevAR+/jRSB+4h1NcmSRQCXzxUB3q1tGt1O1XHdYRZsJVDrg+vnwXs+pLcEN8qaRDB4RjON5BuIbjHQQli7RALi2XyJXlCnlgOS5ShNa+EugL06h9BehLWF8CfRmOd/RlON7Rl+VYI0JaLpEryxXywPIAebi246JNyx2yj5+c1l57XY6yWqHGjGrtt+NxQqtDENyuC3MiODfaw/GeHe/heM+Ox4S33o+04yWWPH1QWmOczXVJG6fEOKWNEz8KISlOTNqVTt2Bbj3dKp1Sn2qs04nRvy3Wtx9+Ev8nQptIf5yV04LhtsHmRX47X5ajdJDdZi/pYMEis681e1pstpzeZWUL5UXxPZ/MdllYd7Xg5H5WlNnOLoLZ8P49U9S1w9RdUQ43YnpO87y9lh/LtGxPHkzKQd5Gi3LSek7LsnhukWm6GLfAXbrA82E+nnxvW8pmGy9zkbZDTB/TDW/T+nW8dtgL01eMdUt5W1VhVHWh+kJbYX0MQHWBm/xpxMyhxminjxnui7hLTpf5YjIo8gId26OCtp83eVTLKyO5g/rAapQ9lMrIa5TGR7YYGHQexVUfGAWxr52SZNPiCVdhgqTnQTG9w3Wuba4DxblnUJ3R1t3VK6h678du/NnQRR06SQrdqHXgtAiK3K6NIje5vv36nwJvpJj81CugoWHyapLl/Ktj+OMT658cH3+7H73YAi/KD2q87tzEOyod6QfF3ujdxd+p60bvJt8qYgp2u46R7ihlpJvVjGi7oBFu1TSyd8qarG5WNkW1Wdzkaqu+yVWzxOOko9Uv">Play this puzzle in Penpa!</a></span></a></div></div></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td></tr><tr style="height:21px;"><td style="width:505px;height:483px;overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;" rowspan="23" colspan="5"><span><div style="max-height:483px">=IMAGE("https://www.brownpuzzlehunt.com/_next/image?url=/_next/static/media/image1.0186406d.png&w=1080&q=75")</div></span></td></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr><td></td><td></td><td></td><td></td><td></td></tr></tbody></table>`,
};

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

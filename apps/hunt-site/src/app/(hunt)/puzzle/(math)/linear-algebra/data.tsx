import Image from "next/image";
import matrix from "./matrix.svg";
import { CopyData } from "../../components/puzzle/CopyButton";

/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "linear-algebra";

/**
 * The body renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = (
  <div className="max-w-3xl">
    <div className="mb-4">
      <i>
        As you get through your math homework, you remind yourself that it must
        be in your destiny to fill in matrices.
      </i>
    </div>
    <ol className="list-inside list-decimal">
      <li>
        <b>Please tell us about yourself.</b>
        <br /> In my family, we are great fans of cinema, video games, and
        music. I guess it was destined to happen, since my parents had their
        first date on the day when the world began its long debate about how
        many people could actually fit on a door. It was my dad's birthday,
        actually one of the best he ever had, as he claims. Surprisingly, the
        second birthday we celebrated with him together was also when the world
        learned about the dangers of inheriting jewelry from your uncle. Besides
        cinema, my dad loves video games. His recent obsession is Valorant, with
        an honorable mention of Counter-Strike. I suppose that's only natural,
        since he was born in the year the first commercially successful video
        game was released.
        <br />
        <br />
        As for my mother, she's a musician. My grandmother says it was meant to
        be, as she had been listening to A Night at the Opera nonstop just weeks
        before my mom was born. And then there was me, joining the family the
        same number of days after New Year's Day as the age gap between my
        parents.
        <br />
        <br />
        It's interesting how everything worked out that way. I do believe in
        signs, repeating numbers, and destiny. It is said that your destiny
        holds answers to any question - big or small. I know you might be
        skeptical, but it can even answer your math homework. Do you want to see
        how it can solve the matrix?
      </li>
      <li className="mt-4">
        <b>Fill in the matrix:</b>
        <div className="mt-4">
          <Image src={matrix} alt="" />
        </div>
      </li>
    </ol>
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
  "text/plain": `Linear Algebra						
As you get through your math homework, you remind yourself that it must be in your destiny to fill in matrices.						
						
1. Please tell us about yourself.						
In my family, we are great fans of cinema, video games, and music. I guess it was destined to happen, since my parents had their first date on the day when the world began its long debate about how many people could actually fit on a door. It was my dad's birthday, actually one of the best he ever had, as he claims. Surprisingly, the second birthday we celebrated with him together was also when the world learned about the dangers of inheriting jewelry from your uncle. Besides cinema, my dad loves video games. His recent obsession is Valorant, with an honorable mention of Counter-Strike. I suppose that's only natural, since he was born in the year the first commercially successful video game was released.						
						
As for my mother, she's a musician. My grandmother says it was meant to be, as she had been listening to A Night at the Opera nonstop just weeks before my mom was born. And then there was me, joining the family the same number of days after New Year's Day as the age gap between my parents.						
						
It's interesting how everything worked out that way. I do believe in signs, repeating numbers, and destiny. It is said that your destiny holds answers to any question - big or small. I know you might be skeptical, but it can even answer your math homework. Do you want to see how it can solve the matrix?						
						
2. Fill in the matrix:						
						
						
						
						
						
						
						
						
						
						
						
						
						
						
						
						
						
						
						
						`,
  "text/html": `<meta charset='utf-8'><google-sheets-html-origin><style type="text/css"><!--td {border: 1px solid #cccccc;}br {mso-data-placement:same-cell;}--></style><table xmlns="http://www.w3.org/1999/xhtml" cellspacing="0" cellpadding="0" dir="ltr" border="1" style="table-layout:fixed;font-size:10pt;font-family:Arial;width:0px;border-collapse:collapse;border:none" data-sheets-root="1" data-sheets-baot="1"><colgroup><col width="100"/><col width="100"/><col width="100"/><col width="100"/><col width="100"/><col width="100"/><col width="100"/></colgroup><tbody><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;">Linear Algebra</td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td></tr><tr style="height:21px;"><td style="border-right:1px solid transparent;overflow:visible;padding:2px 0px 2px 0px;vertical-align:bottom;font-style:italic;"><div style="white-space:nowrap;overflow:hidden;position:relative;width:701px;left:3px;"><div style="float:left;">As you get through your math homework, you remind yourself that it must be in your destiny to fill in matrices.</div></div></td><td style="border-right:1px solid transparent;overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="border-right:1px solid transparent;overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="border-right:1px solid transparent;overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="border-right:1px solid transparent;overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="border-right:1px solid transparent;overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td></tr><tr style="height:21px;"><td style="border-right:1px solid transparent;overflow:visible;padding:2px 0px 2px 0px;vertical-align:bottom;"><div style="white-space:nowrap;overflow:hidden;position:relative;width:196px;left:3px;"><div style="float:left;">1. Please tell us about yourself.</div></div></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;wrap-strategy:4;white-space:normal;word-wrap:break-word;" rowspan="1" colspan="7">In my family, we are great fans of cinema, video games, and music. I guess it was destined to happen, since my parents had their first date on the day when the world began its long debate about how many people could actually fit on a door. It was my dad&#39;s birthday, actually one of the best he ever had, as he claims. Surprisingly, the second birthday we celebrated with him together was also when the world learned about the dangers of inheriting jewelry from your uncle. Besides cinema, my dad loves video games. His recent obsession is Valorant, with an honorable mention of Counter-Strike. I suppose that&#39;s only natural, since he was born in the year the first commercially successful video game was released.</td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;wrap-strategy:4;white-space:normal;word-wrap:break-word;" rowspan="1" colspan="7">As for my mother, she&#39;s a musician. My grandmother says it was meant to be, as she had been listening to A Night at the Opera nonstop just weeks before my mom was born. And then there was me, joining the family the same number of days after New Year&#39;s Day as the age gap between my parents.</td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;wrap-strategy:4;white-space:normal;word-wrap:break-word;" rowspan="1" colspan="7">It&#39;s interesting how everything worked out that way. I do believe in signs, repeating numbers, and destiny. It is said that your destiny holds answers to any question - big or small. I know you might be skeptical, but it can even answer your math homework. Do you want to see how it can solve the matrix?</td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td></tr><tr style="height:21px;"><td style="border-right:1px solid transparent;overflow:visible;padding:2px 0px 2px 0px;vertical-align:bottom;"><div style="white-space:nowrap;overflow:hidden;position:relative;width:196px;left:3px;"><div style="float:left;">2. Fill in the matrix:</div></div></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;"></td></tr><tr style="height:21px;"><td style="width:707px;height:420px;overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;" rowspan="20" colspan="7"><span><div style="max-height:420px">=IMAGE("https://www.brownpuzzlehunt.com/_next/static/media/matrix.63bb8b9e.svg")</div></span></td></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr style="height:21px;"></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr></tbody></table>`,
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

import { CopyData } from "~/lib/copy";

/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "editing-practice";

/**
 * The body renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = (
  <div className="max-w-3xl space-y-4">
    <p>Dear Editor,</p>
    <p>
      Attached is my latest draft. I was trying to use common phrases to create
      a chilling atmosphere but I think I may have misremembered some of the
      sayings.
    </p>
    <p className="font-mono">
      In his two hardened decades as a private eye, Eddie Esterly had never had
      an icy dossier. That night—that woman—might just be what finally tipped
      him over. It would be a gelid 24 hours in Hades' fiery depths before he
      would give up the chase! Frigid eccrine gland secreted fluid prickled his
      brow, trickled down his neck like a warning.
    </p>
    <p className="font-mono">
      He didn't believe in gods or destiny, but alas, the glacial excruciatingly
      toilsome verisimilitude darkening his path! He could take frosty
      consolation in the thought that he would soon meet the ultimate test of
      his wits—that is, if she didn't once again give him the subzero scapula
      and surrounding region.
    </p>
    <p className="font-mono">
      His mind whirled around the memory often. He took a long drag of a
      cigar—he had tried several times before, but he had never been able to
      quit arctic meleagris. It eased his nerves, at least. It would all fall
      apart if he got a chilling 0.3048 meters now.
    </p>
    <p className="font-mono">
      He hailed a cab and paid the fare, handing over the last cool solid legal
      tender sewn into the lining of his overcoat. The city smoked and
      blackened. It would look different in the freezing diurnal sunshine.
    </p>
    <p className="font-mono">
      He had oft been accused of possessing a polar cardiovascular organ. Yet,
      he felt he had never been filled with more wanting. Grasping for what's
      just an extra directly ahead of him—so close, yet out of reach. This
      mystery or him—who was going to crack first?
    </p>
    <p className="w-full text-center font-mono text-[calc(min(5.128vw-1.641px,39.385px))]">
      ❄️ ___ ___ ___ … → ❄️ _ _ _ … [#]
    </p>
    <p className="w-full whitespace-pre text-center font-mono text-[calc(min(5.128vw-1.641px,39.385px))]">
      {"╰──────┬──────╯              "}
      <br />
      {"       #                     "}
    </p>
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
export const copyText: CopyData = {
  "text/plain": `Editing Practice
Dear Editor,
Attached is my latest draft. I was trying to use common phrases to create a chilling atmosphere but I think I may have misremembered some of the sayings.
In his two hardened decades as a private eye, Eddie Esterly had never had an icy dossier. That night—that woman—might just be what finally tipped him over. It would be a gelid 24 hours in Hades' fiery depths before he would give up the chase! Frigid eccrine gland secreted fluid prickled his brow, trickled down his neck like a warning.
He didn't believe in gods or destiny, but alas, the glacial excruciatingly toilsome verisimilitude darkening his path! He could take frosty consolation in the thought that he would soon meet the ultimate test of his wits—that is, if she didn't once again give him the subzero scapula and surrounding region.
His mind whirled around the memory often. He took a long drag of a cigar—he had tried several times before, but he had never been able to quit arctic meleagris. It eased his nerves, at least. It would all fall apart if he got a chilling 0.3048 meters now.
He hailed a cab and paid the fare, handing over the last cool solid legal tender sewn into the lining of his overcoat. The city smoked and blackened. It would look different in the freezing diurnal sunshine.
He had oft been accused of possessing a polar cardiovascular organ. Yet, he felt he had never been filled with more wanting. Grasping for what's just an extra directly ahead of him—so close, yet out of reach. This mystery or him—who was going to crack first?
❄️ ___ ___ ___ … → ❄️ _ _ _ … [#]
╰──────┬──────╯
#`,
  "text/html": `<meta charset='utf-8'><google-sheets-html-origin><style type="text/css"><!--td {border: 1px solid #cccccc;}br {mso-data-placement:same-cell;}--></style><table xmlns="http://www.w3.org/1999/xhtml" cellspacing="0" cellpadding="0" dir="ltr" border="1" style="table-layout:fixed;font-size:10pt;font-family:Arial;width:0px;border-collapse:collapse;border:none" data-sheets-root="1" data-sheets-baot="1"><colgroup><col width="100"/><col width="100"/><col width="100"/><col width="100"/><col width="100"/><col width="100"/></colgroup><tbody><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;" rowspan="1" colspan="6">Editing Practice</td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;wrap-strategy:4;white-space:normal;word-wrap:break-word;" rowspan="1" colspan="6">Dear Editor,</td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;wrap-strategy:4;white-space:normal;word-wrap:break-word;" rowspan="1" colspan="6">Attached is my latest draft. I was trying to use common phrases to create a chilling atmosphere but I think I may have misremembered some of the sayings.</td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;wrap-strategy:4;white-space:normal;word-wrap:break-word;" rowspan="1" colspan="6">In his two hardened decades as a private eye, Eddie Esterly had never had an icy dossier. That night—that woman—might just be what finally tipped him over. It would be a gelid 24 hours in Hades&#39; fiery depths before he would give up the chase! Frigid eccrine gland secreted fluid prickled his brow, trickled down his neck like a warning.</td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;wrap-strategy:4;white-space:normal;word-wrap:break-word;" rowspan="1" colspan="6">He didn&#39;t believe in gods or destiny, but alas, the glacial excruciatingly toilsome verisimilitude darkening his path! He could take frosty consolation in the thought that he would soon meet the ultimate test of his wits—that is, if she didn&#39;t once again give him the subzero scapula and surrounding region.</td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;wrap-strategy:4;white-space:normal;word-wrap:break-word;" rowspan="1" colspan="6">His mind whirled around the memory often. He took a long drag of a cigar—he had tried several times before, but he had never been able to quit arctic meleagris. It eased his nerves, at least. It would all fall apart if he got a chilling 0.3048 meters now.</td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;wrap-strategy:4;white-space:normal;word-wrap:break-word;" rowspan="1" colspan="6">He hailed a cab and paid the fare, handing over the last cool solid legal tender sewn into the lining of his overcoat. The city smoked and blackened. It would look different in the freezing diurnal sunshine.</td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;wrap-strategy:4;white-space:normal;word-wrap:break-word;" rowspan="1" colspan="6">He had oft been accused of possessing a polar cardiovascular organ. Yet, he felt he had never been filled with more wanting. Grasping for what&#39;s just an extra directly ahead of him—so close, yet out of reach. This mystery or him—who was going to crack first?</td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;wrap-strategy:4;white-space:normal;word-wrap:break-word;" rowspan="1" colspan="6">❄️ ___ ___ ___ … → ❄️ _ _ _ … [#]</td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;" rowspan="1" colspan="6">╰──────┬──────╯</td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;" rowspan="1" colspan="6">#</td></tr></tbody></table>`,
  "application/x-vnd.google-docs-embedded-grid_range_clip+wrapped": `{"dih":3814329958,"data":"{\\"cid\\":\\"[[[\\\\\\"1478813635\\\\\\",2,13,7,13]]]\\",\\"grh\\":\\"<google-sheets-html-origin><style type=\\\\\\"text/css\\\\\\"><!--td {border: 1px solid #cccccc;}br {mso-data-placement:same-cell;}--></style><table xmlns=\\\\\\"http://www.w3.org/1999/xhtml\\\\\\" cellspacing=\\\\\\"0\\\\\\" cellpadding=\\\\\\"0\\\\\\" dir=\\\\\\"ltr\\\\\\" border=\\\\\\"1\\\\\\" style=\\\\\\"table-layout:fixed;font-size:10pt;font-family:Arial;width:0px;border-collapse:collapse;border:none\\\\\\" data-sheets-root=\\\\\\"1\\\\\\" data-sheets-baot=\\\\\\"1\\\\\\"><colgroup><col width=\\\\\\"100\\\\\\"/><col width=\\\\\\"100\\\\\\"/><col width=\\\\\\"100\\\\\\"/><col width=\\\\\\"100\\\\\\"/><col width=\\\\\\"100\\\\\\"/><col width=\\\\\\"100\\\\\\"/></colgroup><tbody><tr style=\\\\\\"height:21px;\\\\\\"><td style=\\\\\\"overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;\\\\\\" rowspan=\\\\\\"1\\\\\\" colspan=\\\\\\"6\\\\\\">Editing Practice</td></tr><tr style=\\\\\\"height:21px;\\\\\\"><td style=\\\\\\"overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;wrap-strategy:4;white-space:normal;word-wrap:break-word;\\\\\\" rowspan=\\\\\\"1\\\\\\" colspan=\\\\\\"6\\\\\\">Dear Editor,</td></tr><tr style=\\\\\\"height:21px;\\\\\\"><td style=\\\\\\"overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;wrap-strategy:4;white-space:normal;word-wrap:break-word;\\\\\\" rowspan=\\\\\\"1\\\\\\" colspan=\\\\\\"6\\\\\\">Attached is my latest draft. I was trying to use common phrases to create a chilling atmosphere but I think I may have misremembered some of the sayings.</td></tr><tr style=\\\\\\"height:21px;\\\\\\"><td style=\\\\\\"overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;wrap-strategy:4;white-space:normal;word-wrap:break-word;\\\\\\" rowspan=\\\\\\"1\\\\\\" colspan=\\\\\\"6\\\\\\">In his two hardened decades as a private eye, Eddie Esterly had never had an icy dossier. That night—that woman—might just be what finally tipped him over. It would be a gelid 24 hours in Hades&#39; fiery depths before he would give up the chase! Frigid eccrine gland secreted fluid prickled his brow, trickled down his neck like a warning.</td></tr><tr style=\\\\\\"height:21px;\\\\\\"><td style=\\\\\\"overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;wrap-strategy:4;white-space:normal;word-wrap:break-word;\\\\\\" rowspan=\\\\\\"1\\\\\\" colspan=\\\\\\"6\\\\\\">He didn&#39;t believe in gods or destiny, but alas, the glacial excruciatingly toilsome verisimilitude darkening his path! He could take frosty consolation in the thought that he would soon meet the ultimate test of his wits—that is, if she didn&#39;t once again give him the subzero scapula and surrounding region.</td></tr><tr style=\\\\\\"height:21px;\\\\\\"><td style=\\\\\\"overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;wrap-strategy:4;white-space:normal;word-wrap:break-word;\\\\\\" rowspan=\\\\\\"1\\\\\\" colspan=\\\\\\"6\\\\\\">His mind whirled around the memory often. He took a long drag of a cigar—he had tried several times before, but he had never been able to quit arctic meleagris. It eased his nerves, at least. It would all fall apart if he got a chilling 0.3048 meters now.</td></tr><tr style=\\\\\\"height:21px;\\\\\\"><td style=\\\\\\"overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;wrap-strategy:4;white-space:normal;word-wrap:break-word;\\\\\\" rowspan=\\\\\\"1\\\\\\" colspan=\\\\\\"6\\\\\\">He hailed a cab and paid the fare, handing over the last cool solid legal tender sewn into the lining of his overcoat. The city smoked and blackened. It would look different in the freezing diurnal sunshine.</td></tr><tr style=\\\\\\"height:21px;\\\\\\"><td style=\\\\\\"overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;wrap-strategy:4;white-space:normal;word-wrap:break-word;\\\\\\" rowspan=\\\\\\"1\\\\\\" colspan=\\\\\\"6\\\\\\">He had oft been accused of possessing a polar cardiovascular organ. Yet, he felt he had never been filled with more wanting. Grasping for what&#39;s just an extra directly ahead of him—so close, yet out of reach. This mystery or him—who was going to crack first?</td></tr><tr style=\\\\\\"height:21px;\\\\\\"><td style=\\\\\\"overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;wrap-strategy:4;white-space:normal;word-wrap:break-word;\\\\\\" rowspan=\\\\\\"1\\\\\\" colspan=\\\\\\"6\\\\\\">❄️ ___ ___ ___ … → ❄️ _ _ _ … [#]</td></tr><tr style=\\\\\\"height:21px;\\\\\\"><td style=\\\\\\"overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;\\\\\\" rowspan=\\\\\\"1\\\\\\" colspan=\\\\\\"6\\\\\\">╰──────┬──────╯</td></tr><tr style=\\\\\\"height:21px;\\\\\\"><td style=\\\\\\"overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;\\\\\\" rowspan=\\\\\\"1\\\\\\" colspan=\\\\\\"6\\\\\\">#</td></tr></tbody></table>\\",\\"csm\\":\\"[null,null,[[[[\\\\\\"bV1YlwP8SEPnTiyJb/W/sQ==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"],[\\\\\\"bV1YlwP8SEPnTiyJb/W/sQ==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"],[\\\\\\"bV1YlwP8SEPnTiyJb/W/sQ==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"],[\\\\\\"bV1YlwP8SEPnTiyJb/W/sQ==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"],[\\\\\\"bV1YlwP8SEPnTiyJb/W/sQ==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"],[\\\\\\"bV1YlwP8SEPnTiyJb/W/sQ==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"]]],[[[\\\\\\"uGebwgN8AbZb8oPkqfghqw==\\\\\\",\\\\\\"mpMIkmLrHCNBsmNcLDtDiw==\\\\\\"],[\\\\\\"uGebwgN8AbZb8oPkqfghqw==\\\\\\",\\\\\\"mpMIkmLrHCNBsmNcLDtDiw==\\\\\\"],[\\\\\\"uGebwgN8AbZb8oPkqfghqw==\\\\\\",\\\\\\"mpMIkmLrHCNBsmNcLDtDiw==\\\\\\"],[\\\\\\"uGebwgN8AbZb8oPkqfghqw==\\\\\\",\\\\\\"mpMIkmLrHCNBsmNcLDtDiw==\\\\\\"],[\\\\\\"uGebwgN8AbZb8oPkqfghqw==\\\\\\",\\\\\\"mpMIkmLrHCNBsmNcLDtDiw==\\\\\\"],[\\\\\\"uGebwgN8AbZb8oPkqfghqw==\\\\\\",\\\\\\"mpMIkmLrHCNBsmNcLDtDiw==\\\\\\"]]],[[[\\\\\\"nTEOTqWyKHeBIzvKnYIy4Q==\\\\\\",\\\\\\"mpMIkmLrHCNBsmNcLDtDiw==\\\\\\"],[\\\\\\"nTEOTqWyKHeBIzvKnYIy4Q==\\\\\\",\\\\\\"mpMIkmLrHCNBsmNcLDtDiw==\\\\\\"],[\\\\\\"nTEOTqWyKHeBIzvKnYIy4Q==\\\\\\",\\\\\\"mpMIkmLrHCNBsmNcLDtDiw==\\\\\\"],[\\\\\\"nTEOTqWyKHeBIzvKnYIy4Q==\\\\\\",\\\\\\"mpMIkmLrHCNBsmNcLDtDiw==\\\\\\"],[\\\\\\"nTEOTqWyKHeBIzvKnYIy4Q==\\\\\\",\\\\\\"mpMIkmLrHCNBsmNcLDtDiw==\\\\\\"],[\\\\\\"nTEOTqWyKHeBIzvKnYIy4Q==\\\\\\",\\\\\\"mpMIkmLrHCNBsmNcLDtDiw==\\\\\\"]]],[[[\\\\\\"UCvLuW6aqWnJPSCsCsjG3w==\\\\\\",\\\\\\"mpMIkmLrHCNBsmNcLDtDiw==\\\\\\"],[\\\\\\"UCvLuW6aqWnJPSCsCsjG3w==\\\\\\",\\\\\\"mpMIkmLrHCNBsmNcLDtDiw==\\\\\\"],[\\\\\\"UCvLuW6aqWnJPSCsCsjG3w==\\\\\\",\\\\\\"mpMIkmLrHCNBsmNcLDtDiw==\\\\\\"],[\\\\\\"UCvLuW6aqWnJPSCsCsjG3w==\\\\\\",\\\\\\"mpMIkmLrHCNBsmNcLDtDiw==\\\\\\"],[\\\\\\"UCvLuW6aqWnJPSCsCsjG3w==\\\\\\",\\\\\\"mpMIkmLrHCNBsmNcLDtDiw==\\\\\\"],[\\\\\\"UCvLuW6aqWnJPSCsCsjG3w==\\\\\\",\\\\\\"mpMIkmLrHCNBsmNcLDtDiw==\\\\\\"]]],[[[\\\\\\"c+PsH1iaobravyKaVN0bjg==\\\\\\",\\\\\\"mpMIkmLrHCNBsmNcLDtDiw==\\\\\\"],[\\\\\\"c+PsH1iaobravyKaVN0bjg==\\\\\\",\\\\\\"mpMIkmLrHCNBsmNcLDtDiw==\\\\\\"],[\\\\\\"c+PsH1iaobravyKaVN0bjg==\\\\\\",\\\\\\"mpMIkmLrHCNBsmNcLDtDiw==\\\\\\"],[\\\\\\"c+PsH1iaobravyKaVN0bjg==\\\\\\",\\\\\\"mpMIkmLrHCNBsmNcLDtDiw==\\\\\\"],[\\\\\\"c+PsH1iaobravyKaVN0bjg==\\\\\\",\\\\\\"mpMIkmLrHCNBsmNcLDtDiw==\\\\\\"],[\\\\\\"c+PsH1iaobravyKaVN0bjg==\\\\\\",\\\\\\"mpMIkmLrHCNBsmNcLDtDiw==\\\\\\"]]],[[[\\\\\\"ltgf0xsBHYwQQ7h3GI3v2g==\\\\\\",\\\\\\"mpMIkmLrHCNBsmNcLDtDiw==\\\\\\"],[\\\\\\"ltgf0xsBHYwQQ7h3GI3v2g==\\\\\\",\\\\\\"mpMIkmLrHCNBsmNcLDtDiw==\\\\\\"],[\\\\\\"ltgf0xsBHYwQQ7h3GI3v2g==\\\\\\",\\\\\\"mpMIkmLrHCNBsmNcLDtDiw==\\\\\\"],[\\\\\\"ltgf0xsBHYwQQ7h3GI3v2g==\\\\\\",\\\\\\"mpMIkmLrHCNBsmNcLDtDiw==\\\\\\"],[\\\\\\"ltgf0xsBHYwQQ7h3GI3v2g==\\\\\\",\\\\\\"mpMIkmLrHCNBsmNcLDtDiw==\\\\\\"],[\\\\\\"ltgf0xsBHYwQQ7h3GI3v2g==\\\\\\",\\\\\\"mpMIkmLrHCNBsmNcLDtDiw==\\\\\\"]]],[[[\\\\\\"phYGmbcEK0YLxOJ8HnKCLw==\\\\\\",\\\\\\"mpMIkmLrHCNBsmNcLDtDiw==\\\\\\"],[\\\\\\"phYGmbcEK0YLxOJ8HnKCLw==\\\\\\",\\\\\\"mpMIkmLrHCNBsmNcLDtDiw==\\\\\\"],[\\\\\\"phYGmbcEK0YLxOJ8HnKCLw==\\\\\\",\\\\\\"mpMIkmLrHCNBsmNcLDtDiw==\\\\\\"],[\\\\\\"phYGmbcEK0YLxOJ8HnKCLw==\\\\\\",\\\\\\"mpMIkmLrHCNBsmNcLDtDiw==\\\\\\"],[\\\\\\"phYGmbcEK0YLxOJ8HnKCLw==\\\\\\",\\\\\\"mpMIkmLrHCNBsmNcLDtDiw==\\\\\\"],[\\\\\\"phYGmbcEK0YLxOJ8HnKCLw==\\\\\\",\\\\\\"mpMIkmLrHCNBsmNcLDtDiw==\\\\\\"]]],[[[\\\\\\"2LvaS1Yd9DPOpBT6l9UlBA==\\\\\\",\\\\\\"mpMIkmLrHCNBsmNcLDtDiw==\\\\\\"],[\\\\\\"2LvaS1Yd9DPOpBT6l9UlBA==\\\\\\",\\\\\\"mpMIkmLrHCNBsmNcLDtDiw==\\\\\\"],[\\\\\\"2LvaS1Yd9DPOpBT6l9UlBA==\\\\\\",\\\\\\"mpMIkmLrHCNBsmNcLDtDiw==\\\\\\"],[\\\\\\"2LvaS1Yd9DPOpBT6l9UlBA==\\\\\\",\\\\\\"mpMIkmLrHCNBsmNcLDtDiw==\\\\\\"],[\\\\\\"2LvaS1Yd9DPOpBT6l9UlBA==\\\\\\",\\\\\\"mpMIkmLrHCNBsmNcLDtDiw==\\\\\\"],[\\\\\\"2LvaS1Yd9DPOpBT6l9UlBA==\\\\\\",\\\\\\"mpMIkmLrHCNBsmNcLDtDiw==\\\\\\"]]],[[[\\\\\\"cus7/2V8turcvPDIa35SHw==\\\\\\",\\\\\\"mpMIkmLrHCNBsmNcLDtDiw==\\\\\\"],[\\\\\\"cus7/2V8turcvPDIa35SHw==\\\\\\",\\\\\\"mpMIkmLrHCNBsmNcLDtDiw==\\\\\\"],[\\\\\\"cus7/2V8turcvPDIa35SHw==\\\\\\",\\\\\\"mpMIkmLrHCNBsmNcLDtDiw==\\\\\\"],[\\\\\\"cus7/2V8turcvPDIa35SHw==\\\\\\",\\\\\\"mpMIkmLrHCNBsmNcLDtDiw==\\\\\\"],[\\\\\\"cus7/2V8turcvPDIa35SHw==\\\\\\",\\\\\\"mpMIkmLrHCNBsmNcLDtDiw==\\\\\\"],[\\\\\\"cus7/2V8turcvPDIa35SHw==\\\\\\",\\\\\\"mpMIkmLrHCNBsmNcLDtDiw==\\\\\\"]]],[[[\\\\\\"+1y3Odno+3yQPW9IbBSlFw==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"],[\\\\\\"+1y3Odno+3yQPW9IbBSlFw==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"],[\\\\\\"+1y3Odno+3yQPW9IbBSlFw==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"],[\\\\\\"+1y3Odno+3yQPW9IbBSlFw==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"],[\\\\\\"+1y3Odno+3yQPW9IbBSlFw==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"],[\\\\\\"+1y3Odno+3yQPW9IbBSlFw==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"]]],[[[\\\\\\"MSay7+xqKtdCTvA6hHIrtg==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"],[\\\\\\"MSay7+xqKtdCTvA6hHIrtg==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"],[\\\\\\"MSay7+xqKtdCTvA6hHIrtg==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"],[\\\\\\"MSay7+xqKtdCTvA6hHIrtg==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"],[\\\\\\"MSay7+xqKtdCTvA6hHIrtg==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"],[\\\\\\"MSay7+xqKtdCTvA6hHIrtg==\\\\\\",\\\\\\"WpaOJp8Uw53CuF/653QBqQ==\\\\\\"]]]]]\\"}","edi":"XXeqrCjMLP1i85vX3uPF8KjJM-vh_uxD9F_Es9YZod1HJfI4X-uPYZYsSZ8JBtmEZqJbo4m3FtpDs6V8LUMlBbqWF6NhFmZuJUzpU7Nrb8YP","edrk":"fzJQAJ6h5C-XswbNGXC7MhL5wKHS6SQxkrQhn71o80LySMeAcQ..","dct":"ritz","ds":false,"cses":false,"sm":"other"}`,
  "application/x-vnd.google-docs-internal-clip-id": `5c01914e-7fff-ed3f-d211-8e87a4248a1b`,
  "application/x-vnd.google-spreadsheet-compact-table+json": `{"1":1,"2":[195,-5,0,195,-5,0,195,-5,0,195,-5,0,195,-5,0,195,-5,0,195,-5,0,195,-5,0,195,-5,0,195,-5,0,195,-5,0],"3":{"1":[2,2,2,2,2,2,2,2,2,2,2],"4":["Editing Practice","Dear Editor,","Attached is my latest draft. I was trying to use common phrases to create a chilling atmosphere but I think I may have misremembered some of the sayings.","In his two hardened decades as a private eye, Eddie Esterly had never had an icy dossier. That night—that woman—might just be what finally tipped him over. It would be a gelid 24 hours in Hades' fiery depths before he would give up the chase! Frigid eccrine gland secreted fluid prickled his brow, trickled down his neck like a warning.","He didn't believe in gods or destiny, but alas, the glacial excruciatingly toilsome verisimilitude darkening his path! He could take frosty consolation in the thought that he would soon meet the ultimate test of his wits—that is, if she didn't once again give him the subzero scapula and surrounding region.","His mind whirled around the memory often. He took a long drag of a cigar—he had tried several times before, but he had never been able to quit arctic meleagris. It eased his nerves, at least. It would all fall apart if he got a chilling 0.3048 meters now.","He hailed a cab and paid the fare, handing over the last cool solid legal tender sewn into the lining of his overcoat. The city smoked and blackened. It would look different in the freezing diurnal sunshine.","He had oft been accused of possessing a polar cardiovascular organ. Yet, he felt he had never been filled with more wanting. Grasping for what's just an extra directly ahead of him—so close, yet out of reach. This mystery or him—who was going to crack first?","❄️ ___ ___ ___ … → ❄️ _ _ _ … [#]","╰──────┬──────╯","#"]},"4":[{"2":4224,"10":2,"15":"Arial"},{"2":4480,"10":2,"11":4,"15":"Arial"}],"5":[0,-8,1,-2,0],"12":[-11,1],"13":[-11,6],"15":{"1":11,"2":6},"20":66}`,
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

"use client";

import {
  TOCContext,
  useTOCContextValues,
  TOCSection,
  TableOfContents,
} from "../TableOfContents";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function WrapUp() {
  const values = useTOCContextValues();
  return (
    <TOCContext.Provider value={values}>
      <div className="flex px-4">
        <TableOfContents />

        {/* Spacer since TOC is fixed */}
        <div className="md:w-1/3 xl:w-1/5"></div>

        <div className="w-full md:w-2/3 xl:w-3/5">
          <article className="prose prose-wrapup w-full max-w-none bg-black/30 p-6 prose-img:my-0">
            <h1 className="font-semibold text-amber-300">Wrapup</h1>
            <p>
              Congratulations to the 12 in-person teams and 74 remote teams who
              finished the hunt!
            </p>
            <p>
              Congrats to our winning in-person team,{" "}
              <span className="font-semibold text-amber-400">
                air bud: golden receiver
              </span>
              , and our first in-person finisher,{" "}
              <span className="font-semibold text-amber-400">
                Living Off Hope
              </span>
              !
            </p>
            <p>
              Another congratulations to our first remote finishers,{" "}
              <span className="font-semibold text-amber-400">
                ⡫ I GUESS WE CAN'T ALL SIT NEXT TO EACH OTHER
              </span>
              , and our first remote finishers solving with a Box,{" "}
              <span className="font-semibold text-amber-400">chat</span>!
            </p>

            {/* QUICK STATS */}
            <h3>Quick Summary</h3>
            <Table className="my-0 w-fit">
              <TableHeader>
                <TableRow className="hover:bg-inherit">
                  <TableHead className="text-main-header"></TableHead>
                  <TableHead className="text-main-header">In Person</TableHead>
                  <TableHead className="text-main-header">Remote Box</TableHead>
                  <TableHead className="text-main-header">Remote</TableHead>
                  <TableHead className="text-main-header">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="pointer-events-none">
                <TableRow>
                  <TableHead className="text-main-header">Teams</TableHead>
                  <TableCell className="text-center">40</TableCell>
                  <TableCell className="text-center">49</TableCell>
                  <TableCell className="text-center">271</TableCell>
                  <TableCell className="text-center">360</TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="text-main-header">Finishers</TableHead>
                  <TableCell className="text-center">12</TableCell>
                  <TableCell className="text-center">27</TableCell>
                  <TableCell className="text-center">47</TableCell>
                  <TableCell className="text-center">86</TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="text-main-header">
                    Action Meta Solves
                  </TableHead>
                  <TableCell className="text-center">29</TableCell>
                  <TableCell className="text-center">38</TableCell>
                  <TableCell className="text-center">139</TableCell>
                  <TableCell className="text-center">206</TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="text-main-header">
                    Participants
                  </TableHead>
                  <TableCell className="text-center">247</TableCell>
                  <TableCell className="text-center">129</TableCell>
                  <TableCell className="text-center">487</TableCell>
                  <TableCell className="text-center">863</TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="text-main-header">Hints</TableHead>
                  <TableCell className="text-center">163</TableCell>
                  <TableCell className="text-center">205</TableCell>
                  <TableCell className="text-center">908</TableCell>
                  <TableCell className="text-center">1276</TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="text-main-header">Guesses</TableHead>
                  <TableCell className="text-center">3751</TableCell>
                  <TableCell className="text-center">8172</TableCell>
                  <TableCell className="text-center">23521</TableCell>
                  <TableCell className="text-center">35444</TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="text-main-header">Solves</TableHead>
                  <TableCell className="text-center">1118</TableCell>
                  <TableCell className="text-center">1936</TableCell>
                  <TableCell className="text-center">5343</TableCell>
                  <TableCell className="text-center">8397</TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <TOCSection sectionId={0} tocTitle="Timeline & Logistics" isFirst>
              <h2>Timeline & Logistics</h2>
              <p>
                <i>By Megan Carlson and Thomas Gordon</i>
              </p>

              <p>
                Brown Puzzlehunt is a beast of an event to plan. We took on a
                lot of ambitious logistical challenges this year, from running
                two weekends to Boxes to a full-steam-ahead timeline. It takes
                someone slightly insane to keep on top of all of the many things
                going on with our event at any given time and fortunately we
                have that delusion in abundance.
              </p>

              <p>
                We booked on-campus rooms last November, and ended up occupying
                around 30 rooms across several buildings during our in-person
                weekend. It took consistent cooperation with the Student
                Activities Office, Undergraduate Finance Board, and scheduling
                office to make this event happen, and we're incredibly grateful
                for their cooperation in our shenanigans. Huge shoutout to our
                SAO advisor, Malcom Moniz, for all of their help in helping us
                pull this together!
              </p>
            </TOCSection>

            <TOCSection sectionId={1} tocTitle="Timeline" parentId={0}>
              <h3>Timeline</h3>
              <ul>
                <li>September 13th: Theme selected</li>
                <li>September 19th: First BPH SAO meeting</li>
                <li>September 22nd: First writing meeting</li>
                <li>October 6th: Meta writing groups formed</li>
                <li>October 20th: First tech meeting</li>
                <li>November 3rd: All metas written (more or less)</li>
                <li>November 17th: Feeder answers released</li>
                <li>November 17th: First feeder puzzle written (Find Ben)</li>
                <li>
                  November 23rd:{" "}
                  <a
                    // TODO: may need to migrate at some point
                    href="https://puzzlethon.brownpuzzle.club/"
                    className="text-link no-underline hover:underline"
                  >
                    Puzzlethon
                  </a>
                  !
                </li>
                <li>January 17th-20th: BPH writers go to Mystery Hunt </li>
                <li>January 23rd: BPH is SAO approved</li>
                <li>January 27th: Brown Puzzlehunt 2025 publicly announced!</li>
                <li>February 11th: First events planning meeting</li>
                <li>February 14th: First story meeting</li>
                <li>February 22nd: First art meeting</li>
                <li>March 8th-9th: In-person full testsolve</li>
                <li>March 15th-16th: Remote full testsolve</li>
                <li>April 2nd: Boxes shipped</li>
                <li>April 6th: BPH dry run</li>
                <li>April 12th: Last puzzle written 🥲</li>
                <li>April 12th-13th: In-person hunt!</li>
                <li>April 19th-25th: Remote hunt!</li>
                <li>Now: sleep 😴</li>
              </ul>
            </TOCSection>

            <TOCSection sectionId={2} tocTitle="Two Weekends" parentId={0}>
              <h3>Two Weekends</h3>
              <p>
                This was an early innovation, pitched some time in
                mid-September. The idea was to separate two very different kinds
                of resource consumption; the in-person hunt, which requires
                innumerable person-hours, team check-ins, classroom space,
                props, and live performance; and remote hunt, which requires
                greater website infrastructure, and hinting (which can be done
                remotely).
              </p>

              <p>
                This was very successful, and we're probably going to do it next
                year as well. It also convinced us that our hunt was more or
                less Good before we released it to the Online Hunt Community,
                which is always a scary proposition.
              </p>
            </TOCSection>

            <TOCSection sectionId={3} tocTitle="The Boxes" parentId={0}>
              <h3>The Boxes</h3>
              <i>Thomas says:</i>
              <p>
                The Box was an idea I vaguely floated at an in-person meeting
                around late November and early December, inspired by Peppermint
                Herrings' (very successful!) Advent Hunt. Megan took my
                ramblings and proceeded to dedicate a significantly large
                portion of her time into making it a reality.
              </p>

              <p>
                Once SAO had approved our idea, all that remained was to come up
                with enough physical puzzles to actually justify the idea. More
                physical puzzles had already been an explicit goal, but the Box
                reinforced our desire to come up with many interesting, distinct
                physical puzzles.
              </p>

              <p>
                In hindsight, I think we could have done a little more work in
                making sure that each of the puzzles in the Box required their
                physicality. While each of the puzzles in the Box benefited from
                being physical objects (either thematically, or by making
                certain steps easier), we didn't have any objects which
                absolutely could not be solved in a non-physical format. This
                was a double-edged sword. It made remote accessibility much,
                much easier; but it did limit the capabilities of the puzzles
                themselves. Our low difficulty ceiling also limited the
                complexity of physical manipulation.
              </p>

              <p>
                However, making physical objects with hidden "aspects" that
                cannot be discovered early is really, really hard. As a small
                aside, hiding information is very difficult; you either need to
                hide it behind a physical transformation (often a destruction,
                like applying liquids, breaking it in half, or setting it on
                fire), or require the application of a tool that you yourself
                need to provide (such as a UV light or magnet). The former is
                extremely difficult to construct at scale, and the latter
                necessarily would be spoiled by the inclusion of said tools in
                the Box. This is still something I'm puzzling over, and if we
                decide to do Boxes next year, it will be something we work
                harder on.
              </p>

              <i>Megan says:</i>
              <p>
                The Boxes haunted my dreams for a significant part of the
                semester. Figuring out how to make the remote solving experience
                live up to all of the cool things we orchestrate for in-person
                weekend is consistently a challenge, and in the past some things
                have ultimately ended up fully inaccessible due mostly to a lack
                of bandwidth to make perfectly remote accessible versions. So,
                when Thomas pitched mailing puzzles to people, I knew what I was
                signing up for but figured it would be worth the effort in the
                end.
              </p>

              <p>
                First, I had to make a desperate plea to the student activities
                office to let us do something like this. Spending our
                Brown-allotted funding on providing supplies for non-Brown
                community members is mildly frowned upon, so we needed to evenly
                split our purchases between raised funds and club funding
                (easier said than done).
              </p>

              <p>
                Once greenlit, we began brainstorming what sorts of things to
                put into the Box. Puzzle design aside, we aimed to keep things
                quite small / light from a shipping perspective. Turns out,
                figuring out how to send an unknown amount of objects of an
                unknown weight and unknown size is not the easiest thing to
                calculate, so shipping was a big unknown for most of our
                planning process. After many (MANY) spreadsheets and a few too
                many questionable emails to supply manufacturers, we got enough
                of a rough idea of what we wanted to put into the Box that we
                were able to settle on a price. The goal was to get as close as
                possible to charging exactly what we'd be paying for the raw
                materials, but with a little extra wiggle room so as not to
                inadvertently send our club into crippling debt. We settled on
                $19, which I think is a pretty reasonable rate for all of the
                things the Box contained. I'd say the highest value items are
                certainly the cards, followed by the pin and stickers. While as
                Thomas mentioned we got some feedback that not everything in the
                Box necessarily needed to be a physical puzzle, which is
                certainly true, I'd argue that the value from a few items alone
                made it worth the price we charged for it. For transparency, we
                ended up with a small amount of extra Box profit due to
                conservative shipping estimates, so we spent it on feeding
                ourselves during in-person weekend (which I'd say is a worthy
                expense).
              </p>

              <p>
                Knowing that we were going to ship Boxes put a pretty tight
                timeline on all of the puzzles being written for it. Despite my
                pleading, our club notoriously operates on a pretty last-minute
                timeframe, so the necessity of having several puzzles completely
                and irreversibly done was a new challenge. Cards in particular
                had to be done super early, as there was a significant
                turnaround time to get the nice poker cards and instructions
                booklets designed and printed.
              </p>

              <p>
                Beyond just puzzle construction constraints, physical
                manufacturing proved a beast. Those packing peanuts took years
                off our lives, and many a late night was spent in Page-Robinson
                hall with Box materials strewn about the floor.
              </p>

              <div className="grid grid-cols-3 gap-4">
                <img
                  className="rounded-md"
                  src="/wrapup/images/image30.jpg"
                  alt=""
                />
                <img
                  className="rounded-md"
                  src="/wrapup/images/image63.jpg"
                  alt=""
                />
                <img
                  className="rounded-md"
                  src="/wrapup/images/image38.jpg"
                  alt=""
                />
                <img
                  className="rounded-md"
                  src="/wrapup/images/image21.jpg"
                  alt=""
                />
                <img
                  className="rounded-md"
                  src="/wrapup/images/image72.jpg"
                  alt=""
                />
                <img
                  className="rounded-md"
                  src="/wrapup/images/image8.png"
                  alt=""
                />
              </div>

              <p>
                It was a ton of work to put together, so while it certainly had
                its flaws I think we ultimately did a cool and (somewhat unique)
                thing! Who's to say whether we will attempt something like this
                again in the future. It certainly had its merits but also
                somewhat constrained our in-person physical puzzle efforts and
                took up a lot of bandwidth for a very long time. Despite its
                flaws (and likely missing / erroneous packing peanuts), I hope
                everyone who got a Box can see all the time and effort we put
                into each component.
              </p>
            </TOCSection>

            <TOCSection sectionId={4} tocTitle="The Writing Process">
              <h2>The Writing Process</h2>
              <i>By Thomas Gordan and Arnav Singhal</i>
            </TOCSection>

            <TOCSection sectionId={5} tocTitle="Hunt Structure" parentId={4}>
              <h3>Hunt Structure</h3>
              <p>
                The overall structure of the hunt had two broad goals. Firstly,
                we wanted to experiment with writing smaller, somewhat-easier
                puzzles. Last year's hunt had mostly been about designing
                larger, more difficult puzzles; now we wanted to mess around on
                the other end of the spectrum.
              </p>

              <p>
                Secondly, we wanted to give people a sense of exploring physical
                space, through an adjacency unlock structure and a dedicated map
                screen. In practice, this did not happen very successfully.
                Experienced solvers often ended up ignoring the map function for
                the less pretty but more information-dense puzzle list; this had
                the downside of them getting stuck later in the hunt, when
                information from the map became useful. Many solvers did,
                however, use the map function throughout the hunt; those solvers
                enjoyed a slight competitive advantage towards the end.
              </p>

              <p>
                We were strongly aware that this might happen. However, the map
                was not quick enough on all devices for us to only present that
                option, and we were reasonably confident that our map-dependent
                puzzles would force all solvers to, at some point, see our cool
                art. And it was quite satisfying to watch very capable solvers
                collide face-first against their own assumption that certain
                aspects of the hunt would not be useful.
              </p>

              <p>
                From the first point grew an entirely different beast, which was
                our sequences! Sequences began as a way for puzzle-writers to
                demonstrate more flexibility, and explore more complicated
                puzzle ideas that would not fit into just one feeder.
              </p>

              <p>
                Our implementation of this was strongly inspired by the 2024
                Galactic Puzzlehunt. Indeed, our first pitch meeting for the
                hunt's structure was on the 22nd of September 2024, while GPH24
                was still running.
              </p>

              <p>
                From GPH24, we took these original ideas of easier overall
                difficulty and "linked" puzzles. However, one aspect of GPH24
                that we felt could be improved upon was the lack of connection
                between all the puzzles; the vast majority of puzzles in GPH24
                did not fall into a sequence, and thus felt broadly unconnected
                to the hunt. While this was successful for them due to their
                random unlock structure, user-submitted puzzles, and overall
                high polish, we were not convinced that it would be successful
                for our purposes. We also wanted to show off.
              </p>
            </TOCSection>

            <TOCSection sectionId={6} tocTitle="Sequences" parentId={4}>
              <h3>Sequences</h3>
              <p>
                The initial intent was actually not for there to be 12
                sequences, and for the Horror round to entirely contain sequence
                metapuzzles. While I (Thomas) was distinctly aware that it could
                be a possibility, I did not necessarily want to make any
                decisions that would lock us into doing it; for much of the
                early part of the development process, our explicit aim was to
                only have six or so sequence metapuzzles in the Horror round. It
                was only around late January that it became clear to me that 12
                (as it was referred to in shorthand) was actually possible.
              </p>
              <p>
                The overall implementation strategy was simple. In October we
                formed groups of writers to create our six "main" rounds:
                Action, Drama, Comedy, Reality, Animation (later nicknamed
                Digging, and finally named Adventure), and Cerebral (later
                renamed Horror). These writers had the goal of sticking closely
                to the overall movie theme, as well as the genre theme of their
                choice. Overall, we felt that all of our round metas were very
                successful; they felt thematically cohesive and mechanically
                relevant to each of our rounds. We also wanted to enforce high
                overall answer quality to allow for as much sequence flexibility
                as possible; we (mostly) succeeded here too.
              </p>
              <p>
                After that, authors interested in writing sequences were free to
                claim as many answers throughout the hunt as they desired, as
                long as they claimed at least one answer in Horror as their
                "meta". These metas were not necessarily required to use the
                answers of the other puzzles in their sequence; they could also
                use mechanics of previous puzzles, or simply act as a thematic
                capstone that would be a satisfying "ending".
              </p>
              <p>
                The idea of having 12 sequences got significant pushback
                throughout the year. Standing concerns included the fact that
                this might restrict puzzle authors too much, or limit our puzzle
                diversity. According to our records, it was only on January 20th
                that we fully decided to go for 12. Once we had reached 8 or so,
                our hand was forced; it would not make sense for so many of the
                Horror feeders to be sequence capstones if the remaining ones
                were not.
              </p>

              <img
                src="/wrapup/images/image7.png"
                alt=""
                className="mx-auto w-1/2 rounded-md"
              />

              <p>Here is a rough timeline of our meta-writing process:</p>
              <ul>
                <li>November 11: the last round meta (Horror) is finalized.</li>
                <li>
                  November 17: answers released. 👁️ (initially named 🥕), 💂,
                  and ✈️ sequences immediately begin development. Heist (🏦)
                  begins development, but is not at this time planned to be a
                  sequence.
                </li>
                <li>
                  November 19: 🃏 begins development. 🏦 is converted into a
                  sequence.
                </li>
                <li>
                  January 19: ⛓️ begins development (although not necessarily as
                  a sequence at this time.)
                </li>
                <li>
                  January 21: Secret Ingredient and Opening Sequences are
                  converted into 🌲; Erin agrees to write the remaining feeder.
                  Imagine and Lost Lyric are converted into 💿, with Thomas
                  writing the meta, and Audrey agreeing to write the remaining
                  feeder. (At this time, Secret Ingredient is the only Horror
                  feeder to be finished.)
                </li>
                <li>February 6: Eye-to-Eye (the 👁️ meta) is finished.</li>
                <li>
                  February 9: The first full draft of 🃏 is finished, including
                  A Fistful of Cards IV.
                </li>
                <li>
                  February 19: The first full draft of 🏦 is finished, including
                  The Final Heist.
                </li>
                <li>
                  March 1: You've Got This Covered, Fractal Shanty, and
                  International Neighbours are absorbed into a new sequence, 🧩;
                  Philip and Thomas write the meta, Fridge Magnets. (This is
                  broadly accepted to be the point of no return.)
                </li>
                <li>
                  March 2: ⭐ begins development. (At this time, both Walk of
                  Fame and What's My Ride? had been finalized, but the final
                  feeder slot and the meta would not be finalized for some
                  time.) The first draft of the ⛓️ meta, Red Blue, is written.
                </li>
                <li>
                  March 5: The first draft of the 💂 meta, The Guard and the
                  Door, is finished. It will not change significantly.
                </li>
                <li>
                  March 8: Hand Letters and Filming Schedule are converted into
                  ⏰, with Malcolm and Thomas writing the meta. The first draft
                  of the ⭐ meta, Constellation, is written. The first draft of
                  the 💿 meta, The Compact Disc, is also written. The first
                  draft of the ✈️ meta, currently called Color Transfer, is also
                  written, though it will later be significantly redrafted.
                </li>
                <li>
                  March 15: The first draft of the ⏰ meta, Like Clockwork, is
                  written.
                </li>
                <li>
                  April 6: Fractal Shanty, Imagine, and Identify the Piece are
                  absorbed into a new sequence, 🎼.
                </li>
                <li>
                  April 11: The ✈️ meta is significantly redrafted, and called
                  Color Wheel.
                </li>
                <li>
                  April 12: The ⭐ meta, Constellation, and its remaining feeder
                  (Connect the Dots) are finished.{" "}
                </li>
                <li>April 12: The hunt begins.</li>
              </ul>
              <p>
                As you can see, there was no plan. Sequences were written and
                discarded throughout the year; several sequences which did not
                make the cut have eluded mention. Some were assigned emojis
                (such as 🔳 and ⚔️); others did not reach that stage.
              </p>
              <p>
                It was an explicit goal to have a mixture between sequence metas
                which only used the puzzle answers, sequence metas which used
                the answers and some aspects of previous mechanics, and sequence
                metas which only relied on previous mechanics (and not the
                answers); I feel that we had a fairly good mix of these.
              </p>
              <p>
                Would we attempt this structure again? Probably not. We're glad
                we did it, and it was a lot of fun, but it was also a lot of
                work, and caused Untold Pain and Suffering. However, the
                structure was also very well received by the community, and
                we're glad that everyone enjoyed it! We certainly felt that it
                was worth the work we put into it.
              </p>
            </TOCSection>

            <TOCSection
              sectionId={7}
              tocTitle="Adjacency and Bottlenecks"
              parentId={4}
            >
              <h3>Adjacency and Bottlenecks</h3>
              <i>Arnav says:</i>
              <p>
                I'm super glad we tried both the adjacency structure and the
                guard bottlenecks—they were cute ideas and quite compelling. In
                retrospect, I think both were unideal.
              </p>

              <p>
                I believe that it should be exceedingly clear to teams whether
                solving a puzzle will make overall progress in the hunt. For
                example, solving a puzzle in an early round of a hunt will not
                unlock anything or will not mean as much a later-round solve.
                With the adjacency structure, puzzles have vastly different
                weights in how important they are to be solved, and even if the
                map provided some clue as to how the adjacency worked, it may
                not have been enough.
              </p>

              <p>
                The guards bottleneck, while extremely motivated, was still not
                completely justified in my opinion—locking every round behind
                the same flavor of puzzle, even as we tried to make them varied
                in difficulty and content, can just ruin a hunter's experience.
              </p>

              <i>Thomas says:</i>
              <p>
                In hindsight, we should have made the map UI more versatile, in
                order to encourage its use (and to increase the information
                density of the map). Many solvers did not realize that the
                unlock structure was adjacency-based until after the hunt was
                over; this was a failure mode. I am certainly still interested
                in exploring adjacency unlock structures, and if we decide to
                attempt it again next year, we definitely will take some of our
                learnings.
              </p>

              <p>
                However, I will say that I still think solving puzzles in this
                hunt was rewarding, even if they do not immediately unlock new
                puzzles. In particular, our sequence meta structure places
                emphasis on rewarding solvers who solve and understand feeders
                from previous rounds, because those answers and mechanics can
                become useful again. We heard stories of solvers returning to
                forward-solve puzzles which they had previously backsolved in
                order to try and solve the meta. I count this as a success!
              </p>

              <p>
                However, I agree that there were "invisible bottlenecks" that
                could end up frustrating. The guards were not the only one of
                these; I believe Financial Crimes also was a "hidden" bottleneck
                linking Reality, Adventure, and the back end of Horror together.
                Ideally this latter case would not exist, but it slipped our
                notice until the hunt had already started (in which case we did
                not want to change anything, in case it broke unlock progression
                for solvers).
              </p>

              <p>
                But the guards thing was funny, Your Honor. The defense rests.
              </p>
            </TOCSection>

            <TOCSection sectionId={8} tocTitle="Art Direction">
              <h2>Art Direction</h2>
              <p>
                <i>By Bailey Merlino</i>
              </p>
            </TOCSection>

            <TOCSection sectionId={9} tocTitle="Landing Page" parentId={8}>
              <h3>Landing Page</h3>
              <p>
                The first art piece for this year's hunt was the landing page
                cinema, made by Eliot. It looked amazing and set the tone of
                BPH25 as glamorous and fun.
              </p>

              <figure>
                <div className="grid grid-cols-3 gap-4">
                  <img
                    className="rounded-md"
                    src="/wrapup/images/image27.png"
                    alt=""
                  />
                  <img
                    className="rounded-md"
                    src="/wrapup/images/image62.png"
                    alt=""
                  />
                  <img
                    className="rounded-md"
                    src="/wrapup/images/image20.png"
                    alt=""
                  />
                </div>
                <figcaption>
                  Various drafts of the homepage with varying layouts / color
                  schemes
                </figcaption>
              </figure>

              <figure>
                <div className="grid grid-cols-3 gap-4">
                  <img
                    className="rounded-md"
                    src="/wrapup/images/image23.png"
                    alt=""
                  />
                  <img
                    className="rounded-md"
                    src="/wrapup/images/image51.png"
                    alt=""
                  />
                  <img
                    className="rounded-md"
                    src="/wrapup/images/image9.png"
                    alt=""
                  />
                </div>
                <figcaption>BPC logos designed by Eliot!</figcaption>
              </figure>
            </TOCSection>

            <TOCSection sectionId={10} tocTitle="Map" parentId={8}>
              <h3>Map</h3>
              <p>
                The map was a running joke/constant source of anxiety because it
                was the largest art piece I personally have ever attempted and
                also integral to the hunt structure. We decided that we would
                have six movies corresponding to six studio lots that led to
                each other via a map. To get to other lots, solvers would have
                to go through a toll-booth where they would solve a Guards
                puzzle.
              </p>

              <p>
                The tricky thing about the map was that it also had to be a
                pseudo-Brown campus replica and isometric. I also imposed the
                stipulation that each section would be completed in a different
                art style. Comedy was colored pencil, Action was vaguely comic
                book style, Horror was Junji Ito inspired, Drama was oil paint,
                Digging was watercolor, and Reality was boring (boooo).
              </p>

              <p>
                The other difficult thing about the map was that I had to work
                on all of them separately and fit them back together, so making
                a very detailed under-drawing was integral to the process. The
                entire under-drawing was completed over Spring break. Then the
                following week was skip-all-homework-and-illustrate-in-the-ERC
                week. Despite the aforementioned skipping of classes and
                homework, I still had two more sections of the map to illustrate
                the night before the hunt, which meant staying up until 6:30 am
                the day of the hunt to finish. Never again. But, it looked
                pretty cool so it's whatever.
              </p>

              <div className="columns-2 space-y-4">
                <img
                  className="rounded-md"
                  src="/wrapup/images/image13.png"
                  alt=""
                />
                <img
                  className="rounded-md"
                  src="/wrapup/images/image64.png"
                  alt=""
                />
                <img
                  className="rounded-md"
                  src="/wrapup/images/image44.png"
                  alt=""
                />
                <img
                  className="rounded-md"
                  src="/wrapup/images/image71.png"
                  alt=""
                />
                <img
                  className="rounded-md"
                  src="/wrapup/images/image10.png"
                  alt=""
                />
              </div>
            </TOCSection>

            <TOCSection sectionId={11} tocTitle="Sprites" parentId={8}>
              <h3>Sprites</h3>
              <p>
                Since we were making a map, we also needed a lot of sprites!
                Upwards of 50 puzzles meant upwards of 50 unique sprites
                corresponding to the content of these puzzles. The art team was
                on the smaller side and Chloe J, Chloe Q, Phil, and Jackie made
                most of these sprites. They are crazy talented and if you
                haven't paid close attention, go back and look at them because
                they are seriously beautiful. Also, huge shoutout to Chloe Q for
                making the art for the sidebars, it adds so much life to the
                website and works great thematically.
              </p>

              <iframe
                src="https://drive.google.com/file/d/1z23iKN46JqZTr-r7RLjxMMbWy43mM01z/preview"
                allow="autoplay"
                className="mx-auto aspect-video w-2/3 rounded-md"
              ></iframe>
            </TOCSection>

            <TOCSection sectionId={12} tocTitle="Playing Cards" parentId={8}>
              <h3>Playing Cards</h3>
              <p>
                The other super fun experience from this year's art was the
                cards. Chloe J and Jackie did most of the illustrations and I
                did the layout/designs on Adobe Illustrator, my mortal enemy. We
                also made a booklet and a playmat to go with them (Thank you
                Megan and Arnav!) It was an extraordinarily gratifying
                experience to see all our hard work come to life with the
                physical playing cards and I hope every solver appreciated how
                insanely cool they were.
              </p>
              <img
                src="/wrapup/images/image56.jpg"
                alt=""
                className="mx-auto w-1/2 rounded-md"
              />
            </TOCSection>

            <p>
              Overall, I'm very proud of what we produced with a smaller team of
              artists, which is largely because of how kind, talented, and fun
              the art team was to work with. I look forward to working with them
              again on a hopefully map-less hunt :)
            </p>

            <figure>
              <div className="columns-2">
                <img
                  className="rounded-md"
                  src="/wrapup/images/image3.png"
                  alt=""
                />
                <img
                  className="rounded-md"
                  src="/wrapup/images/image34.jpg"
                  alt=""
                />
              </div>
              <figcaption>BPH 25 pins designed by Jackie Cohen</figcaption>
            </figure>

            <TOCSection sectionId={13} tocTitle="Tech">
              <h2>Tech</h2>
              <i>By Chloe Qiao and Alex Wang</i>

              <p>
                We made a completely new site this year! We started building the
                tech stack (bph-site) last September and tested it with{" "}
                <a
                  // TODO: may need to migrate at some point
                  href="https://puzzlethon.brownpuzzle.club/"
                  className="text-link no-underline hover:underline"
                >
                  Puzzlethon
                </a>{" "}
                last November. This semester, we focused mainly on extending the
                hinting and event systems, adding UI improvements, and making
                the map. No one on the tech team had web development experience
                at the beginning of the year, so we're really happy that we
                ended up with a functional site that (most) teams enjoyed.
              </p>

              <p>
                Both the backend and frontend are in TypeScript, and the UI
                components were made using Tailwind CSS and Shadcn. All of our
                infrastructure runs serverlessly on Vercel. We have a Postgres
                database on Neon and use Resend for emails. We chose a
                fully-managed solution because we were reasonably confident it
                would scale well during the hunt. (Struggles with scaling last
                year were part of our motivation to remake the site.)
              </p>

              <p>Some meeting notes:</p>

              <div className="grid grid-cols-2 gap-4">
                <img
                  className="w-full rounded-md"
                  src="/wrapup/images/image12.png"
                  alt=""
                />
                <img
                  className="w-full rounded-md"
                  src="/wrapup/images/image11.png"
                  alt=""
                />
              </div>

              <p> (We did not load test.)</p>
            </TOCSection>

            <TOCSection sectionId={14} tocTitle="Landing Page" parentId={13}>
              <h3>Landing Page</h3>
              <p>
                Parallax alone was already quite complex. Add on mobile
                friendliness and moving spotlights and you get a recipe for pain
                and suffering. We went through three or so libraries, all of
                which had issues (from weird scroll behavior to poor mobile
                friendliness). We eventually settled on a Framer Motion solution
                with sizing based on Tailwind math.
              </p>

              <pre className="overflow-auto rounded-md bg-[#272822] p-4 font-mono text-sm leading-relaxed text-white">
                <code>
                  &lt;<span className="text-green-400">motion</span>.
                  <span className="text-green-400">img</span>
                  <br />
                  &nbsp;&nbsp;
                  <span className="text-yellow-300">className</span>=
                  <span className="text-pink-300">
                    &quot;absolute bottom-[calc(max(57vw,64.125vh))]
                    left-[calc(min(29vw,50vw-23.33vh))]
                    w-[calc(max(7vw,7.77vh))] origin-bottom opacity-80&quot;
                  </span>
                  <br />
                  &nbsp;&nbsp;<span className="text-yellow-300">src</span>=
                  <span className="text-pink-300">
                    &quot;/home/Spotlight.png&quot;
                  </span>
                  <br />
                  &nbsp;&nbsp;<span className="text-yellow-300">initial</span>=
                  <span className="text-white">{"{{"}</span>{" "}
                  <span className="text-green-300">rotate</span>:{" "}
                  <span className="text-blue-300">20</span>{" "}
                  <span className="text-white">{"}}"}</span>
                  <br />
                  &nbsp;&nbsp;<span className="text-yellow-300">animate</span>=
                  <span className="text-white">{"{{"}</span>
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="text-green-300">rotate</span>:{" "}
                  <span className="text-white">[</span>
                  <span className="text-blue-300">20</span>,{" "}
                  <span className="text-blue-300">-20</span>
                  <span className="text-white">]</span>,<br />
                  &nbsp;&nbsp;
                  <span className="text-white">{"}}"}</span>
                  <br />
                  &nbsp;&nbsp;
                  <span className="text-yellow-300">transition</span>=
                  <span className="text-white">{"{{"}</span>
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="text-green-300">duration</span>:{" "}
                  <span className="text-blue-300">5</span>,<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="text-green-300">repeat</span>:{" "}
                  <span className="text-blue-300">Infinity</span>,<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="text-green-300">repeatType</span>:{" "}
                  <span className="text-pink-300">&quot;reverse&quot;</span>,
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="text-green-300">ease</span>:{" "}
                  <span className="text-pink-300">&quot;easeInOut&quot;</span>
                  ,<br />
                  &nbsp;&nbsp;
                  <span className="text-white">{"}}"}</span>
                  <br />
                  /&gt;
                </code>
              </pre>

              <p>
                For images to adapt nicely between skinny phones and wide
                computer screens, size had to be computed as a minimum or
                maximum based on viewport width and height.
              </p>
            </TOCSection>

            <TOCSection sectionId={15} tocTitle="Map" parentId={13}>
              <h3 id="map-tech">Map</h3>

              <p>
                Map was probably the most frustrating component for art, tech,
                and solvers. We originally used the Leaflet library which
                provided many convenient features but was very laggy (especially
                when zooming). Leaflet performs best for tile maps with few
                markers since markers must be re-rendered every frame. We tried
                several methods for improving efficiency to no avail.
              </p>

              <p>
                The night before the in-person event, we decided to switch to
                PixiJS. Oops. This decision led to a wonderful 9 AM (and by 9
                AM, we mean going to bed at 9 AM, not waking up at 9 AM).
                Unfortunately, PixiJS uses a different coordinate system than
                Leaflet, so sprites were rotated 90&deg; about the map origin.
                This required us to manually reposition every sprite (sorry,
                Jack) and push back the hunt start time.
              </p>

              <p>
                We made several QOL improvements to the map throughout the hunt
                and into remote week. Unfortunately, most changes were added
                after the bulk of the activity, so map use remained relatively
                limited compared to the puzzle table.
              </p>
            </TOCSection>

            <TOCSection sectionId={16} tocTitle="Postprodding" parentId={13}>
              <h3> Postprodding</h3>
              <p>
                The tech team did relatively little postprodding during the
                hunt. Near the end of March, we wrote a short README on editing
                the site, gave it to the technical-but-not-tech puzzle-writing
                staff, and had them commit to branches. They did an amazing job!
                In the end, over half of the 57 puzzles and all of the solutions
                were postprodded by puzzle-writers. Since there were only two
                people focused primarily on tech and many, many small tweaks to
                puzzles leading up to the hunt, this worked out well. It gave us
                time to polish the UI for the map and interactive guards
                puzzles. (Shoutout to Arnav for postprodding and finalizing the
                other puzzles.)
              </p>

              <p>
                We made certain decisions to simplify the postprodding process.
                First, we prioritized collocation. If you're editing a static
                puzzle, everything you care about should be in the puzzle's
                data.tsx file: the inPersonBody, remoteBody, remoteBoxBody,
                solutionBody, authors, copyText, partialSolutions, and tasks.
                Images, audio clips, and videos also belong in that puzzle's
                folder. This meant that postprodders didn't need to deal with
                the complexity of the rest of the site. In addition, we focused
                on keeping things isolated. With Tailwind, CSS classes are
                placed directly in the markup so that changes don't impact
                multiple files.
              </p>
            </TOCSection>

            <TOCSection
              sectionId={17}
              tocTitle="Hunt Flexibility"
              parentId={13}
            >
              <h3>Hunt Flexibility</h3>

              <p>
                Another consideration was flexibility. We wanted to be able to
                tweak how the hunt worked at a moment's notice without having to
                change a bajillion files.
              </p>

              <p>
                We achieved that by putting fewer things in the database. In our
                old fork of gph-site, the puzzle table had fields for name,
                slug, answer, body_template, round, order, is_meta, emoji,
                unlock_hours, unlock_global, and unlock_local. In bph-site, we
                only included the name, slug, and answer. The rest of the
                information was hard-coded into the site.
              </p>

              <p>
                Instead of having a body_template field, we chose to have a
                different puzzle folder for every puzzle. Most static puzzles
                stuck with the DefaultPuzzlePage component, which automatically
                handled errata, puzzle body, guesses, partial solutions, and
                tasks. Some interactive puzzles had custom logic.
              </p>

              <p>
                The flexibility made it easy to modify our structure for puzzle
                unlocks, metas, rounds, and sequences—and to add new categories
                like PUZZLES_WITH_INFINITE_GUESSES in the middle of the hunt. It
                was also preferable for us that we could test these changes
                locally before committing them to the production branch, rather
                than directly making changes on the production database.
              </p>

              <p>
                This was also a little more dangerous. We had to be absolutely
                certain that we were (1) listing valid puzzle ids and (2) not
                forgetting any puzzle ids in the database. (One mistake in our
                hunt.config.ts rendered the admin graph unusable for an hour.)
                This is one benefit of tables over our structure: automatic
                foreign-key validation.
              </p>
            </TOCSection>

            <TOCSection sectionId={18} tocTitle="Bugs" parentId={13}>
              <h3>Bugs</h3>
              <p>
                Because of the serverless nature of the site, we did not have
                websockets this year. We instead kept the site responsive using
                hooks and optimistic updates. We're still interested in adding a
                dedicated server for websockets next year.
              </p>

              <p>
                Websockets are a common pain-point during online hunts, and we
                didn't have any, so— fortunately, the site never went down
                during the hunt. There were a few notable bugs that affected
                some teams:
              </p>

              <ul>
                <li>
                  One of the remote teams, yukii, caught that puzzle answers
                  were leaked in the source code. This was because we
                  accidentally made one of the server components into a client
                  component after the in-person hunt. We patched that around an
                  hour into the hunt. This is still a vulnerability in some of
                  our interactive puzzles, so looking at source code is not the
                  intended solution.
                </li>
                <li>
                  We should have put more constraints on our databases. Many
                  race condition bugs came out of creating the solves and events
                  table this semester. Before we reverted the issue, 1 team used
                  an answer token on a meta puzzle, 1 team submitted and used an
                  answer token twice, and 3 teams (temporarily) had an extra
                  solve on the leaderboard.
                </li>
                <li>
                  The map took a lot of memory. We were already concerned about
                  this, and eventually decided to remove the map from the mobile
                  puzzle page during the in-person hunt.
                </li>
              </ul>
            </TOCSection>

            <TOCSection sectionId={19} tocTitle="Admin Tooling" parentId={13}>
              <h3>Admin Tooling</h3>

              <p>
                <i>Warning: gushing about tables and graphs.</i>
              </p>

              <p>
                Most puzzlehunt sites use Django, and Django has an automatic
                admin interface. This is very convenient, but we don't regret
                stepping away from Django and creating our own admin tools.
              </p>

              <img
                className="rounded-md"
                src="/wrapup/images/image2.png"
                alt=""
              />

              <p>
                First was keeping track of a team's progress. Because of the
                adjacency graph unlock structure, it seemed natural to also just
                model this with a graph. We'll have to change this if we use
                DEEP or a different unlock structure in the future, but this was
                personally very fun to make!
              </p>

              <img
                className="rounded-md"
                src="/wrapup/images/image29.png"
                alt=""
              />
              <img
                className="rounded-md"
                src="/wrapup/images/image52.png"
                alt=""
              />

              <p>
                We also implemented improved data tables. We let admins edit the
                role and interaction mode directly in the team table. (This
                feature was not necessary at all, and toggling the roles was so
                addictive I accidentally did it on the production database once.
                Sorry to the affected teams!)
              </p>

              <img
                className="rounded-md"
                src="/wrapup/images/image76.png"
                alt=""
              />

              <p>
                Finally, we found that the most convenient way to keep track of
                the hunt was still having a Discord channel to ping people about
                registration, answer submission, solves, hint requests, and
                interactions. For dev reasons, we also recommend sending a
                Discord message if the catch block in a try/catch statement gets
                triggered—it's great for catching early errors.
              </p>
            </TOCSection>

            <TOCSection sectionId={20} tocTitle="Testsolving">
              <h2>Testsolving</h2>
              <p>
                <i>By Arnav Singhal</i>
              </p>

              <p>
                Firstly, and most importantly, huge thanks to MIT Puzzle Club
                and NES for testsolving our hunt. They provided a lot of very
                helpful feedback that made our puzzles and the overall hunt
                experience much better. NES in particular gave pretty detailed
                feedback on every single puzzle (at least, those that were
                written by that point).
              </p>

              <p>
                A unique property of university hunts is that they operate on a
                fixed schedule, for better or for worse. My personal preference
                is to take the time necessary to give each puzzle a couple of
                testsolves and clean post-prodding, but I (Arnav) have also seen
                this deadline-flexible approach lead to dead hunts. With our
                hunt being annual, this was not a concern.
              </p>

              <p>
                This, in addition to our large structure, meant that my main
                goal was to have each puzzle cleanly tested at least once,
                rather than the perfection I would prefer. Depending on how you
                count, only 5-6 of our 57 puzzles did not have this clean
                testsolve, and 2 of them (having been written the night before
                hunt) did not get a twice-over by me. While these numbers are
                definitely unideal, none of these puzzles ended up being the
                problem points, and I'm not too dissatisfied with the overall
                process.
              </p>

              <p>
                One interesting challenge was that, as a result of much of our
                hunt writing team graduating last year, many of our puzzle
                writers were new to puzzles. I personally found this great, as
                this made testing from the beginner-solver perspective a lot
                easier, and Brown students who are new to puzzles are exactly
                our target audience. However, we did still want a polished hunt
                for experienced teams, and didn't have a lot of personnel
                capable of testing with that background (and those who could
                were often busy doing other things).
              </p>

              <p>
                This is where our external testsolves saved us—MIT saw a mix of
                finished and early versions of puzzles and clarified what ideas
                would and wouldn't work, especially for physical puzzles. NES
                got to see our hunt after another week of progress, which was
                much closer to the real deal. Both teams found a lot of
                inelegancies and inconveniences that got fixed afterwards. (You
                have NES to thank for the white boxes in the middle of rooms and
                the sound effects in{" "}
                <a
                  href="/puzzle/the-final-heist"
                  className="text-link no-underline hover:underline"
                >
                  The Final Heist
                </a>{" "}
                puzzle, among other things!)
              </p>

              <p>
                One point of improvement could definitely be scheduling. We had
                initially scheduled the external testsolves for the weekend of
                March 8 and March 15, with remote testsolve occurring first, but
                due to some conflicts, we had to switch these weekends, despite
                already having scheduled NES for the March 8 weekend. NES
                graciously agreed to switch, but even then, our hunt was not
                nearly in the shape I would have liked for either testsolve. The
                awkward timing of spring break and other Brown University events
                didn't leave much room for wiggling, but I think we will
                definitely consider having a remote testsolve occur during our
                spring break.
              </p>
            </TOCSection>

            <TOCSection sectionId={21} tocTitle="Theme & Story">
              <h2>Theme & Story</h2>
              <p>
                <i>By Philip Yao</i>
              </p>
              <p>
                In case you missed it, BPH25 was themed around movies! The
                original six rounds we decided on were action, animation,
                cerebral, comedy, drama, and reality. Cerebral got renamed to
                horror, and animation... Well, the team assigned to write the
                animation meta ended up writing a meta about digging, so this
                became the digging round! (Renamed to adventure :( )
              </p>
            </TOCSection>

            <TOCSection sectionId={22} tocTitle="Kickoff" parentId={21}>
              <h3>Kickoff</h3>
              <p>
                We hope you all enjoyed the kickoff skit!{" "}
                <s>
                  A majority of the script was written the night before the
                  hunt.
                </s>{" "}
                Big shoutout to those who were part of making kickoff possible,
                through brainstorming, writing, proofreading, and, of course,
                acting! Here are some fun pictures of that.
              </p>

              <div className="grid grid-cols-3 gap-4">
                <img
                  className="rounded-md"
                  src="/wrapup/images/image67.jpg"
                  alt=""
                />
                <img
                  className="rounded-md"
                  src="/wrapup/images/image31.jpg"
                  alt=""
                />
                <img
                  className="rounded-md"
                  src="/wrapup/images/image17.jpg"
                  alt=""
                />
                <img
                  className="rounded-md"
                  src="/wrapup/images/image16.jpg"
                  alt=""
                />
                <img
                  className="rounded-md"
                  src="/wrapup/images/image18.jpg"
                  alt=""
                />
                <img
                  className="rounded-md"
                  src="/wrapup/images/image41.jpg"
                  alt=""
                />
              </div>
            </TOCSection>

            <TOCSection sectionId={23} tocTitle="Interactions" parentId={21}>
              <h3>Interactions</h3>
              <p>
                During the hunt, solvers unlocked two interactions. After
                completing the action round, a production team member would go
                around and hand gold stars and pins to solvers. Sometimes this
                was more difficult than we had expected. Highlights include
                almost getting stuck in the Brown bookstore elevator? After
                unlocking the horror round, someone at HQ would call a team,
                impersonating Blueno and leaving an angry message. (Making
                Blueno the villain for the 3rd consecutive year? Oops.)
                Different HQ members had vastly different interpretations of
                Blueno (personal favorites include Noah's and Malcolm's).
              </p>

              <iframe
                src="https://drive.google.com/file/d/1lNxc5ZkRPysQGEtffH7lrGTOKx7bDhJe/preview"
                allow="autoplay"
                className="mx-auto aspect-video w-2/3 rounded-md"
              ></iframe>
            </TOCSection>

            <TOCSection sectionId={24} tocTitle="Runaround" parentId={21}>
              <h3>Runaround</h3>
              <p>
                Runaround!!! We had 10 in-person teams complete runaround
                (yay!). Teams had to add finishing touches to the movies by
                completing a series of tasks in 30 (or fewer, depending on team
                size) minutes. These tasks included dubbing over a scene,
                swinging a sword at someone while they read the words to the
                FitnessGramTM Pacer Test, (NOT!!!) making a coffee order by
                pouring lemonade into a bucket (sorry Erin), running down Thayer
                street to take selfies with murals (should've asked teams to
                send us their pictures, oopsies), and solving a 2x2 Rubik's cube
                while blindfolded. After finishing runaround, you watched the
                movie premieres (most of which was also put together the night
                before the hunt)! Pictures pictures pictures.
              </p>

              <div className="mb-4 grid grid-cols-2 gap-4">
                <iframe
                  src="https://drive.google.com/file/d/1pSsxTZrNyu2-E7T4RZBOkLQV6ELwdzib/preview"
                  allow="autoplay"
                  className="aspect-video w-full rounded-md"
                ></iframe>
                <iframe
                  src="https://drive.google.com/file/d/1nrhUNaxFvPsrR3BKhhlgV_KILF31TUbH/preview"
                  allow="autoplay"
                  className="aspect-video w-full rounded-md"
                ></iframe>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <img
                  className="rounded-md"
                  src="/wrapup/images/image4.jpg"
                  alt=""
                />
                <img
                  className="rounded-md"
                  src="/wrapup/images/image50.jpg"
                  alt=""
                />
                <img
                  className="rounded-md"
                  src="/wrapup/images/image69.jpg"
                  alt=""
                />
              </div>
            </TOCSection>

            <p>
              A huge thanks to everyone who was involved with the story and
              runaround (Arnav, Audrey, Cerulean, Chai, Eliot, Erin, Gabriel,
              Jackie, Kaylee, Malcolm, Noah, Phil, Thomas, Veronika, Megan)!
              None of this would have been possible without all of your efforts.
              Also special shoutout to Megan and Erin for buying lots of
              questionable stuff and yelling at me to lock in.
            </p>

            <TOCSection sectionId={25} tocTitle="Events">
              <h2>Events</h2>
              <p>
                <i>By Jack de Haan</i>
              </p>

              <p>
                Events were overall a blast!! Since I spent launch-delay and all
                of the morning on{" "}
                <a
                  href="/wrapup#map-tech"
                  className="text-link no-underline hover:underline"
                >
                  tech
                </a>{" "}
                (instead of preparing the events as was originally planned), the
                first event (Auditioning for a Role) was not finalized until,
                well, during the event. (Unfortunately, the events team was a
                three-person team, and two of those people (Megan & Erin) had
                many other roles during the hunt, so it was mostly on me (Jack)
                to run it all.) This, as well as us underestimating how long it
                would take to run each audition, led to most teams having to
                wait longer than expected for their turn (sincere apologies for
                that).
              </p>

              <p>
                Lessons were definitely learned, but most teams said they
                enjoyed the event overall, and the final products were very
                entertaining to watch. Thankfully, the other two events were
                much more straightforward to run and were prepared well in
                advance. Poster Pastiche had a massive turnout and was
                incredibly successful, and Sneaking a Screening was a
                hilariously fun way to round out Saturday night.
              </p>
            </TOCSection>

            <TOCSection
              sectionId={26}
              tocTitle="Auditioning for a Role"
              parentId={25}
            >
              <h3>Auditioning for a Role</h3>

              <p>
                <i>
                  Please send 1 intern with a natural flair for performance and
                  quick adaptability. Composure and resourcefulness are vital.
                </i>
              </p>

              <img
                src="/wrapup/images/image65.jpg"
                alt=""
                className="rounded-md"
              />

              <p>
                This event involved 4-5 interns getting different scripts
                (referencing the different rounds of the hunt: action, drama,
                reality, adventure, and comedy) and one by one going into a room
                alone with the director. Each script had a "restriction":
              </p>
              <ul>
                <li>
                  the action script had to be read in a manner where the two
                  characters were distinct in personality/mannerisms
                </li>
                <li>
                  the drama script had to be read a language other than English
                </li>
                <li>
                  the comedy script had action words (like "jump" or "dance")
                  that had to be acted out physically
                </li>
                <li>
                  the adventure script had blanks that had to be filled in based
                  on Brown lore
                </li>
                <li>
                  the reality script (nature documentary themed) had to be read
                  in a British/David Attenborough-type voice
                </li>
              </ul>

              <p>
                ...and the director subtly hinted to the interns what they had
                to do (by yelling at them and kicking them out of the room).
                This repeated, with the scripts also rotating between the
                interns (making them have to confer on restrictions) until the
                director deemed that someone had "landed the role", after which
                that script was theirs and they would wait until everyone else
                had landed their roles.
              </p>

              <p>
                Once everyone had landed their roles, their last task was to
                read a "meta" script (themed in horror) that involved all 4-5
                parts and their respective restrictions, the last line which was
                the answer!
              </p>

              <p>We had 7 runs of this, each around 30 minutes long. </p>
              <p>Shoutout to: </p>
              <ul>
                <li>
                  the assistants Audrey & Veronika for helping everything run
                  relatively smoothly and organizing the interns (including
                  those waiting for in the next round)!
                </li>
                <li>
                  the directors Gabriel & Erin for adapting really well to time
                  and personifying strict directors really well!
                </li>
                <li>Julia for taking wonderful pictures!</li>
                <li>
                  Megan & Erin for helping review/comment on scripts beforehand!
                </li>
              </ul>
            </TOCSection>

            <TOCSection sectionId={27} tocTitle="Poster Pastiche" parentId={25}>
              <h3>Poster Pastiche</h3>
              <p>
                <i>
                  Please send 1—2 interns with a keen eye for visual
                  storytelling. Precision and creative flair are essential.
                </i>
              </p>

              <div className="grid grid-cols-3 gap-4">
                <img
                  src="/wrapup/images/image42.jpg"
                  alt=""
                  className="rounded-md"
                />
                <img
                  src="/wrapup/images/image49.jpg"
                  alt=""
                  className="rounded-md"
                />
                <img
                  src="/wrapup/images/image59.jpg"
                  alt=""
                  className="rounded-md"
                />
              </div>

              <p>
                This event involved 6 teams of ~8 interns each with over 50
                participants overall. Each team was given one of the six
                canonical posters (below), which were clear parodies of
                real-life movies...
              </p>

              <div className="grid grid-cols-6 gap-4">
                <img
                  className="rounded-md"
                  src="/wrapup/images/image54.png"
                  alt=""
                />
                <img
                  className="rounded-md"
                  src="/wrapup/images/image33.png"
                  alt=""
                />
                <img
                  className="rounded-md"
                  src="/wrapup/images/image26.png"
                  alt=""
                />
                <img
                  className="rounded-md"
                  src="/wrapup/images/image55.png"
                  alt=""
                />
                <img
                  className="rounded-md"
                  src="/wrapup/images/image1.png"
                  alt=""
                />
                <img
                  className="rounded-md"
                  src="/wrapup/images/image39.png"
                  alt=""
                />
              </div>

              <p>
                ...and had 20 minutes to make a set of 10 instructions, written
                on index cards of 2 instructions each, of how to recreate the
                posters. Each team also had restrictions in writing the
                instructions: besides not being able to reference the movie name
                or the real-life movie, they also:
              </p>

              <ul>
                <li>"Excellentman" (Action): could not use adjectives</li>
                <li>
                  "Biology of an Autumn" (Reality): could only use one-syllable
                  words
                </li>
                <li>"A Partial Known" (Drama): could only write in haikus</li>
                <li>
                  "French General TNT" (Comedy): could not reference colors
                </li>
                <li>
                  "North Dakota Williams and the Unfinished Script" (Adventure):
                  no restriction
                </li>
                <li>"Yell" (Horror): could not use body parts</li>
              </ul>

              <p>
                Once the instructions were written, we took the posters back and
                gave blank sheets of paper to each group and then passed out
                instruction cards to each group. Each group got 5 minutes to
                draw with the materials they had (which were different between
                tables: crayons, colored pencils, markers, etc.), and then we
                passed the posters clockwise and gave the next set of
                instructions to each group. Finally, we swapped the last two
                sets of instructions (teams got instructions 9-10 before 7-8)
                which was a bit of a twist, and then we handed the original
                posters and the finished Frankenstein posters to the groups who
                originally made the instructions. These were the very impressive
                final products!
              </p>

              <div className="grid grid-cols-6 gap-4">
                <img
                  src="/wrapup/images/image6.png"
                  alt=""
                  className="rounded-md"
                />
                <img
                  src="/wrapup/images/image15.png"
                  alt=""
                  className="rounded-md"
                />
                <img
                  src="/wrapup/images/image73.png"
                  alt=""
                  className="rounded-md"
                />
                <img
                  src="/wrapup/images/image43.png"
                  alt=""
                  className="rounded-md"
                />
                <img
                  src="/wrapup/images/image47.png"
                  alt=""
                  className="rounded-md"
                />
                <img
                  src="/wrapup/images/image58.png"
                  alt=""
                  className="rounded-md"
                />
              </div>

              <p>
                At the end, all participating teams were given the answer
                keyword for their hard work.
              </p>

              <p>Shoutout to:</p>
              <ul>
                <li>
                  Bailey, Julia, Jackie, Noah for helping to run this smoothly,
                  collecting and distributing the supplies and papers
                </li>
                <li>Julia for taking wonderful pictures!</li>
                <li>Noah for announcing the remaining time!</li>
              </ul>
            </TOCSection>

            <TOCSection
              sectionId={28}
              tocTitle="Sneaking a Screening"
              parentId={25}
            >
              <h3>Sneaking a Screening</h3>
              <p>
                <i>
                  Please send 1—2 interns with a talent for stealth and creative
                  misdirection. Extra layers or clever disguises might prove
                  useful.
                </i>
              </p>

              <div className="grid grid-cols-2 gap-4">
                <img
                  src="/wrapup/images/image57.jpg"
                  alt=""
                  className="rounded-md"
                />
                <img
                  src="/wrapup/images/image48.jpg"
                  alt=""
                  className="rounded-md"
                />
                <img
                  src="/wrapup/images/image61.jpg"
                  alt=""
                  className="rounded-md"
                />
                <img
                  src="/wrapup/images/image60.jpg"
                  alt=""
                  className="rounded-md"
                />
              </div>

              <p>
                The final event was arguably the most fun (for both the interns
                and the organizers)! This event involved teams of 6-8 interns
                (who were told to bring layers) hiding a bunch of random,
                dollar-tree-bought items, taking a long, complicated walk
                through the Barus & Holley basement to arrive at a movie theater
                (the room right next door), and having to produce all of the
                items in the same condition as before. Some items were
                deliberately challenging, such as two pool noodles, a fully
                inflated beach ball, a brick, and a completed, very brittle
                100-piece puzzle. If all of that weren't enough, the interns
                needed tickets to enter, but there was one less ticket than the
                number of people, so they had to figure out a way to sneak
                another person past the security guard (Veronika) at the door.
              </p>
              <p>
                This event was an opportunity for interns to be really creative;
                some excuses/techniques were saying the last person was a body
                pillow or a dead body, the beach-balls were pregnancies or a
                cyst, the pool noodles were crutches for a dementia-ridden
                grandpa, and yelling at (and subsequently seducing) the security
                guard while the rest of the team was rushing to put together the
                100-piece puzzle after so confidently crumbling it.
              </p>

              <p>Shoutout to:</p>
              <ul>
                <li>
                  Veronika for being an incredible security guard and knowing
                  just the amount of leniency to give the interns!
                </li>
                <li>Bailey for guiding the interns through the maze! </li>
                <li>Julia for taking wonderful picture and videos!</li>
              </ul>
            </TOCSection>

            <TOCSection sectionId={29} tocTitle="Puzzles">
              <h2>Puzzles</h2>
            </TOCSection>

            <TOCSection sectionId={30} tocTitle="Guards Sequence" parentId={29}>
              <h3>Guards Sequence</h3>
              <p>
                <i>By the Guards</i>
              </p>

              <img
                className="rounded-md"
                src="/wrapup/images/image36.png"
                alt=""
              />

              <p>
                The guards sequence was originally a Thomas innovation&trade;
                but this vision was quickly taken on by three of our new
                authors, Jack, Nate, and Nicholas, known within the club as the
                triplets (or later the guards). The idea was to spin off the
                classic idea of distinguishing between a liar and a truth-teller
                via strategic questions and logic, and these puzzles would
                gatekeep each round. This quickly devolved into a plethora of
                shenanigans: from{" "}
                <a
                  href="/puzzle/two-guards-two-doors"
                  className="text-link no-underline hover:underline"
                >
                  Two Guards, Two Doors
                </a>
                , we soon increased the number of guards, doors, and other
                things!
              </p>

              <figure>
                <img
                  className="rounded-md"
                  src="/wrapup/images/image14.jpg"
                  alt=""
                />
                <figcaption>
                  Foreshadowing at kickoff: you'd see these guards again
                </figcaption>
              </figure>

              <p>
                Various guards puzzles spoofed the{" "}
                <a
                  href="https://medium.com/@leducbao1992/thoughts-on-the-green-eyed-logic-puzzle-and-the-importance-of-meta-information-691b5ca6a26"
                  className="text-link no-underline hover:underline"
                >
                  green-eyed riddle
                </a>
                , the{" "}
                <a
                  href="https://en.wikipedia.org/wiki/Monty_Hall_problem"
                  className="text-link no-underline hover:underline"
                >
                  Monty Hall problem
                </a>
                , the{" "}
                <a
                  href="https://en.wikipedia.org/wiki/Wolf,_goat_and_cabbage_problem"
                  className="text-link no-underline hover:underline"
                >
                  wolf, goat, and cabbage problem
                </a>
                , and the{" "}
                <a
                  href="https://en.wikipedia.org/wiki/Double-slit_experiment"
                  className="text-link no-underline hover:underline"
                >
                  double-slit experiment
                </a>
                .
              </p>

              <p>
                For{" "}
                <a
                  href="/puzzle/m-guards-n-doors-and-k-choices"
                  className="text-link no-underline hover:underline"
                >
                  M guards, N doors, and K choices
                </a>
                , we ran the puzzle in-person as a live game show! Our lovely
                guards, donned in suits and fun hats, ran the show with a
                captive live audience and their beloved doors.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <img
                  className="rounded-md"
                  src="/wrapup/images/image66.jpg"
                  alt=""
                />
                <img
                  className="rounded-md"
                  src="/wrapup/images/image53.png"
                  alt=""
                />
              </div>

              <p>
                The doors in question, for those of you wondering, were
                Ukrainian dollhouse-sized doors purchased off of Etsy. They were
                the pride and joy of our guards crew, who crowdsourced the ~$80
                from a team of door-aficionados within our club.
              </p>

              <div className="columns-2 space-y-4">
                <img
                  src="/wrapup/images/image45.jpg"
                  alt=""
                  className="rounded-md"
                />
                <img
                  src="/wrapup/images/image40.jpg"
                  alt=""
                  className="rounded-md"
                />
                <img
                  src="/wrapup/images/image46.jpg"
                  alt=""
                  className="rounded-md"
                />
              </div>

              <p>
                The day before the hunt, the three of them went to our
                makerspace (the BDW) and made a stand for the three doors from
                scratch—after many hours, it turned out wonderfully!
              </p>

              <p>
                Thanks to the puzzlehunters who asked, but we will not be
                selling versions of these. (Unless you are willing to pay us
                over $150...? In which case let's talk.)
              </p>
            </TOCSection>

            <TOCSection
              sectionId={31}
              tocTitle="Jet Lag Sequence"
              parentId={29}
            >
              <h3>Jet Lag Sequence</h3>
              <p>
                Did you know Ben Doyle was a Brown alum? Our writing team
                contains many a fan of{" "}
                <a
                  href="https://www.youtube.com/c/jetlagthegame"
                  className="text-link no-underline hover:underline"
                >
                  Jet Lag: The Game
                </a>
                , so when we serendipitously found a way to contact THE Ben
                Doyle we jumped on the opportunity. Even though we pitched a
                single video and subsequently upped the ask to a whole sequence,
                Ben was super willing to help us out. Huge shout out to Ben
                Doyle! We had lots of fun writing Jet Lag-themed puzzles and it
                made our weekly watch parties all the more exciting.
              </p>

              <div className="columns-2 space-y-4">
                <img
                  className="rounded-md"
                  src="/wrapup/images/image75.jpg"
                  alt=""
                />
                <img
                  className="rounded-md"
                  src="/wrapup/images/image22.png"
                  alt=""
                />
                <img
                  className="rounded-md"
                  src="/wrapup/images/image74.jpg"
                  alt=""
                />
              </div>
            </TOCSection>

            <TOCSection sectionId={32} tocTitle="Heist Sequence" parentId={29}>
              <h3>Heist Sequence</h3>
              <p>
                The Heist sequence was a series of mini-video games and the
                brainchild of one Malcolm Certain. While{" "}
                <a
                  href="/puzzle/the-final-heist"
                  className="text-link no-underline hover:underline"
                >
                  The Final Heist
                </a>{" "}
                was intentionally kinda evil, we hope some of the more
                perseverant among you enjoyed a unique take on what a meta can
                be.
              </p>
            </TOCSection>

            <TOCSection
              sectionId={33}
              tocTitle="A Fistful of Cards"
              parentId={29}
            >
              <h3>A Fistful of Cards</h3>
              <p>
                A Fistful of Cards arose as the result of Thomas coercing our
                resident MtG expert into writing an MtG-inspired sequence. These
                puzzles were lovingly crafted by both Thomas and Jeremy over a
                rather short period of time in pursuit of getting the cards
                ready to order. This sequence seems to have been a frequent
                victim of backsolving, but it's worth a post-solve for those who
                skipped over it.
              </p>

              <p>
                For those of you who didn't solve in-person or purchase a Box,
                these cards were printed and packaged as real playing cards!
                This was easily the most expensive and time-intensive physical
                puzzle we coordinated this year, and it required a ton of work
                from a ton of people in a very short period of time. If you have
                your{" "}
                <a
                  href="/puzzle/a-fistful-of-cards-iv"
                  className="text-link no-underline hover:underline"
                >
                  cards
                </a>
                , treasure them! They've got lots of cool student-made art and
                make a lovely keepsake.
              </p>
            </TOCSection>

            <TOCSection sectionId={34} tocTitle="Peanuts" parentId={29}>
              <h3>Peanuts</h3>
              <i>By Megan Carlson</i>

              <p>
                The idea for a packing{" "}
                <a
                  href="/puzzle/peanuts"
                  className="text-link no-underline hover:underline"
                >
                  peanuts
                </a>{" "}
                puzzle came from the quintessential question: how can we justify
                the rental of a popcorn machine with our club funding? The
                brilliant answer: serve packing peanuts disguised as popcorn!
              </p>

              <div className="grid grid-cols-2 gap-4">
                <img
                  className="rounded-md"
                  src="/wrapup/images/image37.jpg"
                  alt=""
                />{" "}
                <img
                  className="rounded-md"
                  src="/wrapup/images/image70.jpg"
                  alt=""
                />
              </div>

              <p>
                In-person, teams who approached the popcorn table at kickoff
                were asked whether they'd like 'edible or inedible popcorn'. Our
                lovely popcorn vendors Noah and Chloe sold most teams on the
                inedible popcorn alongside their actual bag of popcorn, which
                resulted in a batch of packing peanuts in a popcorn bag.
              </p>

              <p>
                Teams who ordered a Box were also fortunate enough to get their
                own batch of peanuts. As I'm sure you can imagine, these were
                not the most fun to manufacture in bulk. We spent many a night
                hunched over a garbage bag of packing peanuts stolen from the
                GeoChem department. While painful to label 4100 packing peanuts,
                they did have their intended effect.
              </p>

              <div className="grid grid-cols-3 gap-4">
                <img
                  className="rounded-md"
                  src="/wrapup/images/image28.png"
                  alt=""
                />
                <img
                  className="rounded-md"
                  src="/wrapup/images/image68.jpg"
                  alt=""
                />
                <img
                  className="rounded-md"
                  src="/wrapup/images/image24.jpg"
                  alt=""
                />
              </div>
            </TOCSection>

            <TOCSection sectionId={35} tocTitle="Imagine" parentId={29}>
              <h3>Imagine</h3>
              <i>By Megan Carlson</i>

              <p>
                <a
                  href="/puzzle/imagine"
                  className="text-link no-underline hover:underline"
                >
                  Imagine
                </a>{" "}
                was our only submission-based puzzle of the hunt. After
                completing a short puzzle about everyone's favorite out-of-touch{" "}
                <a
                  href="https://www.youtube.com/watch?v=omEDLKS5pbY"
                  className="text-link no-underline hover:underline"
                >
                  celebrity pandemic video
                </a>
                , solvers were tasked with sending in their own classic apology
                video. We received upwards of 100 video submissions. The puzzle
                author thoroughly enjoyed each and every submission (and yes, we
                watched all of them). While we won't be posting any of these
                vulnerable apology videos for privacy reasons, here are a few
                highlights:
              </p>

              <ul>
                <li>
                  Product placement from:
                  <ul>
                    <li>Flamin hot cheetos</li>
                    <li>Dominos</li>
                    <li>Kleenex</li>
                    <li>Celcius</li>
                    <li>Smartwater</li>
                    <li>Trader Joe's snacks</li>
                    <li>Coca-cola</li>
                    <li>Raid shadow legends</li>
                    <li>NordVPN</li>
                    <li>Pepsi</li>
                    <li>Raycon</li>
                    <li>
                      Mucinex
                      <ul>
                        <li>#mucussy</li>
                      </ul>
                    </li>
                    <li>Hello fresh</li>
                    <li>Wheat thins</li>
                    <li>Trident gum</li>
                    <li>Better Help</li>
                    <li>Doritos</li>
                    <li>Exxon mobil</li>
                    <li>And many, many more</li>
                  </ul>
                </li>
                <li>
                  Most common quotes
                  <ul>
                    <li>"Severe and continuous lapse in judgement"</li>
                    <li>"Toxic gossip train"</li>
                  </ul>
                </li>
                <li>Lots of apologies for backsolving too many puzzles</li>
                <li>
                  Many instruments, including ukuleles, contrabass ukuleles,
                  pianos, recorders, and clarinet
                </li>
                <li>
                  The quick brown fox issued an apology for jumping over the
                  lazy dog
                </li>
                <li>Several lovely custom songs</li>
                <li>An apology in the form of a gif</li>
                <li>An apology from Blueno himself</li>
                <li>A video made by a cat</li>
                <li>Standing in the shower under running water</li>
                <li>Rickrolls (x2) and Weezer (x1)</li>
              </ul>
            </TOCSection>

            <TOCSection sectionId={36} tocTitle="Plagiarism" parentId={29}>
              <h3>Plagiarism</h3>
              <i>By Thomas Gordon</i>

              <p>
                <a
                  href="/puzzle/plagiarism"
                  className="text-link no-underline hover:underline"
                >
                  Plagiarism
                </a>{" "}
                was borne out of a scheduling necessity. Due to our greedy
                two-weekend strategy, we accidentally booked out both weekends
                that CMU could feasibly run (oops). In the interest of making
                sure that the majority of teams could do both hunts, the two
                teams agreed to run CMU on Brown's in-person weekend, freeing up
                the online audience for both hunts.
              </p>

              <p>
                This, of course, allowed for shenanigans. While walking to
                wrap-up for the MIT Mystery Hunt, I (Thomas) cornered Ryan Judge
                and pitched him the idea for this puzzle. I knew that ambiguous
                clues were a doable proposition, as I had written similar
                puzzles before. Over the course of the next few months, we sat
                down together and came up with eight workable clues for each of
                the letter pairs for our selected answers.
              </p>

              <p>
                In the end, Ryan did the majority of the work for this puzzle,
                finding most of the clues. The CMU crew also did all the work in
                post-prodding and hosting the puzzle on the website. They have
                my complete thanks in making Plagiarism happen, and are
                officially owed a Favor by Brown Puzzle Club.
              </p>
            </TOCSection>

            <TOCSection sectionId={37} tocTitle="Puzzle Box" parentId={29}>
              <h3>Blueno's Puzzle Box (in-person)</h3>
              <i>By Megan Carlson</i>
              <p>
                This year, our only in-person exclusive physical puzzle ended up
                being Blueno's Puzzle Box! Despite being named in reference to{" "}
                <a
                  href="https://jetlag.fandom.com/wiki/Tag_Across_Europe_(2)/Challenges"
                  className="text-link no-underline hover:underline"
                >
                  Amy's Puzzle Box
                </a>{" "}
                from Jet Lag: The Game, this magnificent creation was a glorious
                mashup of Garfield and Greek mythology theming. Our resident
                RISD students Phil and Kaz took up the challenge of making us a
                puzzle box, and boy did they deliver.
              </p>

              <p>
                The final product was a massive four-foot wooden cube with
                puzzles on all faces. Teams were given free reign to explore the
                box in hopes of figuring out all four faces, but little did they
                know, there was someone inside the box messing with their
                progress! It was tons of fun to gaslight teams into thinking
                they left the puzzle in a state that they actually did not.
              </p>

              <div className="columns-2 space-y-4">
                <img
                  className="rounded-md"
                  src="/wrapup/images/image5.jpg"
                  alt=""
                />
                <img
                  className="rounded-md"
                  src="/wrapup/images/image35.jpg"
                  alt=""
                />
                <img
                  className="rounded-md"
                  src="/wrapup/images/image32.jpg"
                  alt=""
                />
              </div>

              <p>
                After completing all four faces, teams who chanted "I Hate
                Mondays" were rewarded with the answer.
              </p>

              <iframe
                src="https://drive.google.com/file/d/1B3_xK4zoS0kcJdyGfV5EnIFzX7AzZxKt/preview"
                allow="autoplay"
                className="mx-auto aspect-video w-2/3 rounded-md"
              ></iframe>
            </TOCSection>

            <TOCSection sectionId={38} tocTitle="Reflections">
              <h2>Reflections</h2>
              <p>
                Our hunt writing team went through a huge transition this year!
                A lot of our founding leadership graduated last May, leaving
                behind some large shoes to fill. While the alums did their best,
                that kind of transition inevitably results in some amount of
                knowledge loss, so we took this opportunity to rethink our
                leadership structures and club dynamics. We have a lot of
                amazing student leaders who have stepped up and taken on the
                challenge of pushing this event to the next level, and we're so
                proud of how things turned out in the end. Many of the main
                branches of our hunt were run by newbies this year, so we've
                learned a lot and are excited to keep momentum rolling for next
                year.
              </p>

              <p>
                We had a lot of first-time puzzle writers on our team this year
                which was awesome! Most of them wrote their first puzzles either
                for puzzlethon or BPH, and it's been lovely to see so many
                students across class years getting involved in puzzles. We
                ended up with ~25 puzzle writers in total, which is a pretty
                hefty squad for a college hunt. Having such a large team with so
                much enthusiasm for what we've doing keeps us hopeful for the
                future of Brown Puzzlehunt.
              </p>

              <p>
                While we've learned a lot from this year, we ultimately feel
                that we made a pretty awesome final product that represents the
                culmination of months and months of hard work and creativity.
                While our team has perhaps not gotten as much sleep as would be
                ideal in the last few weeks, it was a good run and we're
                optimistic about what's to come for next year :)
              </p>

              <div className="grid grid-cols-2 gap-4">
                <img
                  className="rounded-md"
                  src="/wrapup/images/image25.jpg"
                  alt=""
                />
                <img
                  className="rounded-md"
                  src="/wrapup/images/image19.jpg"
                  alt=""
                />
              </div>
            </TOCSection>

            <TOCSection sectionId={39} tocTitle="Exit Survey">
              <h2>Exit survey</h2>

              <p>
                Thanks so much for solving our third annual hunt! We're always
                trying to improve our event and would love any feedback you have
                for us. Find our feedback form{" "}
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSf_zdQ3ml_4QMhZ9YpiHtcB_pwX5-r3CRJTPR266JkT7soMgQ/viewform?usp=dialog"
                  className="text-link no-underline hover:underline"
                >
                  here
                </a>
                .
              </p>
              <p>
                If you'd like to support Brown Puzzle Club to enable us to keep
                doing cool things like this in the future, you can do so{" "}
                <a
                  href="https://bbis.advancement.brown.edu/BBPhenix/give-now?did=05732af4-d994-4d40-bcd6-fb42d07b6eab"
                  className="text-link no-underline hover:underline"
                >
                  here
                </a>
                .
              </p>
            </TOCSection>

            <TOCSection sectionId={40} tocTitle="Statistics">
              <h2>Statistics</h2>
              {/* TEAM STATS */}
              {/* fewest guesses */}
              <h3>Fewest Guesses</h3>
              <Table className="my-0 w-fit">
                <TableHeader>
                  <TableRow className="hover:bg-inherit">
                    <TableHead className="text-main-header">Team</TableHead>
                    <TableHead className="text-main-header">
                      Guess Count*
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="pointer-events-none">
                  <TableRow>
                    <TableCell>Casabllama</TableCell>
                    <TableCell className="text-center">59</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>The Wob Blizzards</TableCell>
                    <TableCell className="text-center">105</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      The Greater Embarrassment Community Theater
                    </TableCell>
                    <TableCell className="text-center">105</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Living Off Hope</TableCell>
                    <TableCell className="text-center">115</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Husky Hunters</TableCell>
                    <TableCell className="text-center">124</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Cardinality</TableCell>
                    <TableCell className="text-center">129</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>plugh</TableCell>
                    <TableCell className="text-center">139</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Theatre Screen's Bright Illumination</TableCell>
                    <TableCell className="text-center">143</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Lefty</TableCell>
                    <TableCell className="text-center">146</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>come back to us later</TableCell>
                    <TableCell className="text-center">146</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <p className="text-sm text-main-header">
                *Includes PARTIALs and TASKs. Casabllama's solve was essentially
                flawless.
              </p>
              {/* most guesses */}
              <h3>Most Guesses</h3>
              <Table className="my-0 w-fit">
                <TableHeader>
                  <TableRow className="hover:bg-inherit">
                    <TableHead className="text-main-header">Team</TableHead>
                    <TableHead className="text-main-header">
                      Guess Count
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="pointer-events-none">
                  <TableRow>
                    <TableCell>🍓➡️🐢</TableCell>
                    <TableCell className="text-center">689</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Hunters Around The World</TableCell>
                    <TableCell className="text-center">684</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Cacheiras</TableCell>
                    <TableCell className="text-center">591</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>希望404</TableCell>
                    <TableCell className="text-center">469</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Les Gaulois</TableCell>
                    <TableCell className="text-center">460</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      AHAMILTON RB.GY/TC4L8X CCAPAC APU #1 FAN + friends
                    </TableCell>
                    <TableCell className="text-center">420</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>the riddlers</TableCell>
                    <TableCell className="text-center">419</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Puzzle Solution Doxxers</TableCell>
                    <TableCell className="text-center">414</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Amateur Hour</TableCell>
                    <TableCell className="text-center">399</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>何以为我</TableCell>
                    <TableCell className="text-center">393</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              {/* fewest hints */}
              <h3>Fewest Hints</h3>
              <Table className="my-0 w-fit">
                <TableHeader>
                  <TableRow className="hover:bg-inherit">
                    <TableHead className="text-main-header">Team</TableHead>
                    <TableHead className="text-main-header">
                      Hint Count
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="pointer-events-none">
                  <TableRow>
                    <TableCell>chat</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>C-t Fillers</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Casabllama</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Please Clap</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Double Award Nominee</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Living Off Hope</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Cardinality</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Ultimate Brownies</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Red Carpet Herrings 🎏</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Dreamer Spinning Suspended Disbelief</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      ⡫ I GUESS WE CAN'T ALL SIT NEXT TO EACH OTHER
                    </TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>SeptaCube</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>simplicissimus</TableCell>
                    <TableCell className="text-center">1</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Tricksters</TableCell>
                    <TableCell className="text-center">1</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Mobius Strippers</TableCell>
                    <TableCell className="text-center">1</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              {/* most hints */}
              <h3>Most Hints</h3>
              <Table className="my-0 w-fit">
                <TableHeader>
                  <TableRow className="hover:bg-inherit">
                    <TableHead className="text-main-header">Team</TableHead>
                    <TableHead className="text-main-header">
                      Hint Count
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="pointer-events-none">
                  <TableRow>
                    <TableCell>Alteleid</TableCell>
                    <TableCell className="text-center">24</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>何以为我</TableCell>
                    <TableCell className="text-center">21</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>More About Vikings</TableCell>
                    <TableCell className="text-center">21</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Turtle Power</TableCell>
                    <TableCell className="text-center">20</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Hunters Around The World</TableCell>
                    <TableCell className="text-center">20</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Livin’ Covida Loca</TableCell>
                    <TableCell className="text-center">19</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Hong Kong Guy My</TableCell>
                    <TableCell className="text-center">19</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      Intervarsi-Teammate: Slowdown Showtime!
                    </TableCell>
                    <TableCell className="text-center">18</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Team Conundrum</TableCell>
                    <TableCell className="text-center">18</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Team Peggle</TableCell>
                    <TableCell className="text-center">18</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              {/* most hints & replies */}
              <h3>Most Hints & Replies</h3>
              <Table className="my-0 w-fit">
                <TableHeader>
                  <TableRow className="hover:bg-inherit">
                    <TableHead className="text-main-header">Team</TableHead>
                    <TableHead className="text-main-header">
                      Total Hint Count
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="pointer-events-none">
                  <TableRow>
                    <TableCell>Hunters Around The World</TableCell>
                    <TableCell className="text-center">58</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Alteleid</TableCell>
                    <TableCell className="text-center">53</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Livin’ Covida Loca</TableCell>
                    <TableCell className="text-center">43</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>the riddlers</TableCell>
                    <TableCell className="text-center">42</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Puzzle Solution Doxxers</TableCell>
                    <TableCell className="text-center">36</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>helppuzzles</TableCell>
                    <TableCell className="text-center">35</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>何以为我</TableCell>
                    <TableCell className="text-center">34</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Hong Kong Guy My</TableCell>
                    <TableCell className="text-center">32</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Maxwell Rose</TableCell>
                    <TableCell className="text-center">32</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>stɹeɪjə maɪt</TableCell>
                    <TableCell className="text-center">30</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              {/* PUZZLE STATS */}
              {/* primary stats */}
              <h3>Puzzle Statistics</h3>
              <Table className="my-0 w-fit">
                <TableHeader>
                  <TableRow className="hover:bg-inherit">
                    <TableHead className="text-main-header">Puzzle</TableHead>
                    <TableHead className="text-main-header">Guesses</TableHead>
                    <TableHead className="text-main-header">Solves</TableHead>
                    <TableHead className="text-main-header">
                      Backsolves
                    </TableHead>
                    <TableHead className="text-main-header">Hints</TableHead>
                    <TableHead className="text-main-header">
                      Hints & Replies
                    </TableHead>
                    <TableHead className="text-main-header">Tokens</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="pointer-events-none">
                  <TableRow>
                    <TableCell>a-fistful-of-cards</TableCell>
                    <TableCell className="text-center">350</TableCell>
                    <TableCell className="text-center">212</TableCell>
                    <TableCell className="text-center">85</TableCell>
                    <TableCell className="text-center">5</TableCell>
                    <TableCell className="text-center">5</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>a-fistful-of-cards-ii</TableCell>
                    <TableCell className="text-center">190</TableCell>
                    <TableCell className="text-center">158</TableCell>
                    <TableCell className="text-center">17</TableCell>
                    <TableCell className="text-center">2</TableCell>
                    <TableCell className="text-center">2</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>a-fistful-of-cards-iii</TableCell>
                    <TableCell className="text-center">184</TableCell>
                    <TableCell className="text-center">131</TableCell>
                    <TableCell className="text-center">15</TableCell>
                    <TableCell className="text-center">2</TableCell>
                    <TableCell className="text-center">2</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>a-fistful-of-cards-iv</TableCell>
                    <TableCell className="text-center">420</TableCell>
                    <TableCell className="text-center">95</TableCell>
                    <TableCell className="text-center">12</TableCell>
                    <TableCell className="text-center">23</TableCell>
                    <TableCell className="text-center">33</TableCell>
                    <TableCell className="text-center">1</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>aha-erlebnis</TableCell>
                    <TableCell className="text-center">637</TableCell>
                    <TableCell className="text-center">138</TableCell>
                    <TableCell className="text-center">0</TableCell>
                    <TableCell className="text-center">35</TableCell>
                    <TableCell className="text-center">54</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>are-you-sure</TableCell>
                    <TableCell className="text-center">229</TableCell>
                    <TableCell className="text-center">145</TableCell>
                    <TableCell className="text-center">4</TableCell>
                    <TableCell className="text-center">1</TableCell>
                    <TableCell className="text-center">1</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>balloon-animals</TableCell>
                    <TableCell className="text-center">412</TableCell>
                    <TableCell className="text-center">179</TableCell>
                    <TableCell className="text-center">0</TableCell>
                    <TableCell className="text-center">10</TableCell>
                    <TableCell className="text-center">15</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>barbie</TableCell>
                    <TableCell className="text-center">230</TableCell>
                    <TableCell className="text-center">118</TableCell>
                    <TableCell className="text-center">19</TableCell>
                    <TableCell className="text-center">38</TableCell>
                    <TableCell className="text-center">58</TableCell>
                    <TableCell className="text-center">1</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>beads</TableCell>
                    <TableCell className="text-center">579</TableCell>
                    <TableCell className="text-center">151</TableCell>
                    <TableCell className="text-center">27</TableCell>
                    <TableCell className="text-center">72</TableCell>
                    <TableCell className="text-center">112</TableCell>
                    <TableCell className="text-center">2</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>bluenos-puzzle-box</TableCell>
                    <TableCell className="text-center">321</TableCell>
                    <TableCell className="text-center">124</TableCell>
                    <TableCell className="text-center">10</TableCell>
                    <TableCell className="text-center">14</TableCell>
                    <TableCell className="text-center">23</TableCell>
                    <TableCell className="text-center">1</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>boring-plot</TableCell>
                    <TableCell className="text-center">191</TableCell>
                    <TableCell className="text-center">94</TableCell>
                    <TableCell className="text-center">0</TableCell>
                    <TableCell className="text-center">45</TableCell>
                    <TableCell className="text-center">72</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>chain-letters</TableCell>
                    <TableCell className="text-center">216</TableCell>
                    <TableCell className="text-center">136</TableCell>
                    <TableCell className="text-center">15</TableCell>
                    <TableCell className="text-center">23</TableCell>
                    <TableCell className="text-center">37</TableCell>
                    <TableCell className="text-center">3</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>color-wheel</TableCell>
                    <TableCell className="text-center">338</TableCell>
                    <TableCell className="text-center">83</TableCell>
                    <TableCell className="text-center">11</TableCell>
                    <TableCell className="text-center">37</TableCell>
                    <TableCell className="text-center">56</TableCell>
                    <TableCell className="text-center">3</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>connect-the-dots</TableCell>
                    <TableCell className="text-center">788</TableCell>
                    <TableCell className="text-center">194</TableCell>
                    <TableCell className="text-center">15</TableCell>
                    <TableCell className="text-center">37</TableCell>
                    <TableCell className="text-center">51</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>constellation</TableCell>
                    <TableCell className="text-center">472</TableCell>
                    <TableCell className="text-center">93</TableCell>
                    <TableCell className="text-center">3</TableCell>
                    <TableCell className="text-center">29</TableCell>
                    <TableCell className="text-center">39</TableCell>
                    <TableCell className="text-center">2</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>cutting-room-floor</TableCell>
                    <TableCell className="text-center">400</TableCell>
                    <TableCell className="text-center">86</TableCell>
                    <TableCell className="text-center">0</TableCell>
                    <TableCell className="text-center">43</TableCell>
                    <TableCell className="text-center">62</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>drop-the</TableCell>
                    <TableCell className="text-center">297</TableCell>
                    <TableCell className="text-center">206</TableCell>
                    <TableCell className="text-center">0</TableCell>
                    <TableCell className="text-center">5</TableCell>
                    <TableCell className="text-center">8</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>eye-of-the-storm</TableCell>
                    <TableCell className="text-center">184</TableCell>
                    <TableCell className="text-center">127</TableCell>
                    <TableCell className="text-center">9</TableCell>
                    <TableCell className="text-center">30</TableCell>
                    <TableCell className="text-center">49</TableCell>
                    <TableCell className="text-center">1</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>eye-spy</TableCell>
                    <TableCell className="text-center">4431</TableCell>
                    <TableCell className="text-center">108</TableCell>
                    <TableCell className="text-center">35</TableCell>
                    <TableCell className="text-center">16</TableCell>
                    <TableCell className="text-center">21</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>eye-to-eye</TableCell>
                    <TableCell className="text-center">124</TableCell>
                    <TableCell className="text-center">97</TableCell>
                    <TableCell className="text-center">0</TableCell>
                    <TableCell className="text-center">3</TableCell>
                    <TableCell className="text-center">6</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>filming-schedule</TableCell>
                    <TableCell className="text-center">337</TableCell>
                    <TableCell className="text-center">241</TableCell>
                    <TableCell className="text-center">7</TableCell>
                    <TableCell className="text-center">5</TableCell>
                    <TableCell className="text-center">5</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>financial-crimes-3</TableCell>
                    <TableCell className="text-center">272</TableCell>
                    <TableCell className="text-center">112</TableCell>
                    <TableCell className="text-center">13</TableCell>
                    <TableCell className="text-center">12</TableCell>
                    <TableCell className="text-center">17</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>find-ben</TableCell>
                    <TableCell className="text-center">603</TableCell>
                    <TableCell className="text-center">232</TableCell>
                    <TableCell className="text-center">22</TableCell>
                    <TableCell className="text-center">7</TableCell>
                    <TableCell className="text-center">8</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>fractal-shanty</TableCell>
                    <TableCell className="text-center">396</TableCell>
                    <TableCell className="text-center">163</TableCell>
                    <TableCell className="text-center">70</TableCell>
                    <TableCell className="text-center">31</TableCell>
                    <TableCell className="text-center">53</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>fridge-magnets</TableCell>
                    <TableCell className="text-center">207</TableCell>
                    <TableCell className="text-center">93</TableCell>
                    <TableCell className="text-center">1</TableCell>
                    <TableCell className="text-center">3</TableCell>
                    <TableCell className="text-center">4</TableCell>
                    <TableCell className="text-center">1</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>genetic-counseling</TableCell>
                    <TableCell className="text-center">193</TableCell>
                    <TableCell className="text-center">111</TableCell>
                    <TableCell className="text-center">43</TableCell>
                    <TableCell className="text-center">2</TableCell>
                    <TableCell className="text-center">3</TableCell>
                    <TableCell className="text-center">1</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>hand-letters</TableCell>
                    <TableCell className="text-center">167</TableCell>
                    <TableCell className="text-center">143</TableCell>
                    <TableCell className="text-center">1</TableCell>
                    <TableCell className="text-center">4</TableCell>
                    <TableCell className="text-center">6</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>heist</TableCell>
                    <TableCell className="text-center">405</TableCell>
                    <TableCell className="text-center">235</TableCell>
                    <TableCell className="text-center">60</TableCell>
                    <TableCell className="text-center">14</TableCell>
                    <TableCell className="text-center">16</TableCell>
                    <TableCell className="text-center">1</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>heist-ii</TableCell>
                    <TableCell className="text-center">184</TableCell>
                    <TableCell className="text-center">164</TableCell>
                    <TableCell className="text-center">6</TableCell>
                    <TableCell className="text-center">4</TableCell>
                    <TableCell className="text-center">5</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>heist-iii</TableCell>
                    <TableCell className="text-center">186</TableCell>
                    <TableCell className="text-center">143</TableCell>
                    <TableCell className="text-center">10</TableCell>
                    <TableCell className="text-center">5</TableCell>
                    <TableCell className="text-center">8</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>identify-the-piece</TableCell>
                    <TableCell className="text-center">4249</TableCell>
                    <TableCell className="text-center">131</TableCell>
                    <TableCell className="text-center">8</TableCell>
                    <TableCell className="text-center">30</TableCell>
                    <TableCell className="text-center">51</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>imagine</TableCell>
                    <TableCell className="text-center">332</TableCell>
                    <TableCell className="text-center">108</TableCell>
                    <TableCell className="text-center">21</TableCell>
                    <TableCell className="text-center">34</TableCell>
                    <TableCell className="text-center">45</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>international-neighbours</TableCell>
                    <TableCell className="text-center">769</TableCell>
                    <TableCell className="text-center">117</TableCell>
                    <TableCell className="text-center">61</TableCell>
                    <TableCell className="text-center">64</TableCell>
                    <TableCell className="text-center">104</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>like-clockwork</TableCell>
                    <TableCell className="text-center">495</TableCell>
                    <TableCell className="text-center">93</TableCell>
                    <TableCell className="text-center">3</TableCell>
                    <TableCell className="text-center">53</TableCell>
                    <TableCell className="text-center">71</TableCell>
                    <TableCell className="text-center">3</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>lost-lyric</TableCell>
                    <TableCell className="text-center">355</TableCell>
                    <TableCell className="text-center">157</TableCell>
                    <TableCell className="text-center">28</TableCell>
                    <TableCell className="text-center">39</TableCell>
                    <TableCell className="text-center">49</TableCell>
                    <TableCell className="text-center">2</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>m-guards-n-doors-and-k-choices</TableCell>
                    <TableCell className="text-center">707</TableCell>
                    <TableCell className="text-center">156</TableCell>
                    <TableCell className="text-center">30</TableCell>
                    <TableCell className="text-center">9</TableCell>
                    <TableCell className="text-center">13</TableCell>
                    <TableCell className="text-center">1</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>narcissism</TableCell>
                    <TableCell className="text-center">360</TableCell>
                    <TableCell className="text-center">147</TableCell>
                    <TableCell className="text-center">0</TableCell>
                    <TableCell className="text-center">1</TableCell>
                    <TableCell className="text-center">1</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>one-guard-screen</TableCell>
                    <TableCell className="text-center">540</TableCell>
                    <TableCell className="text-center">177</TableCell>
                    <TableCell className="text-center">12</TableCell>
                    <TableCell className="text-center">126</TableCell>
                    <TableCell className="text-center">159</TableCell>
                    <TableCell className="text-center">4</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>opening-sequences</TableCell>
                    <TableCell className="text-center">700</TableCell>
                    <TableCell className="text-center">143</TableCell>
                    <TableCell className="text-center">32</TableCell>
                    <TableCell className="text-center">15</TableCell>
                    <TableCell className="text-center">24</TableCell>
                    <TableCell className="text-center">1</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>peanuts</TableCell>
                    <TableCell className="text-center">302</TableCell>
                    <TableCell className="text-center">224</TableCell>
                    <TableCell className="text-center">5</TableCell>
                    <TableCell className="text-center">5</TableCell>
                    <TableCell className="text-center">7</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>piecemeal</TableCell>
                    <TableCell className="text-center">274</TableCell>
                    <TableCell className="text-center">149</TableCell>
                    <TableCell className="text-center">2</TableCell>
                    <TableCell className="text-center">28</TableCell>
                    <TableCell className="text-center">36</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>plagiarism</TableCell>
                    <TableCell className="text-center">726</TableCell>
                    <TableCell className="text-center">221</TableCell>
                    <TableCell className="text-center">1</TableCell>
                    <TableCell className="text-center">14</TableCell>
                    <TableCell className="text-center">15</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>red-blue</TableCell>
                    <TableCell className="text-center">382</TableCell>
                    <TableCell className="text-center">88</TableCell>
                    <TableCell className="text-center">9</TableCell>
                    <TableCell className="text-center">33</TableCell>
                    <TableCell className="text-center">55</TableCell>
                    <TableCell className="text-center">3</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>secret-ingredient</TableCell>
                    <TableCell className="text-center">190</TableCell>
                    <TableCell className="text-center">121</TableCell>
                    <TableCell className="text-center">0</TableCell>
                    <TableCell className="text-center">2</TableCell>
                    <TableCell className="text-center">3</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>six-degrees</TableCell>
                    <TableCell className="text-center">5307</TableCell>
                    <TableCell className="text-center">128</TableCell>
                    <TableCell className="text-center">0</TableCell>
                    <TableCell className="text-center">26</TableCell>
                    <TableCell className="text-center">32</TableCell>
                    <TableCell className="text-center">1</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>sound-of-music</TableCell>
                    <TableCell className="text-center">152</TableCell>
                    <TableCell className="text-center">98</TableCell>
                    <TableCell className="text-center">14</TableCell>
                    <TableCell className="text-center">4</TableCell>
                    <TableCell className="text-center">5</TableCell>
                    <TableCell className="text-center">1</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>ten-guards-ten-doors</TableCell>
                    <TableCell className="text-center">953</TableCell>
                    <TableCell className="text-center">208</TableCell>
                    <TableCell className="text-center">0</TableCell>
                    <TableCell className="text-center">37</TableCell>
                    <TableCell className="text-center">52</TableCell>
                    <TableCell className="text-center">3</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>the-compact-disc</TableCell>
                    <TableCell className="text-center">534</TableCell>
                    <TableCell className="text-center">87</TableCell>
                    <TableCell className="text-center">24</TableCell>
                    <TableCell className="text-center">40</TableCell>
                    <TableCell className="text-center">66</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>the-final-heist</TableCell>
                    <TableCell className="text-center">214</TableCell>
                    <TableCell className="text-center">93</TableCell>
                    <TableCell className="text-center">6</TableCell>
                    <TableCell className="text-center">7</TableCell>
                    <TableCell className="text-center">7</TableCell>
                    <TableCell className="text-center">2</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>the-guard-and-the-door</TableCell>
                    <TableCell className="text-center">778</TableCell>
                    <TableCell className="text-center">138</TableCell>
                    <TableCell className="text-center">0</TableCell>
                    <TableCell className="text-center">51</TableCell>
                    <TableCell className="text-center">79</TableCell>
                    <TableCell className="text-center">1</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>the-snack-zone</TableCell>
                    <TableCell className="text-center">156</TableCell>
                    <TableCell className="text-center">136</TableCell>
                    <TableCell className="text-center">0</TableCell>
                    <TableCell className="text-center">2</TableCell>
                    <TableCell className="text-center">2</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>two-guards-river</TableCell>
                    <TableCell className="text-center">246</TableCell>
                    <TableCell className="text-center">246</TableCell>
                    <TableCell className="text-center">0</TableCell>
                    <TableCell className="text-center">1</TableCell>
                    <TableCell className="text-center">3</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>two-guards-two-doors</TableCell>
                    <TableCell className="text-center">782</TableCell>
                    <TableCell className="text-center">286</TableCell>
                    <TableCell className="text-center">5</TableCell>
                    <TableCell className="text-center">2</TableCell>
                    <TableCell className="text-center">2</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>walk-of-fame</TableCell>
                    <TableCell className="text-center">889</TableCell>
                    <TableCell className="text-center">184</TableCell>
                    <TableCell className="text-center">67</TableCell>
                    <TableCell className="text-center">50</TableCell>
                    <TableCell className="text-center">62</TableCell>
                    <TableCell className="text-center">1</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>watching-between-the-lines</TableCell>
                    <TableCell className="text-center">458</TableCell>
                    <TableCell className="text-center">158</TableCell>
                    <TableCell className="text-center">43</TableCell>
                    <TableCell className="text-center">35</TableCell>
                    <TableCell className="text-center">41</TableCell>
                    <TableCell className="text-center">3</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>whats-my-ride</TableCell>
                    <TableCell className="text-center">362</TableCell>
                    <TableCell className="text-center">131</TableCell>
                    <TableCell className="text-center">34</TableCell>
                    <TableCell className="text-center">8</TableCell>
                    <TableCell className="text-center">9</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>youve-got-this-covered</TableCell>
                    <TableCell className="text-center">289</TableCell>
                    <TableCell className="text-center">160</TableCell>
                    <TableCell className="text-center">22</TableCell>
                    <TableCell className="text-center">3</TableCell>
                    <TableCell className="text-center">4</TableCell>
                    <TableCell className="text-center">1</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              {/* secondary stats */}
              <h3>Common Incorrect Answers</h3>
              <Table className="my-0 w-fit">
                <TableHeader>
                  <TableRow className="hover:bg-inherit">
                    <TableHead className="text-main-header">Puzzle</TableHead>
                    <TableHead className="text-main-header">
                      Top Incorrect
                    </TableHead>
                    <TableHead className="text-main-header">
                      Relative Frequency
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="pointer-events-none">
                  <TableRow>
                    <TableCell>identify-the-piece</TableCell>
                    <TableCell>LITTLEFUGUE</TableCell>
                    <TableCell className="text-center">116.0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>imagine</TableCell>
                    <TableCell>APOLOGIZE</TableCell>
                    <TableCell className="text-center">108.3</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>eye-spy</TableCell>
                    <TableCell>PROVIDENCE</TableCell>
                    <TableCell className="text-center">96.3</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>six-degrees</TableCell>
                    <TableCell>DANIELRADCLIFFE</TableCell>
                    <TableCell className="text-center">90.6</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>narcissism</TableCell>
                    <TableCell>SUPERIOR</TableCell>
                    <TableCell className="text-center">90.5</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>connect-the-dots</TableCell>
                    <TableCell>SHAPES</TableCell>
                    <TableCell className="text-center">89.7</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>aha-erlebnis</TableCell>
                    <TableCell>GEFUHLPROOF</TableCell>
                    <TableCell className="text-center">86.2</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>plagiarism</TableCell>
                    <TableCell>CHILLEST</TableCell>
                    <TableCell className="text-center">73.8</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>m-guards-n-doors-and-k-choices</TableCell>
                    <TableCell>PULLEYS</TableCell>
                    <TableCell className="text-center">52.6</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>international-neighbours</TableCell>
                    <TableCell>FAVORITE</TableCell>
                    <TableCell className="text-center">51.3</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>the-final-heist</TableCell>
                    <TableCell>BLIND</TableCell>
                    <TableCell className="text-center">43.0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>two-guards-two-doors</TableCell>
                    <TableCell>STEERS</TableCell>
                    <TableCell className="text-center">38.8</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>ten-guards-ten-doors</TableCell>
                    <TableCell>SIX</TableCell>
                    <TableCell className="text-center">35.6</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>whats-my-ride</TableCell>
                    <TableCell>APOLLO</TableCell>
                    <TableCell className="text-center">33.6</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>opening-sequences</TableCell>
                    <TableCell>PAWNTOFF</TableCell>
                    <TableCell className="text-center">28.7</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>like-clockwork</TableCell>
                    <TableCell>ORANGE</TableCell>
                    <TableCell className="text-center">26.9</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>cutting-room-floor</TableCell>
                    <TableCell>BILLY</TableCell>
                    <TableCell className="text-center">26.7</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>lost-lyric</TableCell>
                    <TableCell>SUNDAY</TableCell>
                    <TableCell className="text-center">25.5</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>find-ben</TableCell>
                    <TableCell>MUSEUM</TableCell>
                    <TableCell className="text-center">25.4</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>red-blue</TableCell>
                    <TableCell>DATE</TableCell>
                    <TableCell className="text-center">25.0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>the-compact-disc</TableCell>
                    <TableCell>KUWAIT</TableCell>
                    <TableCell className="text-center">21.8</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>beads</TableCell>
                    <TableCell>PRESS</TableCell>
                    <TableCell className="text-center">19.2</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>walk-of-fame</TableCell>
                    <TableCell>CRUZ</TableCell>
                    <TableCell className="text-center">16.3</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>the-guard-and-the-door</TableCell>
                    <TableCell>ACTOR</TableCell>
                    <TableCell className="text-center">15.9</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>one-guard-screen</TableCell>
                    <TableCell>DOUBLESLIT</TableCell>
                    <TableCell className="text-center">15.8</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>youve-got-this-covered</TableCell>
                    <TableCell>DAY</TableCell>
                    <TableCell className="text-center">15.0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>boring-plot</TableCell>
                    <TableCell>EXTRACTION</TableCell>
                    <TableCell className="text-center">13.8</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>color-wheel</TableCell>
                    <TableCell>FENNEL</TableCell>
                    <TableCell className="text-center">13.3</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>watching-between-the-lines</TableCell>
                    <TableCell>BATESEED</TableCell>
                    <TableCell className="text-center">12.7</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>barbie</TableCell>
                    <TableCell>CHATTYKATHY</TableCell>
                    <TableCell className="text-center">11.9</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>fridge-magnets</TableCell>
                    <TableCell>DIREAP</TableCell>
                    <TableCell className="text-center">10.8</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>sound-of-music</TableCell>
                    <TableCell>CYANOCOCCUSNINE</TableCell>
                    <TableCell className="text-center">10.2</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>constellation</TableCell>
                    <TableCell>DURIAN</TableCell>
                    <TableCell className="text-center">9.7</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>chain-letters</TableCell>
                    <TableCell>THEGATHERINGSTORM</TableCell>
                    <TableCell className="text-center">8.8</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>piecemeal</TableCell>
                    <TableCell>TEXTALIEN</TableCell>
                    <TableCell className="text-center">8.7</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>heist</TableCell>
                    <TableCell>FLOORPLANBROWN</TableCell>
                    <TableCell className="text-center">8.5</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>a-fistful-of-cards-iv</TableCell>
                    <TableCell>ORANGE</TableCell>
                    <TableCell className="text-center">8.4</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>balloon-animals</TableCell>
                    <TableCell>REALPOPMUSIC</TableCell>
                    <TableCell className="text-center">8.4</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>filming-schedule</TableCell>
                    <TableCell>BANNED</TableCell>
                    <TableCell className="text-center">5.8</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>a-fistful-of-cards</TableCell>
                    <TableCell>GRI</TableCell>
                    <TableCell className="text-center">5.7</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>eye-to-eye</TableCell>
                    <TableCell>MIRRORS</TableCell>
                    <TableCell className="text-center">5.2</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>secret-ingredient</TableCell>
                    <TableCell>OASISSAND</TableCell>
                    <TableCell className="text-center">5.0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>drop-the</TableCell>
                    <TableCell>OLDERIDEAS</TableCell>
                    <TableCell className="text-center">4.9</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>fractal-shanty</TableCell>
                    <TableCell>MERFOLK</TableCell>
                    <TableCell className="text-center">4.3</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>bluenos-puzzle-box</TableCell>
                    <TableCell>WHEELING</TableCell>
                    <TableCell className="text-center">4.0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>genetic-counseling</TableCell>
                    <TableCell>JOLENE</TableCell>
                    <TableCell className="text-center">3.6</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>financial-crimes-3</TableCell>
                    <TableCell>ACTORSEQUITYPRIVATEFIRM</TableCell>
                    <TableCell className="text-center">3.6</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>a-fistful-of-cards-ii</TableCell>
                    <TableCell>SPRING</TableCell>
                    <TableCell className="text-center">3.2</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>eye-of-the-storm</TableCell>
                    <TableCell>TROPICS</TableCell>
                    <TableCell className="text-center">3.1</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>peanuts</TableCell>
                    <TableCell>PROTOHUMAN</TableCell>
                    <TableCell className="text-center">2.7</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>heist-ii</TableCell>
                    <TableCell>SPRING</TableCell>
                    <TableCell className="text-center">2.4</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>a-fistful-of-cards-iii</TableCell>
                    <TableCell>FIGHTLE</TableCell>
                    <TableCell className="text-center">2.3</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>hand-letters</TableCell>
                    <TableCell>LUNULE</TableCell>
                    <TableCell className="text-center">2.1</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>are-you-sure</TableCell>
                    <TableCell>COMBINATION</TableCell>
                    <TableCell className="text-center">2.1</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>the-snack-zone</TableCell>
                    <TableCell>SAUVINGNON</TableCell>
                    <TableCell className="text-center">1.5</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>heist-iii</TableCell>
                    <TableCell>IMPOSSIBLE</TableCell>
                    <TableCell className="text-center">1.4</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              {/* MISCELLANEOUS STATS */}
              {/* first solves */}
              <h3>First Solves</h3>
              <Table className="my-0 w-fit">
                <TableHeader>
                  <TableRow className="hover:bg-inherit">
                    <TableHead className="text-main-header"></TableHead>
                    <TableHead className="text-main-header">Puzzle</TableHead>
                    <TableHead className="text-main-header">Team</TableHead>
                    <TableHead className="text-main-header">
                      Time After Start
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="pointer-events-none">
                  <TableRow>
                    <TableCell>In Person</TableCell>
                    <TableCell>walk-of-fame</TableCell>
                    <TableCell>meowmeow</TableCell>
                    <TableCell>0m 14.178s</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Remote Box</TableCell>
                    <TableCell>two-guards-two-doors</TableCell>
                    <TableCell>
                      ✈✈✈ galactic procrastinators ✈✈✈
                    </TableCell>
                    <TableCell>5m 0.897s</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Remote</TableCell>
                    <TableCell>two-guards-two-doors</TableCell>
                    <TableCell>Theatre Screen's Bright Illumination</TableCell>
                    <TableCell>7m 20.635s</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              {/* longest guesses */}
              <h3>Longest Guesses</h3>
              <Table className="my-0 w-fit">
                <TableHeader>
                  <TableRow className="hover:bg-inherit">
                    <TableHead className="text-main-header">Guess</TableHead>
                    <TableHead className="text-main-header">Length</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="pointer-events-none">
                  <TableRow>
                    <TableCell>
                      THISISJUSTANAAOCTAVEASTHEBASSPARTANDITSBEENSHORTENEDABUNCHANDTHEREABIGGAPHEREIDKWHATELSEYOUWANT
                    </TableCell>
                    <TableCell className="text-center">95</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      OOOOOOOOOOOAAAAEAAIAUJOOOOOOOOOOOOOAAEOAAUUAEEEEEEEEEAAAAEAEIEAJOOOOOOOOOOEEEEOAAAAAAAA
                    </TableCell>
                    <TableCell className="text-center">87</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      ASIFWALTZBYGEORDIEGREEPLISTENTOTHENEWSOUNDTODAYTHEBESTALBUMOFTWENTYTWENTYFOUR
                    </TableCell>
                    <TableCell className="text-center">77</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      FUNFACTTHERAFSTARTEDTHECARROTSMYTHWHENWHATTHEIRPILOTSACTUALLYHADWASRADAR
                    </TableCell>
                    <TableCell className="text-center">72</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      HTTPSWWWBROWNPUZZLEHUNTCOMNEXTIMAGEURLFNEXTFSTATICFMEDIAFSNACKBEJPGWQ
                    </TableCell>
                    <TableCell className="text-center">69</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      AARGHWHICHISTHERIGHTSHAKESPEARESOURCETHATMATCHESYOURLINENUMBERS
                    </TableCell>
                    <TableCell className="text-center">63</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      SINKCALPUREVLIGOLINDIGOLINDIHWOLPRELACKNIDNIGOLINKCALISETILE
                    </TableCell>
                    <TableCell className="text-center">60</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      ATLEASTWITHTHEPREVIOUSONEYOUCANGETITFROMNUTRIMATICWITHETUDES
                    </TableCell>
                    <TableCell className="text-center">60</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      WHEREDIDICOMEFROMWHEREDIDIGOWHEREDIDICOMEFROMCOTTONEYEDJOE
                    </TableCell>
                    <TableCell className="text-center">58</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      WAITISITJUSTNORMALMONTYHALLANDWEDONTCAREABOUTTHEBULLCRAP
                    </TableCell>
                    <TableCell className="text-center">56</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      IDKWHATTHISPUZZLEISABOUTBUTILOVETHELONGESTJOHNSYAY
                    </TableCell>
                    <TableCell className="text-center">50</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      THERESNOPUZZLEHEREJUSTFUCKINGFLAVORTEXTWHATTHEFUCK
                    </TableCell>
                    <TableCell className="text-center">50</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      LETSWATCHEXPERTSTRYTOPUZZLEATSOMERIDDLESINADESERT
                    </TableCell>
                    <TableCell className="text-center">49</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      LETSWATCHEXPERTSTRYTOPUZZLEATSOMERIDDLESINADESERT
                    </TableCell>
                    <TableCell className="text-center">49</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      LETSWATCHEXPERTSTRYTOPUZZLEATSOMERIDDLESINADESERT
                    </TableCell>
                    <TableCell className="text-center">49</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      LETSWATCHEXPERTSTRYTOPUZZLEATSOMERIDDLESINADESERT
                    </TableCell>
                    <TableCell className="text-center">49</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      IFYOUWANTMETOSTOPSENDMEADMITSPROCYONINPUZZLEWORLD
                    </TableCell>
                    <TableCell className="text-center">49</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      LETSWATCHEXPERTSTRYTOPUZZLEATSOMERIDDLESINADESERT
                    </TableCell>
                    <TableCell className="text-center">49</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      LETSWATCHEXPERTSTRYTOPUZZLEATSOMERIDDLESINADESERT
                    </TableCell>
                    <TableCell className="text-center">49</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      LETSWATCHEXPERTSTRYTOPUZZLEATSOMERIDDLESINADESERT
                    </TableCell>
                    <TableCell className="text-center">49</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      LETSWATCHEXPERTSTRYTOPUZZLEATSOMERIDDLESINADESERT
                    </TableCell>
                    <TableCell className="text-center">49</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      LETSWATCHEXPERTSTRYTOPUZZLEATSOMERIDDLESINADESERT
                    </TableCell>
                    <TableCell className="text-center">49</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      LETSWATCHEXPERTSTRYTOPUZZLEATSOMERIDDLESINADESERT
                    </TableCell>
                    <TableCell className="text-center">49</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      LETSWATCHEXPERTSTRYTOPUZZLEATSOMERIDDLESINADESERT
                    </TableCell>
                    <TableCell className="text-center">49</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      LETSWATCHEXPERTSTRYTOPUZZLEATSOMERIDDLESINADESERT
                    </TableCell>
                    <TableCell className="text-center">49</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              {/* one-letter guesses */}
              <h3>One-Letter Guesses</h3>
              <Table className="my-0 w-fit">
                <TableHeader>
                  <TableRow className="hover:bg-inherit">
                    <TableHead className="text-center text-main-header">
                      I
                    </TableHead>
                    <TableHead className="text-main-header">O</TableHead>
                    <TableHead className="text-main-header">R</TableHead>
                    <TableHead className="text-main-header">A</TableHead>
                    <TableHead className="text-main-header">U</TableHead>
                    <TableHead className="text-main-header">E</TableHead>
                    <TableHead className="text-main-header">B</TableHead>
                    <TableHead className="text-main-header">C</TableHead>
                    <TableHead className="text-main-header">D</TableHead>
                    <TableHead className="text-main-header">V</TableHead>
                    <TableHead className="text-main-header">G</TableHead>
                    <TableHead className="text-main-header">H</TableHead>
                    <TableHead className="text-main-header">M</TableHead>
                    <TableHead className="text-main-header">Y</TableHead>
                    <TableHead className="text-main-header">S</TableHead>
                    <TableHead className="text-main-header">X</TableHead>
                    <TableHead className="text-main-header">K</TableHead>
                    <TableHead className="text-main-header">N</TableHead>
                    <TableHead className="text-main-header">F</TableHead>
                    <TableHead className="text-main-header">J</TableHead>
                    <TableHead className="text-main-header">L</TableHead>
                    <TableHead className="text-main-header">P</TableHead>
                    <TableHead className="text-main-header">Q</TableHead>
                    <TableHead className="text-main-header">T</TableHead>
                    <TableHead className="text-main-header">W</TableHead>
                    <TableHead className="text-main-header">Z</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="pointer-events-none">
                  <TableRow className="hover:bg-inherit">
                    <TableCell className="text-center">13</TableCell>
                    <TableCell className="text-center">9</TableCell>
                    <TableCell className="text-center">8</TableCell>
                    <TableCell className="text-center">8</TableCell>
                    <TableCell className="text-center">7</TableCell>
                    <TableCell className="text-center">4</TableCell>
                    <TableCell className="text-center">4</TableCell>
                    <TableCell className="text-center">4</TableCell>
                    <TableCell className="text-center">4</TableCell>
                    <TableCell className="text-center">3</TableCell>
                    <TableCell className="text-center">3</TableCell>
                    <TableCell className="text-center">3</TableCell>
                    <TableCell className="text-center">2</TableCell>
                    <TableCell className="text-center">2</TableCell>
                    <TableCell className="text-center">2</TableCell>
                    <TableCell className="text-center">2</TableCell>
                    <TableCell className="text-center">2</TableCell>
                    <TableCell className="text-center">2</TableCell>
                    <TableCell className="text-center">2</TableCell>
                    <TableCell className="text-center">1</TableCell>
                    <TableCell className="text-center">1</TableCell>
                    <TableCell className="text-center">1</TableCell>
                    <TableCell className="text-center">1</TableCell>
                    <TableCell className="text-center">1</TableCell>
                    <TableCell className="text-center">1</TableCell>
                    <TableCell className="text-center">1</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              {/* shortest hints */}
              <h3>Shortest Hint Requests</h3>
              <Table className="my-0 w-fit">
                <TableHeader>
                  <TableRow className="hover:bg-inherit">
                    <TableHead className="text-main-header">Request</TableHead>
                    <TableHead className="text-main-header">Length</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="pointer-events-none">
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>jk\n</TableCell>
                    <TableCell className="text-center">3</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>GIARRE</TableCell>
                    <TableCell className="text-center">6</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>no clue</TableCell>
                    <TableCell className="text-center">7</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>CHILLEST</TableCell>
                    <TableCell className="text-center">8</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Hint on start</TableCell>
                    <TableCell className="text-center">13</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>ignore this\n\n</TableCell>
                    <TableCell className="text-center">13</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>What does BLUENO mean?</TableCell>
                    <TableCell className="text-center">23</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>is it related to course timings?\n</TableCell>
                    <TableCell className="text-center">33</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>We're not sure where to start here</TableCell>
                    <TableCell className="text-center">34</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <h3>Events</h3>
              <Table className="my-0 w-fit">
                <TableHeader>
                  <TableRow className="hover:bg-inherit">
                    <TableHead className="text-main-header"></TableHead>
                    <TableHead className="text-main-header">
                      Submitted
                    </TableHead>
                    <TableHead className="text-main-header">Used</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="pointer-events-none">
                  <TableRow>
                    <TableHead className="text-main-header">
                      auditioning-for-a-role
                    </TableHead>
                    <TableCell className="text-center">23</TableCell>
                    <TableCell className="text-center">22</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead className="text-main-header">
                      poster-pastiche
                    </TableHead>
                    <TableCell className="text-center">18</TableCell>
                    <TableCell className="text-center">16</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead className="text-main-header">
                      sneaking-a-screening
                    </TableHead>
                    <TableCell className="text-center">16</TableCell>
                    <TableCell className="text-center">15</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TOCSection>
          </article>
        </div>

        <div
          className="mx-auto hidden w-[80px] translate-x-4 xl:block"
          style={{
            backgroundImage: "url('wrapup/images/sidebar.png')",
            backgroundRepeat: "repeat-y",
            backgroundSize: "contain",
            backgroundPosition: "center top",
          }}
        />
      </div>
    </TOCContext.Provider>
  );
}

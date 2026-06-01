"use client";

import { SquareArrowOutUpRight } from "lucide-react";
import {
  TOCContext,
  useTOCContextValues,
  TOCSection,
  TableOfContents,
} from "@/components/toc/TableOfContents";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

import { cn } from "~/lib/utils";

export default function WrapUp() {
  const values = useTOCContextValues();
  const [activeTab, setActiveTab] = useState("in-person");
  return (
    <TOCContext.Provider value={values}>
      <div className="flex px-4">
        <TableOfContents />
        {/* Spacer since TOC is fixed */}
        <div className="md:w-1/4 xl:w-1/5"></div>
        <div className="w-full md:w-3/4 xl:w-3/5">
          <article className="prose prose-wrapup w-full max-w-none bg-black/20 p-6">
            <h1 className="font-semibold text-amber-300">Wrapup</h1>
            <p>
              Congratulations to the 15 in-person teams and <s>98</s> 100 remote
              teams who finished the hunt!
            </p>
            <p>
              Congrats to our winning in-person team,{" "}
              <span className="font-semibold text-amber-400">
                The WugWug WugWug
              </span>
              , and our first in-person finishers,{" "}
              <span className="font-semibold text-amber-400">Cardinality</span>!
            </p>
            <p>
              Another congratulations to our first remote finishers,{" "}
              <span className="font-semibold text-amber-400">
                ⛈️ Thunderspeaker Thursday 🗣️‼️😶‍🌫️🙉🙄
              </span>
              !
            </p>

            <h3>Quick Summary</h3>
            <Table className="my-0 w-fit">
              <TableHeader>
                <TableRow className="hover:bg-inherit">
                  <TableHead className="text-main-header"></TableHead>
                  <TableHead className="text-main-header">In Person</TableHead>
                  <TableHead className="text-main-header">Remote</TableHead>
                  <TableHead className="text-main-header">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="pointer-events-none">
                <TableRow>
                  <TableHead className="text-main-header">Teams</TableHead>
                  <TableCell className="text-center">34</TableCell>
                  <TableCell className="text-center">384</TableCell>
                  <TableCell className="text-center">418</TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="text-main-header">Finishers</TableHead>
                  <TableCell className="text-center">15</TableCell>
                  <TableCell className="text-center">100</TableCell>
                  <TableCell className="text-center">115</TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="text-main-header">
                    Meta Solves
                  </TableHead>
                  <TableCell className="text-center">183</TableCell>
                  <TableCell className="text-center">1410</TableCell>
                  <TableCell className="text-center">1593</TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="text-main-header">
                    Participants
                  </TableHead>
                  <TableCell className="text-center">219</TableCell>
                  <TableCell className="text-center">536</TableCell>
                  <TableCell className="text-center">755</TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="text-main-header">
                    Hints Asked
                  </TableHead>
                  <TableCell className="text-center">115</TableCell>
                  <TableCell className="text-center">750</TableCell>
                  <TableCell className="text-center">865</TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="text-main-header">Guesses</TableHead>
                  <TableCell className="text-center">3055</TableCell>
                  <TableCell className="text-center">21417</TableCell>
                  <TableCell className="text-center">24472</TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="text-main-header">Solves</TableHead>
                  <TableCell className="text-center">936</TableCell>
                  <TableCell className="text-center">7242</TableCell>
                  <TableCell className="text-center">8178</TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <h3>Solve Graphs (Finishers)</h3>
            <Tabs
              defaultValue="in-person"
              onValueChange={(value) => setActiveTab(value)}
              className="mb-6 mt-4 w-full"
            >
              <TabsList className="grid w-full grid-cols-2 space-x-1 bg-[#000060] text-main-text">
                <TabsTrigger
                  className="data-[state=active]:bg-blue-900 data-[state=active]:text-main-text"
                  value="in-person"
                >
                  In-Person
                </TabsTrigger>
                <TabsTrigger
                  className="data-[state=active]:bg-blue-900 data-[state=active]:text-main-text"
                  value="remote"
                >
                  Remote
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="relative aspect-video w-full rounded-md bg-white">
              <embed
                type="text/html"
                src="/wrapup/in-person-solves.html"
                className={cn(
                  "absolute h-full w-full",
                  activeTab !== "in-person" && "-z-10 opacity-0",
                )}
              />
              <embed
                type="text/html"
                src="/wrapup/remote-solves.html"
                className={cn(
                  "absolute h-full w-full",
                  activeTab !== "remote" && "-z-10 opacity-0",
                )}
              />
              <a
                href={`/wrapup/${activeTab}-solves.html`}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute right-2 top-2 rounded-md bg-black/70 p-1 text-main-text hover:bg-black/90"
              >
                <SquareArrowOutUpRight />
              </a>
            </div>

            {/* THEME & STORY */}
            <TOCSection sectionId={0} tocTitle="Theme & Story" isFirst>
              <h2>Theme &amp; Story</h2>
              <p>
                <i>By Kevin Jaeger and Isaac McGreevy</i>
              </p>
              <p>
                The theme for BPH26 was college! The initial theme that had been
                decided on (before both heads of story had joined the writing
                team) was &ldquo;the open curriculum,&rdquo; but since that
                mostly applied to unlock structure, the story morphed into being
                about a college for puzzle solvers.
              </p>
            </TOCSection>

            <TOCSection sectionId={1} tocTitle="Kickoff" parentId={0}>
              <h3>Kickoff</h3>
              <p>
                This year, the kickoff script was centered around a college
                orientation at Brown Puzzle College. Partway through the
                orientation, a student interrupted to complain about their
                ursine roommate assignment and demanded a room swap, leaving the
                solvers with Blueno as their roommate. The script was actually
                written <em>two</em> nights before the hunt, so take that,
                BPH2025! We want to thank our actors Arnav, Aren, and Noah for
                doing an incredible job bringing our skit to life, alongside
                some amazing improvisation that made us laugh harder than it
                perhaps should have.
              </p>
              <div className="my-4 grid grid-cols-2 gap-4">
                <img
                  src="/wrapup/images/image29.jpg"
                  className="rounded-md"
                  alt=""
                />
                <img
                  src="/wrapup/images/image7.jpg"
                  className="rounded-md"
                  alt=""
                />
              </div>
              <img
                src="/wrapup/images/image42.jpg"
                className="rounded-md"
                alt=""
              />
            </TOCSection>

            <TOCSection sectionId={2} tocTitle="Interactions" parentId={0}>
              <h3>Interactions</h3>
              <p>
                We held two variations of an interaction this year. The Brown
                teams were assigned to pose for photos for an &ldquo;End of
                Year&rdquo; social media post. The prompts for posing were
                silly, but the creativity of the teams is what made the pictures
                truly great. The non-Brown teams were assigned to give a speech
                to commemorate the accomplishment of completing their first
                degree. The catch was that all the solvers in a team had to work
                as a group, where each person could only contribute one word at
                a time, and try to meet certain speech requirements, such as
                starting off with &ldquo;Webster&rsquo;s dictionary
                defines&hellip;&rdquo; and thanking multiple entities. After
                each team successfully completed their task, they were awarded
                with a graduation Blueno pin.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="/wrapup/images/image21.jpg"
                  className="rounded-md"
                  alt=""
                />
                <img
                  src="/wrapup/images/image41.png"
                  className="rounded-md"
                  alt=""
                />
                <img
                  src="/wrapup/images/image35.jpg"
                  className="rounded-md"
                  alt=""
                />
                <img
                  src="/wrapup/images/image3.jpg"
                  className="rounded-md"
                  alt=""
                />
              </div>
            </TOCSection>

            <TOCSection sectionId={3} tocTitle="Blueno" parentId={0}>
              <h3>Blueno</h3>
              <p>
                As BPH tradition, we felt we had to include Blueno in the story
                somehow. When Blueno was first introduced, they were portrayed
                as a terrible roommate based on the notes they left for you on
                your whiteboard, as well as the mess they left on the floor. As
                teams progressed throughout the hunt, Blueno&rsquo;s messages
                would get better and better, and the mess would start getting
                cleaned up. By the end of the hunt, teams would have seen Blueno
                change from an awful roommate to a great one, and they would
                have also learned that Blueno was the mystery prodigy student
                they were academically competing against the whole time. The
                past three years of BPH saw Blueno as a villain, so this year we
                wanted Blueno to start as a villain and turn into a surprise
                hero of sorts.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="/wrapup/images/image8.png"
                  className="h-full rounded-md object-cover"
                  alt=""
                />
                <img
                  src="/wrapup/images/image26.png"
                  className="h-full rounded-md object-cover"
                  alt=""
                />
                <img
                  src="/wrapup/images/image47.png"
                  className="h-full rounded-md object-cover"
                  alt=""
                />
                <img
                  src="/wrapup/images/image31.png"
                  className="h-full rounded-md object-cover"
                  alt=""
                />
              </div>
            </TOCSection>

            <TOCSection sectionId={4} tocTitle="Runaround" parentId={0}>
              <h3>Runaround</h3>
              <p>
                After teams finished solving their final meta, they were alerted
                that Blueno had lost their thesis draft and needed help finding
                it. Hopefully, teams became fond of Blueno by the end of their
                hunt, so they were willing to help. They would have to find
                Blueno&rsquo;s thesis draft (puzzle), which they would then have
                to solve. Upon solving, the teams realized that Blueno&rsquo;s
                thesis was beyond bad, and they would have to go to a thesis
                advisor to get advice to improve it. Once they solved the thesis
                advisor&rsquo;s puzzles and extracted the advice, they would
                send the advice to Blueno and get on with their own thesis,
                using the strange meta answers to describe their time at BPC.
                Finally, the teams would be congratulated by Dean Dan Dawgz for
                their outstanding work in both helping Blueno out and writing
                their own thesis, being awarded the role of valedictorian,
                signifying their final academic triumph over Blueno.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="/wrapup/images/image12.jpg"
                  className="rounded-md"
                  alt=""
                />
                <img
                  src="/wrapup/images/image40.jpg"
                  className="rounded-md"
                  alt=""
                />
              </div>
              <p>
                We&rsquo;d like to thank everyone who helped out the story team
                this year, including Malcolm, for the unique theme idea, Erin
                and Arnav, for their great ideas during our writing meetings,
                Megan, for keeping us on track and buying goofy costumes, Eliot,
                for doing a wonderful job with the social media and marketing,
                Chloe and Bailey, for their beautiful main page and puzzle page
                art, and all the actors for their inspiring performances during
                kickoff, interaction, and runaround. We seriously couldn&rsquo;t
                have done it without y&rsquo;all. :)
              </p>
            </TOCSection>

            {/* ART DIRECTION */}
            <TOCSection sectionId={5} tocTitle="Art Direction">
              <h2>Art Direction</h2>
              <p>
                <i>By Bailey Merlino</i>
              </p>
              <p>
                Art this year was a lot more chill and straightforward than the
                previous year. We spent most of our time in the fall waiting for
                metas to be finalized and then tackled the department pages
                while Chloe worked on the Home Page. We all then spent a month
                or two working on the backpack sprites and the final couple
                months working on various requests as I finished up the main
                page art. Compared to last year (with the map&hellip;), every
                aspect went smoothly and I&rsquo;m super proud of how it turned
                out!
              </p>
            </TOCSection>

            <TOCSection sectionId={6} tocTitle="Home Page" parentId={5}>
              <h3>Home Page</h3>
              <p>
                We had the idea for the home page to be the convocation
                ceremony, a tradition at Brown where you enter the Van Wickle
                gates to signify the start of your academic career. Chloe did an
                amazing job bringing this vision to life and it became the
                central work that we based the other art around. There was a lot
                of tweaking that had to be done to accommodate tech, including a
                parallax ask and inclusion of the title written in the clouds
                that Chloe was wonderful at accommodating.
              </p>
              <img
                src="/wrapup/images/image46.png"
                className="rounded-md"
                alt=""
              />
            </TOCSection>

            <TOCSection sectionId={7} tocTitle="Main Page" parentId={5}>
              <h3>Main Page</h3>
              <p>
                We deliberated on what the main page should look like for the
                better half of a month. It was originally just going to be a
                bookshelf or a desk, but the idea to make it a dorm room felt
                more natural with the direction that story was going in. Fun
                fact, it is modeled after a real Brown dorm. We wanted the main
                page to be dynamic with moving elements, including messy items
                that would be cleaned up as you progressed through the story and
                changing whiteboard messages that got nicer as you grew closer
                to your roommate (Blueno). The inclusion of the singular sock is
                Kevin&rsquo;s fault. I really enjoyed rendering the room and
                opted for a more painterly style. I had a lot of fun designing
                the room and coming up with the icons for the departments was a
                unique challenge.
              </p>
              <img
                src="/wrapup/images/image34.png"
                className="rounded-md"
                alt=""
              />
            </TOCSection>

            <TOCSection sectionId={8} tocTitle="Backpack" parentId={5}>
              <h3>Backpack</h3>
              <p>
                This year to display our metas we decided to have them be pin
                icons on a backpack, which meant that every artist got to
                contribute to one larger work overlayed on top of Jackie&rsquo;s
                beautiful yellow backpack. It was an exciting development from
                the sprites on last year&rsquo;s map, as I felt these were more
                visible and cohesive despite being made by all different
                artists.
              </p>
            </TOCSection>

            <TOCSection sectionId={9} tocTitle="Departments" parentId={5}>
              <h3>Departments</h3>
              <p>
                As the different puzzles were organized into departments this
                year, we wanted to create works that represented the essence of
                each &ldquo;major.&rdquo; So for history/literature that was
                books, for performing arts a theater, and for business was
                naturally coloring pages. Special thanks to Thea, Amara, and
                Jackie for contributing to these department pages. The RISD page
                made by our resident RISD student, Phil, was a highlight of this
                year&rsquo;s art for me personally.
              </p>
              <img
                src="/wrapup/images/image15.png"
                className="rounded-md"
                alt=""
              />
            </TOCSection>

            <TOCSection sectionId={10} tocTitle="Other Fun Stuff" parentId={5}>
              <h3>Other Fun Stuff 😎</h3>
              <p>
                Date Everything Brown was an idea born from Veronika that
                included the unique challenge of creating datable characters a
                la Date Everything. This meant making objects or buildings
                around the Brown campus into hot singles looking for love, a
                task we all approached gleefully. Again, I was grateful to have
                a task that we could all work collaboratively on and contribute
                everyone&rsquo;s styles, which is always the most fun part of
                working as a team.
              </p>
              <img
                src="/wrapup/images/image27.png"
                className="rounded-md"
                alt=""
              />
              <p>
                This year&rsquo;s pin was made by Jackie! We used it in a story
                interaction, which was cool to give in person solvers a reward
                for their progress that is more accomplishable than finishing
                the hunt.
              </p>
              <img
                src="/wrapup/images/image24.png"
                className="rounded-md"
                alt=""
              />
              <p>
                In the same vein, Thea made this year&rsquo;s sticker. She
                depicted Blueno&rsquo;s now iconic yellow backpack to represent
                the meta round art.
              </p>
              <img
                src="/wrapup/images/image17.png"
                className="mx-auto w-1/2 rounded-md"
                alt=""
              />
            </TOCSection>

            {/* TECH */}
            <TOCSection sectionId={11} tocTitle="Tech">
              <h2>Tech</h2>
              <p>
                <i>By Alex Wang and Chloe Qiao</i>
              </p>
            </TOCSection>

            <TOCSection
              sectionId={12}
              tocTitle="Interactive Puzzles"
              parentId={11}
            >
              <h3>Interactive Puzzles</h3>
              <p>
                This year’s hunt featured several interactive puzzles. Hopefully
                they were usable enough.
              </p>

              <h4>Topics in Guard-Door Theory</h4>
              <p>
                Originally, to keep all data server-side, the client called a
                server action on every move. We later decided that move
                thresholds were not particularly sensitive and could be leaked
                to the client. Thus, we optimized the system so that (1) puzzles
                whose thresholds have been met do not trigger updates, (2)
                puzzles call the server action only on identical threshold
                matches, and (3) once a team unlocks all minigames, no more
                checks occur. The server action takes and reverifies the entire
                move sequence before unlocking new minigames.
              </p>

              <h4>Analogical Semantics</h4>
              <p>
                To make the warming process faster, we used V8 to serialize and
                deserialize the word and vector objects.
              </p>
              <p>
                By the way, we can see when you’re botting. The Python{" "}
                <code>requests</code> library has its own user agent. Please be
                nice. Unfortunately, Vercel charges just as much for an API call
                as for a page load.
              </p>

              <h4>Escapism in Cinema</h4>
              <p>
                The original draft of Escapism in Cinema had “small” chain nodes
                and “big” chain nodes. We made many tweaks to the UI to make it
                usable on the web. Big thanks to all our testsolvers for their
                feedback.
              </p>

              <h4>How to Get Your Heart Broken</h4>
              <p>
                This puzzle featured a dating simulator. Big thanks to Veronika,
                the puzzle author, who also took charge of the tech
                implementation.
              </p>

              <h4>Big Wheel!</h4>
              <p>
                This puzzle gave combination lock vibes. We were happy with the
                end result, though calculating those letter rotations was a bit
                of a nightmare.
              </p>

              <h4>Experimental Cardiac Measurement (remote)</h4>
              <p>We made a little scale… yay!</p>

              <h4>Psychoceramics</h4>
              <p>
                Thanks to MIT Puzzle Club for the snapping jigsaw functionality.
                Condolences for any team whose progress may have been reset by
                page reloads and other mishaps. Someday we’ll implement progress
                saving.
              </p>

              <h4>Serialized Storytelling & Avionic Intersectionality</h4>
              <p>
                During Puzzlethon 2025, Jack started integration of PuzzleJS, a
                neat library with several components for crosswords, logic
                puzzles, and more. We finished the integration and used PuzzleJS
                for these crossword-based puzzles.
              </p>
            </TOCSection>

            <TOCSection sectionId={13} tocTitle="Landing" parentId={11}>
              <h3>Landing</h3>
              <p>
                In terms of tech, this year’s landing page was very similar to
                last year. Originally, we were not planning to include a
                parallax effect, but after uploading the art for the first time,
                we decided it would look cool (sorry art). We removed the
                spotlights from last year (college isn’t that exciting) but
                added a subtle effect: the gates are closed when logged out and
                open when logged in.
              </p>

              <p>
                We decided to remove the landing page text since making it
                mobile friendly was always a pain. Nevertheless, the Tailwind
                math for the clickable gate overlay got even more complicated
                since the dead space at the bottom grows responsively depending
                on the window’s aspect ratio.
              </p>
              <code>
                {
                  'className="absolute left-1/2 top-[calc(max(71.3vw+56px,52.384vh-46.098px+56px))] h-[calc(max(26vw,19.1vh-16.81px))] w-[calc(max(27.16vw,19.95vh-16.8px))] -translate-x-1/2 -translate-y-14 rounded-lg hover:bg-black/10"'
                }
              </code>

              <p>
                Note that the responsive dead space barely impacts the overlay’s
                placement. Would anyone have noticed if we stuck with last
                year’s math? The user must be logged out, realize the overlay
                exists, be on a window whose aspect ratio sufficiently warps the
                overlay’s placement, and then hover their cursor around to
                notice it does not perfectly track the gate...
              </p>
            </TOCSection>

            <TOCSection sectionId={14} tocTitle="Round Pages" parentId={11}>
              <h3>Round Pages</h3>
              <p>
                We wanted to strike a middle ground between getting people to
                look at the art and making navigation a pleasant enough
                experience. Hopefully the search bar and back buttons were
                sufficient.
              </p>

              <p>
                The hunt included a cookie system to track seen puzzles and
                highlight new puzzles. It uses one bit per puzzle plus some
                buffer space to avoid spoiling hunt length. Since cookies do not
                support arbitrary bytes, we opted for a hex encoding with an
                overall length of 16 characters. Unfortunately, the supermeta
                had an issue causing cookie size to double. You might want to
                check memory usage. We’ll have future sites delete stale cookies
                though.
              </p>

              <p>
                We also had an internal debate on whether labels should move on
                hover. This can cause a “jitter” loop if the label moves off the
                cursor. Our solution was to expand the hitbox when hovered.
              </p>
            </TOCSection>

            <TOCSection sectionId={15} tocTitle="Story Gimmicks" parentId={11}>
              <h3>Story Gimmicks</h3>
              <p>
                Depending how many metas the user has solved, the main puzzles
                page selects a whiteboard message and a certain number of random
                junk items. The thresholds were 3, 7, and 10 metas.
              </p>

              <p>
                The solve toast hints that a team solved the puzzle 5 seconds to
                5 minutes faster. At 7 metas, this team is revealed to be
                Blueno. Note that Blueno takes a minimum of 30 seconds to solve
                each puzzle. Sadly, nobody solved a puzzle in less than 30
                seconds (which was feasible with an answer token). Such solve
                toasts would omit the Blueno feature.
              </p>
            </TOCSection>

            <TOCSection sectionId={16} tocTitle="Copy Text" parentId={11}>
              <h3>Copy Text</h3>
              <p>
                Last year’s hunt had some formatted copy text, but this year, we
                took it up a notch. We built a parser to generate the necessary
                <code>text/html</code> metadata after copying cells on Google
                Sheets. With the process mostly automated, we added copy text to
                all relevant puzzles.
              </p>

              <p>
                Displaying images was a little complicated. Clipboard data
                cannot resize cells on Google Sheets, but luckily, cell merging
                is supported. To prepare images for copy text, we merged cells
                and inserted <code>=IMAGE</code> equations.
              </p>

              <p>
                By default, Google Sheets converts <code>=IMAGE</code> equations
                to <code>{"<img />"}</code> components when copying. These{" "}
                <code>{"<img />"}</code> components do not paste on Safari. On
                Chrome, they only paste if extra clipboard MIME entries are
                included. For security reasons, adding custom MIME entries is a
                rather convoluted process. To make things more robust, we
                swapped the <code>{"<img />"}</code> components with their
                plaintext <code>=IMAGE</code> representations.
              </p>
            </TOCSection>

            <TOCSection sectionId={17} tocTitle="Websockets" parentId={11}>
              <h3>Websockets</h3>
              <p>
                We added websockets this year! Puzzle unlocks, puzzle solves,
                and hunt finishes are broadcast to all team members using
                toasts. The websocket system can also force puzzle pages to
                refresh. So far, we only use this for One Guard No Doors so that
                the list of available games stays up to date.
              </p>

              <p>
                The websocket server uses JWTs for authentication. The main site
                and websocket server share an <code>AUTH_SECRET</code>, so the
                main site can generate and use short-lived JWTs to trigger
                broadcasts. Each user requests a short-lived JWT using the{" "}
                <code>/ws-token</code> API route. This route checks the user’s
                session and returns a corresponding JWT. The user forwards the
                JWT when joining the websocket server.
              </p>

              <p>
                This process makes websocket generation somewhat expensive. To
                reduce server load, we made browser tabs share a single
                connection using the SharedWorker interface. Supported by most
                modern browsers, it allows an application to run global
                JavaScript that interacts with website tabs using ports. No
                matter how many tabs you open, the browser only opens one
                websocket connection. Nevertheless, it was actually quite
                difficult to make browsers update to new versions of the
                SharedWorker script. During the hunt, some users had a week-old
                script (with some bugs) spamming the websocket server every 1.5
                seconds.
              </p>
            </TOCSection>

            <TOCSection sectionId={18} tocTitle="Admin" parentId={11}>
              <h3>Admin</h3>
              <p>
                Admins can now impersonate other teams to view the hunt from
                their perspective. Implementation was actually quite easy—we
                just update the session, storing the original username for easy
                return.
              </p>

              <p>
                We also added an admin debug panel with several features. Admins
                can broadcast messages to check on the websocket server, see the
                local websocket status, see which teams have open websockets,
                and view or reset cookies.
              </p>

              <p>
                We also built our copy text parser directly into the website to
                make it accessible for puzzle writers.
              </p>
            </TOCSection>

            <TOCSection sectionId={19} tocTitle="Security" parentId={11}>
              <h3>Security</h3>
              <p>
                Securing against malicious probes is not our primary goal.
                Please be nice. Nevertheless, we implemented several changes
                this year to make the site safer.
              </p>

              <p>
                First, we split our configuration file between server-only
                information and information that should be accessible for both
                the client and server. This change minimizes our risk of leaking
                important information such as puzzle IDs. For extra security, we
                import “server-only” so that leaks will error loudly.
              </p>

              <p>
                We also implemented a centralized authentication function with
                different permission levels. This abstraction makes session
                checks across relevant functions much simpler.
              </p>

              <p>
                With this change, we also improved our consistency with respect
                to error handling. The site now throws an Error for any
                unexpected behavior. For security, Next.js obfuscates error
                messages, but clients are prepared with generic toasts. Thought
                notably, some errors are expected, such as duplicate guess
                insertion. These must peacefully return{" "}
                <code>&#123;error: ...&#125;</code> objects.
              </p>

              <p>
                To aid with development, we added several scripts. Our check
                script verifies certain configuration fields like puzzle layout
                title and puzzle ID. We have generator scripts to reset and seed
                the database. We also added a script that compares local file
                structure to the database, warning on mismatch. This script
                records the folder path of every puzzle. We’re hoping to use the
                output configuration to cut down on certain areas of spaghetti.
              </p>

              <p>
                Lastly, we updated locked puzzles and nonexistent puzzles to
                behave the same. Accessing either will redirect to /puzzle. The
                chance of guessing a puzzle slug is astronomically low, but hey,
                now it’s zero (at least from the user’s perspective).
              </p>
            </TOCSection>

            <TOCSection sectionId={20} tocTitle="Miscellaneous" parentId={11}>
              <h3>Miscellaneous</h3>
              <p>
                We implemented email batching, improved async processing using
                Promise.all, added pool unlocks, allowed spaces in puzzle
                answers, and fixed our handling of useSession for navbar
                reactivity.
              </p>
              <p>
                Also, an important note: our club site (formerly
                https://brownpuzzle.club) has moved to{" "}
                <a href="https://brownpuzzleclub.com/">
                  https://brownpuzzleclub.com/
                </a>
                .
              </p>
            </TOCSection>

            <TOCSection sectionId={21} tocTitle="Services" parentId={11}>
              <h3>Miscellaneous</h3>
              <p>Here’s a list of the services we use:</p>
              <ul>
                <li>Vercel for deployment</li>
                <li>Neon for the database</li>
                <li>Resend to send emails</li>
                <li>Render to host the websocket server</li>
                <li>A Discord webhook to ping admins</li>
              </ul>
              <p>
                Hosting is free year-round, but we upgrade everything when
                running hunts. Some of these companies have actually updated
                their billing policies since last year. Annoyingly, Vercel now
                processes limits using a rolling time window. Unaware, we
                downgraded our plan around a week after remote hunt leading to a
                couple hours of downtime.
              </p>
            </TOCSection>

            {/* STRUCTURE */}
            <TOCSection sectionId={23} tocTitle="Structure">
              <h2>Structure</h2>
              <i>By Arnav Singhal</i>
              <p>
                While the structure was arguably more standard than last year,
                we once again managed to fulfill one of our
                editor-in-chiefs&rsquo; dreams of feeder reuse in spaghetti
                metas.
              </p>
              <img
                src="/wrapup/images/image1.png"
                className="rounded-md"
                alt=""
              />
              <p>
                This time, every single feeder was reused! We (or at least I)
                had some reservations on whether the cleanliness of the
                structure would be conveyed; there were five feeders in each
                department, and each feeder was used in at least two metas.
              </p>
              <p>
                In order to make this structure shine, we wanted the departments
                to really stick, and we think the art and tech really helped
                this work. The (beautiful) department art on each round, coupled
                with the signposting from the beginning of the hunt of the
                five-feeder-per-department structure seemed to be effective in
                making the departments memorable.
              </p>
              <p>
                After the theme of Brown Puzzle College was decided on, we
                pretty quickly landed on wanting the structure to pay homage to
                our Open Curriculum. This led us naturally to having metas be
                wacky independent concentrations, and feeder puzzles being
                courses that can be used for multiple concentrations followed.
                We started by writing four metapuzzles (one of which was
                eventually cut) that set constraints on feeders and then
                immediately launched into writing metapuzzles that followed
                these constraints. Because we knew from the beginning that
                spaghettification was a possibility, locking in feeder
                constraints rather than feeder answers led to (in our opinion)
                an overall stronger set of metas. It did, however, lead to a
                somewhat questionable level of quality of these feeder
                answers&hellip;
              </p>
              <p>
                The unlock structure of feeder puzzles was almost entirely
                adjacency-based, and like last year we tried to have some
                branching of possible directions that teams could go to. We
                tried our hardest to avoid small-width bottlenecks, and this
                sometimes led to teams having somewhat outrageous widths of
                around 11. We&rsquo;re OK with this overcorrection. This hunt
                notably had a wide range of difficulties, and we balanced this
                by making it feasible to skip harder puzzles and still unlock
                the majority of the hunt.
              </p>
              <p>
                One easter egg we planted was what we call the
                backdoor&mdash;most teams unlock Advanced Logical Cooking
                Techniques fairly early, and solving that puzzle breaks teams
                into the RISD department, whereas teams who don&rsquo;t solve
                that puzzle need to get through most of the other departments
                first. From there, they could feasibly unlock puzzles and
                departments in &ldquo;reverse&rdquo; order.
              </p>
              <p>
                We also had a capstone puzzle this year! We are super excited
                about this fact, although Arnav was extremely skeptical that it
                would happen (and was wrong in classic Arnav fashion!). We tried
                (and failed) to hide it from in-person solvers until after they
                finished runaround, with the idea that it would be a replacement
                for runaround for remote teams and a fun bonus for in-person
                teams. Hopefully this led to the end of the hunt feeling more
                satisfying than in previous years for our lovely remote solvers.
              </p>
            </TOCSection>

            {/* PUZZLES */}
            <TOCSection sectionId={24} tocTitle="Puzzles">
              <h2>Puzzles</h2>
              <i>By Arnav Singhal</i>
              <p>
                New this year was having editors who had ownership over puzzles,
                under occasional guidance from our editors-in-chief. None of
                them had ever edited a puzzle before. Two of them had never
                written a puzzle before, and the others had only started writing
                puzzles last year! Despite the odds, they grew to be incredibly
                respectable voices with good instincts, and their initiative was
                a large reason for (most of) our puzzles being written earlier
                than last year. We think this structure will give our club great
                odds for long-term survival!
              </p>
            </TOCSection>
            <p>
              As mentioned above, most of our puzzles were written earlier (and
              thus got more testing) than last year. We had ten all-new authors,
              and we think they did great! It&rsquo;s always great to introduce
              people to puzzles and pretty cool to see such high-quality puzzles
              come from people who didn&rsquo;t know what puzzles were seven
              months earlier.
            </p>
            <img
              src="/wrapup/images/image39.jpg"
              className="rounded-md"
              alt=""
            />

            <TOCSection
              sectionId={26}
              tocTitle="Advanced Logical Cooking Techniques"
              parentId={24}
            >
              <h3>Advanced Logical Cooking Techniques</h3>
              <p>
                Advanced Logical Cooking Techniques was a classical variant
                sudoku, aimed at exposing solvers to some common concepts and
                rulesets in these types of puzzles. It was inspired by our idols
                Mark and Simon of Cracking the Cryptic fame, and motivated by
                Nicholas&rsquo; unwavering love and commitment to Sudoku
                Club&trade; (a real club with multiple members). In order to
                contain those beloved &ldquo;aha!&rdquo; moments (that everyone
                loves and no one gets stuck on), the puzzle ended up being quite
                challenging, especially to those who are not filled with joy at
                the sight of a logic puzzle (hence the warning at the top of the
                page). Unfortunately, logic puzzle enthusiasts were not high in
                numbers within the writing team, so the puzzle received minimal
                testing. However, due to assistance from online setting tools, a
                clean solve path was ensured.
              </p>
              <p>
                During the editing process, the idea to place the puzzle early
                in the hunt was floated around, mostly because we thought it
                would be funny. This small joke ended up becoming the backdoor
                easter egg, where solvers were required to solve both this
                puzzle and Topics in Guard-Door Theory to gain early access to
                the back of the hunt, a callback to the bottleneck of forcing
                solvers to pass Guard-Door logic puzzles to open rounds in Brown
                Puzzlehunt 2025. It is universally regarded that these guards
                puzzles are the best puzzles in the entire history of puzzle
                hunts ever and no one complained about any of them, so we
                decided to incorporate this idea into BPH &rsquo;26 too!
              </p>
            </TOCSection>

            <TOCSection sectionId={27} tocTitle="Dirt" parentId={24}>
              <h3>Dirt</h3>
              <p>
                Dirt was conceived when we decided that all puzzles in the
                Physical Sciences round should be physical. Thomas, in trying to
                prove how easy it was to come up with a physical puzzle, looked
                at the answer and suggested giving teams samples of dirt and
                making them match locations on the Brown University campus.
              </p>
              <p>
                The same week, when we met with our University administrators to
                talk about security requirements, they advised that teams not be
                made to do strange or suspicious behaviors. Without any
                prompting, they gave the example that people unaffiliated with
                the University should not go around digging holes around campus.
              </p>
              <p>
                Needless to say, we had to do some rethinking. We landed on
                wanting teams to locate samples of dirt on the clay-silt-sand
                triangle. Some of us were extremely enthused about this idea,
                and some were skeptical that it would be doable by teams with no
                tools or experience. We consulted our geology friends, and after
                getting told it probably wouldn&rsquo;t work, scoured the
                internet for clay, silt, and sand. Clay and sand were readily
                available, but finding a place that would sell pure silt was
                nigh impossible. We settled on buying silt loam from Utah State
                University, hoping that the dark color of the silt would be
                different enough from the clay. To the haters&rsquo; surprise,
                testsolving teams were able to successfully place the dirt
                samples on the triangle, and the enthusiasts won yet again.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="/wrapup/images/image28.png"
                  className="rounded-md"
                  alt=""
                />
                <img
                  src="/wrapup/images/image10.png"
                  className="rounded-md"
                  alt=""
                />
              </div>
            </TOCSection>

            <TOCSection sectionId={28} tocTitle="Rabbit 'Nundrum" parentId={24}>
              <h3>Rabbit &lsquo;Nundrum</h3>
              <p>
                This puzzle was conceived as &ldquo;I want to give solvers
                plushies to play with,&rdquo; and it became so much more,
                generating a lovely wrapup heckle, several fan content, and (as
                far as we could tell) an argument between members of a solving
                team.
              </p>
              <p>
                But let&rsquo;s back up a little. The first draft of this puzzle
                utilized a mechanic that I&rsquo;m frankly very happy with, but
                did not work well with the physical setup, and was too difficult
                for this hunt. Unfortunately, this only came out during our
                first test, after I had spent a lot of time on a draft. Very
                well, I said, and got to rewriting, which took about 25 hours of
                my spring break. Though writing this puzzle kind of killed me, I
                learned a lot about what makes for a fun construction.
              </p>
              <p>
                Here is how it worked: we gave solvers six colored rabbits with
                letters on them, six instruction sheets, and a plastic top hat
                (latter two not pictured).
              </p>
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="/wrapup/images/image13.png"
                  className="rounded-md"
                  alt=""
                />
                <img
                  src="/wrapup/images/image43.png"
                  className="rounded-md"
                  alt=""
                />
              </div>
              <p>
                The puzzle is meant to be solved with six players, each of them
                taking charge of one of the rabbits &mdash; crucially, text on
                the puzzle page instructs solvers not to peek at each
                other&rsquo;s instruction sheets. This mechanic was inspired by{" "}
                <a
                  href="https://2024.brownpuzzlehunt.com/puzzle/nomenclept-puzz"
                  className="text-link no-underline hover:underline"
                >
                  The Nomenclept
                </a>
                , a puzzle Thomas wrote for BPH 2024, and I think it worked well
                with how this puzzle split up responsibility among the various
                roles. For example, there is one rabbit whose instructions
                detail how to count &ldquo;steps,&rdquo; and another rabbit who
                spikes the tea with psychedelics and makes every other rabbit
                see colors differently (which must be figured out by consulting
                a table on that rabbit&rsquo;s instructions sheet). All of this
                must of course be communicated between solvers, which I hope was
                fun.
              </p>
              <p>
                After working through all of the instructions followed in the
                konundrum part of the puzzle, solvers obtain the phrase INSIDE
                HATTER. Submitting this yields the partial answer confirmation:
                &ldquo;Do what must be done.&rdquo; Indeed, the other main
                conceit of this puzzle was that solvers had to cut open one of
                the rabbits to access a hidden message!
              </p>
              <img
                src="/wrapup/images/image11.png"
                className="rounded-md"
                alt=""
              />
              <p>
                I was heckled at wrapup for this (&ldquo;psychopath!&rdquo;),
                and received two pieces of fan work:
              </p>
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="/wrapup/images/image44.png"
                  className="rounded-md"
                  alt=""
                />
                <img
                  src="/wrapup/images/image23.png"
                  className="rounded-md"
                  alt=""
                />
              </div>
              <p>
                Thank you to Isaac and Hatter for these lovely contributions to
                the revival of The Hatter. There was a team who refused to cut
                open the rabbit&rsquo;s head, and backsolved the puzzle despite
                having forward solved all of it; props to team meowmeow for
                keeping The Hatter alive. Finally, our apologies go out to the
                anonymous team who filled out the feedback form and seems to
                have had an argument with their team over this puzzle.
              </p>
              <p>
                If you&rsquo;re wondering what preparation looked like, here is
                a massive pile of rabbits in the process of having letters put
                on them:
              </p>
              <img
                src="/wrapup/images/image4.jpg"
                className="rounded-md"
                alt=""
              />
              <p>
                We initially thought we were going to have to cut open the white
                rabbits and sew them back up, but it turns out the holes between
                the stitching on the back of their neck are large enough to slip
                the piece of paper between. The benefits of using cheap
                plushies!
              </p>
              <img
                src="/wrapup/images/image25.png"
                className="rounded-md"
                alt=""
              />
            </TOCSection>

            <TOCSection
              sectionId={29}
              tocTitle="Linesman Training"
              parentId={24}
            >
              <h3>Linesman Training</h3>
              <p>
                Linesman Training was another physical puzzle that came about
                because of our desire to have the Physical Sciences round be
                entirely physical puzzles. As solvers of this puzzle may recall
                this puzzle had the answer HELLOBEETIFUL (thank you Rae Dunn and
                spaghetti) which for unknown reasons was one of the feeder
                answers that wasn&rsquo;t claimed for a while. Due to the word
                &ldquo;bee&rdquo; in the answer and the desire to make this a
                physical puzzle, we decided to have this puzzle in some way be
                soccer ball themed (due to the hexagons in a standard soccer
                ball net and the possibility of getting solvers to in some way
                interact with a physical soccerball). It was only once the
                puzzle had been almost completely written when we discovered
                that &ldquo;beetiful&rdquo; was not a play on the word
                &ldquo;bee&rdquo; but on the word &ldquo;beet&rdquo;.
              </p>
              <p>
                When writing this puzzle, we were really inspired by the idea of
                forcing the solvers to really interact with the full physicality
                of the ball. Although we failed in this endeavor (I&rsquo;m
                still very impressed with the people that solved the puzzle
                without putting the ball together) we did get pretty close by
                using semaphore on the surface of the ball. This let us extract
                using the angles between the tiles&mdash;a piece of information
                only available in the constructed ball and not the net.
              </p>
              <p>
                Then we had to figure out how to get the teams to construct the
                balls. We thought it would be cool if we could put words on the
                pentagons and have the letters on each of the surrounding
                hexagons spell out the word. After trying to come up with a set
                of letters and words by hand (we were only able to come up with
                4 of the required 12 pentagon words before the letters became so
                constrained that no fifth word existed) we realized that this
                construction was more challenging than we realized. Our solution
                to this was to code something to check for valid letter and word
                combinations. Only after running a python script that searched
                for words that fit these constraints for around 48 hours using
                over 2 TB of memory on Oscar (Brown&rsquo;s Supercomputer) and
                getting only a handful of possible combinations did we realize
                just how constrained this construction really was. Every
                possible combinations included some incredibly questionable
                words (the list we picked was the best one, and it included
                &ldquo;Chups&rdquo;, &ldquo;Kovar&rdquo;, and
                &ldquo;Frady&rdquo;; for reference on how constrained these
                words were, our first list, which we celebrated immensely over
                when found by Oscar, included &ldquo;Admrx&rdquo;,
                &ldquo;Bejig&rdquo;, and &ldquo;Nugmw&rdquo;). (We changed the
                corpuses we used after that&hellip;) Because of these words, we
                decided to replace them with crossword clues on the pentagons so
                that solvers would arrive at the words themselves, hopefully
                making them seem more legit. This combined with some notches to
                prevent a full reflection of the ball during the construction
                and also to preserve the orientation of a few key pieces fully
                determined the ball&rsquo;s construction.
              </p>
              <p>
                The final part of this puzzle was preparing it. Since it was an
                opening puzzle, we needed to have a copy for every team that we
                had registered (which meant we had to create at least 40 copies
                of the puzzle&mdash;we ended up making 50 copies to be safe).
                Since the puzzle involved constructing a soccer ball, each copy
                needed a specific 12 pentagons and 20 hexagons printed out on
                cardstock. Additionally, since I thought it would be more fun
                for solvers if they didn&rsquo;t have to cut out the pieces
                themselves, we decided to cut out every piece. At 32 pieces a
                copy and 50 copies, we needed to cut out 1,600 total pieces of
                cardstock (all either hexagons or pentagons). Since the usual
                cutting time for a single copy was around 15 minutes (the
                fastest was 9 minutes and 30 seconds with the good scissors) we
                estimated about 12.5 person-hours of construction time for this
                puzzle. And despite all of this, we still somehow failed to make
                the most annoying physical puzzle to construct. I guess
                there&rsquo;s always next year&hellip;
              </p>
              <img
                src="/wrapup/images/image19.jpg"
                className="rounded-md"
                alt=""
              />
            </TOCSection>

            {/* EVENTS */}
            <TOCSection sectionId={30} tocTitle="Events">
              <h2>Events</h2>
              <i>By Aren Guralp</i>
            </TOCSection>

            <TOCSection sectionId={31} tocTitle="Speed Shopping" parentId={30}>
              <h3>Speed Shopping</h3>
              <p>
                <em>
                  Please send 2 students that work well together. Speed will be
                  of the essence.
                </em>
              </p>
              <img
                src="/wrapup/images/image22.jpg"
                className="rounded-md"
                alt=""
              />
              <p>
                This event involved teams of two students being handcuffed
                together (using &ldquo;adult leashes&rdquo;) and completing a
                series of activities in order to register for the classes they
                wanted to take.
              </p>
              <p>These classes were:</p>
              <ul>
                <li>EGYT 0150X: Speculative Egyptian Architecture</li>
                <li>
                  CSCI 1499: Art As Machine: An Integrated Introduction to
                  Diffusion Models
                </li>
                <li>PHOTO 5317-01: SHADOWS: DECONSTRUCTED DREAMS</li>
                <li>CHEM 0380: Organic Chemistry III</li>
                <li>Pitch an Independent Research Project!</li>
              </ul>
              <p>
                Each of them required the completion of a different activity in
                order to receive an override code, in order:
              </p>
              <ul>
                <li>Build a cup pyramid using tiny hands</li>
                <li>
                  Draw a course title as if you were AI, then chug a small water
                  bottle
                </li>
                <li>Recreate pictures of shadows puppets</li>
                <li>
                  Invent a molecule to be a new pharmaceutical, and explain how
                  it works
                </li>
                <li>
                  Pitch a research project using or relating to at least two of
                  the objects in the room, within 1 minute.
                </li>
              </ul>
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="/wrapup/images/image37.jpg"
                  className="rounded-md"
                  alt=""
                />
                <img
                  src="/wrapup/images/image9.jpg"
                  className="rounded-md"
                  alt=""
                />
                <img
                  src="/wrapup/images/image6.jpg"
                  className="rounded-md"
                  alt=""
                />
              </div>
              <p>
                And, finally, here is a photo of Noah testing the
                &ldquo;leashes&rdquo; out on Thomas:
              </p>
              <img
                src="/wrapup/images/image2.png"
                className="rounded-md"
                alt=""
              />
              <p>The answer for this event was RACING CARTS.</p>
              <p>Thank you to:</p>
              <ul>
                <li>
                  Bailey, Noah, Annie, Nate, Nicholas, and Jack for helping run
                  the rooms, and Megan and Arnav for watching the door;
                </li>
                <li>
                  Philip and Nate for designing the cup pyramid, and to Philip
                  for finding shadow puppets and interesting courses to draw;
                  and
                </li>
                <li>Julia for the wonderful pictures!</li>
              </ul>
            </TOCSection>

            <TOCSection sectionId={32} tocTitle="Thesis Defense" parentId={30}>
              <h3>Thesis Defense</h3>
              <p>
                <em>
                  Please send 2 students skilled at constrained communication.
                  The ability to improvise under pressure will be crucial.
                </em>
              </p>
              <img
                src="/wrapup/images/image32.jpg"
                className="rounded-md"
                alt=""
              />
              <p>
                For this event, students had to give a thesis defense &mdash;
                unfortunately, they spent all night working on their slides, and
                forgot what they put on them! Each pair of students were given a
                slide show and a card that told them their topic and a list of
                words they were not allowed to use. They had to present this in
                two minutes, with a minute at the end for questions from the
                audience; <em>their</em> goal was to successfully guess the
                topic of the presentation.
              </p>
              <p>
                The catch? The slide shows were designed to be as unhelpful to
                their cause as possible. Here is the full list of topics (which
                we picked a subset out for each group):
              </p>
              <ul>
                <li>The Water Cycle</li>
                <li>The Pythagorean Theorem</li>
                <li>The Chinese Zodiac</li>
                <li>The French Revolution</li>
                <li>The Steam Engine</li>
                <li>Queen (the band)</li>
                <li>The Mona Lisa</li>
              </ul>
              <p>
                These had such helpful slides accompanying them as a picture of
                the desert for the water cycle, a plate of sauerkraut and
                sausage for the French revolution, and the British flag for the
                Chinese Zodiac. This event turned out a lot easier than we
                expected, but many solvers took it in stride and played with the
                format, which we were happy to see.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="/wrapup/images/image20.jpg"
                  className="rounded-md"
                  alt=""
                />
                <img
                  src="/wrapup/images/image18.jpg"
                  className="rounded-md"
                  alt=""
                />
              </div>
              <p>The answer for this event was SPEAK NO TITLE.</p>
              <p>Thank you to:</p>
              <ul>
                <li>
                  Sofiya, Murahn, and Thea for helping run the event, and Philip
                  for watching the door;
                </li>
                <li>Erin for designing the slideshows; and</li>
                <li>Julia for the wonderful pictures!</li>
              </ul>
            </TOCSection>

            <TOCSection
              sectionId={33}
              tocTitle="Collaborative Exam-Taking"
              parentId={30}
            >
              <h3>Collaborative Exam-Taking</h3>
              <p>
                <em>
                  Please send 1-2 students with a talent for the clandestine.
                  Creativity and boldness will prove vital.
                </em>
              </p>
              <img
                src="/wrapup/images/image16.jpg"
                className="rounded-md"
                alt=""
              />
              <p>
                This event was easily the most chaotic. Each student had an exam
                question that required highly specific information they were
                unlikely to have, while at the same time providing some highly
                specific information of its own. Of course, the 2nd
                Congressional District of Virginia was given on a different exam
                paper, which asked for an example of a tiling with wallpaper
                group [∞⁺,2⁺,∞], and so on. There were ten of these, and two
                versions of the full set to ensure solvers had to be precise
                about their communication. Moreover, we had several proctors to
                watch over the room and &ldquo;ensure&rdquo; students
                weren&rsquo;t cheating.
              </p>
              <img
                src="/wrapup/images/image5.png"
                className="rounded-md"
                alt=""
              />
              <p>
                Unfortunately, we underestimated how willing students were to
                blatantly get up and talk to each other, despite the
                proctor&rsquo;s requests to sit back down. Needless to say, this
                event was demolished within twenty minutes, but it seemed like
                students had fun!
              </p>
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="/wrapup/images/image14.jpg"
                  className="rounded-md"
                  alt=""
                />
                <img
                  src="/wrapup/images/image38.jpg"
                  className="rounded-md"
                  alt=""
                />
                <img
                  src="/wrapup/images/image33.jpg"
                  className="rounded-md"
                  alt=""
                />
              </div>
              <p>
                The answer for this event was DIVERSITY OF TOPICS, which is a
                reference to a cheating scandal that took place in the
                introductory biology class Diversity of Life last semester, as
                well as a reference to the wide variety of topics present on the
                exam we gave solvers.
              </p>
              <p>Thank you to:</p>
              <ul>
                <li>Veronika, Thea, and Amara for helping run the event;</li>
                <li>
                  Thea for her monumental work on the exam design (a magnum opus
                  for any mortal, but she will surely surpass it); and
                </li>
                <li>Julia for the wonderful pictures!</li>
              </ul>
              <p>
                Here is a link to the full exam, for your enjoyment:{" "}
                <a
                  href="https://docs.google.com/document/d/1NZpdgdunhG1Qy3PZFBq23ZrRnlJm32P1vxKZ1Wt4eic/edit?usp=sharing"
                  className="text-link no-underline hover:underline"
                >
                  exam
                </a>
              </p>
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="/wrapup/images/image36.png"
                  className="rounded-md"
                  alt=""
                />
                <img
                  src="/wrapup/images/image45.png"
                  className="rounded-md"
                  alt=""
                />
              </div>
            </TOCSection>

            {/* TIMELINE & LOGISTICS */}
            <TOCSection sectionId={34} tocTitle="Timeline & Logistics">
              <h2>Timeline &amp; Logistics</h2>
              <i>By Megan Carlson and Erin Finn</i>
              <ul>
                <li>September 6th: Theme selected</li>
                <li>September 21st: First writing meeting</li>
                <li>October 5th: Meta writing groups formed</li>
                <li>October 26th: Spaghetti meta writing groups formed</li>
                <li>November 9th: Feeder answers released</li>
                <li>November 16th: First art meeting</li>
                <li>November 16th: First feeder puzzle written (Ubpcosu)</li>
                <li>November 22nd&ndash;23rd: Puzzlethon!</li>
                <li>November 26th: All metas written (more or less)</li>
                <li>February 8th: First tech meeting</li>
                <li>February 9th: First story meeting</li>
                <li>January 16th&ndash;19th: BPH writers go to Mystery Hunt</li>
                <li>January 22nd: SAO security meeting</li>
                <li>January 28th: Puzzles assigned editors</li>
                <li>
                  February 18th: Brown Puzzlehunt 2026 publicly announced!
                </li>
                <li>March 14th&ndash;15th: In-person full testsolve</li>
                <li>March 28th&ndash;29th: Remote full testsolve</li>
                <li>April 2nd: Last puzzle written</li>
                <li>April 5th: BPH dry run</li>
                <li>April 5th: Capstone added</li>
                <li>April 11th&ndash;12th: In-person hunt!</li>
                <li>April 18th&ndash;24th: Remote hunt!</li>
              </ul>
              <p>
                Having a few years of precedent under our belts has taught us a
                lot about how to put this event together and how to make things
                work. The timeline was generally smoother than last year! Rooms
                were booked earlier, feeders dropped sooner, and fewer things
                were left to do on the night before hunt.
              </p>
              <p>
                Needless to say, the shocking events at Brown last December
                introduced complications in planning. All else aside, Brown as a
                community has cracked down on campus security and willingness to
                allow guests to access campus. While our hunt is fundamentally
                by and for Brown students, we strongly believe in making our
                event accessible to the wider hunt community. Running in-person
                is part of what makes our event unique, and we are proud to be
                able to include the community in the physical puzzles,
                interactions, and events that are only made possible through
                presence on campus.
              </p>
              <p>
                We initially received some pushback from administration about
                hosting guests on campus; the earliest proposal requested that
                we assign a BPH staff member to accompany each team for the
                entire duration of the weekend. As much as we love our non-Brown
                teams, we were not willing or able to accommodate that kind of
                staffing constraint.
              </p>
              <p>
                After some back and forth, we settled on a few compromises for
                how guests could operate on campus. This consisted of ID-checks
                at kickoff to receive registered participant wristbands, and an
                HQ &lsquo;burner phone&rsquo; manned by hunt staff for building
                access requests. This meant that anytime a team needed to leave
                their room and return, they&rsquo;d need to phone HQ and wait
                for a student to swipe them in. Although inconvenient for both
                us and solvers, we feel this was the best compromise manageable
                considering the situation.
              </p>
              <p>
                This also meant that we shied away from any puzzles requiring
                much interaction with campus. While having solvers roaming
                around looking for landmarks is usually a fun part of being on
                campus, we decided to clearly signpost any locations required to
                visit for a puzzle.
              </p>
              <p>
                We&rsquo;re unsure how campus security policies will continue to
                evolve over the course of the next year, but we will continue to
                advocate for a fun and interactive experience on campus that is
                accessible to both community members and outside guests.
              </p>
            </TOCSection>

            {/* TESTSOLVING */}
            <TOCSection sectionId={35} tocTitle="Testsolving">
              <h2>Testsolving</h2>
              <i>By Arnav Singhal</i>
              <p>
                We once again enlisted the great and generous help of MIT Puzzle
                Club for an in-person testsolve and NES for a remote test-solve.
                These teams are always incredibly constructive and take all of
                our many pre-hunt flaws in stride, improving pretty much every
                single puzzle across the two of them. Both teams made a point of
                writing comments on literally every single puzzle, which was
                super crucial to see both the strong and weak points of the hunt
                at those stages!
              </p>
              <p>
                We were a fair bit more prepared than last year&mdash;MIT Puzzle
                Club only ran into around 6 unwritten puzzles, and NES had 4. We
                even had the unlock structure decided and implemented before the
                morning that MITPC arrived!
              </p>
              <p>
                One particular area that the testsolves were extremely useful in
                this year was in UI improvements. Both testing teams raised
                several issues and ideas that made the website progressively
                easier to navigate and understand.
              </p>
              <p>
                On a personal note, it&rsquo;s been lots of fun to hang out with
                these teams the past two years as they see our (rough) product.
                Hopefully these relationships turn out to be long-term 😊.
              </p>
            </TOCSection>

            {/* REFLECTIONS */}
            <TOCSection sectionId={36} tocTitle="Reflections">
              <h2>Reflections</h2>
              <p>
                In many ways, we can see our hunts getting better each year. Our
                timeline went smoother, our puzzles were written earlier and
                tested more thoroughly, and more people got to see our puzzles!
                Selfishly, we truly believe that our hunt is unparalleled in a
                lot of ways. Running an in-person hunt is not something that is
                possible for most running teams, and we know we&rsquo;re
                uniquely situated to plan things like physical puzzles, events,
                and interactions. While these things make hunt weekend crazy for
                our modest running team, we&rsquo;re proud that it creates an
                experience not found elsewhere at this scale.
              </p>
              <p>
                One of our favorite parts about this hunt is the
                timeline&mdash;dates are set a year in advance and we have from
                the beginning of September to mid-April to write the hunt. This
                kind of cycle leaves us with a product we&rsquo;re proud of
                every year and has really instilled the truth that perfection is
                the enemy of things-actually-happening (or however it goes).
                It&rsquo;s also really inspiring to see so many puzzle writers
                and editors go from not knowing what a puzzle is to writing and
                improving puzzles to such a high standard that only came for
                some of us after years of doing puzzlehunts.
              </p>
              <p>
                We&rsquo;re proud of the community we&rsquo;ve built around this
                hunt and within our club. With the last remaining writers of the
                first Brown Puzzlehunt graduating this year, our hunt leadership
                is transitioning to a newer generation who were introduced to
                puzzles through our club! It&rsquo;s inspiring to see how many
                undergraduates have fallen in love with puzzles through our
                community, and we can only hope that BPC will stay strong in
                years to come.
              </p>
            </TOCSection>

            {/* EXIT SURVEY & CREDITS */}
            <TOCSection sectionId={37} tocTitle="Exit Survey & Credits">
              <h2>Exit Survey &amp; Credits</h2>
              <p>
                Thanks so much for solving our fourth annual hunt! We&rsquo;re
                always trying to improve our event and would love any feedback
                you have for us. Find our feedback form{" "}
                <a
                  href="https://forms.gle/PqApEo6Wjiwhth6C6"
                  className="text-link no-underline hover:underline"
                >
                  here
                </a>
                .
              </p>
              <p>
                If you&rsquo;d like to support Brown Puzzle Club to enable us to
                keep doing cool things like this in the future, you can do so{" "}
                <a
                  href="https://bbis.advancement.brown.edu/BBPhenix/give-now?did=05732af4-d994-4d40-bcd6-fb42d07b6eab"
                  className="text-link no-underline hover:underline"
                >
                  here
                </a>
                .
              </p>
              <p>
                A full list of credits can be found at the bottom of the{" "}
                <a
                  href="/info#section-8"
                  className="text-link no-underline hover:underline"
                >
                  info page
                </a>
                .
              </p>
            </TOCSection>

            <TOCSection sectionId={38} tocTitle="Statistics">
              <h2>Statistics</h2>

              <h3>Fewest Guesses (Finishers)</h3>
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
                    <TableCell>silly bears</TableCell>
                    <TableCell className="text-center">57</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Summa cum llama</TableCell>
                    <TableCell className="text-center">57</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>ୌ ORIYA ANCIENT EARTH MEME</TableCell>
                    <TableCell className="text-center">63</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Kevin</TableCell>
                    <TableCell className="text-center">72</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>⏖ METRICAL BROW N (WHERE N=2)</TableCell>
                    <TableCell className="text-center">77</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>come back to us later</TableCell>
                    <TableCell className="text-center">81</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Upgoers Five</TableCell>
                    <TableCell className="text-center">82</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Globe Otters</TableCell>
                    <TableCell className="text-center">87</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>⛈️ Thunderspeaker Thursday 🗣️‼️😶‍🌫️🙉🙄</TableCell>
                    <TableCell className="text-center">88</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>can a team ever truly be named?</TableCell>
                    <TableCell className="text-center">88</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <h3>Most Guesses (Finishers)</h3>
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
                    <TableCell>求你了让我看一眼题吧我什么都会做的</TableCell>
                    <TableCell className="text-center">297</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>深色墨喵</TableCell>
                    <TableCell className="text-center">276</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>猫猫战士结社</TableCell>
                    <TableCell className="text-center">252</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>🍫 CyFur Brownie 🎂</TableCell>
                    <TableCell className="text-center">237</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>GreenCircle</TableCell>
                    <TableCell className="text-center">227</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>凑不出-Chill Bro Crew</TableCell>
                    <TableCell className="text-center">224</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>ohno猫咪湖EV</TableCell>
                    <TableCell className="text-center">218</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Just Nutrimatic</TableCell>
                    <TableCell className="text-center">213</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>给猫铲航天翔去了</TableCell>
                    <TableCell className="text-center">209</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Higher Veheducation</TableCell>
                    <TableCell className="text-center">207</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <h3>Fewest Hints (Finishers)</h3>
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
                    <TableCell>wahoo!</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Globe Otters</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>inter oves</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>chat</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Summa cum llama</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>🪀🦞🌮</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>can a team ever truly be named?</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      Mathemagicians:Accounting,JournalismOrRobotics?
                    </TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Mobius Strippers</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Needlessly Eating Syllabi</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Solve@NUS</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      nice hunt! surely no others need writing right now
                    </TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      Have you tried ANSWERS, KATZ? SEE YOU IN THE RING
                    </TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Pennys</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Dissertation: Advanced Nonogrammetry</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>silly bears</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>⛈️ Thunderspeaker Thursday 🗣️‼️😶‍🌫️🙉🙄</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>StriketeamA🏫</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>String Cheese Theory</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Tricksters</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      Tenaciously Studying Brown's Intricacies
                    </TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>⏖ METRICAL BROW N (WHERE N=2)</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>stɹeɪjə maɪt</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      [URGENT] BLUENO EXPELLED FOR FAILING PUZZLE 101
                    </TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>White Maria</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>plugh</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      PERSON NAME OW PLAYER ANIME GIRL #1 FAN + friends
                    </TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>No DriKe No Issac No Problem</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Literally Real Genius</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>🫡 Salutecissimus</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Cardinality</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>ANTH 621: Tag Taxonomies</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>🐆Cheatahs🐆</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>ୌ ORIYA ANCIENT EARTH MEME</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      17th On the Waiting List for My Puzzle Class
                    </TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>come back to us later</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      TheEmpiricMathemagiciansPuzzleEaterSolverThinkers
                    </TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>The Coraline Schism</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <h3>Most Hints (Finishers)</h3>
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
                    <TableCell>猫猫战士结社</TableCell>
                    <TableCell className="text-center">22</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>We Like Hunting</TableCell>
                    <TableCell className="text-center">22</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>PNP's Not Puzzler</TableCell>
                    <TableCell className="text-center">17</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>🧇🪐💫 Waffle Syzygy 💫🪐🧇</TableCell>
                    <TableCell className="text-center">13</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      Intervarsi-Teammate: Very Truly Timing
                    </TableCell>
                    <TableCell className="text-center">13</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Gravity Plus Velocity</TableCell>
                    <TableCell className="text-center">13</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Lingopians in College Coat</TableCell>
                    <TableCell className="text-center">13</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>skinny</TableCell>
                    <TableCell className="text-center">12</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Whatever</TableCell>
                    <TableCell className="text-center">12</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Puzzle But Lunch</TableCell>
                    <TableCell className="text-center">12</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <h3>Most Hints & Replies (Finishers)</h3>
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
                    <TableCell>PNP's Not Puzzler</TableCell>
                    <TableCell className="text-center">48</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>We Like Hunting</TableCell>
                    <TableCell className="text-center">42</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>猫猫战士结社</TableCell>
                    <TableCell className="text-center">39</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Lingopians in College Coat</TableCell>
                    <TableCell className="text-center">33</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>skinny</TableCell>
                    <TableCell className="text-center">33</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Gravity Plus Velocity</TableCell>
                    <TableCell className="text-center">29</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      Intervarsi-Teammate: Very Truly Timing
                    </TableCell>
                    <TableCell className="text-center">27</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>🧇🪐💫 Waffle Syzygy 💫🪐🧇</TableCell>
                    <TableCell className="text-center">27</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Puzzle But Lunch</TableCell>
                    <TableCell className="text-center">22</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>给猫铲航天翔去了</TableCell>
                    <TableCell className="text-center">18</TableCell>
                  </TableRow>
                </TableBody>
              </Table>

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
                      + Replies
                    </TableHead>
                    <TableHead className="text-main-header">Tokens</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="pointer-events-none">
                  <TableRow>
                    <TableCell>advanced-logical-cooking-techniques</TableCell>
                    <TableCell className="text-center">361</TableCell>
                    <TableCell className="text-center">204</TableCell>
                    <TableCell className="text-center">10</TableCell>
                    <TableCell className="text-center">1</TableCell>
                    <TableCell className="text-center">1</TableCell>
                    <TableCell className="text-center">1</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>analogical-semantics</TableCell>
                    <TableCell className="text-center">627</TableCell>
                    <TableCell className="text-center">148</TableCell>
                    <TableCell className="text-center">42</TableCell>
                    <TableCell className="text-center">41</TableCell>
                    <TableCell className="text-center">58</TableCell>
                    <TableCell className="text-center">8</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>anthropology-of-computers</TableCell>
                    <TableCell className="text-center">225</TableCell>
                    <TableCell className="text-center">134</TableCell>
                    <TableCell className="text-center">0</TableCell>
                    <TableCell className="text-center">11</TableCell>
                    <TableCell className="text-center">20</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>applied-criminology</TableCell>
                    <TableCell className="text-center">814</TableCell>
                    <TableCell className="text-center">139</TableCell>
                    <TableCell className="text-center">2</TableCell>
                    <TableCell className="text-center">60</TableCell>
                    <TableCell className="text-center">111</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>applied-probability</TableCell>
                    <TableCell className="text-center">457</TableCell>
                    <TableCell className="text-center">262</TableCell>
                    <TableCell className="text-center">1</TableCell>
                    <TableCell className="text-center">30</TableCell>
                    <TableCell className="text-center">41</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>architecture-on-college-hill</TableCell>
                    <TableCell className="text-center">987</TableCell>
                    <TableCell className="text-center">242</TableCell>
                    <TableCell className="text-center">11</TableCell>
                    <TableCell className="text-center">5</TableCell>
                    <TableCell className="text-center">12</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>avionic-intersectionality</TableCell>
                    <TableCell className="text-center">452</TableCell>
                    <TableCell className="text-center">162</TableCell>
                    <TableCell className="text-center">46</TableCell>
                    <TableCell className="text-center">38</TableCell>
                    <TableCell className="text-center">65</TableCell>
                    <TableCell className="text-center">2</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>bar-exam</TableCell>
                    <TableCell className="text-center">461</TableCell>
                    <TableCell className="text-center">134</TableCell>
                    <TableCell className="text-center">0</TableCell>
                    <TableCell className="text-center">5</TableCell>
                    <TableCell className="text-center">9</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>big-wheel</TableCell>
                    <TableCell className="text-center">420</TableCell>
                    <TableCell className="text-center">288</TableCell>
                    <TableCell className="text-center">0</TableCell>
                    <TableCell className="text-center">8</TableCell>
                    <TableCell className="text-center">10</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>card-game-theory</TableCell>
                    <TableCell className="text-center">672</TableCell>
                    <TableCell className="text-center">197</TableCell>
                    <TableCell className="text-center">4</TableCell>
                    <TableCell className="text-center">12</TableCell>
                    <TableCell className="text-center">20</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>characters-in-flight</TableCell>
                    <TableCell className="text-center">1050</TableCell>
                    <TableCell className="text-center">272</TableCell>
                    <TableCell className="text-center">0</TableCell>
                    <TableCell className="text-center">12</TableCell>
                    <TableCell className="text-center">17</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>collaborative-chorale</TableCell>
                    <TableCell className="text-center">610</TableCell>
                    <TableCell className="text-center">163</TableCell>
                    <TableCell className="text-center">48</TableCell>
                    <TableCell className="text-center">9</TableCell>
                    <TableCell className="text-center">12</TableCell>
                    <TableCell className="text-center">1</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>cubist-linguistics</TableCell>
                    <TableCell className="text-center">352</TableCell>
                    <TableCell className="text-center">133</TableCell>
                    <TableCell className="text-center">0</TableCell>
                    <TableCell className="text-center">16</TableCell>
                    <TableCell className="text-center">30</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>culinary-chemistry-lab</TableCell>
                    <TableCell className="text-center">1452</TableCell>
                    <TableCell className="text-center">191</TableCell>
                    <TableCell className="text-center">18</TableCell>
                    <TableCell className="text-center">19</TableCell>
                    <TableCell className="text-center">33</TableCell>
                    <TableCell className="text-center">1</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>dirt</TableCell>
                    <TableCell className="text-center">600</TableCell>
                    <TableCell className="text-center">136</TableCell>
                    <TableCell className="text-center">88</TableCell>
                    <TableCell className="text-center">17</TableCell>
                    <TableCell className="text-center">18</TableCell>
                    <TableCell className="text-center">2</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>disguised-financial-crimes</TableCell>
                    <TableCell className="text-center">1007</TableCell>
                    <TableCell className="text-center">164</TableCell>
                    <TableCell className="text-center">30</TableCell>
                    <TableCell className="text-center">48</TableCell>
                    <TableCell className="text-center">64</TableCell>
                    <TableCell className="text-center">5</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>editing-practice</TableCell>
                    <TableCell className="text-center">299</TableCell>
                    <TableCell className="text-center">190</TableCell>
                    <TableCell className="text-center">6</TableCell>
                    <TableCell className="text-center">9</TableCell>
                    <TableCell className="text-center">14</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>escapism-in-cinema</TableCell>
                    <TableCell className="text-center">771</TableCell>
                    <TableCell className="text-center">149</TableCell>
                    <TableCell className="text-center">83</TableCell>
                    <TableCell className="text-center">18</TableCell>
                    <TableCell className="text-center">38</TableCell>
                    <TableCell className="text-center">9</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>experimental-cardiac-measurement</TableCell>
                    <TableCell className="text-center">294</TableCell>
                    <TableCell className="text-center">141</TableCell>
                    <TableCell className="text-center">33</TableCell>
                    <TableCell className="text-center">5</TableCell>
                    <TableCell className="text-center">7</TableCell>
                    <TableCell className="text-center">1</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>fifth-year-masters</TableCell>
                    <TableCell className="text-center">329</TableCell>
                    <TableCell className="text-center">111</TableCell>
                    <TableCell className="text-center">0</TableCell>
                    <TableCell className="text-center">23</TableCell>
                    <TableCell className="text-center">36</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>geographical-textiles</TableCell>
                    <TableCell className="text-center">262</TableCell>
                    <TableCell className="text-center">131</TableCell>
                    <TableCell className="text-center">2</TableCell>
                    <TableCell className="text-center">28</TableCell>
                    <TableCell className="text-center">64</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>going-in-circles</TableCell>
                    <TableCell className="text-center">434</TableCell>
                    <TableCell className="text-center">189</TableCell>
                    <TableCell className="text-center">31</TableCell>
                    <TableCell className="text-center">25</TableCell>
                    <TableCell className="text-center">44</TableCell>
                    <TableCell className="text-center">1</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>herculean-math</TableCell>
                    <TableCell className="text-center">245</TableCell>
                    <TableCell className="text-center">205</TableCell>
                    <TableCell className="text-center">3</TableCell>
                    <TableCell className="text-center">3</TableCell>
                    <TableCell className="text-center">5</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>how-to-get-your-heart-broken</TableCell>
                    <TableCell className="text-center">490</TableCell>
                    <TableCell className="text-center">148</TableCell>
                    <TableCell className="text-center">95</TableCell>
                    <TableCell className="text-center">27</TableCell>
                    <TableCell className="text-center">59</TableCell>
                    <TableCell className="text-center">3</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>itty-bitty-kitties</TableCell>
                    <TableCell className="text-center">236</TableCell>
                    <TableCell className="text-center">198</TableCell>
                    <TableCell className="text-center">1</TableCell>
                    <TableCell className="text-center">0</TableCell>
                    <TableCell className="text-center">0</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>linear-algebra</TableCell>
                    <TableCell className="text-center">493</TableCell>
                    <TableCell className="text-center">144</TableCell>
                    <TableCell className="text-center">54</TableCell>
                    <TableCell className="text-center">16</TableCell>
                    <TableCell className="text-center">25</TableCell>
                    <TableCell className="text-center">5</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>linesman-training</TableCell>
                    <TableCell className="text-center">1259</TableCell>
                    <TableCell className="text-center">148</TableCell>
                    <TableCell className="text-center">45</TableCell>
                    <TableCell className="text-center">42</TableCell>
                    <TableCell className="text-center">70</TableCell>
                    <TableCell className="text-center">1</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>luck-practicum</TableCell>
                    <TableCell className="text-center">225</TableCell>
                    <TableCell className="text-center">129</TableCell>
                    <TableCell className="text-center">0</TableCell>
                    <TableCell className="text-center">10</TableCell>
                    <TableCell className="text-center">13</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>maritime-studies</TableCell>
                    <TableCell className="text-center">232</TableCell>
                    <TableCell className="text-center">138</TableCell>
                    <TableCell className="text-center">3</TableCell>
                    <TableCell className="text-center">52</TableCell>
                    <TableCell className="text-center">92</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>mischievous-literature</TableCell>
                    <TableCell className="text-center">505</TableCell>
                    <TableCell className="text-center">169</TableCell>
                    <TableCell className="text-center">20</TableCell>
                    <TableCell className="text-center">12</TableCell>
                    <TableCell className="text-center">20</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>multi-clef-composition</TableCell>
                    <TableCell className="text-center">451</TableCell>
                    <TableCell className="text-center">160</TableCell>
                    <TableCell className="text-center">41</TableCell>
                    <TableCell className="text-center">16</TableCell>
                    <TableCell className="text-center">26</TableCell>
                    <TableCell className="text-center">4</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>primary-investigation</TableCell>
                    <TableCell className="text-center">712</TableCell>
                    <TableCell className="text-center">171</TableCell>
                    <TableCell className="text-center">12</TableCell>
                    <TableCell className="text-center">24</TableCell>
                    <TableCell className="text-center">46</TableCell>
                    <TableCell className="text-center">2</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>psychoceramics</TableCell>
                    <TableCell className="text-center">405</TableCell>
                    <TableCell className="text-center">135</TableCell>
                    <TableCell className="text-center">0</TableCell>
                    <TableCell className="text-center">11</TableCell>
                    <TableCell className="text-center">16</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>rabbit-nundrum</TableCell>
                    <TableCell className="text-center">807</TableCell>
                    <TableCell className="text-center">140</TableCell>
                    <TableCell className="text-center">110</TableCell>
                    <TableCell className="text-center">16</TableCell>
                    <TableCell className="text-center">23</TableCell>
                    <TableCell className="text-center">7</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>scacchic-fabrication</TableCell>
                    <TableCell className="text-center">430</TableCell>
                    <TableCell className="text-center">226</TableCell>
                    <TableCell className="text-center">6</TableCell>
                    <TableCell className="text-center">15</TableCell>
                    <TableCell className="text-center">27</TableCell>
                    <TableCell className="text-center">2</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>schmear-campaigns</TableCell>
                    <TableCell className="text-center">532</TableCell>
                    <TableCell className="text-center">255</TableCell>
                    <TableCell className="text-center">2</TableCell>
                    <TableCell className="text-center">20</TableCell>
                    <TableCell className="text-center">28</TableCell>
                    <TableCell className="text-center">1</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>serialized-storytelling</TableCell>
                    <TableCell className="text-center">347</TableCell>
                    <TableCell className="text-center">252</TableCell>
                    <TableCell className="text-center">1</TableCell>
                    <TableCell className="text-center">31</TableCell>
                    <TableCell className="text-center">52</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      sunk-modern-naval-investigative-methodology
                    </TableCell>
                    <TableCell className="text-center">424</TableCell>
                    <TableCell className="text-center">187</TableCell>
                    <TableCell className="text-center">10</TableCell>
                    <TableCell className="text-center">23</TableCell>
                    <TableCell className="text-center">39</TableCell>
                    <TableCell className="text-center">1</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>theological-chemistry</TableCell>
                    <TableCell className="text-center">208</TableCell>
                    <TableCell className="text-center">139</TableCell>
                    <TableCell className="text-center">0</TableCell>
                    <TableCell className="text-center">1</TableCell>
                    <TableCell className="text-center">1</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>thermodynamic-zoology</TableCell>
                    <TableCell className="text-center">290</TableCell>
                    <TableCell className="text-center">132</TableCell>
                    <TableCell className="text-center">0</TableCell>
                    <TableCell className="text-center">38</TableCell>
                    <TableCell className="text-center">64</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>topics-in-guard-door-theory</TableCell>
                    <TableCell className="text-center">358</TableCell>
                    <TableCell className="text-center">206</TableCell>
                    <TableCell className="text-center">2</TableCell>
                    <TableCell className="text-center">2</TableCell>
                    <TableCell className="text-center">2</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>trap-streets</TableCell>
                    <TableCell className="text-center">242</TableCell>
                    <TableCell className="text-center">190</TableCell>
                    <TableCell className="text-center">4</TableCell>
                    <TableCell className="text-center">1</TableCell>
                    <TableCell className="text-center">1</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>ubpcosu-i</TableCell>
                    <TableCell className="text-center">627</TableCell>
                    <TableCell className="text-center">183</TableCell>
                    <TableCell className="text-center">6</TableCell>
                    <TableCell className="text-center">14</TableCell>
                    <TableCell className="text-center">20</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>ubpcosu-ii</TableCell>
                    <TableCell className="text-center">882</TableCell>
                    <TableCell className="text-center">158</TableCell>
                    <TableCell className="text-center">32</TableCell>
                    <TableCell className="text-center">19</TableCell>
                    <TableCell className="text-center">30</TableCell>
                    <TableCell className="text-center">1</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>underwater-basketweaving</TableCell>
                    <TableCell className="text-center">296</TableCell>
                    <TableCell className="text-center">138</TableCell>
                    <TableCell className="text-center">1</TableCell>
                    <TableCell className="text-center">28</TableCell>
                    <TableCell className="text-center">56</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>voting-dynamics</TableCell>
                    <TableCell className="text-center">567</TableCell>
                    <TableCell className="text-center">158</TableCell>
                    <TableCell className="text-center">28</TableCell>
                    <TableCell className="text-center">3</TableCell>
                    <TableCell className="text-center">3</TableCell>
                    <TableCell className="text-center">1</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>year-of-the-honse</TableCell>
                    <TableCell className="text-center">273</TableCell>
                    <TableCell className="text-center">189</TableCell>
                    <TableCell className="text-center">8</TableCell>
                    <TableCell className="text-center">1</TableCell>
                    <TableCell className="text-center">1</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <h3>Common Incorrect Answers</h3>
              <Table className="my-0 w-fit">
                <TableHeader>
                  <TableRow className="hover:bg-inherit">
                    <TableHead className="text-main-header">Puzzle</TableHead>
                    <TableHead className="text-main-header">
                      Top Incorrect
                    </TableHead>
                    <TableHead className="text-main-header">
                      Percent Frequency*
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="pointer-events-none">
                  <TableRow>
                    <TableCell>characters-in-flight</TableCell>
                    <TableCell>FOWL</TableCell>
                    <TableCell className="text-center">70.6</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>culinary-chemistry-lab</TableCell>
                    <TableCell>2AP</TableCell>
                    <TableCell className="text-center">66.5</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>card-game-theory</TableCell>
                    <TableCell>ELECTROSPIRIT</TableCell>
                    <TableCell className="text-center">65.5</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>applied-criminology</TableCell>
                    <TableCell>JAILBREAK</TableCell>
                    <TableCell className="text-center">62.6</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>psychoceramics</TableCell>
                    <TableCell>CRACKOFDAWN</TableCell>
                    <TableCell className="text-center">42.2</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>bar-exam</TableCell>
                    <TableCell>LIFETRIAL</TableCell>
                    <TableCell className="text-center">38.8</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>primary-investigation</TableCell>
                    <TableCell>SHAPE</TableCell>
                    <TableCell className="text-center">36.3</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>luck-practicum</TableCell>
                    <TableCell>ROYALFLUSH</TableCell>
                    <TableCell className="text-center">33.3</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>escapism-in-cinema</TableCell>
                    <TableCell>PEACEONEARTH</TableCell>
                    <TableCell className="text-center">32.2</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>mischievous-literature</TableCell>
                    <TableCell>BOOK</TableCell>
                    <TableCell className="text-center">24.3</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>ubpcosu-ii</TableCell>
                    <TableCell>YOUEXAM</TableCell>
                    <TableCell className="text-center">23.4</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>rabbit-nundrum</TableCell>
                    <TableCell>MARGARITA</TableCell>
                    <TableCell className="text-center">20.0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>ubpcosu-i</TableCell>
                    <TableCell>ESTITEBESPUULTOSUUSILE</TableCell>
                    <TableCell className="text-center">19.1</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>collaborative-chorale</TableCell>
                    <TableCell>DESOLATI</TableCell>
                    <TableCell className="text-center">16.6</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>fifth-year-masters</TableCell>
                    <TableCell>INURSAMAJOR</TableCell>
                    <TableCell className="text-center">16.2</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>dirt</TableCell>
                    <TableCell>EARTHLAYER</TableCell>
                    <TableCell className="text-center">14.7</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>disguised-financial-crimes</TableCell>
                    <TableCell>FAIRCOIN</TableCell>
                    <TableCell className="text-center">13.4</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>applied-probability</TableCell>
                    <TableCell>NEWYORK</TableCell>
                    <TableCell className="text-center">13.0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>avionic-intersectionality</TableCell>
                    <TableCell>AIRUSA</TableCell>
                    <TableCell className="text-center">13.0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>analogical-semantics</TableCell>
                    <TableCell>HEEL</TableCell>
                    <TableCell className="text-center">12.2</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>schmear-campaigns</TableCell>
                    <TableCell>FIXFAKENUMBERS</TableCell>
                    <TableCell className="text-center">11.8</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>how-to-get-your-heart-broken</TableCell>
                    <TableCell>SOFTENUP</TableCell>
                    <TableCell className="text-center">10.8</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>geographical-textiles</TableCell>
                    <TableCell>SCOTLAND</TableCell>
                    <TableCell className="text-center">10.7</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>going-in-circles</TableCell>
                    <TableCell>NAMEOFTHISPROCESS</TableCell>
                    <TableCell className="text-center">10.6</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>cubist-linguistics</TableCell>
                    <TableCell>PICK</TableCell>
                    <TableCell className="text-center">10.5</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>underwater-basketweaving</TableCell>
                    <TableCell>BLOWER</TableCell>
                    <TableCell className="text-center">10.1</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>architecture-on-college-hill</TableCell>
                    <TableCell>MIGHTY</TableCell>
                    <TableCell className="text-center">9.5</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>experimental-cardiac-measurement</TableCell>
                    <TableCell>ANUBIS</TableCell>
                    <TableCell className="text-center">9.2</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>advanced-logical-cooking-techniques</TableCell>
                    <TableCell>FOIL</TableCell>
                    <TableCell className="text-center">7.8</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>scacchic-fabrication</TableCell>
                    <TableCell>FLUORESCENCE</TableCell>
                    <TableCell className="text-center">7.1</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      sunk-modern-naval-investigative-methodology
                    </TableCell>
                    <TableCell>AMIDSHIP</TableCell>
                    <TableCell className="text-center">7.0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>linear-algebra</TableCell>
                    <TableCell>BANANAFOSTER</TableCell>
                    <TableCell className="text-center">6.9</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>multi-clef-composition</TableCell>
                    <TableCell>WATERMONITOR</TableCell>
                    <TableCell className="text-center">6.2</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>big-wheel</TableCell>
                    <TableCell>WEARINGS</TableCell>
                    <TableCell className="text-center">5.6</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>anthropology-of-computers</TableCell>
                    <TableCell>STUTTERING</TableCell>
                    <TableCell className="text-center">4.5</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>year-of-the-honse</TableCell>
                    <TableCell>JUDICIARY</TableCell>
                    <TableCell className="text-center">4.2</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>editing-practice</TableCell>
                    <TableCell>COLDCUTS</TableCell>
                    <TableCell className="text-center">4.2</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>topics-in-guard-door-theory</TableCell>
                    <TableCell>PARASITE</TableCell>
                    <TableCell className="text-center">3.4</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>itty-bitty-kitties</TableCell>
                    <TableCell>FROWZIEST</TableCell>
                    <TableCell className="text-center">3.0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>thermodynamic-zoology</TableCell>
                    <TableCell>MAXWELL</TableCell>
                    <TableCell className="text-center">3.0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>herculean-math</TableCell>
                    <TableCell>HYDRANT</TableCell>
                    <TableCell className="text-center">2.9</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>maritime-studies</TableCell>
                    <TableCell>ASPIRAL</TableCell>
                    <TableCell className="text-center">2.2</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>theological-chemistry</TableCell>
                    <TableCell>BLOODLINKS</TableCell>
                    <TableCell className="text-center">2.2</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>trap-streets</TableCell>
                    <TableCell>GIVESWAY</TableCell>
                    <TableCell className="text-center">2.1</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>serialized-storytelling</TableCell>
                    <TableCell>THICKENS</TableCell>
                    <TableCell className="text-center">1.6</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <p className="text-sm text-main-header">
                *Relative to puzzle answer.
              </p>

              <h3>First Solves</h3>
              <Table className="my-0 w-fit">
                <TableHeader>
                  <TableRow className="hover:bg-inherit">
                    <TableHead className="text-main-header">Type</TableHead>
                    <TableHead className="text-main-header">Puzzle</TableHead>
                    <TableHead className="text-main-header">Team</TableHead>
                    <TableHead className="text-main-header">
                      Time After Start
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="pointer-events-none">
                  <TableRow>
                    <TableCell>in-person</TableCell>
                    <TableCell>big-wheel</TableCell>
                    <TableCell>
                      puzzles at acceptable difficulties possibly harder
                    </TableCell>
                    <TableCell>0m 37.525s</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>remote</TableCell>
                    <TableCell>applied-probability</TableCell>
                    <TableCell>深色墨喵</TableCell>
                    <TableCell>2m 57.855s</TableCell>
                  </TableRow>
                </TableBody>
              </Table>

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
                      ITWOULDBEREALLYCOOLANDTHEMATICIFTHEANSWERWASAIRLINESBECAUSETHEYRELINESANDTHEONEINTERSECTIONISONALINE
                    </TableCell>
                    <TableCell className="text-center">100</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      ILOVELUGEEVERSINCEIWASSMALLMYDREAMHASBEENTOBECOMEALUGEATHLETEAFTERFOURYEARSOFHARDWORKIFINALLYMADEIT
                    </TableCell>
                    <TableCell className="text-center">99</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      968471532327598461541236798215649873874312659639785214156823947483967125792154386
                    </TableCell>
                    <TableCell className="text-center">81</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      NOWAYFOWLPLAYAPPEAREDINANACTUALLEGALDOCUMENTSEARCHFORHAIREVANDERSONCOUNTYETAL
                    </TableCell>
                    <TableCell className="text-center">77</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      X11983X20X31975X40X51975X60X71984X81983X91975X101912X111985X121972X132001
                    </TableCell>
                    <TableCell className="text-center">73</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      CHAPEHELBAAIRBUSFROUZIESTEARTHLIKDESOLATGIVEAWYBANSFOTERISLEJUDICATORY
                    </TableCell>
                    <TableCell className="text-center">70</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      HTTPSWWWGOOGLECOMSEARCHCLIENTSAFARIRLSENQFLUORESCENCEIEUTF8OEUTF8
                    </TableCell>
                    <TableCell className="text-center">65</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      BLUEBERRYPLAINSESAMEPOPPYSEEDONIONWHOLEWHEATEVERYTHINGBLUEBERRY
                    </TableCell>
                    <TableCell className="text-center">63</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      AQUASKYBLUEIRISFUCHSIAROSEROSEQUARTZSERENITYBLUETURQOUISE
                    </TableCell>
                    <TableCell className="text-center">57</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      CCCCCBVEFGFRCKVGDFGNDFHNTLVVNJBJLLKLGJFDVLBB
                    </TableCell>
                    <TableCell className="text-center">44</TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <h3>One-character Guess Frequency</h3>
              <Table className="my-0 w-fit">
                <TableHeader>
                  <TableRow className="hover:bg-inherit">
                    <TableHead className="text-main-header">2</TableHead>
                    <TableHead className="text-main-header">0</TableHead>
                    <TableHead className="text-main-header">P</TableHead>
                    <TableHead className="text-main-header">1</TableHead>
                    <TableHead className="text-main-header">E</TableHead>
                    <TableHead className="text-main-header">F</TableHead>
                    <TableHead className="text-main-header">A</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody className="pointer-events-none">
                  <TableRow>
                    <TableCell className="text-center">3</TableCell>
                    <TableCell className="text-center">2</TableCell>
                    <TableCell className="text-center">1</TableCell>
                    <TableCell className="text-center">1</TableCell>
                    <TableCell className="text-center">1</TableCell>
                    <TableCell className="text-center">1</TableCell>
                    <TableCell className="text-center">1</TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <h3>Shortest Hints</h3>
              <Table className="my-0 w-fit">
                <TableHeader>
                  <TableRow className="hover:bg-inherit">
                    <TableHead className="text-main-header">Request</TableHead>
                    <TableHead className="text-main-header">Length</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="pointer-events-none">
                  <TableRow>
                    <TableCell>PLAY</TableCell>
                    <TableCell className="text-center">4</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Hazelnut</TableCell>
                    <TableCell className="text-center">8</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Thank you!</TableCell>
                    <TableCell className="text-center">10</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>submarine has 3 squares?</TableCell>
                    <TableCell className="text-center">24</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Long edge or short edge duplex?</TableCell>
                    <TableCell className="text-center">31</TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <h3>Event Stats</h3>
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
                      speed-shopping
                    </TableHead>
                    <TableCell className="text-center">25</TableCell>
                    <TableCell className="text-center">23</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead className="text-main-header">
                      thesis-defense
                    </TableHead>
                    <TableCell className="text-center">21</TableCell>
                    <TableCell className="text-center">20</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead className="text-main-header">
                      collaborative-exam-taking
                    </TableHead>
                    <TableCell className="text-center">18</TableCell>
                    <TableCell className="text-center">16</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TOCSection>
          </article>
        </div>
      </div>
    </TOCContext.Provider>
  );
}

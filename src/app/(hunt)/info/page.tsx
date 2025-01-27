"use client";
import Link from "next/link";
import {
  TOCContext,
  useTOCContextValues,
  TOCSection,
  TableOfContents,
} from "./TableOfContents";
import Timeline from "./Timeline";
import { IN_PERSON, REMOTE } from "~/hunt.config";

const formatter = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  timeZoneName: "short",
});

const timeOnly = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "numeric",
});

const InPersonTimeline = [
  {
    title: "Kickoff",
    description: `Kickoff will start promptly on ${formatter.format(IN_PERSON.KICKOFF_TIME)}, in MacMillan 117, with doors opening at ${timeOnly.format(IN_PERSON.KICKOFF_DOOR_TIME)}. We will collect waivers from all participants.`,
  },
  {
    title: "Hunt Begins",
    description: `Puzzles for in-person teams will be released on ${formatter.format(IN_PERSON.START_TIME)}.`,
  },
  {
    title: "Hunt Ends",
    description: `The in-person hunt will end on ${formatter.format(IN_PERSON.END_TIME)}, at which point hints will no longer be answered, the leaderboard will be frozen, and physical puzzles will no longer be available to be picked up.`,
  },
  {
    title: "Wrap-Up",
    description: `Wrap-up will be held on ${formatter.format(IN_PERSON.WRAPUP_TIME)} in MacMillan 117, with doors opening at ${timeOnly.format(IN_PERSON.WRAPUP_DOOR_TIME)}.`,
  },
];

const OnlineTimeline = [
  {
    title: "Hunt Begins",
    description: `Puzzles for online teams will be released on ${formatter.format(REMOTE.START_TIME)}.`,
  },
  {
    title: "Hunt Ends",
    description: `The online hunt will end on ${formatter.format(REMOTE.END_TIME)}. Hints will no longer be answered and the leaderboard will be frozen.`,
  },
  {
    title: "Wrap-Up",
    description: `A written wrap-up will be released on ${formatter.format(REMOTE.WRAPUP_TIME)}. This will contain a recording of our in-person wrap-up, as well as more details about the Remote Event.`,
  },
];

export default function Page() {
  const values = useTOCContextValues();
  return (
    <TOCContext.Provider value={values}>
      <div className="flex h-full w-screen">
        <TableOfContents />
        <div className="flex w-full px-4 md:w-2/3 lg:w-1/2">
          <article className="prose w-full max-w-none">
            <h1>Hunt Information</h1>
            <TOCSection
              sectionId={0}
              tocTitle="What is Brown Puzzlehunt?"
              isFirst
            >
              <h2>What is Brown Puzzlehunt?</h2>
              <p>
                Brown Puzzlehunt 2025 is the third annual puzzlehunt run by
                current Brown and RISD students.
              </p>
              <p>
                In a puzzlehunt, participants compete in teams to solve puzzles.
                Puzzles can come in many different forms; the only commonality
                is that there are usually no direct instructions, so it is up to
                you to extract an English word or phrase from the information
                given. You can read a longer introduction to puzzlehunts{" "}
                <Link
                  href="https://blog.vero.site/post/puzzlehunts"
                  className="text-blue-500 no-underline hover:underline"
                >
                  here
                </Link>
                .
              </p>
              <p>
                This hunt is designed to be a relatively easy introduction to
                puzzlehunting for beginner teams. We expect this year's Brown
                Puzzlehunt to be roughly the same length and difficulty as last
                year's{" "}
                <Link
                  href="https://2024.brownpuzzlehunt.com/"
                  className="text-blue-500 no-underline hover:underline"
                >
                  hunt
                </Link>
                . If you are looking for some practice, we recommend looking at
                puzzles from other online hunts such as{" "}
                <Link
                  href="https://galacticpuzzlehunt.com/"
                  className="text-blue-500 no-underline hover:underline"
                >
                  Galactic Puzzle Hunt
                </Link>
                ,{" "}
                <Link
                  href="https://teammatehunt.com/"
                  className="text-blue-500 no-underline hover:underline"
                >
                  Teammate Hunt
                </Link>
                , or{" "}
                <Link
                  href="https://puzzlepotluck.com/"
                  className="text-blue-500 no-underline hover:underline"
                >
                  Puzzle Potluck
                </Link>
                .
              </p>
            </TOCSection>
            <TOCSection
              sectionId={1}
              tocTitle="When and where is this happening?"
            >
              <h2>When and where is this happening?</h2>
              <p>
                This year, Brown Puzzlehunt is offering three different ways to
                participate across two weekends. You can hunt in-person, hunt
                fully remotely, or purchase a Box.
              </p>
              <h3>In-Person Event</h3>
              <Timeline timeline={InPersonTimeline} />
              <p>
                If you come to campus, you'll get to do events, physical
                puzzles, interactions, and the in-person runaround! The
                In-Person Event will run from{" "}
                {formatter.format(IN_PERSON.KICKOFF_TIME)} to{" "}
                {formatter.format(IN_PERSON.END_TIME)}, at{" "}
                <strong>Brown University</strong> in{" "}
                <strong>Providence, Rhode Island</strong>.
              </p>
              <p>
                <strong>All in-person participants </strong>
                need to print and fill out{" "}
                <Link
                  href="https://studentactivities.brown.edu/sites/default/files/safety/Physical%20Activity%20Release.pdf"
                  className="text-blue-500 no-underline hover:underline"
                >
                  this waiver
                </Link>{" "}
                ahead of time in order to come to campus. We will collect these
                at kickoff.
              </p>

              <h3>Remote Event</h3>
              <Timeline timeline={OnlineTimeline} />
              <p>
                If you can't come to Brown's campus, you can do our online-only
                event. This runs from {formatter.format(REMOTE.START_TIME)} to{" "}
                {formatter.format(REMOTE.END_TIME)}. (This is a different
                weekend than the In-Person Event!)
              </p>
              <p>
                There are two different ways to participate during the Remote
                Weekend. You can participate fully remotely, or you can purchase
                a Box.
              </p>
              <h4>Remote + the Box</h4>
              <p>
                In early March, we will be selling Boxes to 50 remote teams
                (first come, first served). If you get a Box, you will be able
                to do most or all of the physical puzzles (because you'll have
                them with you!) and you'll receive cool merch.
              </p>
              <p>Check out the Box section for more details.</p>
              <h4>Fully Remote (No Box)</h4>
              <p>
                If you don't receive a Box, we will provide fully
                remote-accessible versions of all physical puzzles.{" "}
                <strong>
                  You will be able to solve every puzzle in the hunt even if you
                  are fully remote
                </strong>
                .
              </p>

              <h3>Which experience should I sign up for?</h3>
              <p>
                If you can make it to the In-Person Event, we highly recommend
                you do so. You'll get to do all of the physical puzzles,
                in-person interactions, events, and the in-person runaround.
              </p>
              <p>
                If you get a Box, you won't be able to do the in-person
                interactions, events, or the in-person runaround. However, you
                will get to do all of our physical puzzles, and you'll also get
                cool merch!
              </p>
              <p>
                If you participate as a fully remote team (with no Box), you'll
                still be able to solve every puzzle in the hunt. This experience
                will be similar to other online-only hunts that don't expect any
                in-person involvement.
              </p>
              <table>
                <thead>
                  <tr>
                    <th className="w-1/4"></th>
                    <th className="w-1/4 text-center">In-Person</th>
                    <th className="w-1/4 text-center">Remote With Box</th>
                    <th className="w-1/4 text-center">Remote, No Box</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Final runaround</td>
                    <td className="text-center">✅</td>
                    <td className="text-center">❌</td>
                    <td className="text-center">❌</td>
                  </tr>
                  <tr>
                    <td>Events and interactions</td>
                    <td className="text-center">✅</td>
                    <td className="text-center">❌</td>
                    <td className="text-center">❌</td>
                  </tr>
                  <tr>
                    <td>Physical puzzles</td>
                    <td className="text-center">✅</td>
                    <td className="text-center">✅</td>
                    <td className="text-center">❌</td>
                  </tr>
                  <tr>
                    <td>Hunt merch</td>
                    <td className="text-center">✅</td>
                    <td className="text-center">✅</td>
                    <td className="text-center">❌</td>
                  </tr>
                  <tr>
                    <td>Full puzzle accessibility</td>
                    <td className="text-center">✅</td>
                    <td className="text-center">✅</td>
                    <td className="text-center">✅</td>
                  </tr>
                </tbody>
              </table>
              <p>
                Essentially, we are designing three different hunts. We're
                working to ensure that these are each enjoyable, fully
                accessible experiences.
              </p>
            </TOCSection>
            <TOCSection sectionId={2} tocTitle="What are the Boxes?">
              <h2>What are the Boxes?</h2>
              <p>
                In <strong>early March</strong>, we will be selling Boxes to 50
                remote teams (first come, first served).
              </p>
              <p>The Boxes will each contain:</p>
              <ul>
                <li>A pin</li>
                <li>Stickers</li>
                <li>As many physical puzzles as we can fit inside it</li>
              </ul>
              <p>
                If you get a Box, you will be able to do most or all of the
                physical puzzles (because you'll have them with you!)
              </p>
              <h3>Who can get a Box?</h3>
              <p>
                We will mail a Box (at no additional cost) anywhere in the
                United States.
              </p>
              <p>
                If you're outside the United States, we're sorry; we're not able
                to send you a Box this year! International shipping at scale is
                a really hard problem.
              </p>
              <p>
                You could send a Box to a friend in the US, and get them to mail
                it on to you; but we won't be able to vouch that those Boxes
                will arrive, and we won't be able to track them. You'll have to
                weigh up the cost and the risk yourself.
              </p>
              <h3>How much will a Box cost?</h3>
              <p>
                Brown University policy prohibits us from selling the Boxes at a
                loss. The Boxes will therefore be priced to cover materials,
                tax, surcharge, and shipping, with no profit margin.
              </p>
              <p>
                As such, we don't know exactly how much they'll cost yet, but we
                imagine that it will be in the $20 - $25 range. We're working on
                getting the price as low as possible!
              </p>
              <p>
                If you know you might want a Box, but you don't think you can
                afford it, we can arrange something for you. Please contact us
                at <u>brownpuzzleHQ [at] gmail [dot] com</u>
                and we'll find a solution.
              </p>
              <p>
                We don't make any money off of the Boxes. If you want to support
                the hunt, consider{" "}
                <Link
                  href="https://bbis.advancement.brown.edu/BBPhenix/give-now?did=05732af4-d994-4d40-bcd6-fb42d07b6eab"
                  className="text-blue-500 no-underline hover:underline"
                >
                  donating
                </Link>{" "}
                to{" "}
                <Link
                  href="https://brownpuzzle.club/"
                  className="text-blue-500 no-underline hover:underline"
                >
                  Brown Puzzle Club
                </Link>
                !
              </p>
              <h3>How many puzzles will be inside a Box?</h3>
              <p>
                It's hard to say (because everything is up in the air at the
                moment) but we're planning to have at least 6 puzzles be in the
                Box. Maybe more, but no promises.
              </p>
              <p>You'll also get cool merch!</p>
              <h3>I'm interested in getting a Box. What should I do?</h3>
              <p>
                Register a team (with an email you actually check), and indicate
                that you're interested in purchasing a Box. When more news about
                Boxes is available, we'll email everyone who said they might
                want a Box. (We'll also put out general community announcements,
                but giving us your email is the best way to stay informed.)
              </p>
            </TOCSection>
            <TOCSection
              sectionId={3}
              tocTitle="Who can participate in the hunt?"
            >
              <h2>Who can participate in the hunt?</h2>
              <p>
                Brown Puzzlehunt is open to anyone, anywhere in the world. We've
                taken steps to ensure that every puzzle is accessible to remote
                solvers, except for the final runaround. Teams familiar with
                Brown/RISD culture may have some advantage in solving puzzles.
              </p>
              <p>
                We recommend teams to be <strong>around 6 to 8 people</strong>.
                The maximum team size is 10 people, but there is no minimum team
                size - you can still have fun with a team of 2! Students and
                those new to hunting are encouraged to build teams on the larger
                side.
              </p>
              <p>
                Additionally, for your team to win the In-Person Event, you must
                have at least one current Brown/RISD student on-campus. If you
                do not have a current Brown/RISD student on your team, you will
                be able to do the final runaround, but you will not be able to
                win.
              </p>
              <p>
                Any team can win the Remote Event, regardless of team
                composition.
              </p>
            </TOCSection>
            <TOCSection
              sectionId={4}
              tocTitle="I'm coming to campus. What do I need to know?"
            >
              <h2>I'm coming to campus. What do I need to know?</h2>
              <h3>Waivers</h3>
              <p>
                <strong>All in-person participants </strong>
                need to print and fill out{" "}
                <Link
                  href="https://studentactivities.brown.edu/sites/default/files/safety/Physical%20Activity%20Release.pdf"
                  className="text-blue-500 no-underline hover:underline"
                >
                  this waiver
                </Link>{" "}
                ahead of time in order to come to campus. We will collect these
                at kickoff.
              </p>
              <h3>Being Respectful</h3>
              <p>
                Brown University is not a playground for puzzlers; it is also a
                live university, with classes, students, faculty, research, and
                other events happening all the time. If you're going to be
                on-site, please be respectful of both the community and the
                campus.
              </p>
              <p>
                Brown Puzzlehunt will not require you to do anything illegal,
                immoral, or untoward, including accessing unauthorized spaces.
                If you think that a puzzle is asking you to do something
                dangerous, against the law, or disrespectful, stop and think. If
                you're really not sure, please contact us and check.
              </p>
              <h3>Solving Spaces</h3>
              <p>
                If you are going to be on-campus, we will need you to let us
                know where your HQ is. This is the location where you will be
                spending most of your time solving puzzles while you're
                on-campus. If you are a student team or have student members,
                this might be a dorm common area or an apartment near campus, or
                a noise-tolerant space like the Student Center or some floors of
                the SciLi.
              </p>
              <p>
                If you need a place for your team to work during the hunt, let
                us know during the registration process and we will try to
                accommodate you. Our ability to allocate classrooms like this
                will be limited, so we will prioritize teams which do not have
                other spaces available and who register in advance.
              </p>
              <h3>Minors</h3>
              <p>
                Unfortunately, we are not in a position to accommodate minors
                on-campus (participants who are not Brown or RISD students and
                who are under the age of 18). Sorry! However, minors are welcome
                to participate remotely, and teams with minors can still send
                other participants who are over the age of 18 to campus to
                participate.
              </p>
            </TOCSection>
            <TOCSection sectionId={5} tocTitle="How do puzzles work?">
              <h2>How do puzzles work?</h2>
              <p>
                All puzzles will be visible on the website. This is where you
                will submit your answers and receive new puzzles. Some puzzles
                will be available at the start of the hunt; solving puzzles will
                unlock more puzzles.
              </p>
              <p>
                Each answer is a string of letters A-Z. Answers are not case- or
                space-sensitive.
              </p>
              <p>
                You have 20 total guesses for each puzzle. If you run out of
                guesses, contact us, and we would be happy to grant more. Random
                guessing and brute-forcing are discouraged.
              </p>
              <p>
                If something on-campus is part of a puzzle, the website will
                direct you towards it first.
              </p>
            </TOCSection>
            <TOCSection sectionId={6} tocTitle="How do hints work?">
              <h2>How do hints work? </h2>
              <p>
                When puzzles drop, teams will gain one hint request every three
                hours, which you can use to ask for help on any puzzle. This can
                be something like a nudge in the right direction (i.e. you give
                us your progress on the puzzle and we will try to get you
                unstuck) or an answer to a question (e.g. “Which answers to
                these crossword clues are wrong?”). You can only have one open
                hint request at a time.
              </p>
              <p>
                If you are a beginner student team or a team with a strong
                on-site presence that is not in the running to win, we will also
                visit you frequently to check on your progress and help you
                along. If you are struggling, do not hesitate to reach out — the
                event is meant to be fun, and we want to ensure no hunter is
                left behind! If you want someone on HQ to come and visit you,
                you can email us at any time.
              </p>
            </TOCSection>
            <TOCSection sectionId={7} tocTitle="What else?">
              <h2>What else?</h2>
              <p>
                You may use any external sources for help, including other
                people, as long as they are not helping other teams and are not
                actively participating in the hunt.
              </p>
              <p>
                Use of Google is not only permitted, but essential. You may also
                benefit from other online tools, such as:
              </p>
              <ul>
                <li>
                  Online wordplay solvers like{" "}
                  <Link
                    href="https://nutrimatic.org/"
                    className="text-blue-500 no-underline hover:underline"
                  >
                    nutrimatic
                  </Link>
                  ,{" "}
                  <Link
                    href="https://www.quinapalus.com/qat.html"
                    className="text-blue-500 no-underline hover:underline"
                  >
                    qat
                  </Link>
                  , or{" "}
                  <Link
                    href="https://onelook.com/"
                    className="text-blue-500 no-underline hover:underline"
                  >
                    OneLook
                  </Link>
                </li>
                <li>
                  Logic puzzle solvers like{" "}
                  <Link
                    href="https://www.noq.solutions/"
                    className="text-blue-500 no-underline hover:underline"
                  >
                    noq
                  </Link>
                </li>
                <li>
                  Reverse image searching tools like{" "}
                  <Link
                    href="https://lens.google/"
                    className="text-blue-500 no-underline hover:underline"
                  >
                    Google Lens
                  </Link>{" "}
                  or{" "}
                  <Link
                    href="https://tineye.com/"
                    className="text-blue-500 no-underline hover:underline"
                  >
                    Tineye
                  </Link>
                </li>
              </ul>
              <p>
                You may not publicly stream a solve of our hunt when the hunt is
                live. We reserve the right to disqualify any team for
                unsportsmanlike conduct. We also reserve the right to change any
                of these rules. If there is a big change, we will announce it to
                all teams.
              </p>
              <p>
                If you have any questions about these rules, or if you want to
                contact us for any reason, feel free to email us at{" "}
                <u>brownpuzzleHQ [at] gmail [dot] com</u>.
              </p>
            </TOCSection>
            <TOCSection sectionId={8} tocTitle="Who's making this hunt?">
              <h2>Who's making this hunt?</h2>
              <h3 className="text-center">Officers</h3>
              <p className="text-center">
                <strong>Club President</strong>: Megan Carlson ('26)
                <br />
                <strong>Club President</strong>: Erin Finn ('27)
                <br />
                <strong>Puzzle Director</strong>: Thomas Gordon ('26)
                <br />
                <strong>Tech Director</strong>: Alex Wang ('27)
                <br />
                <strong>Tech Director</strong>: Chloe Qiao ('27)
                <br />
                <strong>Art Director</strong>: Bailey Merlino ('26)
                <br />
                <strong>Art Director </strong>: Eliot Geer ('27)
                <br />
                <strong>Testsolving Director</strong>: Arnav Singhal ('26)
                <br />
                <strong>Events Director</strong>: Jack de Haan ('28)
                <br />
                <strong>Factchecking Director</strong>: Chloe Johnson ('28)
                <br />
                <strong>Factchecking Director</strong>: Noah Elbaum ('28)
                <br />
                <strong>Story Director</strong>: Philip Yao ('28)
                <br />
              </p>
              <h3 className="text-center">Puzzle Writers</h3>
              <p className="text-center">
                Jeremy Fleming ('25)
                <br />
                Cerulean Ozarow ('25)
                <br />
                Megan Carlson ('26)
                <br />
                Malcolm Certain ('26)
                <br />
                Kaylee Gallagher ('26)
                <br />
                Thomas Gordon* ('26)
                <br />
                Veronika Grytsai ('26)
                <br />
                Chai Harsha ('26)
                <br />
                Bailey Merlino ('26)
                <br />
                Arnav Singhal ('26)
                <br />
                Phil Avilov ('RISD '27)
                <br />
                Audrey Feigin ('27)
                <br />
                Erin Finn ('27)
                <br />
                Aren Guralp ('27)
                <br />
                Chloe Qiao ('27)
                <br />
                Alex Wang ('27)
                <br />
                Nate Chinman ('28)
                <br />
                Nicholas Cressman ('28)
                <br />
                Jack de Haan ('28)
                <br />
                Noah Elbaum ('28)
                <br />
                Chloe Johnson ('28)
                <br />
                Gabriel Nelkin ('28)
                <br />
                Eric Wu ('28)
                <br />
                Philip Yao ('28)
                <br />
              </p>
              <h3 className="text-center">Art Team</h3>
              <p className="text-center">
                Jaclyn Cohen ('26)
                <br />
                Bailey Merlino* ('26)
                <br />
                Eliot Geer* ('27)
                <br />
                Phil Avilov (RISD '27)
                <br />
                Chloe Johnson ('28)
                <br />
              </p>
              <h3 className="text-center">Technical Team</h3>
              <p className="text-center">
                Stella Zhang ('25)
                <br />
                Jaclyn Cohen ('26)
                <br />
                Thomas Gordon ('26)
                <br />
                Veronika Grytsai ('26)
                <br />
                Brian Xu (Masters '26)
                <br />
                Aren Guralp ('27)
                <br />
                Yi Lyo ('27)
                <br />
                Alex Wang* ('27)
                <br />
                Chloe Qiao* ('27)
                <br />
                Jack de Haan ('28)
                <br />
                Eric Wu ('28)
                <br />
              </p>
            </TOCSection>
          </article>
        </div>
        <div className="hidden w-1/4 text-center lg:block"></div>
      </div>
    </TOCContext.Provider>
  );
}

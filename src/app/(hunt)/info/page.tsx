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
    description: `Wrap-up will be held on ${formatter.format(IN_PERSON.WRAPUP_TIME)} in MacMillan 117, with doors opening at ${timeOnly.format(IN_PERSON.WRAPUP_DOOR_TIME)}. This will be livestreamed for online participants.`,
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
    description: `Wrap-up will be held on ${formatter.format(REMOTE.WRAPUP_TIME)}. This will be livestreamed for online participants.`,
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
                Brown Puzzlehunt 2025 is our 3rd annual puzzlehunt, directed by
                current Brown and RISD students.
              </p>
              <p>
                In a puzzlehunt, participants compete in teams to solve puzzles.
                Puzzles can come in many different forms; the only commonality
                is that there are usually no direct instructions, so it is up to
                you to extract an English word from the information given. You
                can read a longer introduction to puzzlehunts{" "}
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
            <TOCSection sectionId={1} tocTitle="Who can participate?">
              <h2>Who can participate?</h2>
              <p>
                Brown Puzzlehunt is open to anyone, anywhere in the world. We
                have taken steps to ensure that every puzzle is accessible to
                remote solvers, except for the final runaround. Teams familiar
                with Brown/RISD culture may have some advantage in solving
                puzzles.
              </p>
              <p>
                We recommend teams to be around 7 to 10 people. The maximum team
                size is 12 people, but there is no minimum team size - you can
                still have fun with a team of 2! Students and those new to
                hunting are encouraged to build teams on the larger side.
              </p>
              <p>
                Additionally, for your team to win, you must have at least one
                current Brown/RISD student on-campus. If you do not have a
                current Brown/RISD student on your team, you will be able to do
                the final runaround, but you will not be able to win.
              </p>
            </TOCSection>
            <TOCSection
              sectionId={2}
              tocTitle="When and where is this happening?"
            >
              <h2>When and where is this happening?</h2>
              <p>
                Brown Puzzlehunt is available both as an in-person event and as
                an online event. The in-person event will run from{" "}
                {formatter.format(IN_PERSON.KICKOFF_TIME)} to{" "}
                {formatter.format(IN_PERSON.END_TIME)}. The online event will
                run a week later, from {formatter.format(REMOTE.START_TIME)} to{" "}
                {formatter.format(REMOTE.END_TIME)}. These events are split into
                two different weeks so we can deliver a better hunt experience!
              </p>
              <p>
                The main difference between the in-person and the online event
                is kickoff, access to physical puzzles, and runarounds. While
                physical events are not are not essential to finish, they will
                be fun and will help you progress.
              </p>
              <h3>In-person timeline</h3>
              <p>
                The in-person event will run from{" "}
                {formatter.format(IN_PERSON.KICKOFF_TIME)} to{" "}
                {formatter.format(IN_PERSON.END_TIME)} at Brown University in
                Providence, Rhode Island. <strong>All participants</strong> will
                need to print and fill out this{" "}
                <Link
                  href="https://studentactivities.brown.edu/sites/default/files/safety/Physical%20Activity%20Release.pdf"
                  className="text-blue-500 no-underline hover:underline"
                >
                  waiver
                </Link>{" "}
                in order to come on campus. We will collect these at kickoff.
              </p>
              <Timeline timeline={InPersonTimeline} />
              <h3>Online timeline</h3>
              <p>
                If you cannot make it to the in-person event, you can also
                participate online from {formatter.format(REMOTE.START_TIME)} to{" "}
                {formatter.format(REMOTE.END_TIME)}. All puzzles will be
                available online, except for physical puzzles and runarounds.
              </p>
              <Timeline timeline={OnlineTimeline} />
            </TOCSection>
            <TOCSection sectionId={3} tocTitle="How do puzzles work?">
              <h2>How do puzzles work?</h2>
              <p>
                All puzzles will be visible on the website. This is where you
                will submit your answers and receive new puzzles. Some puzzles
                will be available at the start of the hunt, and some puzzles
                will be unlocked after solving another puzzles.
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
            <TOCSection sectionId={4} tocTitle="How do hints work?">
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
            <TOCSection sectionId={5} tocTitle="What else?">
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
                contact us for any reason, feel free to email us at
                brownpuzzleHQ [at] gmail [dot] com.
              </p>
            </TOCSection>
          </article>
        </div>
        <div className="hidden w-1/4 text-center lg:block">ART HERE???</div>
      </div>
    </TOCContext.Provider>
  );
}

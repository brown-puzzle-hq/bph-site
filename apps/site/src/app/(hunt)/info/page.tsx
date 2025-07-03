"use client";

import Link from "next/link";
import {
  TOCContext,
  useTOCContextValues,
  TOCSection,
  TableOfContents,
} from "@/components/toc/TableOfContents";
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
      <div className="flex px-4">
        <TableOfContents />
        {/* Spacer since TOC is fixed */}
        <div className="md:w-1/3 xl:w-1/5"></div>
        <div className="w-full md:w-2/3 xl:w-3/5">
          <article className="prose prose-info w-full max-w-none bg-black/30 p-6">
            <h1>Hunt Information</h1>
            <TOCSection
              sectionId={0}
              tocTitle="What is Brown Puzzlehunt?"
              isFirst
            >
              <h2>What is Brown Puzzlehunt?</h2>
              <p>
                Brown Puzzlehunt 20XX is the XXX annual puzzlehunt run by
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
                  className="no-underline hover:underline"
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
                  className="no-underline hover:underline"
                >
                  hunt
                </Link>
                . If you are looking for some practice, we recommend looking at
                puzzles from other online hunts such as{" "}
                <Link
                  href="https://galacticpuzzlehunt.com/"
                  className="no-underline hover:underline"
                >
                  Galactic Puzzle Hunt
                </Link>
                ,{" "}
                <Link
                  href="https://teammatehunt.com/"
                  className="no-underline hover:underline"
                >
                  Teammate Hunt
                </Link>
                , or{" "}
                <Link
                  href="https://puzzlepotluck.com/"
                  className="no-underline hover:underline"
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
                This year, Brown Puzzlehunt is offering two different ways to
                participate across two weekends. You can hunt in-person or hunt
                fully remotely.
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
                  className="no-underline hover:underline"
                >
                  this waiver
                </Link>{" "}
                ahead of time in order to come to campus. We will collect these
                at kickoff.
              </p>
              <p>
                You don't need every person on your team to come to campus to be
                an In-Person team. One is fine (although they might have their
                hands full going to every event and doing every physical
                puzzle!) If you are part of an In-Person team but aren't
                on-campus, you'll still be able to access the non-physical
                puzzles through the website.
              </p>
              <h3>Remote Event</h3>
              <Timeline timeline={OnlineTimeline} />
              <p>
                If you can't come to Brown's campus, you can do our online-only
                event. This runs from {formatter.format(REMOTE.START_TIME)} to{" "}
                {formatter.format(REMOTE.END_TIME)}. (This is a different
                weekend than the In-Person Event!)
              </p>

              <h3>Which experience should I sign up for?</h3>
              <p>
                If you can make it to the In-Person Event, we highly recommend
                you do so. You'll get to do all of the physical puzzles,
                in-person interactions, events, and the in-person runaround.
              </p>
              <p>
                If you participate as a fully remote team, you'll still be able
                to solve every puzzle in the hunt. This experience will be
                similar to other online-only hunts that don't expect any
                in-person involvement.
              </p>
              <table>
                <thead>
                  <tr>
                    <th className="w-1/4"></th>
                    <th className="w-1/4 text-center">In-Person</th>
                    <th className="w-1/4 text-center">Remote</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Final runaround</td>
                    <td className="text-center">✅</td>
                    <td className="text-center">❌</td>
                  </tr>
                  <tr>
                    <td>Events and interactions</td>
                    <td className="text-center">✅</td>
                    <td className="text-center">❌</td>
                  </tr>
                  <tr>
                    <td>Physical puzzles</td>
                    <td className="text-center">✅</td>
                    <td className="text-center">❌</td>
                  </tr>
                  <tr>
                    <td>Hunt merch</td>
                    <td className="text-center">✅</td>
                    <td className="text-center">❌</td>
                  </tr>
                  <tr>
                    <td>Full puzzle accessibility</td>
                    <td className="text-center">✅</td>
                    <td className="text-center">✅</td>
                  </tr>
                </tbody>
              </table>
              <p>
                Essentially, we are designing two different hunts. We're working
                to ensure that these are each enjoyable, fully accessible
                experiences.
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
                  className="no-underline hover:underline"
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
                Each answer is a string of letters, typically A-Z. Answers are
                not case- or space-sensitive.
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
                You can use hint requests to ask for help on any puzzle. This
                can be something like a nudge in the right direction (i.e. you
                give us your progress on the puzzle and we will try to get you
                unstuck) or an answer to a question (e.g. “Which answers to
                these crossword clues are wrong?”). You can only have one open
                hint request at a time. Teams will gain one hint request every 3
                hours in the in-person event and one hint request every 6 hours
                in the remote event.
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
                    className="no-underline hover:underline"
                  >
                    nutrimatic
                  </Link>
                  ,{" "}
                  <Link
                    href="https://www.quinapalus.com/qat.html"
                    className="no-underline hover:underline"
                  >
                    qat
                  </Link>
                  , or{" "}
                  <Link
                    href="https://onelook.com/"
                    className="no-underline hover:underline"
                  >
                    OneLook
                  </Link>
                </li>
                <li>
                  Logic puzzle solvers like{" "}
                  <Link
                    href="https://www.noq.solutions/"
                    className="no-underline hover:underline"
                  >
                    noq
                  </Link>
                </li>
                <li>
                  Reverse image searching tools like{" "}
                  <Link
                    href="https://lens.google/"
                    className="no-underline hover:underline"
                  >
                    Google Lens
                  </Link>{" "}
                  or{" "}
                  <Link
                    href="https://tineye.com/"
                    className="no-underline hover:underline"
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
          </article>
        </div>
      </div>
    </TOCContext.Provider>
  );
}

"use client";

import Link from "next/link";
import {
  TOCContext,
  useTOCContextValues,
  TOCSection,
  TableOfContents,
} from "@/components/toc/TableOfContents";
import Timeline from "./Timeline";
import { IN_PERSON, REMOTE } from "~/config/client";

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
    title: "Hunt Begins",
    description: `Puzzles for in-person teams will be released on ${formatter.format(IN_PERSON.START_TIME)}.`,
  },
  {
    title: "Hunt Ends",
    description: `The in-person hunt will end on ${formatter.format(IN_PERSON.END_TIME)}, at which point hints will no longer be answered, the leaderboard will be frozen, and physical puzzles will no longer be available to be picked up.`,
  },
  {
    title: "Wrap-Up",
    description: `Wrap-up will be held on ${formatter.format(IN_PERSON.WRAPUP_TIME)}, with doors opening at ${timeOnly.format(IN_PERSON.WRAPUP_DOOR_TIME)}.`,
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
              tocTitle="What is this Puzzlehunt?"
              isFirst
            >
              <h2>What is this Puzzlehunt?</h2>
              <p>
                Lorem ipsum dolor sit amet, mea at vide epicurei honestatis. Cu
                malis epicurei eos. Mea ne diam enim, eam eu gubergren
                appellantur, eam novum moderatius vituperatoribus in. Te usu
                ponderum definiebas, usu ad tritani consetetur disputationi, sea
                ad prima velit fastidii. Mei id corpora erroribus deterruisset,
                eum ut latine appellantur.
              </p>
            </TOCSection>
            <TOCSection
              sectionId={1}
              tocTitle="When and where is this happening?"
            >
              <h2>When and where is this happening?</h2>
              <p>
                Lorem ipsum dolor sit amet, mea at vide epicurei honestatis. Cu
                malis epicurei eos. Mea ne diam enim, eam eu gubergren
                appellantur, eam novum moderatius vituperatoribus in. Te usu
                ponderum definiebas, usu ad tritani consetetur disputationi, sea
                ad prima velit fastidii. Mei id corpora erroribus deterruisset,
                eum ut latine appellantur.
              </p>
              <h3>In-Person Event</h3>
              <Timeline timeline={InPersonTimeline} />
              <p>
                Lorem ipsum dolor sit amet, mea at vide epicurei honestatis. Cu
                malis epicurei eos. Mea ne diam enim, eam eu gubergren
                appellantur, eam novum moderatius vituperatoribus in. Te usu
                ponderum definiebas, usu ad tritani consetetur disputationi, sea
                ad prima velit fastidii. Mei id corpora erroribus deterruisset,
                eum ut latine appellantur.
              </p>
              <h3>Remote Event</h3>
              <Timeline timeline={OnlineTimeline} />
              <p>
                Lorem ipsum dolor sit amet, mea at vide epicurei honestatis. Cu
                malis epicurei eos. Mea ne diam enim, eam eu gubergren
                appellantur, eam novum moderatius vituperatoribus in. Te usu
                ponderum definiebas, usu ad tritani consetetur disputationi, sea
                ad prima velit fastidii. Mei id corpora erroribus deterruisset,
                eum ut latine appellantur.
              </p>

              <h3>Which experience should I sign up for?</h3>
              <p>
                Lorem ipsum dolor sit amet, mea at vide epicurei honestatis. Cu
                malis epicurei eos. Mea ne diam enim, eam eu gubergren
                appellantur, eam novum moderatius vituperatoribus in. Te usu
                ponderum definiebas, usu ad tritani consetetur disputationi, sea
                ad prima velit fastidii. Mei id corpora erroribus deterruisset,
                eum ut latine appellantur.
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
                Lorem ipsum dolor sit amet, mea at vide epicurei honestatis. Cu
                malis epicurei eos. Mea ne diam enim, eam eu gubergren
                appellantur, eam novum moderatius vituperatoribus in. Te usu
                ponderum definiebas, usu ad tritani consetetur disputationi, sea
                ad prima velit fastidii. Mei id corpora erroribus deterruisset,
                eum ut latine appellantur.
              </p>
            </TOCSection>

            <TOCSection
              sectionId={3}
              tocTitle="Who can participate in the hunt?"
            >
              <h2>Who can participate in the hunt?</h2>
              <p>
                Lorem ipsum dolor sit amet, mea at vide epicurei honestatis. Cu
                malis epicurei eos. Mea ne diam enim, eam eu gubergren
                appellantur, eam novum moderatius vituperatoribus in. Te usu
                ponderum definiebas, usu ad tritani consetetur disputationi, sea
                ad prima velit fastidii. Mei id corpora erroribus deterruisset,
                eum ut latine appellantur.
              </p>
            </TOCSection>
            <TOCSection
              sectionId={4}
              tocTitle="I'm coming to campus. What do I need to know?"
            >
              <h2>I'm coming to campus. What do I need to know?</h2>
              <p>
                Lorem ipsum dolor sit amet, mea at vide epicurei honestatis. Cu
                malis epicurei eos. Mea ne diam enim, eam eu gubergren
                appellantur, eam novum moderatius vituperatoribus in. Te usu
                ponderum definiebas, usu ad tritani consetetur disputationi, sea
                ad prima velit fastidii. Mei id corpora erroribus deterruisset,
                eum ut latine appellantur.
              </p>
            </TOCSection>
            <TOCSection sectionId={5} tocTitle="How do puzzles work?">
              <h2>How do puzzles work?</h2>
              <p>
                Lorem ipsum dolor sit amet, mea at vide epicurei honestatis. Cu
                malis epicurei eos. Mea ne diam enim, eam eu gubergren
                appellantur, eam novum moderatius vituperatoribus in. Te usu
                ponderum definiebas, usu ad tritani consetetur disputationi, sea
                ad prima velit fastidii. Mei id corpora erroribus deterruisset,
                eum ut latine appellantur.
              </p>
            </TOCSection>
            <TOCSection sectionId={6} tocTitle="How do hints work?">
              <h2>How do hints work? </h2>
              <p>
                Lorem ipsum dolor sit amet, mea at vide epicurei honestatis. Cu
                malis epicurei eos. Mea ne diam enim, eam eu gubergren
                appellantur, eam novum moderatius vituperatoribus in. Te usu
                ponderum definiebas, usu ad tritani consetetur disputationi, sea
                ad prima velit fastidii. Mei id corpora erroribus deterruisset,
                eum ut latine appellantur.
              </p>
            </TOCSection>
            <TOCSection sectionId={7} tocTitle="What else?">
              <h2>What else?</h2>
              <p>
                Lorem ipsum dolor sit amet, mea at vide epicurei honestatis. Cu
                malis epicurei eos. Mea ne diam enim, eam eu gubergren
                appellantur, eam novum moderatius vituperatoribus in. Te usu
                ponderum definiebas, usu ad tritani consetetur disputationi, sea
                ad prima velit fastidii. Mei id corpora erroribus deterruisset,
                eum ut latine appellantur.
              </p>
            </TOCSection>
          </article>
        </div>
      </div>
    </TOCContext.Provider>
  );
}

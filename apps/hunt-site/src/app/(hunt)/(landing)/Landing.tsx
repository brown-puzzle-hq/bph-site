"use client";
import { IN_PERSON, REMOTE } from "@/config/client";
import Link from "next/link";

const formatter = new Intl.DateTimeFormat("en-US", {
  year: "2-digit",
  month: "numeric",
  day: "numeric",
});

const shortFormatter = new Intl.DateTimeFormat("en-US", {
  month: "numeric",
  day: "numeric",
});

export default function Landing() {
  return (
    <div className="h-[calc(100vh-32px)]">
      <div className="absolute bottom-8 left-1/2 grid w-full -translate-x-1/2 transform grid-cols-3 gap-x-4 gap-y-8 p-4 text-center lg:bottom-16 lg:w-3/4 lg:grid-cols-3 lg:text-lg xl:bottom-32 xl:text-xl">
        <div className="space-y-2">
          <h1 className="text-main-header lg:text-2xl xl:text-3xl">What?</h1>
          <p className="hidden md:block">A puzzlehunt!</p>
          <p className="md:hidden">Our third annual puzzlehunt.</p>
          <p>
            <Link href="/register" className="hover:underline" prefetch={false}>
              <i>Click here to register!</i>
            </Link>
          </p>
        </div>
        <div className="space-y-2">
          <h1 className="text-main-header lg:text-2xl xl:text-3xl">When?</h1>
          <p className="hidden md:block">
            In-Person: {formatter.format(IN_PERSON.START_TIME)} –{" "}
            {formatter.format(IN_PERSON.END_TIME)}
          </p>
          <p className="md:hidden">
            In-Person:
            <br />
            {shortFormatter.format(IN_PERSON.START_TIME)} –{" "}
            {shortFormatter.format(IN_PERSON.END_TIME)}
          </p>
          <p className="hidden md:block">
            Remote: {formatter.format(REMOTE.START_TIME)} –{" "}
            {formatter.format(REMOTE.END_TIME)}
          </p>
          <p className="md:hidden">
            Remote:
            <br />
            {shortFormatter.format(REMOTE.START_TIME)} –{" "}
            {shortFormatter.format(REMOTE.END_TIME)}
          </p>
        </div>
        <div className="space-y-2">
          <h1 className="text-main-header lg:text-2xl xl:text-3xl">Who?</h1>
          <p>Anyone!</p>
        </div>
      </div>
    </div>
  );
}

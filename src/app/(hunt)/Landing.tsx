"use client";
import { useEffect, useState } from "react";
import { IN_PERSON, REMOTE } from "~/hunt.config";
import Link from "next/link";

const formatter = new Intl.DateTimeFormat("en-US", {
  year: "2-digit",
  month: "numeric",
  day: "numeric",
});

export default function Landing() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative w-screen overflow-hidden">
      <div className="relative h-[100vh] w-screen">
        {/* absolute background with stars */}
        <div
          className="absolute inset-0 h-[170vh] w-full bg-cover bg-top"
          style={{
            backgroundImage: `url(/home/4.png)`,
            transform: `translateY(${scrollY * -0.1}px)`,
            clipPath: `inset-0`,
          }}
        />

        {/* Back cityscape */}
        <div
          className="absolute inset-0 h-[170vh] w-full bg-cover bg-top bg-no-repeat"
          style={{
            backgroundImage: `url(/home/3.png)`,
            transform: `translateY(${scrollY * -0.3}px)`,
            clipPath: `inset-0`,
          }}
        />

        {/* Middle cityscape with lamps */}
        <div
          className="absolute inset-0 h-[170vh] w-full bg-cover bg-top bg-no-repeat"
          style={{
            backgroundImage: `url(/home/2.png)`,
            transform: `translateY(${scrollY * -0.5}px)`,
            clipPath: `inset-0`,
          }}
        />

        {/* Front theater building */}
        <div
          className="relative h-[200vh] bg-cover bg-top bg-no-repeat"
          style={{
            backgroundImage: `url(/home/1.png)`,
            transform: `translateY(${scrollY * -1}px)`,
            clipPath: `inset-0`,
          }}
        />
      </div>

      {/* Invisible clickable overlay */}
      <div
        className="absolute left-1/2 top-[47%] h-[10vh] w-2/3 -translate-x-1/2 -translate-y-1/2 transform cursor-pointer md:top-[53%] lg:top-[50%]"
        style={{
          transform: `translate(-50%, -50%) translateY(${scrollY * -1}px)`, // Apply dynamic Y shift
        }}
      >
        <Link
          href="/register"
          className="absolute left-0 top-0 h-full w-full"
        />
      </div>

      {/* Div right below the image */}
      <div className="flex justify-center pt-[calc((100vw-850px)/8)]">
        <div className="relative flex w-[calc(60vw+200px)] p-4 text-center">
          <div className="absolute left-1/2 top-[-50px] -translate-x-1/2 transform">
            <Link
              href="/register"
              className="rounded-md bg-main-text px-8 py-3 text-lg font-semibold text-secondary-accent transition duration-200 hover:bg-secondary-text"
            >
              Register!
            </Link>
          </div>
          <div className="w-1/3 p-2 md:p-4">
            <h1>What?</h1>
            <p>
              The third annual puzzlehunt by current Brown and RISD students.
            </p>
          </div>
          <div className="w-1/3 p-2 md:p-4">
            <h1>When?</h1>
            <p>
              In-Person:{" "}
              <span>
                {formatter.format(IN_PERSON.START_TIME)} –{" "}
                {formatter.format(IN_PERSON.END_TIME)}
              </span>
            </p>
            <p className="mt-2">
              Remote:{" "}
              <span>
                {formatter.format(REMOTE.START_TIME)} –{" "}
                {formatter.format(REMOTE.END_TIME)}
              </span>
            </p>
            <p className="mt-2">
              <Link href="/info" className="no-underline hover:underline">
                <i>What do you mean, there are two weekends?</i>
              </Link>
            </p>
          </div>
          <div className="w-1/3 p-2 md:p-4">
            <h1>Who?</h1>
            <p>
              Anyone can come to campus. (Just tell us so we know you're
              coming!)
            </p>
            <p className="mt-2">Anyone can get a Box.</p>
            <p className="mt-2">
              <Link href="/info" className="no-underline hover:underline">
                <i>Box? What box?</i>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

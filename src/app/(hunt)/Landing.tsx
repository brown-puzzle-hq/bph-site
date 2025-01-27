"use client";
import { useEffect, useState } from "react";
import { IN_PERSON, REMOTE } from "~/hunt.config";

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

      {/* Div right below the image */}
      <div className="flex justify-center pt-[calc((100vw-850px)/8)]">
        <div className="relative flex w-[calc(60vw+200px)] p-4 text-center">
          <div className="w-1/3 p-2 md:p-4">
            <h1>What</h1>
            <p>
              The third annual puzzlehunt run by current Brown and RISD
              students.
            </p>
          </div>
          <div className="w-1/3 p-2 md:p-4">
            <h1>When</h1>
            <p>
              In-Person:{" "}
              <span className="whitespace-nowrap">
                {formatter.format(IN_PERSON.START_TIME)} –
                {formatter.format(IN_PERSON.END_TIME)}
              </span>
            </p>
            <p>
              Remote:{" "}
              <span className="whitespace-nowrap">
                {formatter.format(REMOTE.START_TIME)} –
                {formatter.format(REMOTE.END_TIME)}
              </span>
            </p>
          </div>
          <div className="w-1/3 p-2 md:p-4">
            <h1>Who</h1>
            <p>Anyone, anywhere in the world.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

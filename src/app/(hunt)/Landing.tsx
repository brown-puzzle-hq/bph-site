"use client";
import { IN_PERSON, REMOTE } from "~/hunt.config";
import Link from "next/link";
import { motion, useAnimation, useScroll, useTransform } from "framer-motion";

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
  const { scrollYProgress } = useScroll();
  const controls = useAnimation();

  return (
    <div className="relative grid overflow-hidden">
      <motion.img
        className="col-start-1 row-start-1 min-h-[125vh] w-screen object-cover"
        src="/home/4.png"
        style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "30%"]) }}
      />
      <motion.img
        className="absolute min-h-[125vh] w-screen object-cover"
        src="/home/3.png"
        style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "20%"]) }}
      />
      <motion.img
        className="absolute bottom-[calc(max(57vw,64.125vh))] left-[calc(min(29vw,50vw-23.33vh))] w-[calc(max(7vw,7.77vh))] origin-bottom opacity-80"
        src="/home/Spotlight.png"
        initial={{ rotate: 20 }}
        animate={{
          rotate: [20, -20],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />
      <motion.img
        className="absolute bottom-[calc(max(57vw,64.125vh))] right-[calc(min(29vw,50vw-23.33vh))] w-[calc(max(7vw,7.77vh))] origin-bottom opacity-80"
        src="/home/Spotlight.png"
        initial={{ rotate: -20 }}
        animate={{
          rotate: [-20, 20],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />
      <motion.img
        className="absolute min-h-[125vh] w-screen object-cover"
        src="/home/2.png"
        style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "10%"]) }}
      />
      <motion.img
        className="absolute min-h-[125vh] w-screen object-cover"
        src="/home/1.png"
      />
      <motion.img
        className="absolute min-h-[125vh] w-screen object-cover"
        src="/home/Register.png"
        initial={{ opacity: 0 }}
        animate={controls}
        transition={{ duration: 0.1, ease: "easeInOut" }}
      />
      <Link
        className="absolute bottom-[calc(max(73vw,81.11vh))] left-[calc(min(35vw,50vw-16.67vh))] right-[calc(min(35vw,50vw-16.67vh))] h-[calc(max(4.5vw,5vh))]"
        href="/register"
        onMouseEnter={() => controls.start({ opacity: 1 })}
        onMouseLeave={() => controls.start({ opacity: 0 })}
        prefetch={false}
      />
      <div className="absolute bottom-8 left-1/2 grid w-full -translate-x-1/2 transform grid-cols-3 gap-x-4 gap-y-8 p-4 text-center lg:bottom-16 lg:w-3/4 lg:grid-cols-3 lg:text-lg xl:bottom-32 xl:text-xl">
        <div className="space-y-2">
          <h1 className="text-main-header lg:text-2xl xl:text-3xl">What?</h1>
          <p className="hidden md:block">
            The third annual puzzlehunt by current Brown and RISD students.
          </p>
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
          <p>
            <Link href="/info" className="hover:underline" prefetch={false}>
              <i className="hidden md:inline">
                What do you mean, there are two weekends?
              </i>
              <i className="md:hidden">What, two weekends?</i>
            </Link>
          </p>
        </div>
        <div className="space-y-2">
          <h1 className="text-main-header lg:text-2xl xl:text-3xl">Who?</h1>
          <p>
            Anyone can come to campus.
            <span className="hidden md:inline">
              {" "}
              (Just tell us so we know you're coming!)
            </span>
          </p>
          <p>Anyone can get a Box.</p>
          <p className="hidden md:block">
            <Link href="/info" className="hover:underline" prefetch={false}>
              <i>Box? What box?</i>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

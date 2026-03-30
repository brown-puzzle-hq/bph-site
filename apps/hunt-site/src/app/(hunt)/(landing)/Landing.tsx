"use client";
import { useSession } from "next-auth/react";
import Image, { type ImageProps } from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { forwardRef } from "react";

import sky from "/public/home/sky.png";
import building from "/public/home/building.png";
import open from "/public/home/gates-open.png";
import closed from "/public/home/gates-closed.png";

const ExoticImage = forwardRef<HTMLImageElement, ImageProps>(
  function ExoticImageWrapper(props, ref) {
    return <Image {...props} ref={ref} />; // ❌  this is not forwarded
  },
);

const MotionComponent = motion.create(ExoticImage);

export default function Landing() {
  const { data: session } = useSession();
  const { scrollYProgress } = useScroll({
    offset: ["start start", "end start"],
  });

  return (
    <div className="relative grid overflow-hidden">
      <MotionComponent
        className="absolute max-h-[112.5vw] min-h-[calc(100vh-56px-32px)] w-screen object-cover object-top"
        src={sky}
        alt=""
        priority
        style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "30%"]) }}
      />
      <MotionComponent
        className="absolute max-h-[112.5vw] min-h-[calc(100vh-56px-32px)] w-screen object-cover object-top"
        src={building}
        alt=""
        priority
        style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "15%"]) }}
      />
      <MotionComponent
        className="z-0 max-h-[112.5vw] min-h-[calc(100vh-56px-32px)] w-screen object-cover object-top"
        src={session?.user ? open : closed}
        alt=""
        priority
      />
      {!session?.user && (
        <Link
          className="absolute left-1/2 top-[calc(max(71.3vw+56px,52.384vh-46.098px+56px))] h-[calc(max(26vw,19.1vh-16.81px))] w-[calc(max(27.16vw,19.95vh-16.8px))] -translate-x-1/2 -translate-y-14 rounded-lg hover:bg-black/10"
          href="/register"
          prefetch={false}
        />
      )}
    </div>
  );
}

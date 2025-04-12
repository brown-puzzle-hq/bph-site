"use client";
import { useEffect, useState, useRef } from "react";
import { useCallback } from "react";
import { Stage, Container, Graphics, useTick, Text } from "@pixi/react";
import { CirclePause, CirclePlay } from "lucide-react";

const WIDTH = 900;
const HEIGHT = 600;
const RADIUS = 15;
const ANSWER = "NATIONALSECURITY";
const INDEX1 = 4;

const TTL = 100;
const SPEED = 2;
const DOORX = WIDTH / 4;
const DOORY = ((INDEX1 + 0.5) * HEIGHT) / 16;
const DESTX = (WIDTH * 3) / 4;
const DX0 =
  (SPEED * DOORX) /
  Math.sqrt(Math.pow(DOORX, 2) + Math.pow(HEIGHT / 2 - DOORY, 2));
const DY0 = (DX0 * (HEIGHT / 2 - DOORY)) / DOORX;

function randomIndex(): number {
  let u = 1 - Math.random();
  let v = Math.random();
  let z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v); // Standard Normal (0,1)

  let center = Math.random() < 0.5 ? INDEX1 : 15 - INDEX1;

  return Math.max(0, Math.min(15, Math.round(center + z * 2.25)));
}

const EventComponent = ({
  running,
  rate,
  scatter,
}: {
  running: boolean;
  rate: number;
  scatter: boolean;
}) => {
  const [guards, setGuards] = useState<
    {
      id: number;
      x: number;
      y: number;
      dx: number;
      dy: number;
      destY: number;
      letter: string;
      door: boolean;
      ttl: number;
    }[]
  >([]);
  const elapsedTime = useRef(0);
  const guardId = useRef(0);

  const drawWall = useCallback((g: any) => {
    g.clear();
    g.beginFill(0x000000);
    g.drawRect(-HEIGHT / 32, 0, HEIGHT / 16, HEIGHT);
    g.endFill();
  }, []);

  const drawDoor = useCallback((g: any) => {
    g.clear();
    g.beginFill(0x5a3a1a);
    g.drawRect(-HEIGHT / 32, -HEIGHT / 32, HEIGHT / 16, HEIGHT / 16);
    g.endFill();
  }, []);

  // Movement tick function
  useTick((delta) => {
    if (!running) return;

    elapsedTime.current += (delta / 60) * rate;

    if (elapsedTime.current >= 3) {
      elapsedTime.current = 0;
      const index = randomIndex();
      const destY = (HEIGHT * index) / 16 + HEIGHT / 32;
      setGuards((prev) => [
        ...prev,
        {
          id: guardId.current++,
          x: -RADIUS,
          y: HEIGHT / 2,
          dx: DX0,
          dy: index < 8 ? -DY0 : DY0,
          destY: destY,
          letter: ANSWER.at(index)!,
          door: false,
          ttl: TTL,
        },
      ]);
    }

    // Move guards
    setGuards((prev) =>
      prev
        .map((guard) => {
          if (!guard.door && guard.x > DOORX - RADIUS) {
            if (!scatter) {
              if (guard.destY < HEIGHT / 2) {
                guard.destY = DOORY;
                guard.letter = ANSWER.at(INDEX1)!;
              } else {
                guard.destY = HEIGHT - DOORY;
                guard.letter = ANSWER.at(15 - INDEX1)!;
              }
            }
            // Recompute dx, dy
            guard.dx =
              (SPEED * (DESTX - guard.x)) /
              Math.sqrt(
                Math.pow(DESTX - guard.x, 2) +
                  Math.pow(guard.destY - guard.y, 2),
              );
            guard.dy = (guard.dx * (guard.destY - guard.y)) / (DESTX - guard.x);
            guard.door = true;
          }
          if (guard.x < DESTX) {
            return { ...guard, x: guard.x + guard.dx, y: guard.y + guard.dy };
          } else {
            return { ...guard, x: DESTX, y: guard.destY, ttl: guard.ttl - 1 };
          }
        })
        .filter((guard) => guard.ttl > 0),
    );
  });

  return (
    <Container>
      <Graphics draw={drawWall} x={DOORX} y={0} />
      <Graphics draw={drawWall} x={DESTX} y={0} />
      <Graphics draw={drawDoor} x={DOORX} y={DOORY} />
      <Graphics draw={drawDoor} x={DOORX} y={HEIGHT - DOORY} />
      {guards.map((guard) => (
        <Container x={guard.x} y={guard.y}>
          <Graphics
            key={guard.id}
            draw={(g) => {
              g.clear();
              g.beginFill(guard.ttl == TTL ? 0xcce0ff : 0xffff00);
              g.drawCircle(0, 0, RADIUS);
              g.endFill();
            }}
            alpha={guard.ttl / TTL}
          />
          {guard.ttl != TTL && <Text text={guard.letter} anchor={0.5} />}
        </Container>
      ))}
    </Container>
  );
};

export default function Game() {
  const [width, setWidth] = useState<number | null>(null);
  const [running, setRunning] = useState<boolean>(true);
  const [rate, setRate] = useState<number>(1);
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const scrollRef = useRef(null);

  useEffect(() => {
    setWidth(window.screen.width - 32);
  }, []);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      setScrollPosition(scrollLeft);
    }
  };

  if (width === null) return null;

  // TODO: determine cutoff
  if (width < 960) {
    return (
      <div className="max-w-3xl text-center">
        Note: this puzzle must be done on a computer
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <div
        id="scrollDemo"
        ref={scrollRef}
        className="no-scrollbar w-[calc(100vw-32px)] overflow-auto"
        onScroll={handleScroll}
      >
        {/* TODO: should the scroll behavior be more subtle and kick in later? */}
        <div className="flex justify-center" style={{ width: width }}>
          <Stage
            width={WIDTH}
            height={HEIGHT}
            className="rounded-md border-8 border-black/30"
            options={{ backgroundColor: 0xffffff }}
          >
            <EventComponent
              running={running}
              rate={rate}
              scatter={scrollPosition >= width / 2 - WIDTH / 4 + HEIGHT / 16}
            />
          </Stage>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={() => setRunning(!running)}
          className="hover:opacity-85 focus:outline-none"
        >
          {running ? (
            <CirclePause className="size-16 rounded-md" />
          ) : (
            <CirclePlay className="size-16 rounded-md" />
          )}
        </button>
        <input
          type="range"
          className="w-48 accent-white [&::-webkit-slider-runnable-track]:rounded-xl [&::-webkit-slider-runnable-track]:bg-[#47576D] [&::-webkit-slider-thumb]:hover:cursor-pointer"
          defaultValue={1}
          min={1}
          max={30}
          step={1}
          onChange={(e) => setRate(Number(e.target.value))}
        />
        <p className="w-9 font-mono text-xl">
          {rate}
          <span className="text-lg">x</span>
        </p>
      </div>
    </div>
  );
}

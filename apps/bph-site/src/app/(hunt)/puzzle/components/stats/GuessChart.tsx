"use client";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ChartContainer } from "@/components/ui/chart";
import { useRef, useState, useEffect } from "react";

export type GuessChartItem = {
  guess: string;
  count: number;
};

type GuessChartProps = {
  data: GuessChartItem[];
  puzzleAnswer: string;
};

const maxLineLength = 16;

function resolveLength(text: string): [number, number] {
  const lineCount = Math.ceil(text.length / maxLineLength);
  const baseLength = Math.floor(text.length / lineCount);
  const extra = text.length % lineCount;
  return [baseLength, extra];
}

// TODO: simplify logic for guess chart font/box sizing
export default function GuessChart({ data, puzzleAnswer }: GuessChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState(14);
  const fontScaler = fontSize / 14;

  useEffect(() => {
    const updateFontSize = () => {
      const width = containerRef.current?.offsetWidth || 400;
      setFontSize(width * 0.02);
    };
    updateFontSize();

    const observer = new ResizeObserver(updateFontSize);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const maxCount = Math.max(...data.map((d) => d.count));
  const intervals = 5;
  const step = Math.max(Math.floor(maxCount / intervals / 5) * 5, 5);
  const maxLength = Math.max(
    ...data.map((d) => {
      const [baseLength, extra] = resolveLength(d.guess);
      return baseLength + (extra ? 1 : 0) + 1;
    }),
  );
  const labelSpace = 0.25; // Added length in character widths between the label and bar
  const leftMargin = (maxLength + labelSpace) * 8.43 * fontScaler + 8.43;

  return (
    <ChartContainer config={{}} className="w-full" ref={containerRef}>
      <BarChart
        accessibilityLayer
        data={data}
        layout="vertical"
        margin={{
          right: 40 * fontScaler,
        }}
      >
        <CartesianGrid
          horizontal={false}
          vertical={true}
          strokeDasharray="3 3"
        />
        <XAxis
          type="number"
          tickLine={false}
          axisLine={false}
          tick={{ fill: "#E7E3FC", fontSize: fontSize }}
          ticks={Array.from(
            { length: Math.ceil(maxCount / step) },
            (_, i) => i * step,
          )}
          domain={[0, maxCount]}
        />
        <YAxis
          dataKey="guess"
          type="category"
          tickLine={false}
          axisLine={false}
          width={leftMargin}
          interval={0}
          tick={({ payload, x, y, textAnchor }) => {
            const text = payload.value;
            const [baseLength, extra] = resolveLength(text);
            const lines = [];

            for (let i = 0; i < text.length; ) {
              const lineLength = baseLength + (i < extra ? 1 : 0);
              lines.push(text.slice(i, i + lineLength));
              i += lineLength;
            }

            const pad = 1; // In character widths
            const boxWidth =
              (baseLength + (extra ? 1 : 0) + pad) * 8.43 * fontScaler;
            const boxHeight =
              lines.length * 16.5 * fontScaler + pad * 8.43 * fontScaler;
            const boxX =
              x - boxWidth + (pad / 2 - labelSpace) * 8.43 * fontScaler;
            const boxY = y - boxHeight / 2;

            const textX = x - labelSpace * 8.43 * fontScaler;
            const textY =
              y +
              (8.43 / 2) * fontScaler - // Half a line down
              ((lines.length - 1) / 2) * 16.5 * fontScaler; // Some number of lines up

            if (payload.value === puzzleAnswer) {
              return (
                <g>
                  {/* Background rectangle */}
                  <rect
                    x={boxX}
                    y={boxY}
                    width={boxWidth}
                    height={boxHeight}
                    fill="black"
                    opacity={0.3}
                    rx={4}
                    ry={4}
                  />
                  {/* White text */}
                  <text
                    x={textX}
                    y={textY}
                    fill="#E7E3FC"
                    textAnchor={textAnchor}
                    dominantBaseline="alphabetic"
                    fontSize={fontSize}
                    fontWeight="bold"
                    fontFamily="monospace"
                  >
                    {lines.map((line, index) => (
                      <tspan
                        key={index}
                        x={textX}
                        dy={index === 0 ? "0" : "1.2em"}
                      >
                        {line}
                      </tspan>
                    ))}
                  </text>
                </g>
              );
            }

            // Normal case
            return (
              <text
                x={textX}
                y={textY}
                fill="#E7E3FC"
                textAnchor={textAnchor}
                dominantBaseline="alphabetic"
                fontSize={fontSize}
                fontFamily="monospace"
              >
                {lines.map((line, index) => (
                  <tspan key={index} x={textX} dy={index === 0 ? "0" : "1.2em"}>
                    {line}
                  </tspan>
                ))}
              </text>
            );
          }}
        />
        <Bar
          dataKey="count"
          fill="#CBC3E3"
          barSize={100}
          label={({ x, y, width, height, value }) => {
            const pad = 1; // In character widths
            return (
              <text
                x={x + width + pad * 8.43 * fontScaler}
                y={y + height / 2}
                textAnchor="start"
                dominantBaseline="central"
                fill="#E7E3FC"
                fontSize={fontSize}
                fontWeight="bold"
                fontFamily="monospace"
              >
                {value}
              </text>
            );
          }}
        />
      </BarChart>
    </ChartContainer>
  );
}

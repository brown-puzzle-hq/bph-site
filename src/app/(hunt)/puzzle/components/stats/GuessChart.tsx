"use client";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ChartContainer } from "@/components/ui/chart";

export type GuessChartItem = {
  guess: string;
  count: number;
};

type GuessChartProps = {
  data: GuessChartItem[];
  puzzleAnswer: string;
};

export default function GuessChart({ data, puzzleAnswer }: GuessChartProps) {
  const maxCount = Math.max(...data.map((d) => d.count));
  const intervals = 5;
  const step = Math.max(Math.floor(maxCount / intervals / 5) * 5, 5);

  return (
    <ChartContainer config={{}} className="min-h-[400px]">
      <BarChart
        accessibilityLayer
        data={data}
        layout="vertical"
        margin={{
          top: 10,
          right: 40,
          left: 80,
          bottom: 0,
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
          tick={{ fill: "#E7E3FC" }}
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
          tickMargin={10}
          width={80}
          tick={({ payload, x, y, textAnchor }) => {
            const text = payload.value;
            const maxLineLength = 16;
            const lineCount = Math.ceil(text.length / maxLineLength);
            const baseLength = Math.floor(text.length / lineCount);
            const extra = text.length % lineCount;
            const lines = [];

            for (let i = 0; i < text.length; ) {
              const lineLength = baseLength + (i < extra ? 1 : 0);
              lines.push(text.slice(i, i + lineLength));
              i += lineLength;
            }

            const padX = 15;
            const padY = 10;
            const boxWidth =
              Math.min(baseLength + (extra ? 1 : 0), maxLineLength) * 8.43 +
              padX;
            const boxHeight = 16.5 * lines.length + padY;
            const boxX = x - boxWidth + padX / 2;
            const boxY = y - boxHeight / 2 - 0.5;

            const textX = x;
            const textY = y - boxHeight / 2 + 12.5;

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
                    dominantBaseline="central"
                    fontSize={14}
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
                dominantBaseline="central"
                fontSize={14}
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
            const padding = 8;
            return (
              <text
                x={x + width + padding}
                y={y + height / 2}
                textAnchor="start"
                dominantBaseline="middle"
                fill="#E7E3FC"
                fontSize={14}
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

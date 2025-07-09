"use client";
import { CartesianGrid, Line, LineChart, XAxis, Tooltip } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import colors from "tailwindcss/colors";

export type ActivityItem = {
  hour: number;
  hints: number;
  guesses: number;
  solves: number;
  registrations: number;
};

type ChartProps = {
  activityData: ActivityItem[];
};

const chartConfig = {
  hints: {
    label: "Hints",
    color: colors.blue["500"],
  },
  guesses: {
    label: "Guesses",
    color: colors.orange["500"],
  },
  solves: {
    label: "Solves",
    color: colors.green["500"],
  },
  registrations: {
    label: "Registrations",
    color: colors.yellow["500"],
  },
} satisfies ChartConfig;

export function ActivityChart({ activityData }: ChartProps) {
  return (
    <ChartContainer config={chartConfig} className="w-full">
      <LineChart
        accessibilityLayer
        data={activityData}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis
          dataKey="hour"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(hour) => `${hour}`}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <ChartLegend content={<ChartLegendContent />} />
        <Line
          dataKey="hints"
          type="monotone"
          stroke={chartConfig.hints.color}
          strokeWidth={2}
          dot={false}
        />
        <Line
          dataKey="guesses"
          type="monotone"
          stroke={chartConfig.guesses.color}
          strokeWidth={2}
          dot={false}
        />
        <Line
          dataKey="solves"
          type="monotone"
          stroke={chartConfig.solves.color}
          strokeWidth={2}
          dot={false}
        />
        <Line
          dataKey="registrations"
          type="monotone"
          stroke={chartConfig.registrations.color}
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  );
}

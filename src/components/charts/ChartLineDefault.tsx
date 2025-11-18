"use client"

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A line chart"

const chartData = [
  { month: "January", avg: 78.5 },
  { month: "February", avg: 75.5 },
  { month: "March", avg: 76.4 },
  { month: "April", avg: 74.5 },
  { month: "May", avg: 74.6 },
  { month: "June", avg: 75.2 },
  { month: "July", avg: 75.8 },
  { month: "August", avg: 76.1 },
  { month: "September", avg: 75.3 },
  { month: "October", avg: 74.7 },
  { month: "November", avg: 75.0 },
]

const chartConfig = {
  desktop: {
    label: "Avg. Score",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export function ChartLineDefault() {
  return (
    <Card className="max-w-full h-full flex flex-col">
      <CardHeader>
        <CardTitle>Scoring Average</CardTitle>
        <CardDescription>January - November 2025</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 p-4">
        <ChartContainer config={chartConfig} className="w-full h-full sm:aspect-auto">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              dataKey="avg"
              domain={[65, 85]}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.toFixed(1)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="avg"
              type="natural"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter> */}
    </Card>
  )
}

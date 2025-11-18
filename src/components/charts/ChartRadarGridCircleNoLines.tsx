"use client"

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A radar chart with a grid and circle fill"

const chartData = [
  { month: "Driving Dist.", score: 186 },
  { month: "Driving Acc.", score: 305 },
  { month: "Approach", score: 237 },
  { month: "Around Green", score: 203 },
  { month: "Putting",  score: 209 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export function ChartRadarGridCircleNoLines() {
  return (
    <Card className="max-w-full  max-h-96 p-4">
      <CardHeader className="items-center pb-4">
        <CardTitle>Skill Profile</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <ChartContainer
          config={chartConfig}
          className="w-full h-full"
        >
          <RadarChart data={chartData}>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarGrid gridType="circle" radialLines={false} />
            <PolarAngleAxis dataKey="month" />
            <Radar
              dataKey="score"
              fill="var(--color-desktop)"
              fillOpacity={0.6}
              dot={{
                r: 4,
                fillOpacity: 1,
              }}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month
        </div>
        <div className="text-muted-foreground flex items-center gap-2 leading-none">
        </div>
      </CardFooter> */}
    </Card>
  )
}

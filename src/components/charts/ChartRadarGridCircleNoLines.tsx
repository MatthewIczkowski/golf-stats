"use client"

import { TrendingDown } from "lucide-react"
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
    <Card className="max-w-full h-full flex flex-col">
      <CardHeader className="items-center">
        <CardTitle>Skill Profile</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
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
      <CardFooter className="flex-col items-center gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending down by 5.2% this month <TrendingDown className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total scores for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}

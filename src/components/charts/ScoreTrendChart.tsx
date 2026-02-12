"use client"

import { useEffect, useState } from "react"
import { TrendingDown, TrendingUp, Minus } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

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
import { getMonthlyScoring } from "@/lib/actions"

const chartConfig = {
  desktop: {
    label: "Avg. Score",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

function formatMonth(yyyyMm: string): string {
  const [year, month] = yyyyMm.split("-")
  const date = new Date(Number(year), Number(month) - 1)
  return date.toLocaleDateString("en-US", { month: "short", year: "2-digit" })
}

export function ScoreTrendChart() {
  const [chartData, setChartData] = useState<{ month: string; avg: number }[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getMonthlyScoring()
      .then((data) =>
        setChartData(
          data.map((row) => ({
            month: row.month,
            avg: Number(row.avg),
          }))
        )
      )
      .catch(console.error)
      .finally(() => setIsLoading(false))
  }, [])

  const trend = (() => {
    if (chartData.length < 2) return null
    const prev = chartData[chartData.length - 2].avg
    const curr = chartData[chartData.length - 1].avg
    const diff = curr - prev
    const label = formatMonth(chartData[chartData.length - 1].month)
    if (Math.abs(diff) < 0.05) {
      return { strokes: 0, direction: "flat" as const, label }
    }
    return {
      strokes: Math.abs(diff),
      direction: diff < 0 ? "down" : "up",
      label,
    }
  })()

  if (isLoading || chartData.length === 0) {
    return (
      <Card className="max-w-full h-full flex flex-col">
        <CardHeader>
          <CardTitle>Scoring Average</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground text-sm">
            {isLoading ? "Loading..." : "No data available"}
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="max-w-full h-full flex flex-col">
      <CardHeader>
        <CardTitle>Scoring Average</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
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
              tickFormatter={formatMonth}
            />
            <YAxis
              dataKey="avg"
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
      {trend && (
        <CardFooter className="flex-col items-center gap-2 text-sm">
          <div className="flex gap-2 leading-none font-medium">
            {trend.direction === "down" ? (
              <>Trending down by {trend.strokes.toFixed(1)} strokes in {trend.label} <TrendingDown className="h-4 w-4" /></>
            ) : trend.direction === "up" ? (
              <>Trending up by {trend.strokes.toFixed(1)} strokes in {trend.label} <TrendingUp className="h-4 w-4" /></>
            ) : (
              <>No change in {trend.label} <Minus className="h-4 w-4" /></>
            )}
          </div>
          <div className="text-muted-foreground leading-none">
            Showing monthly scoring averages across {chartData.length} months
          </div>
        </CardFooter>
      )}
    </Card>
  )
}

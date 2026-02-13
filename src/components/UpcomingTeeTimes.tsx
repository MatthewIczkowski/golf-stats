"use client";

import { Calendar, Sun, Cloud, CloudRain, CloudSun } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type WeatherCondition = "sunny" | "cloudy" | "rainy" | "partly-cloudy";

interface TeeTime {
  date: string;
  time: string;
  courseName: string;
  weather: { temp: number; condition: WeatherCondition };
}

const weatherIcons: Record<WeatherCondition, typeof Sun> = {
  sunny: Sun,
  cloudy: Cloud,
  rainy: CloudRain,
  "partly-cloudy": CloudSun,
};

const mockTeeTimes: TeeTime[] = [
  {
    date: "Sat, Feb 15",
    time: "8:30 AM",
    courseName: "Pine Valley Golf Club",
    weather: { temp: 62, condition: "sunny" },
  },
  {
    date: "Sun, Feb 23",
    time: "10:00 AM",
    courseName: "Torrey Pines South",
    weather: { temp: 58, condition: "partly-cloudy" },
  },
  {
    date: "Sat, Mar 1",
    time: "7:45 AM",
    courseName: "Bethpage Black",
    weather: { temp: 45, condition: "cloudy" },
  },
];

export default function UpcomingTeeTimes() {
  return (
    <Card className="py-2 sm:py-4 gap-2 sm:gap-4">
      <CardHeader className="px-3 sm:px-6 pb-0">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <CardTitle className="text-sm">Upcoming Tee Times</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="px-3 sm:px-6 divide-y">
        {mockTeeTimes.map((teeTime) => {
          const WeatherIcon = weatherIcons[teeTime.weather.condition];
          return (
            <div
              key={`${teeTime.date}-${teeTime.time}`}
              className="grid grid-cols-[auto_1fr_auto] items-center gap-3 sm:gap-4 py-3 first:pt-0 last:pb-0"
            >
              <div className="flex flex-col text-sm text-muted-foreground">
                <span className="whitespace-nowrap">{teeTime.date}</span>
                <span className="whitespace-nowrap">{teeTime.time}</span>
              </div>
              <p className="text-sm font-medium text-center truncate">
                {teeTime.courseName}
              </p>
              <div className="flex flex-col items-center text-sm text-muted-foreground">
                <WeatherIcon className="h-3.5 w-3.5" />
                <span>{teeTime.weather.temp}°F</span>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

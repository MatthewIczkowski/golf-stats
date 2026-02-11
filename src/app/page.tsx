"use client";

import { useEffect, useState } from "react";
import { Crosshair, Flag, Circle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPerformanceStats } from "@/lib/actions";

const stats = [
  {
    key: "avg_fairways_hit",
    label: "Driving",
    subtitle: "Avg Fairways",
    icon: Flag,
  },
  { key: "avg_gir", label: "Approach", subtitle: "Avg GIR", icon: Crosshair },
  { key: "avg_putts", label: "Putting", subtitle: "Avg Putts", icon: Circle },
] as const;

export default function Home() {
  const [data, setData] = useState<Record<string, string | number> | null>(
    null,
  );

  useEffect(() => {
    getPerformanceStats().then(setData);
  }, []);

  return (
    <div className="p-4 sm:p-6">
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {stats.map(({ key, label, subtitle, icon: Icon }) => (
          <Card key={key} className="py-2 sm:py-4 gap-2 sm:gap-6">
            <CardHeader className="px-3 sm:px-6 pb-0 sm:pb-2 items-center sm:items-start">
              <div className="flex items-center gap-2">
                <Icon className="h-4 w-4 text-muted-foreground" />
                <CardTitle className="text-sm">{label}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="px-3 sm:px-6 text-center sm:text-left">
              <p className="text-2xl font-bold">
                {data ? (data[key] ?? "—") : "…"}
              </p>
              <p className="text-xs text-muted-foreground">{subtitle}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

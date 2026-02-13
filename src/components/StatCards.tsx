"use client";

import { Crosshair, Flag, Circle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

export function StatCards({
  data,
}: {
  data: Record<string, string | number> | null;
}) {
  return (
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
              {data ? (data[key] ?? "—") : "—"}
            </p>
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

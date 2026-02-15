import { ChartRadarGridCircleNoLines } from "@/components/charts/ChartRadarGridCircleNoLines";
import { ScoreTrendChart } from "@/components/charts/ScoreTrendChart";
import { getMonthlyScoring } from "@/lib/actions";

export const dynamic = "force-dynamic";

export default async function Trends() {
  const rawData = await getMonthlyScoring();
  const data = rawData.map((row) => ({
    month: row.month as string,
    avg: Number(row.avg),
  }));

  return (
    <div className="p-4 sm:p-6">
      <section className="flex flex-col sm:grid sm:grid-cols-3 gap-4 pb-4 max-w-full">
        <div className="w-full sm:col-span-2">
          <ScoreTrendChart data={data} />
        </div>
        <div className="sm:col-span-1">
          <ChartRadarGridCircleNoLines />
        </div>
      </section>
    </div>
  );
}

import { getPerformanceStats } from "@/lib/actions";
import { StatCards } from "@/components/StatCards";
import UpcomingTeeTimes from "@/components/UpcomingTeeTimes";

export default async function Home() {
  const data = await getPerformanceStats();

  return (
    <div className="p-4 sm:p-6">
      <StatCards data={data} />
      <div className="mt-4 sm:mt-6">
        <UpcomingTeeTimes />
      </div>
    </div>
  );
}

import { RoundsTable } from "@/components/table/RoundsTable";
import { getData } from "@/lib/actions";

export default async function Rounds() {
  const rounds = await getData();

  return (
    <div className="container mx-auto px-4 py-8">
      <RoundsTable rounds={rounds} />
    </div>
  );
}

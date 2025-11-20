import Image from "next/image";
import goat from "../../public/goat.jpg"

import { Button } from "@/components/ui/button";
import { ChartRadarGridCircleNoLines } from "@/components/charts/ChartRadarGridCircleNoLines";
import { ChartLineDefault } from "@/components/charts/ChartLineDefault";
import { DataTable } from "@/components/table/DataTable";
import { getGolferAge } from "@/lib/utils";
import { ModeToggle } from "@/components/ModeToggle";

export default function Home() {
  const { years, months } = getGolferAge();
  
  return (
    <div className="p-4 sm:p-6"> 
      <div className="hidden sm:flex flex-row justify-end gap-2">
        <Button variant="outline" size="icon" className="w-auto p-2"> <span> New Round</span> </Button>
        <ModeToggle />
      </div> 
      <section className="flex flex-row gap-4 items-center pb-4">
        <Image src={goat} alt="goat" width={180} height={180} />
        <section className="flex flex-col gap-2">
          <h1 className="text-lg sm:text-2xl font-bold">Iczkowski <span className="text-lg sm:text-2xl text-gray-500">Matt</span></h1>
          <p className="text-gray-500 text-sm"> age - {years} years, {months} months</p>
          <p className="text-gray-500 text-sm"> started golf - April 2000</p>
          <div className="flex flex-row justify-end gap-2 sm:hidden">
            <Button variant="outline" size="icon" className="w-auto p-2"> <span> New Round</span> </Button>
            <ModeToggle />
          </div> 
        </section>
      </section> 
      <section className="flex flex-col sm:grid sm:grid-cols-3 gap-4 pb-4 max-w-full">
        <div className="w-full sm:col-span-2">
          <ChartLineDefault />
        </div>
        <div className="sm:col-span-1">
          <ChartRadarGridCircleNoLines />
        </div>
      </section>
      <DataTable />
    </div>
  );
}

"use client";

import Image from "next/image";
import goat from "../../public/goat.jpg";
import { useState } from "react";

import { PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getGolferAge } from "@/lib/utils";
import { ModeToggle } from "@/components/ModeToggle";
import { AuthToggle } from "@/components/AuthToggle";

export function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { years, months } = getGolferAge();

  return (
    <header className="hidden sm:block p-4 sm:p-6">
      <div className="hidden sm:flex flex-row justify-end gap-2">
        {isAuthenticated && (
          <Button
            variant="outline"
            size="icon"
            className="w-auto p-2 font-bold bg-emerald-700 text-white hover:bg-emerald-600 hover:text-white"
          >
            <PlusCircle /> New Round
          </Button>
        )}
        {/* <Button variant="outline" size="icon" className="w-auto p-2" onClick={() => setIsAuthenticated(!isAuthenticated)}> Auth Logic Test </Button> */}
        <AuthToggle isAuthenticated={isAuthenticated} />
        <ModeToggle />
      </div>
      <section className="flex flex-row gap-4 items-center pb-4">
        <Image src={goat} alt="goat" width={180} height={180} />
        <section className="flex flex-col gap-2">
          <h1 className="text-lg sm:text-2xl font-bold">
            Iczkowski{" "}
            <span className="text-lg sm:text-2xl text-gray-500">Matt</span>
          </h1>
          <p className="text-gray-500 text-sm">
            {" "}
            age - {years} years, {months} months
          </p>
          <p className="text-gray-500 text-sm"> started golf - April 2000</p>
        </section>
      </section>
    </header>
  );
}

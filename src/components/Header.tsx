"use client";

import Image from "next/image";
import goat from "../../public/goat.jpg";

import { PlusCircle, LogIn, LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getGolferAge } from "@/lib/utils";
import { ModeToggle } from "@/components/ModeToggle";
import { authClient } from "@/lib/auth/client";

export function Header() {
  const { data: session } = authClient.useSession();
  const isAuthenticated = !!session?.user;
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
        {isAuthenticated ? (
          <Button
            variant="outline"
            size="icon"
            onClick={async () => {
              await authClient.signOut();
              window.location.href = "/";
            }}
          >
            <LogOut />
          </Button>
        ) : (
          <Button
            variant="outline"
            size="icon"
            asChild
          >
            <a href="/auth/sign-in">
              <LogIn />
            </a>
          </Button>
        )}
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

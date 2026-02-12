"use client";

import Image from "next/image";
import goat from "../../public/goat.jpg";

import { PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ModeToggle";
import { UserButton } from "@neondatabase/auth/react";
import { authClient } from "@/lib/auth/client";

export function MobileHeader() {
  const { data: session } = authClient.useSession();
  const isAuthenticated = !!session?.user;

  return (
    <header className="flex sm:hidden items-center justify-between p-3 border-b">
      <div className="flex items-center gap-3">
        <Image src={goat} alt="goat" width={36} height={36} className="rounded-full" />
        <h1 className="text-sm font-bold">
          Iczkowski <span className="text-gray-500">Matt</span>
        </h1>
      </div>
      <div className="flex items-center gap-2">
        {isAuthenticated && (
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 bg-emerald-700 text-white hover:bg-emerald-600 hover:text-white"
          >
            <PlusCircle className="h-4 w-4" />
          </Button>
        )}
        <UserButton size="icon" />
        <ModeToggle />
      </div>
    </header>
  );
}

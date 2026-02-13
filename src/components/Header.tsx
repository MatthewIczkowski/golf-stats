"use client";

import { useState, useEffect } from "react";
import { PlusCircle, LogIn, LogOut, CircleUser } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getGolferAge } from "@/lib/utils";
import { ModeToggle } from "@/components/ModeToggle";
import { authClient } from "@/lib/auth/client";
import { NewRoundModal } from "@/components/forms/NewRoundModal";

export function Header() {
  const { data: session } = authClient.useSession();
  const isAuthenticated = !!session?.user;
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const { years, months } = getGolferAge();

  return (
    <header className="hidden sm:block p-4 sm:p-6">
      <div className="hidden sm:flex flex-row justify-end gap-2">
        {mounted && isAuthenticated && (
          <NewRoundModal>
            <Button
              variant="outline"
              size="icon"
              className="w-auto p-2 font-bold bg-emerald-700 text-white hover:bg-emerald-600 hover:text-white"
            >
              <PlusCircle /> New Round
            </Button>
          </NewRoundModal>
        )}
        {mounted &&
          (isAuthenticated ? (
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
            <Button variant="outline" size="icon" asChild>
              <a href="/auth/sign-in">
                <LogIn />
              </a>
            </Button>
          ))}
        <ModeToggle />
      </div>
      <section className="flex flex-row gap-4 items-center pb-4">
        <CircleUser className="h-[180px] w-[180px] text-muted-foreground" />
        <section className="flex flex-col gap-2">
          <h1 className="text-lg sm:text-2xl font-bold">{session?.user?.name ?? "Guest"}</h1>
        </section>
      </section>
    </header>
  );
}

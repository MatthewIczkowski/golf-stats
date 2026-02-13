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
      <div className="hidden sm:flex flex-row items-center gap-4 pb-4">
        <CircleUser className="h-[50px] w-[50px] text-muted-foreground" />
        <h1 className="text-lg sm:text-2xl font-bold">
          {session?.user?.name ?? "Guest"}
        </h1>
        <div className="ml-auto flex flex-row items-center gap-2">
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
      </div>
    </header>
  );
}

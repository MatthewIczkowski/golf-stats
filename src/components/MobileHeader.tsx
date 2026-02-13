"use client";

import { useState, useEffect } from "react";
import { PlusCircle, LogIn, LogOut, CircleUser } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ModeToggle";
import { authClient } from "@/lib/auth/client";
import { NewRoundModal } from "@/components/forms/NewRoundModal";

export function MobileHeader() {
  const { data: session } = authClient.useSession();
  const isAuthenticated = !!session?.user;
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <header className="flex sm:hidden items-center justify-between p-3 border-b">
      <div className="flex items-center gap-3">
        <CircleUser className="h-9 w-9 text-muted-foreground" />
        <h1 className="text-sm font-bold">{session?.user?.name ?? "Guest"}</h1>
      </div>
      <div className="flex items-center gap-2">
        {mounted && isAuthenticated && (
          <NewRoundModal>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 bg-emerald-700 text-white hover:bg-emerald-600 hover:text-white"
            >
              <PlusCircle className="h-4 w-4" />
            </Button>
          </NewRoundModal>
        )}
        {mounted &&
          (isAuthenticated ? (
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={async () => {
                await authClient.signOut();
                window.location.href = "/";
              }}
            >
              <LogOut className="h-4 w-4" />
            </Button>
          ) : (
            <Button variant="outline" size="icon" className="h-8 w-8" asChild>
              <a href="/auth/sign-in">
                <LogIn className="h-4 w-4" />
              </a>
            </Button>
          ))}
        <ModeToggle />
      </div>
    </header>
  );
}

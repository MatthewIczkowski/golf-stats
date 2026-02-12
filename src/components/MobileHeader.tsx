"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import goat from "../../public/goat.jpg";

import { PlusCircle, LogIn, LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ModeToggle";
import { authClient } from "@/lib/auth/client";

export function MobileHeader() {
  const { data: session } = authClient.useSession();
  const isAuthenticated = !!session?.user;
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <header className="flex sm:hidden items-center justify-between p-3 border-b">
      <div className="flex items-center gap-3">
        <Image src={goat} alt="goat" width={36} height={36} className="rounded-full" />
        <h1 className="text-sm font-bold">
          Iczkowski <span className="text-gray-500">Matt</span>
        </h1>
      </div>
      <div className="flex items-center gap-2">
        {mounted && isAuthenticated && (
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 bg-emerald-700 text-white hover:bg-emerald-600 hover:text-white"
          >
            <PlusCircle className="h-4 w-4" />
          </Button>
        )}
        {mounted && (isAuthenticated ? (
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
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            asChild
          >
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

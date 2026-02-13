"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { authClient } from "@/lib/auth/client";

export function NewRoundModal({ children }: { children: React.ReactNode }) {
  const { data: session } = authClient.useSession();

  function handleClick() {
    console.log("Session data:", session);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Round</DialogTitle>
        </DialogHeader>
        <Button onClick={handleClick} className="w-full">Log Session</Button>
        {/* Round input form commented out for testing
        <form className="space-y-4">
          ...
        </form>
        */}
      </DialogContent>
    </Dialog>
  );
}

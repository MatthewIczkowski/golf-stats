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

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log("Form data:", { ...data, user_id: session?.user?.id ?? null });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Round</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label htmlFor="date" className="text-sm font-medium">Date</label>
              <input type="date" name="date" id="date" defaultValue={new Date().toISOString().split("T")[0]} required className="w-full rounded-md border bg-transparent px-3 py-2 text-sm" />
            </div>
            <div className="space-y-1">
              <label htmlFor="course_name" className="text-sm font-medium">Course</label>
              <input type="text" name="course_name" id="course_name" defaultValue="Local Course" required className="w-full rounded-md border bg-transparent px-3 py-2 text-sm" />
            </div>
            <div className="space-y-1">
              <label htmlFor="slope" className="text-sm font-medium">Slope</label>
              <input type="number" name="slope" id="slope" defaultValue={113} min={55} max={155} required className="w-full rounded-md border bg-transparent px-3 py-2 text-sm" />
            </div>
            <div className="space-y-1">
              <label htmlFor="rating" className="text-sm font-medium">Rating</label>
              <input type="number" name="rating" id="rating" defaultValue={72.0} step="0.1" required className="w-full rounded-md border bg-transparent px-3 py-2 text-sm" />
            </div>
            <div className="space-y-1">
              <label htmlFor="score" className="text-sm font-medium">Score</label>
              <input type="number" name="score" id="score" defaultValue={90} required className="w-full rounded-md border bg-transparent px-3 py-2 text-sm" />
            </div>
            <div className="space-y-1">
              <label htmlFor="fairways_hit" className="text-sm font-medium">Fairways Hit</label>
              <input type="number" name="fairways_hit" id="fairways_hit" defaultValue={7} min={0} max={18} required className="w-full rounded-md border bg-transparent px-3 py-2 text-sm" />
            </div>
            <div className="space-y-1">
              <label htmlFor="greens_in_regulation" className="text-sm font-medium">GIR</label>
              <input type="number" name="greens_in_regulation" id="greens_in_regulation" defaultValue={6} min={0} max={18} required className="w-full rounded-md border bg-transparent px-3 py-2 text-sm" />
            </div>
            <div className="space-y-1">
              <label htmlFor="putts" className="text-sm font-medium">Putts</label>
              <input type="number" name="putts" id="putts" defaultValue={32} min={0} required className="w-full rounded-md border bg-transparent px-3 py-2 text-sm" />
            </div>
            <div className="space-y-1">
              <label htmlFor="penalties" className="text-sm font-medium">Penalties</label>
              <input type="number" name="penalties" id="penalties" defaultValue={2} min={0} required className="w-full rounded-md border bg-transparent px-3 py-2 text-sm" />
            </div>
            <div className="space-y-1">
              <label htmlFor="double_bogeys" className="text-sm font-medium">Double Bogeys+</label>
              <input type="number" name="double_bogeys" id="double_bogeys" defaultValue={3} min={0} required className="w-full rounded-md border bg-transparent px-3 py-2 text-sm" />
            </div>
          </div>
          <div className="space-y-1">
            <label htmlFor="notes" className="text-sm font-medium">Notes</label>
            <textarea name="notes" id="notes" defaultValue="Solid round" rows={2} className="w-full rounded-md border bg-transparent px-3 py-2 text-sm" />
          </div>
          <Button type="submit" className="w-full">Log Form Data</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createRound } from "@/lib/actions";

export function RoundForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    const formData = new FormData(event.currentTarget);

    try {
      await createRound(formData);
      setMessage({ type: "success", text: "Round added successfully!" });
      (event.target as HTMLFormElement).reset();
    } catch (error) {
      setMessage({
        type: "error",
        text: "Failed to add round. Please try again.",
      });
      console.error("Error creating round:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Add New Round</CardTitle>
      </CardHeader>
      <CardContent className="px-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input id="date" name="date" type="date" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="course_name">Course Name</Label>
            <Input
              id="course_name"
              name="course_name"
              type="text"
              placeholder="Enter course name"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="slope">Slope</Label>
              <Input
                id="slope"
                name="slope"
                type="number"
                placeholder="113"
                min="55"
                max="155"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rating">Rating</Label>
              <Input
                id="rating"
                name="rating"
                type="number"
                step="0.1"
                placeholder="72.0"
                min="60"
                max="80"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="score">Score</Label>
            <Input
              id="score"
              name="score"
              type="number"
              placeholder="Enter your score"
              min="50"
              max="150"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fairways_hit">Fairways Hit</Label>
              <Input
                id="fairways_hit"
                name="fairways_hit"
                type="number"
                placeholder="0"
                min="0"
                max="18"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="greens_in_regulation">Greens in Regulation</Label>
              <Input
                id="greens_in_regulation"
                name="greens_in_regulation"
                type="number"
                placeholder="0"
                min="0"
                max="18"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="putts">Putts</Label>
              <Input
                id="putts"
                name="putts"
                type="number"
                placeholder="0"
                min="0"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="penalties">Penalties</Label>
              <Input
                id="penalties"
                name="penalties"
                type="number"
                placeholder="0"
                min="0"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="double_bogeys">Dbl Bogeys</Label>
              <Input
                id="double_bogeys"
                name="double_bogeys"
                type="number"
                placeholder="0"
                min="0"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <textarea
              id="notes"
              name="notes"
              placeholder="Any notes about the round..."
              className="flex min-h-20 w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            />
          </div>

          {message && (
            <p
              className={`text-sm ${message.type === "success" ? "text-green-600" : "text-red-600"}`}
            >
              {message.text}
            </p>
          )}

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Adding..." : "Add Round"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

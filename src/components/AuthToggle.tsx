"use client"

import { LockKeyhole , UnlockKeyhole } from "lucide-react"

import { Button } from "@/components/ui/button"

export function AuthToggle({ isAuthenticated }: { isAuthenticated: boolean }) {

  return (
    <Button variant="disabled" size="icon" >
        {isAuthenticated ? (
            <UnlockKeyhole />
        ) : (
            <LockKeyhole />
        )}
        <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

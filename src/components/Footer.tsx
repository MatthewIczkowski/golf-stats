"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, TrendingUp, ClipboardList } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home", icon: Home },
  { href: "/trends", label: "Trends", icon: TrendingUp },
  { href: "/rounds", label: "Rounds", icon: ClipboardList },
];

export function Footer() {
  const pathname = usePathname();

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 h-14 border-t bg-background/80 backdrop-blur-sm">
      <nav className="flex h-full items-center justify-around">
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center gap-0.5 text-xs transition-colors",
                active
                  ? "text-foreground font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              {label}
            </Link>
          );
        })}
      </nav>
    </footer>
  );
}

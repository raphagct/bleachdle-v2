"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        className={cn(
          "size-9 rounded-full border border-border bg-background/80 backdrop-blur flex items-center justify-center text-muted-foreground transition-colors",
          className
        )}
        aria-label="Changer le thème"
      />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "size-9 rounded-full border border-border bg-background/80 backdrop-blur flex items-center justify-center text-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-200 shadow-sm",
        className
      )}
      aria-label="Changer le thème"
      title={isDark ? "Passer en mode clair" : "Passer en mode sombre"}
    >
      {isDark ? (
        <Sun className="size-4 transition-transform duration-200 rotate-0 scale-100" />
      ) : (
        <Moon className="size-4 transition-transform duration-200 rotate-0 scale-100" />
      )}
    </button>
  );
}

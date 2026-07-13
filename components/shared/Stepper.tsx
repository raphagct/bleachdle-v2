"use client"

import Link from "next/link";
import { Quote, Sparkles, Sword, Users } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const MODES = [
    { name: "Characters", href: "/characters", icon: <Users className="size-4" /> },
    { name: "Bankai", href: "/bankai", icon: <Sword className="size-4" /> },
    { name: "Quotes", href: "/quotes", icon: <Quote className="size-4" /> },
    { name: "Techniques", href: "/techniques", icon: <Sparkles className="size-4" /> }
];

export default function Stepper() {
    const pathname = usePathname();

    return (
        <div className="relative w-fit mx-auto py-2">
            {/* Ligne horizontale de connexion au centre des pastilles */}
            <div className="absolute top-7 left-8 right-8 h-0.5 bg-border z-0" />

            <ul className="relative z-10 flex items-start justify-center gap-8 sm:gap-12">
                {MODES.map((mode) => {
                    const isActive = pathname === mode.href;
                    return (
                        <li key={mode.href} className="flex flex-col items-center gap-2">
                            <Link
                                href={mode.href}
                                aria-current={isActive ? "page" : undefined}
                                title={mode.name}
                                className={cn(
                                    "size-10 rounded-full border-2 flex items-center justify-center transition-all duration-200",
                                    isActive
                                        ? "bg-primary text-primary-foreground border-primary shadow-md scale-110"
                                        : "bg-background text-muted-foreground border-border hover:border-foreground hover:text-foreground"
                                )}
                            >
                                {mode.icon}
                            </Link>
                            <span
                                className={cn(
                                    "text-xs font-semibold tracking-wide uppercase transition-colors",
                                    isActive
                                        ? "text-foreground font-bold"
                                        : "text-muted-foreground"
                                )}
                            >
                                {mode.name}
                            </span>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
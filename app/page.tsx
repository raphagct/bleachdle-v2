import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Users, Sword, Quote, Sparkles, ArrowRight } from "lucide-react";

const MENU_ITEMS = [
    {
        name: "Classic",
        description: "Devine le personnage du jour",
        href: "/classic",
        icon: <Users className="size-6 sm:size-7 text-foreground/80 group-hover:text-primary transition-colors" />
    },
    {
        name: "Bankai",
        description: "À qui appartient ce Bankai ?",
        href: "/bankai",
        icon: <Sword className="size-6 sm:size-7 text-foreground/80 group-hover:text-primary transition-colors" />
    },
    {
        name: "Citations",
        description: "Quel personnage a prononcé cette phrase ?",
        href: "/quotes",
        icon: <Quote className="size-6 sm:size-7 text-foreground/80 group-hover:text-primary transition-colors" />
    },
    {
        name: "Techniques",
        description: "Devine qui exécute cette technique",
        href: "/techniques",
        icon: <Sparkles className="size-6 sm:size-7 text-foreground/80 group-hover:text-primary transition-colors" />
    }
];

export default function Page() {
    return (
        <main className="relative z-10 px-4 pb-16">
            <div className="flex flex-col items-center mt-8 sm:mt-12 mb-8 sm:mb-10 gap-2 text-center">
                <h1 className="text-6xl sm:text-8xl md:text-9xl font-black tracking-tighter uppercase drop-shadow-sm text-primary">
                    BLEACHDLE
                </h1>
                <p className="text-base sm:text-xl text-muted-foreground font-semibold tracking-wide">
                    Devine les personnages de BLEACH
                </p>
            </div>

            <div className="flex flex-col items-center gap-4 max-w-md mx-auto w-full">
                {MENU_ITEMS.map((item) => (
                    <Link key={item.name} href={item.href} className="w-full block">
                        <Button
                            variant="outline"
                            className="w-full h-22 sm:h-24 rounded-2xl border-2 border-border/80 hover:border-foreground !bg-card hover:!bg-accent text-card-foreground px-5 flex items-center justify-between gap-3 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-200 group cursor-pointer overflow-hidden"
                        >
                            <div className="flex items-center gap-4 text-left min-w-0 flex-1">
                                <div className="p-3 rounded-xl bg-muted/90 group-hover:bg-primary/10 transition-colors shrink-0">
                                    {item.icon}
                                </div>
                                <div className="flex flex-col min-w-0 flex-1 pr-1">
                                    <span className="text-lg sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors truncate">
                                        {item.name}
                                    </span>
                                    <span className="text-xs sm:text-sm font-normal text-muted-foreground truncate">
                                        {item.description}
                                    </span>
                                </div>
                            </div>
                            <ArrowRight className="size-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0 ml-1" />
                        </Button>
                    </Link>
                ))}
            </div>
        </main>
    );
}
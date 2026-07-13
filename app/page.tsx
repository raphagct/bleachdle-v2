import { Button } from "@/components/ui/button";
import Link from "next/link";

const MENU_ITEMS = [
    { name: "Characters", href: "/characters" },
    { name: "Bankai", href: "/bankai" },
    { name: "Citations", href: "/quotes" },
    { name: "Techniques", href: "/techniques" }
];

export default function Page() {
    return (
        <main>
            <div className="flex flex-col items-center mt-16 mb-8 gap-2">
                <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase">
                    BLEACHDLE
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground font-medium tracking-wide">
                    Devine les personnages de BLEACH
                </p>
            </div>

            <div className="flex flex-col items-center gap-4 mt-6">
                {MENU_ITEMS.map((item) => (
                    <Button key={item.name} size="lg" className="w-64" asChild>
                        <Link href={item.href}>{item.name}</Link>
                    </Button>
                ))}
            </div>
        </main>
    );
}
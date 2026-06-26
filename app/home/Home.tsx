import { Button } from "@/components/ui/button";
import Link from "next/link";

const MENU_ITEMS = [
    { name: "Characters", href: "/characters" },
    { name: "Bankai", href: "/bankai" },
    { name: "Citations", href: "/quotes" },
    { name: "Techniques", href: "/techniques" }
];

export default function Home() {
    return (
        <div>
            <div className="flex flex-col items-center mt-12 mb-8 gap-2">
                <h1 className="text-5xl font-black tracking-tight text-primary">BLEACHDLE</h1>
                <h2 className="text-xl text-muted-foreground font-medium">Devine les personnages de BLEACH</h2>
            </div>

            <div className="flex flex-col items-center gap-4 mt-6">
                {MENU_ITEMS.map((item) => (
                    <Button key={item.name} size="xxl" className="w-64" asChild>
                        <Link href={item.href}>{item.name}</Link>
                    </Button>
                ))}
            </div>
        </div>
    );
}

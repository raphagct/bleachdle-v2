import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { type Character } from "@/lib/characters.data";
import { Trophy, ArrowRight } from "lucide-react";

type WinnerCardProps = {
    tries: number
    characterToGuess: Character
    gamemode: Gamemode
}

type Gamemode = {
    name: string,
    link: string
}

export default function WinnerCard({ tries, characterToGuess, gamemode }: WinnerCardProps) {
    return (
        <Card className="border-2 shadow-lg transition-all animate-in fade-in zoom-in-95 duration-500"
            style={{ backgroundColor: "rgba(34, 197, 94, 0.15)", borderColor: "#22c55e" }}>
            <CardHeader className="text-center pb-2">
                <div className="mx-auto p-3 rounded-full w-fit mb-2"
                    style={{ backgroundColor: "rgba(34, 197, 94, 0.2)", color: "#15803d" }}>
                    <Trophy className="w-8 h-8" />
                </div>
                <CardTitle className="text-2xl font-bold" style={{ color: "#15803d" }}>
                    Bien joué !
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4 py-4 text-center">
                <div className="flex flex-col items-center gap-2">
                    <Image
                        src={characterToGuess.image_url}
                        alt={characterToGuess.name}
                        width={80}
                        height={80}
                        className="rounded-full border-2 shadow-md object-cover w-20 h-20"
                        style={{ borderColor: "#22c55e", width: "auto", height: "auto" }} />
                    <span className="text-xl font-bold text-foreground">Tu as trouvé {characterToGuess.name}</span>
                </div>
                <p className="text-sm font-medium text-muted-foreground mt-1">
                    trouvé en <span className="font-bold" style={{ color: "#15803d" }}>{tries}</span> tentative{tries > 1 ? 's' : ''}
                </p>
            </CardContent>
            <CardFooter className="flex justify-center pt-2">
                <Link href={gamemode.link} className="w-full sm:w-auto">
                    <Button className="w-full gap-2 shadow-md" style={{ backgroundColor: "#16a34a", color: "white" }}>
                        {"Mode " + gamemode.name} <ArrowRight className="w-4 h-4" />
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
}
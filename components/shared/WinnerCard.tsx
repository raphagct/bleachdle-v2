"use client";

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
import { Trophy, ArrowRight, Clock } from "lucide-react";
import { useState, useEffect } from "react";

type CharacterDisplayInfo = {
    name: string;
    image_url: string;
};

type WinnerCardProps = {
    tries: number
    characterToGuess: CharacterDisplayInfo
    gamemode: Gamemode
    nextResetTimestamp?: number
}

type Gamemode = {
    name: string,
    link: string
}

export default function WinnerCard({ tries, characterToGuess, gamemode, nextResetTimestamp }: WinnerCardProps) {
    const [timeLeft, setTimeLeft] = useState<string>("");

    useEffect(() => {
        if (!nextResetTimestamp) return;

        const updateTimer = () => {
            const diff = nextResetTimestamp - Date.now();
            if (diff <= 0) {
                setTimeLeft("00:00:00");
                window.location.reload();
                return;
            }
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            setTimeLeft(
                `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
            );
        };

        updateTimer();
        const interval = setInterval(updateTimer, 1000);
        return () => clearInterval(interval);
    }, [nextResetTimestamp]);

    return (
        <Card className="border-2 border-emerald-500 bg-emerald-500/15 dark:bg-emerald-500/20 shadow-lg transition-all animate-in fade-in zoom-in-95 duration-500">
            <CardHeader className="text-center pb-2">
                <div className="mx-auto p-3 rounded-full w-fit mb-2 bg-emerald-500/20 text-emerald-700 dark:text-emerald-400">
                    <Trophy className="w-8 h-8" />
                </div>
                <CardTitle className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">
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
                        className="rounded-full border-2 border-emerald-500 shadow-md object-cover w-20 h-20"
                        style={{ width: "auto", height: "auto" }}
                    />
                    <span className="text-xl font-bold text-foreground">Tu as trouvé {characterToGuess.name}</span>
                </div>
                <p className="text-sm font-medium text-muted-foreground mt-1">
                    trouvé en <span className="font-bold text-emerald-700 dark:text-emerald-400">{tries}</span> tentative{tries > 1 ? 's' : ''}
                </p>

                {timeLeft && (
                    <div className="flex items-center gap-2 px-4 py-2 mt-1 rounded-lg bg-card/80 border border-border/50 text-sm font-semibold text-foreground shadow-sm">
                        <Clock className="w-4 h-4 text-primary animate-pulse" />
                        <span>Prochain challenge dans <span className="font-mono text-primary font-bold">{timeLeft}</span></span>
                    </div>
                )}
            </CardContent>
            <CardFooter className="flex justify-center pt-2">
                <Link href={gamemode.link} className="w-full sm:w-auto">
                    <Button className="w-full gap-2 shadow-md bg-emerald-600 hover:bg-emerald-700 text-white">
                        {"Mode " + gamemode.name} <ArrowRight className="w-4 h-4" />
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
}
"use client";

import { Activity, EyeOff } from "lucide-react";
import Hints from "@/components/shared/Hints";
import {
    Card,
    CardTitle,
    CardContent,
    CardFooter,
    CardHeader
} from "@/components/ui/card";
import { useEffect, useState, useRef } from "react"
import CharacterSearch from "@/components/shared/CharacterSearch";
import { Character, characters } from "@/lib/characters.data";
import CharacterTable from "./CharacterTable";
import WinnerCard from "@/components/shared/WinnerCard";
import Image from "next/image";

const ARC_ORDER = ["Arc du Shinigami Remplaçant", "Arc de la Soul Society","Arc Arrancar","Arc du Shinigami Remplaçant Perdu","Arc de la Guerre Sanglante de Mille Ans"]

export default function CharactersModePage() {
    const [attemptFirstHint, setAttemptFirstHint] = useState(4);
    const [attemptSecondHint, setAttemptSecondHint] = useState(7);
    const [charactersPlayed, setCharactersPlayed] = useState<Character[]>([])
    const [randomCharacter, setRandomCharacter] = useState<Character | null>();

    const winnerCardRef = useRef<HTMLDivElement>(null);
    const characterTries = charactersPlayed.slice().reverse()
    const winningCharacter = charactersPlayed.find((char) => char.id === randomCharacter?.id)

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * characters.length)
        setRandomCharacter(characters[randomIndex])
    }, [])

    useEffect(() => {
        if (winningCharacter) {
            const timeoutId = setTimeout(() => {
                winnerCardRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
            }, 1200);
            return () => clearTimeout(timeoutId);
        }
    }, [winningCharacter]);

    const handleSelectCharacter = (character: Character) => {
        setCharactersPlayed(prev => [...prev, character])

        const isWinningGuess = character.id === randomCharacter?.id
        if (isWinningGuess) {
            return
        }

        if (attemptFirstHint > 0) {
            setAttemptFirstHint(prev => prev - 1)
        }
        if (attemptSecondHint > 0) {
            setAttemptSecondHint(prev => prev - 1)
        }
    }


    return <div className="px-4 pb-12">
        <Card className="max-w-lg mx-auto">
            <CardHeader>
                <CardTitle>Devine le personnage de Bleach d'aujourd'hui!</CardTitle>
            </CardHeader>
            <CardContent>
                {charactersPlayed.length >= 1 && (
                    <Hints
                        hint1={{
                            icon: <Activity />,
                            description: attemptFirstHint === 0
                                ? "Indice de l'état vital"
                                : `Indice de l'état vital dans ${attemptFirstHint} essai${attemptFirstHint > 1 ? "s" : ""}`,
                            hint: `Statut vital : ${randomCharacter?.status}`,
                            isUnlocked: attemptFirstHint === 0
                        }}
                        hint2={{
                            icon: <EyeOff />,
                            description: attemptSecondHint === 0
                                ? "Indice du personnage flouté"
                                : `Indice du personnage flouté dans ${attemptSecondHint} essai${attemptSecondHint > 1 ? "s" : ""}`,
                            hint: randomCharacter ? (
                                <div className="flex flex-col items-center justify-center gap-1">
                                    <Image
                                        src={randomCharacter.image_url}
                                        alt="Personnage flouté"
                                        width={56}
                                        height={56}
                                        className="rounded-lg object-cover w-14 h-14 blur-[6px] shadow-sm"
                                        style={{ width: "auto", height: "auto" }}
                                    />
                                    <span className="text-xs text-muted-foreground">Photo floutée de la cible</span>
                                </div>
                            ) : "Personnage flouté",
                            isUnlocked: attemptSecondHint === 0
                        }} />
                )}
            </CardContent>
            <CardFooter>
                <p>Les données vont jusqu'à la fin de l'arc Thousand-Year Blood War</p>
            </CardFooter>
        </Card>
        {!winningCharacter && (
            <CharacterSearch charactersPlayed={charactersPlayed}
                onSelect={handleSelectCharacter}
                allowedCharacterIds={characters.map(char => char.id)} />
        )}
        {charactersPlayed.length > 0 && randomCharacter &&
            <CharacterTable
                characters={characterTries}
                randomCharacter={randomCharacter} />}
        {winningCharacter && randomCharacter && (
            <div ref={winnerCardRef} className="max-w-lg mx-auto mt-6">
                <WinnerCard
                    tries={charactersPlayed.length}
                    characterToGuess={randomCharacter}
                    gamemode={{ name: "Bankai", link: "/bankai" }} />
            </div>
        )}
    </div>
}
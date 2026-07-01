"use client";

import Hints from "@/components/shared/Hints";
import {
    Card,
    CardTitle,
    CardContent,
    CardFooter,
    CardHeader
} from "@/components/ui/card";
import { Languages, Shield } from "lucide-react";
import { useState, useEffect } from "react";
import CharacterSearch from "@/components/shared/CharacterSearch";
import { bankais, type Bankai } from "@/lib/bankai.data"
import { type Character } from "@/lib/characters.data";

export default function BankaiModePage() {
    const [attemptFirstHint, setAttemptFirstHint] = useState(4);
    const [attemptSecondHint, setAttemptSecondHint] = useState(7);
    const [randomBankai, setRandomBankai] = useState<Bankai | null>(null);
    const [charactersPlayed, setCharactersPlayed] = useState<Character[]>([]);



    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * bankais.length);
        setRandomBankai(bankais[randomIndex]);
    }, []);

    const handleCharacterSelected = (character: Character) => {
        setCharactersPlayed(prev => [...prev, character])
        const isWin = randomBankai?.characterId === character.id
        const isSecondHintDisabled = attemptFirstHint > 0
        const isAllHintsUsed = attemptSecondHint <= 0
        if (!isWin && isSecondHintDisabled) {
            setAttemptFirstHint(attemptFirstHint - 1)
        } else if (!isWin && !isSecondHintDisabled && !isAllHintsUsed) {
            setAttemptSecondHint(attemptSecondHint - 1)
        }
    }

    return (
        <div className="px-4">
            <Card className="max-w-lg mx-auto">
                <CardHeader>
                    <CardTitle>À qui appartient ce bankai ?</CardTitle>
                </CardHeader>
                <CardContent>
                    <blockquote className="mb-4 border-l-4 border-primary pl-6 py-2">
                        <p className="text-xl font-serif italic text-foreground leading-relaxed">
                            "{randomBankai?.name}"
                        </p>
                    </blockquote>
                    <Hints
                        hint1={{
                            icon: <Shield />,
                            description: "Indice du rang de l'utilisateur dans " + attemptFirstHint + " essais"
                        }}
                        hint2={{
                            icon: <Languages />,
                            description: "Indice du bankai traduit dans " + attemptSecondHint + " essais"
                        }} />
                </CardContent>
                <CardFooter>
                    <p>Les données vont jusqu'à la fin de l'arc Thousand-Year Blood War</p>
                </CardFooter>
            </Card>
            <CharacterSearch
                charactersPlayed={charactersPlayed}
                onSelect={handleCharacterSelected}
            />
            {charactersPlayed.length > 0 && charactersPlayed.map(character => {
                const isWin = randomBankai?.characterId === character.id
                return (
                    <div key={character.id}
                        className="max-w-lg mx-auto mt-4 p-4 rounded-lg border"
                        style={{ background: isWin ? "green" : "red" }}
                    >
                        <p className="text-lg font-semibold">
                            {character.name}
                        </p>
                    </div>
                )
            })}
        </div>
    )
}
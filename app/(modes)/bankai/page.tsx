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
import { useState, useEffect, useRef } from "react";
import CharacterSearch from "@/components/shared/CharacterSearch";
import { bankais, type Bankai } from "@/lib/bankai.data"
import { type Character, characters } from "@/lib/characters.data";
import WinnerCard from "@/components/shared/WinnerCard";
import TriesContainer from "@/components/shared/TriesContainer";

export default function BankaiModePage() {
    const [attemptFirstHint, setAttemptFirstHint] = useState(4);
    const [attemptSecondHint, setAttemptSecondHint] = useState(7);
    const [randomBankai, setRandomBankai] = useState<Bankai | null>(null);
    const [charactersPlayed, setCharactersPlayed] = useState<Character[]>([]);

    const winnerCardRef = useRef<HTMLDivElement>(null);
    const characterTries = charactersPlayed.slice().reverse();
    const winningCharacter = charactersPlayed.find((char) => char.id === randomBankai?.characterId);
    const characterToGuess = characters.find((char) => char.id === randomBankai?.characterId);

    //random du bankai du jour au 1er render
    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * bankais.length);
        setRandomBankai(bankais[randomIndex]);
    }, []);

    //scroll fluide vers la carte de victoire dès qu'elle apparaît dans le DOM
    useEffect(() => {
        if (winningCharacter && winnerCardRef.current) {
            winnerCardRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }, [winningCharacter]);

    const handleCharacterSelected = (character: Character) => {
        setCharactersPlayed(prev => [...prev, character]);

        const isWinningGuess = character.id === randomBankai?.characterId;
        if (isWinningGuess) {
            return;
        }

        if (attemptFirstHint > 0) {
            setAttemptFirstHint(prev => prev - 1);
        } else if (attemptSecondHint > 0) {
            setAttemptSecondHint(prev => prev - 1);
        }
    };

    return (
        <div className="px-4 pb-12">
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
                    {charactersPlayed.length >= 1 && <Hints
                        hint1={{
                            icon: <Shield />,
                            description: attemptFirstHint === 0 ?
                                `rang: ${characterToGuess?.position}`
                                : "Indice du rang de l'utilisateur dans " + attemptFirstHint + " essais"
                        }}
                        hint2={{
                            icon: <Languages />,
                            description: "Indice du bankai traduit dans " + attemptSecondHint + " essais"
                        }} />}
                </CardContent>
                <CardFooter>
                    <p>Les données vont jusqu'à la fin de l'arc Thousand-Year Blood War</p>
                </CardFooter>
            </Card>

            {/* On masque la recherche si la partie est gagnée */}
            {!winningCharacter && (
                <CharacterSearch
                    charactersPlayed={charactersPlayed}
                    onSelect={handleCharacterSelected}
                    allowedCharacterIds={bankais.map(b => b.characterId)}
                />
            )}

            {characterTries.map(character => {
                const isWin = randomBankai?.characterId === character.id;
                return <TriesContainer
                    key={character.id}
                    characterTry={character}
                    isWin={isWin} />
            })}

            {winningCharacter && (
                <div ref={winnerCardRef} className="max-w-lg mx-auto mt-6">
                    <WinnerCard
                        tries={characterTries.length}
                        characterToGuess={winningCharacter}
                        gamemode={{ name: "Citations", link: "/quotes" }} />
                </div>
            )}
        </div>
    );
}
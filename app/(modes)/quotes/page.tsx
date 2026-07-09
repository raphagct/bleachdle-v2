"use client";

import { User, BookOpen } from "lucide-react";
import Hints from "@/components/shared/Hints";
import {
    Card,
    CardTitle,
    CardContent,
    CardFooter,
    CardHeader
} from "@/components/ui/card";
import { useState, useEffect, useRef } from "react";
import CharacterSearch from "@/components/shared/CharacterSearch";
import { quotes, type Quote } from "@/lib/quotes.data";
import { type Character } from "@/lib/characters.data";
import WinnerCard from "@/components/shared/WinnerCard";
import TriesContainer from "@/components/shared/TriesContainer";

export default function QuotesModePage() {
    const [attemptFirstHint, setAttemptFirstHint] = useState(4);
    const [attemptSecondHint, setAttemptSecondHint] = useState(7);
    const [randomQuote, setRandomQuote] = useState<Quote | null>(null);
    const [charactersPlayed, setCharactersPlayed] = useState<Character[]>([]);

    const winnerCardRef = useRef<HTMLDivElement>(null);
    const characterTries = charactersPlayed.slice().reverse();
    const winningCharacter = charactersPlayed.find((char) => char.id === randomQuote?.character_id);

    // Random de la citation du jour au 1er render
    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        setRandomQuote(quotes[randomIndex]);
    }, []);

    // Scroll fluide vers la carte de victoire dès qu'elle apparaît dans le DOM
    useEffect(() => {
        if (winningCharacter && winnerCardRef.current) {
            winnerCardRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }, [winningCharacter]);

    const handleCharacterSelected = (character: Character) => {
        setCharactersPlayed(prev => [...prev, character]);

        const isWinningGuess = character.id === randomQuote?.character_id;
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
                    <CardTitle>Quel personnage a prononcé cette citation ?</CardTitle>
                </CardHeader>
                <CardContent>
                    <blockquote className="mb-4 border-l-4 border-primary pl-6 py-2">
                        <p className="text-xl font-serif italic text-foreground leading-relaxed">
                            "{randomQuote?.quote}"
                        </p>
                    </blockquote>
                    <Hints
                        hint1={{
                            icon: <User />,
                            description: attemptFirstHint === 0
                                ? `Destinataire : ${randomQuote?.destinataire}`
                                : `Indice du destinataire dans ${attemptFirstHint} essai${attemptFirstHint > 1 ? "s" : ""}`
                        }}
                        hint2={{
                            icon: <BookOpen />,
                            description: attemptSecondHint === 0
                                ? `Arc : ${randomQuote?.arc}`
                                : `Indice d'arc dans ${attemptSecondHint} essai${attemptSecondHint > 1 ? "s" : ""}`
                        }} />
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
                    allowedCharacterIds={quotes.map(quote => quote.character_id)}
                />
            )}

            {characterTries.map(character => {
                const isWin = randomQuote?.character_id === character.id;
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
                        gamemode={{ name: "Techniques", link: "/techniques" }} />
                </div>
            )}
        </div>
    );
}
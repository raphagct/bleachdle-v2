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
import { useEffect, useState } from "react";
import CharacterSearch from "@/components/shared/CharacterSearch";
import { quotes, type Quote } from "@/lib/quotes.data"
import { characters, type Character } from "@/lib/characters.data";
import Image from "next/image";

export default function QuotesModePage() {
    const [attemptFirstHint, setAttemptFirstHint] = useState(4);
    const [attemptSecondHint, setAttemptSecondHint] = useState(7);
    const [randomQuote, setRandomQuote] = useState<Quote | null>(null)
    const [charactersPlayed, setCharactersPlayed] = useState<Character[]>([])
    const characterTries = charactersPlayed.slice().reverse()


    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * quotes.length)
        setRandomQuote(quotes[randomIndex])
    }, []);

    const handleCharacterSelected = (character: Character) => {
        setCharactersPlayed((prev) => [...prev, character])
    }


    return <div className="px-4">
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
                        description: "Indice du destinataire dans " + attemptFirstHint + " essais"
                    }}
                    hint2={{
                        icon: <BookOpen />,
                        description: "Indice d'arc dans " + attemptSecondHint + " essais"
                    }} />
            </CardContent>
            <CardFooter>
                <p>Les données vont jusqu'à la fin de l'arc Thousand-Year Blood War</p>
            </CardFooter>
        </Card>
        <CharacterSearch
            charactersPlayed={charactersPlayed}
            onSelect={handleCharacterSelected}
            allowedCharacterIds={quotes.map((quotes) => quotes.character_id)} />
        {charactersPlayed.length > 0 && characterTries.map((character) => {
            const isWin = character.id === randomQuote?.character_id;
            return <div key={character.id}
                className="max-w-lg mx-auto mt-4 p-4 gap-4 border rounded-lg flex items-center justify-center font-semibold text-white"
                style={{ background: isWin ? "green" : "red" }}>
                <Image
                    src={character.image_url}
                    alt={character.name + " icon"}
                    width={60}
                    height={60} />
                <span>{character.name}</span>
            </div>
        })

        }


    </div>
}
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
import { useState } from "react"
import CharacterSearch from "@/components/shared/CharacterSearch";
import { Character, characters } from "@/lib/characters.data";
import CharacterTable from "./CharacterTable";

export default function CharactersModePage() {
    const [attemptFirstHint, setAttemptFirstHint] = useState(4);
    const [attemptSecondHint, setAttemptSecondHint] = useState(7);
    const [charactersPlayed, setCharactersPlayed] = useState<Character[]>([])

    const charactersTries = charactersPlayed.slice().reverse()

    const handleSelectCharacter = (character: Character) => {
        setCharactersPlayed(prev => [...prev, character])
    }


    return <div className="px-4">
        <Card className="max-w-lg mx-auto">
            <CardHeader>
                <CardTitle>Devine le personnage de Bleach d'aujourd'hui!</CardTitle>
            </CardHeader>
            <CardContent>
                <Hints
                    hint1={{
                        icon: <Activity />,
                        description: "Indice de l'état vital dans " + attemptFirstHint + " essais"
                    }}
                    hint2={{
                        icon: <EyeOff />,
                        description: "Indice du personnage flouté dans " + attemptSecondHint + " essais"
                    }} />
            </CardContent>
            <CardFooter>
                <p>Les données vont jusqu'à la fin de l'arc Thousand-Year Blood War</p>
            </CardFooter>
        </Card>
        <CharacterSearch charactersPlayed={charactersPlayed}
            onSelect={handleSelectCharacter}
            allowedCharacterIds={characters.map(char => char.id)} />
        {charactersPlayed.length > 0 && <CharacterTable characters={charactersTries} />}

    </div>
}
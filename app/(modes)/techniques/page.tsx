"use client";

import {
    Card,
    CardTitle,
    CardContent,
    CardFooter,
    CardHeader
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

import { techniques, type Technique } from "@/lib/techniques.data";
import { cn } from "@/lib/utils";
import Image from 'next/image';
import { useEffect, useState, useRef } from "react";
import CharacterSearch from "@/components/shared/CharacterSearch";
import { Character } from "@/lib/characters.data";
import TriesContainer from "@/components/shared/TriesContainer";
import WinnerCard from "@/components/shared/WinnerCard";

export default function TechniquesModePage() {
    const [randomTechnique, setRandomTechnique] = useState<Technique | null>(null)
    const [showColors, setShowColors] = useState(true)
    const [progressiveUnblur, setProgressiveUnblur] = useState(true)
    const [charactersPlayed, setCharactersPlayed] = useState<Character[]>([])

    const winnerCardRef = useRef<HTMLDivElement>(null)
    const characterTries = charactersPlayed.slice().reverse()
    const winningCharacter = charactersPlayed.find(char => char.id === randomTechnique?.character_id)

    const handleCharacterSelected = (character: Character) => {
        setCharactersPlayed(prev => [...prev, character])
    }

    const getBlurPixels = () => {
        if (winningCharacter) return 0;
        if (!progressiveUnblur) return 8;
        const initialBlur = 12;
        const reductionPerTry = 1.5;
        return Math.max(0, initialBlur - characterTries.length * reductionPerTry);
    };

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * techniques.length)
        setRandomTechnique(techniques[randomIndex])
    }, [])

    useEffect(() => {
        if (winningCharacter && winnerCardRef.current) {
            winnerCardRef.current.scrollIntoView({ behavior: "smooth", block: "center" })
        }
    }, [winningCharacter])

    return <div className="px-4 pb-12">
        <Card className="max-w-lg mx-auto">
            <CardHeader>
                <CardTitle>Quel personnage exécute cette technique ?</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
                {randomTechnique && (
                    <Image
                        className={cn(
                            "transition-all duration-500",
                            !showColors && "grayscale"
                        )}
                        src={randomTechnique.gif_url}
                        alt="solution du jour"
                        width={360}
                        height={360}
                        style={{
                            padding: "1rem",
                            objectFit: "contain",
                            filter: `blur(${getBlurPixels()}px)`
                        }}
                    />
                )}
                <div className="flex justify-center gap-8 w-full">
                    <div className="flex flex-col items-center gap-2 max-w-[120px]">
                        <Switch id="show-colors" checked={showColors} onCheckedChange={setShowColors} />
                        <Label htmlFor="show-colors" className="text-xs text-muted-foreground text-center">Afficher les couleurs</Label>
                    </div>
                    <div className="flex flex-col items-center gap-2 max-w-[120px]">
                        <Switch id="unblur" checked={progressiveUnblur} onCheckedChange={setProgressiveUnblur} />
                        <Label htmlFor="unblur" className="text-xs text-muted-foreground text-center">Chaque essai rend l'image un peu moins floue</Label>
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <p>Les données vont jusqu'à la fin de l'arc Thousand-Year Blood War</p>
            </CardFooter>
        </Card>

        {!winningCharacter && (
            <CharacterSearch
                charactersPlayed={charactersPlayed}
                onSelect={handleCharacterSelected}
                allowedCharacterIds={techniques.map(technique => technique.character_id)}
            />
        )}

        {characterTries.map(character => {
            const isCharFound = randomTechnique?.character_id === character.id;
            return <TriesContainer
                key={character.id}
                characterTry={character}
                isWin={isCharFound} />
        })}

        {winningCharacter && (
            <div ref={winnerCardRef} className="max-w-lg mx-auto mt-6">
                <WinnerCard
                    tries={characterTries.length}
                    characterToGuess={winningCharacter}
                    gamemode={{ name: "Menu Principal", link: "/" }} />
            </div>
        )}
    </div>
}
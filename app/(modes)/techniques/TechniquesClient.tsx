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
import Image from 'next/image';
import { useEffect, useState, useRef } from "react";
import CharacterSearch from "@/components/shared/CharacterSearch";
import TriesContainer from "@/components/shared/TriesContainer";
import WinnerCard from "@/components/shared/WinnerCard";
import DailyStatsBanner from "@/components/shared/DailyStatsBanner";
import type { CharacterPublic } from "@/lib/characters.public";
import { verifyTechniqueGuess } from "@/lib/actions/techniques.actions";
import { incrementDailyWinnersCount, type YesterdayCharacterInfo } from "@/lib/stats.server";
import type { SimpleGuessResult } from "@/lib/actions/types";
import { useDailyGameState } from "@/lib/hooks/useDailyGameState";

type TechniquesClientProps = {
    gifUrl: string;
    nextResetTimestamp: number;
    allowedCharacterIds: number[];
    yesterdayCharacter: YesterdayCharacterInfo;
    initialWinnersCount: number;
};

export default function TechniquesClient({ gifUrl, nextResetTimestamp, allowedCharacterIds, yesterdayCharacter, initialWinnersCount }: TechniquesClientProps) {
    const { state, isLoaded, addGuess } = useDailyGameState<SimpleGuessResult>("techniques");
    const [winnersCount, setWinnersCount] = useState(initialWinnersCount);
    const [showColors, setShowColors] = useState(true);
    const [progressiveUnblur, setProgressiveUnblur] = useState(true);
    const winnerCardRef = useRef<HTMLDivElement>(null);
    const characterTries = state.guesses.slice().reverse();

    const getBlurPixels = () => {
        if (state.won) return 0;
        if (!progressiveUnblur) return 8;
        const initialBlur = 12;
        const reductionPerTry = 1.5;
        return Math.max(0, initialBlur - state.guesses.length * reductionPerTry);
    };

    useEffect(() => {
        if (state.won && isLoaded) {
            const timeoutId = setTimeout(() => {
                winnerCardRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
            }, 1200);
            return () => clearTimeout(timeoutId);
        }
    }, [state.won, isLoaded]);

    const handleCharacterSelected = async (character: CharacterPublic) => {
        if (state.won) return;

        const result = await verifyTechniqueGuess(character.id);
        if (result.correct && !state.won) {
            incrementDailyWinnersCount("techniques").then((newCount) => setWinnersCount(newCount));
        }
        addGuess(result, result.correct, {
            name: result.characterName,
            image_url: result.characterImageUrl
        });
    };

    if (!isLoaded) {
        return (
            <div className="px-4 pb-12 flex justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="px-4 pb-12">
            <Card className="max-w-lg mx-auto">
                <CardHeader>
                    <CardTitle>Quel personnage exécute cette technique ?</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-4">
                    <Image
                        className="transition-all duration-500 will-change-filter transform-gpu"
                        src={gifUrl}
                        alt="solution du jour"
                        width={360}
                        height={360}
                        priority
                        unoptimized
                        style={{
                            padding: "1rem",
                            objectFit: "contain",
                            maxWidth: "100%",
                            height: "auto",
                            filter: `${!showColors ? "grayscale(100%) " : ""}blur(${getBlurPixels()}px)`
                        }}
                    />
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

            {!state.won && (
                <CharacterSearch
                    playedIds={state.guesses.map(g => g.characterId)}
                    onSelect={handleCharacterSelected}
                    allowedCharacterIds={allowedCharacterIds}
                />
            )}

            {characterTries.map(guess => (
                <TriesContainer
                    key={guess.characterId}
                    characterTry={guess}
                    isWin={guess.correct}
                />
            ))}

            {state.won && state.winningCharacter && (
                <div ref={winnerCardRef} className="max-w-lg mx-auto mt-6">
                    <WinnerCard
                        tries={state.guesses.length}
                        characterToGuess={state.winningCharacter}
                        gamemode={{ name: "Menu Principal", link: "/" }}
                        nextResetTimestamp={nextResetTimestamp}
                    />
                </div>
            )}

            <DailyStatsBanner yesterdayCharacter={yesterdayCharacter} winnersCount={winnersCount} />
        </div>
    );
}

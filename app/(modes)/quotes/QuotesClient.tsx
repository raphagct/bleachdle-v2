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
import { useEffect, useRef, useState } from "react";
import CharacterSearch from "@/components/shared/CharacterSearch";
import WinnerCard from "@/components/shared/WinnerCard";
import TriesContainer from "@/components/shared/TriesContainer";
import DailyStatsBanner from "@/components/shared/DailyStatsBanner";
import type { CharacterPublic } from "@/lib/characters.public";
import { verifyQuoteGuess, getQuoteHint } from "@/lib/actions/quotes.actions";
import { incrementDailyWinnersCount, type YesterdayCharacterInfo } from "@/lib/stats.server";
import type { SimpleGuessResult } from "@/lib/actions/types";
import { useDailyGameState } from "@/lib/hooks/useDailyGameState";

type QuotesClientProps = {
    quoteText: string;
    nextResetTimestamp: number;
    allowedCharacterIds: number[];
    yesterdayCharacter: YesterdayCharacterInfo;
    initialWinnersCount: number;
};

export default function QuotesClient({ quoteText, nextResetTimestamp, allowedCharacterIds, yesterdayCharacter, initialWinnersCount }: QuotesClientProps) {
    const { state, isLoaded, addGuess, saveHints } = useDailyGameState<SimpleGuessResult>("quotes");
    const [winnersCount, setWinnersCount] = useState(initialWinnersCount);
    const winnerCardRef = useRef<HTMLDivElement>(null);
    const characterTries = state.guesses.slice().reverse();

    useEffect(() => {
        if (state.won && isLoaded) {
            const timeoutId = setTimeout(() => {
                winnerCardRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
            }, 1200);
            return () => clearTimeout(timeoutId);
        }
    }, [state.won, isLoaded]);

    useEffect(() => {
        if (!isLoaded) return;

        if (state.guesses.length >= 4 && !state.hint1Text) {
            getQuoteHint(1, state.guesses.length).then((res) => {
                if (res.hint) saveHints({ hint1Text: res.hint });
            });
        }
        if (state.guesses.length >= 7 && !state.hint2Text) {
            getQuoteHint(2, state.guesses.length).then((res) => {
                if (res.hint) saveHints({ hint2Text: res.hint });
            });
        }
    }, [state.guesses.length, isLoaded, state.hint1Text, state.hint2Text, saveHints]);

    const handleCharacterSelected = async (character: CharacterPublic) => {
        if (state.won) return;

        const result = await verifyQuoteGuess(character.id);
        if (result.correct && !state.won) {
            incrementDailyWinnersCount("quotes").then((newCount) => setWinnersCount(newCount));
        }
        addGuess(result, result.correct, {
            name: result.characterName,
            image_url: result.characterImageUrl
        });
    };

    const remainingFirstHint = Math.max(0, 4 - state.guesses.length);
    const remainingSecondHint = Math.max(0, 7 - state.guesses.length);

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
                    <CardTitle>Quel personnage a prononcé cette citation ?</CardTitle>
                </CardHeader>
                <CardContent>
                    <blockquote className="mb-4 border-l-4 border-primary pl-6 py-2">
                        <p className="text-xl font-serif italic text-foreground leading-relaxed">
                            "{quoteText}"
                        </p>
                    </blockquote>
                    {state.guesses.length >= 1 && (
                        <Hints
                            hint1={{
                                icon: <User />,
                                description: remainingFirstHint === 0
                                    ? "Indice du destinataire"
                                    : `Indice du destinataire dans ${remainingFirstHint} essai${remainingFirstHint > 1 ? "s" : ""}`,
                                hint: state.hint1Text || "Chargement...",
                                isUnlocked: remainingFirstHint === 0
                            }}
                            hint2={{
                                icon: <BookOpen />,
                                description: remainingSecondHint === 0
                                    ? "Indice d'arc"
                                    : `Indice d'arc dans ${remainingSecondHint} essai${remainingSecondHint > 1 ? "s" : ""}`,
                                hint: state.hint2Text || "Chargement...",
                                isUnlocked: remainingSecondHint === 0
                            }}
                        />
                    )}
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
                        gamemode={{ name: "Techniques", link: "/techniques" }}
                        nextResetTimestamp={nextResetTimestamp}
                    />
                </div>
            )}

            <DailyStatsBanner yesterdayCharacter={yesterdayCharacter} winnersCount={winnersCount} />
        </div>
    );
}

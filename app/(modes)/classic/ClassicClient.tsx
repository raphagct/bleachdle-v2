"use client";

import { Activity, EyeOff } from "lucide-react";
import Hints from "@/components/shared/Hints";
import {
  Card,
  CardTitle,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";
import CharacterSearch from "@/components/shared/CharacterSearch";
import ClassicTable from "./ClassicTable";
import WinnerCard from "@/components/shared/WinnerCard";
import DailyStatsBanner from "@/components/shared/DailyStatsBanner";
import Image from "next/image";
import type { CharacterPublic } from "@/lib/characters.public";
import { verifyClassicGuess, getClassicHint } from "@/lib/actions/classic.actions";
import { incrementDailyWinnersCount, type YesterdayCharacterInfo } from "@/lib/stats.server";
import type { ClassicGuessResult } from "@/lib/actions/types";
import { useDailyGameState } from "@/lib/hooks/useDailyGameState";

type ClassicClientProps = {
  nextResetTimestamp: number;
  allowedCharacterIds: number[];
  yesterdayCharacter: YesterdayCharacterInfo;
  initialWinnersCount: number;
};

export default function ClassicClient({
  nextResetTimestamp,
  allowedCharacterIds,
  yesterdayCharacter,
  initialWinnersCount,
}: ClassicClientProps) {
  const { state, isLoaded, addGuess, saveHints } =
    useDailyGameState<ClassicGuessResult>("classic");
  const [winnersCount, setWinnersCount] = useState(initialWinnersCount);

  const winnerCardRef = useRef<HTMLDivElement>(null);
  const characterTries = state.guesses.slice().reverse();

  // Scroll fluide vers la carte de victoire après 1200ms
  useEffect(() => {
    if (state.won && isLoaded) {
      const timeoutId = setTimeout(() => {
        winnerCardRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 1200);
      return () => clearTimeout(timeoutId);
    }
  }, [state.won, isLoaded]);

  // Récupérer les indices automatiquement quand le nombre d'essais requis est atteint
  useEffect(() => {
    if (!isLoaded) return;

    if (state.guesses.length >= 4 && !state.hint1Text) {
      getClassicHint(1, state.guesses.length).then((res) => {
        if (res.hint) {
          saveHints({ hint1Text: res.hint });
        }
      });
    }

    if (state.guesses.length >= 7 && !state.hint2Text) {
      getClassicHint(2, state.guesses.length).then((res) => {
        if (res.hint || res.imageUrl) {
          saveHints({ hint2Text: res.hint, hint2Image: res.imageUrl });
        }
      });
    }
  }, [state.guesses.length, isLoaded, state.hint1Text, state.hint2Text, saveHints]);

  const handleSelectCharacter = async (character: CharacterPublic) => {
    if (state.won) return;

    const result = await verifyClassicGuess(character.id);
    if (result.correct && !state.won) {
      incrementDailyWinnersCount("classic").then((newCount) => setWinnersCount(newCount));
    }
    addGuess(result, result.correct, {
      name: result.characterName,
      image_url: result.characterImageUrl,
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
          <CardTitle>Devine le personnage de Bleach d'aujourd'hui !</CardTitle>
        </CardHeader>
        <CardContent>
          {state.guesses.length >= 1 && (
            <Hints
              hint1={{
                icon: <Activity />,
                description:
                  remainingFirstHint === 0
                    ? "Indice de l'état vital"
                    : `Indice de l'état vital dans ${remainingFirstHint} essai${remainingFirstHint > 1 ? "s" : ""}`,
                hint: state.hint1Text || "Chargement...",
                isUnlocked: remainingFirstHint === 0,
              }}
              hint2={{
                icon: <EyeOff />,
                description:
                  remainingSecondHint === 0
                    ? "Indice du personnage flouté"
                    : `Indice du personnage flouté dans ${remainingSecondHint} essai${remainingSecondHint > 1 ? "s" : ""}`,
                hint: state.hint2Image ? (
                  <div className="flex flex-col items-center justify-center gap-1">
                    <Image
                      src={state.hint2Image}
                      alt="Personnage flouté"
                      width={56}
                      height={56}
                      className="rounded-lg object-cover w-14 h-14 blur-[6px] shadow-sm"
                      style={{ width: "auto", height: "auto" }}
                    />
                    <span className="text-xs text-muted-foreground">
                      Photo floutée de la cible
                    </span>
                  </div>
                ) : (
                  state.hint2Text || "Chargement..."
                ),
                isUnlocked: remainingSecondHint === 0,
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
          playedIds={state.guesses.map((g) => g.characterId)}
          onSelect={handleSelectCharacter}
          allowedCharacterIds={allowedCharacterIds}
        />
      )}

      {state.guesses.length > 0 && <ClassicTable guesses={characterTries} />}

      {state.won && state.winningCharacter && (
        <div ref={winnerCardRef} className="max-w-lg mx-auto mt-6">
          <WinnerCard
            tries={state.guesses.length}
            characterToGuess={state.winningCharacter}
            gamemode={{ name: "Bankai", link: "/bankai" }}
            nextResetTimestamp={nextResetTimestamp}
          />
        </div>
      )}

      <DailyStatsBanner yesterdayCharacter={yesterdayCharacter} winnersCount={winnersCount} />
    </div>
  );
}

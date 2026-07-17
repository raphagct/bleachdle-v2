"use client";

import { useState, useEffect } from "react";
import { getTodayDateString } from "@/lib/game.server"; // Note: we can't import server functions directly inside use client if they aren't marked or if they use node-only stuff, but getTodayDateString is purely date calculation. Let's write a pure client date string getter or safe utility.

function getClientTodayString(): string {
  return new Date().toLocaleDateString("en-CA", { timeZone: "Europe/Paris" });
}

export interface DailyGameState<TGuess> {
  guesses: TGuess[];
  won: boolean;
  winningCharacter?: {
    name: string;
    image_url: string;
  };
  hint1Text?: string | null;
  hint2Text?: string | null;
  hint2Image?: string | null;
}

export function useDailyGameState<TGuess>(mode: string) {
  const [state, setState] = useState<DailyGameState<TGuess>>({
    guesses: [],
    won: false,
  });
  const [isLoaded, setIsLoaded] = useState(false);

  const today = getClientTodayString();
  const storageKey = `bleachdle-${mode}-${today}`;

  useEffect(() => {
    // 1. Nettoyer les anciennes clés des jours précédents pour ce mode
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(`bleachdle-${mode}-`) && key !== storageKey) {
          localStorage.removeItem(key);
        }
      }
    } catch {
      // Ignorer les erreurs localStorage (ex: mode navigation privée stricte)
    }

    // 2. Charger la partie du jour si elle existe
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed: DailyGameState<TGuess> = JSON.parse(saved);
        setState(parsed);
      }
    } catch {
      // Ignorer si corrompu
    } finally {
      setIsLoaded(true);
    }
  }, [storageKey, mode]);

  const saveState = (newState: DailyGameState<TGuess>) => {
    setState(newState);
    try {
      localStorage.setItem(storageKey, JSON.stringify(newState));
    } catch {
      // Ignorer
    }
  };

  const addGuess = (
    guess: TGuess,
    isWin: boolean,
    winningChar?: { name: string; image_url: string }
  ) => {
    const nextState: DailyGameState<TGuess> = {
      ...state,
      guesses: [...state.guesses, guess],
      won: state.won || isWin,
      winningCharacter: isWin ? winningChar : state.winningCharacter,
    };
    saveState(nextState);
    return nextState;
  };

  const saveHints = (updates: {
    hint1Text?: string | null;
    hint2Text?: string | null;
    hint2Image?: string | null;
  }) => {
    const nextState: DailyGameState<TGuess> = {
      ...state,
      ...updates,
    };
    saveState(nextState);
  };

  return {
    state,
    isLoaded,
    addGuess,
    saveHints,
  };
}

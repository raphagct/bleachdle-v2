"use server";

import { quotes } from "@/lib/quotes.data";
import { characters } from "@/lib/characters.data";
import { getDailyIndex, getNextResetTimestamp } from "@/lib/game.server";
import type { SimpleGuessResult, HintResult } from "./types";

function getDailyQuoteInternal() {
  const index = getDailyIndex("quotes", quotes.length);
  return quotes[index];
}

export async function getDailyQuote(): Promise<{ quote: string }> {
  const q = getDailyQuoteInternal();
  return { quote: q.quote };
}

export async function verifyQuoteGuess(characterId: number): Promise<SimpleGuessResult> {
  const q = getDailyQuoteInternal();
  const guessCharacter = characters.find((c) => c.id === characterId);

  if (!guessCharacter) {
    throw new Error(`Character not found`);
  }

  return {
    correct: characterId === q.character_id,
    characterId: guessCharacter.id,
    characterName: guessCharacter.name,
    characterImageUrl: guessCharacter.image_url,
  };
}

export async function getQuoteHint(
  hintNumber: 1 | 2,
  attemptsCount: number
): Promise<HintResult> {
  const thresholds = { 1: 4, 2: 7 };
  if (attemptsCount < thresholds[hintNumber]) {
    return { hint: null };
  }

  const q = getDailyQuoteInternal();

  if (hintNumber === 1) {
    return { hint: `Destinataire : ${q.destinataire}` };
  }
  return { hint: `Arc : ${q.arc}` };
}

export async function getQuoteNextReset(): Promise<number> {
  return getNextResetTimestamp();
}

export async function getAllowedQuoteIds(): Promise<number[]> {
  return quotes.map((q) => q.character_id);
}

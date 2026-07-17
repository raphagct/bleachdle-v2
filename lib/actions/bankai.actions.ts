"use server";

import { bankais } from "@/lib/bankai.data";
import { characters } from "@/lib/characters.data";
import { getDailyIndex, getNextResetTimestamp } from "@/lib/game.server";
import type { SimpleGuessResult, HintResult } from "./types";

function getDailyBankaiInternal() {
  const index = getDailyIndex("bankai", bankais.length);
  return bankais[index];
}

export async function getDailyBankai(): Promise<{ name: string }> {
  const bankai = getDailyBankaiInternal();
  return { name: bankai.name };
}

export async function verifyBankaiGuess(characterId: number): Promise<SimpleGuessResult> {
  const bankai = getDailyBankaiInternal();
  const targetCharacter = characters.find((c) => c.id === bankai.characterId);
  const guessCharacter = characters.find((c) => c.id === characterId);

  if (!guessCharacter || !targetCharacter) {
    throw new Error(`Character not found`);
  }

  return {
    correct: characterId === bankai.characterId,
    characterId: guessCharacter.id,
    characterName: guessCharacter.name,
    characterImageUrl: guessCharacter.image_url,
  };
}

export async function getBankaiHint(
  hintNumber: 1 | 2,
  attemptsCount: number
): Promise<HintResult> {
  const thresholds = { 1: 4, 2: 7 };
  if (attemptsCount < thresholds[hintNumber]) {
    return { hint: null };
  }

  const bankai = getDailyBankaiInternal();
  const target = characters.find((c) => c.id === bankai.characterId);

  if (hintNumber === 1) {
    return { hint: `Rang : ${target?.position ?? "Inconnu"}` };
  }
  return { hint: `Traduction : ${bankai.translation || "Non disponible"}` };
}

export async function getBankaiNextReset(): Promise<number> {
  return getNextResetTimestamp();
}

export async function getAllowedBankaiIds(): Promise<number[]> {
  return bankais.map((b) => b.characterId);
}

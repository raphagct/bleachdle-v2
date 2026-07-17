"use server";

import { techniques } from "@/lib/techniques.data";
import { characters } from "@/lib/characters.data";
import { getDailyIndex, getNextResetTimestamp } from "@/lib/game.server";
import type { SimpleGuessResult } from "./types";

function getDailyTechniqueInternal() {
  const index = getDailyIndex("techniques", techniques.length);
  return techniques[index];
}

export async function getDailyTechnique(): Promise<{ gifUrl: string }> {
  const t = getDailyTechniqueInternal();
  return { gifUrl: t.gif_url };
}

export async function verifyTechniqueGuess(characterId: number): Promise<SimpleGuessResult> {
  const t = getDailyTechniqueInternal();
  const guessCharacter = characters.find((c) => c.id === characterId);

  if (!guessCharacter) {
    throw new Error(`Character not found`);
  }

  return {
    correct: characterId === t.character_id,
    characterId: guessCharacter.id,
    characterName: guessCharacter.name,
    characterImageUrl: guessCharacter.image_url,
  };
}

export async function getTechniqueNextReset(): Promise<number> {
  return getNextResetTimestamp();
}

export async function getAllowedTechniqueIds(): Promise<number[]> {
  return techniques.map((t) => t.character_id);
}

"use server";

import { characters, type Character } from "@/lib/characters.data";
import { getDailyIndex, getNextResetTimestamp } from "@/lib/game.server";
import type { ClassicGuessResult, CellFeedback, CellStatus, HintResult } from "./types";

const ARC_ORDER = [
  "Arc du Shinigami Remplaçant",
  "Arc de la Soul Society",
  "Arc Arrancar",
  "Arc du Shinigami Remplaçant Perdu",
  "Arc de la Guerre Sanglante de Mille Ans",
];

function getEspadaRank(pos: string): number {
  if (pos.includes("Cero")) return 0;
  if (pos.includes("Primera")) return 1;
  if (pos.includes("Segunda")) return 2;
  if (pos.includes("Tres")) return 3;
  if (pos.includes("Cuatro")) return 4;
  if (pos.includes("Quinto")) return 5;
  if (pos.includes("Sexta")) return 6;
  if (pos.includes("Séptima")) return 7;
  if (pos.includes("Octava")) return 8;
  if (pos.includes("Novena")) return 9;
  if (pos.includes("Décima")) return 10;
  return -1;
}

function getDailyCharacter(): Character {
  const index = getDailyIndex("classic", characters.length);
  return characters[index];
}

function computeFeedback(guess: Character, target: Character): Record<string, CellFeedback> {
  const feedback: Record<string, CellFeedback> = {};

  // Name
  feedback.name = {
    status: guess.id === target.id ? "correct" : "wrong",
    value: guess.name,
    arrow: null,
  };

  // Simple fields
  const simpleKeys = ["gender", "affiliation"] as const;
  for (const key of simpleKeys) {
    feedback[key] = {
      status: guess[key] === target[key] ? "correct" : "wrong",
      value: String(guess[key]),
      arrow: null,
    };
  }

  // Array fields (race, abilities)
  const arrayKeys = ["race", "abilities"] as const;
  for (const key of arrayKeys) {
    const val1 = guess[key];
    const val2 = target[key];
    let status: CellStatus = "wrong";
    if (val1.length === val2.length && val1.every((item) => val2.includes(item))) {
      status = "correct";
    } else if (val1.some((item) => val2.includes(item))) {
      status = "partial";
    }
    feedback[key] = {
      status,
      value: val1.join(", "),
      arrow: null,
    };
  }

  // Position (with arrows for same hierarchy)
  const pos1 = guess.position;
  const pos2 = target.position;
  if (pos1 === pos2) {
    feedback.position = { status: "correct", value: pos1, arrow: null };
  } else {
    let arrow: "up" | "down" | null = null;
    let status: CellStatus = "wrong";

    // Divisions
    if (pos1.includes("Division") && pos2.includes("Division")) {
      const num1 = parseInt(pos1, 10);
      const num2 = parseInt(pos2, 10);
      if (!isNaN(num1) && !isNaN(num2) && num1 !== num2) {
        arrow = num2 > num1 ? "up" : "down";
      }
      status = "partial";
    }
    // Espada
    else if (pos1.includes("Espada") && pos2.includes("Espada")) {
      const r1 = getEspadaRank(pos1);
      const r2 = getEspadaRank(pos2);
      if (r1 !== -1 && r2 !== -1 && r1 !== r2) {
        arrow = r2 > r1 ? "up" : "down";
      }
      status = "partial";
    }
    // Sternritter
    else if (pos1.startsWith("Sternritter") && pos2.startsWith("Sternritter")) {
      const letter1 = pos1.replace("Sternritter ", "").trim();
      const letter2 = pos2.replace("Sternritter ", "").trim();
      if (letter1 && letter2 && letter1 !== letter2) {
        arrow = letter2.localeCompare(letter1) > 0 ? "up" : "down";
      }
      status = "partial";
    }

    feedback.position = { status, value: pos1, arrow };
  }

  // Introduction arc (with arrows)
  const arc1 = guess.introduction_arc;
  const arc2 = target.introduction_arc;
  if (arc1 === arc2) {
    feedback.introduction_arc = { status: "correct", value: arc1, arrow: null };
  } else {
    const idx1 = ARC_ORDER.indexOf(arc1);
    const idx2 = ARC_ORDER.indexOf(arc2);
    let arrow: "up" | "down" | null = null;
    if (idx1 !== -1 && idx2 !== -1) {
      arrow = idx2 > idx1 ? "up" : "down";
    }
    feedback.introduction_arc = { status: "wrong", value: arc1, arrow };
  }

  return feedback;
}

export async function verifyClassicGuess(characterId: number): Promise<ClassicGuessResult> {
  const target = getDailyCharacter();
  const guess = characters.find((c) => c.id === characterId);

  if (!guess) {
    throw new Error(`Character with id ${characterId} not found`);
  }

  const feedback = computeFeedback(guess, target);

  return {
    correct: guess.id === target.id,
    characterId: guess.id,
    characterName: guess.name,
    characterImageUrl: guess.image_url,
    feedback,
  };
}

export async function getClassicHint(
  hintNumber: 1 | 2,
  attemptsCount: number
): Promise<HintResult> {
  const thresholds = { 1: 4, 2: 7 };
  if (attemptsCount < thresholds[hintNumber]) {
    return { hint: null };
  }

  const target = getDailyCharacter();

  if (hintNumber === 1) {
    return { hint: `Statut vital : ${target.status}` };
  }
  // Hint 2 : image floutée
  return { hint: "Photo floutée de la cible", imageUrl: target.image_url };
}

export async function getClassicNextReset(): Promise<number> {
  return getNextResetTimestamp();
}

export async function getAllowedClassicIds(): Promise<number[]> {
  return characters.map((c) => c.id);
}

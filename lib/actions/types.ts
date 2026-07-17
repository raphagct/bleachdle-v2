/**
 * Types partagés pour les résultats de guess (serveur → client).
 */

export type CellStatus = "correct" | "partial" | "wrong";

export type CellFeedback = {
  status: CellStatus;
  value: string; // la valeur textuelle à afficher dans la cellule
  arrow?: "up" | "down" | null;
};

export type ClassicGuessResult = {
  correct: boolean;
  characterId: number;
  characterName: string;
  characterImageUrl: string;
  feedback: Record<string, CellFeedback>;
};

export type SimpleGuessResult = {
  correct: boolean;
  characterId: number;
  characterName: string;
  characterImageUrl: string;
};

export type HintResult = {
  hint: string | null;
  imageUrl?: string;
};

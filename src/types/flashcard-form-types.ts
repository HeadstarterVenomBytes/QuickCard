export type Difficulty = "easy" | "medium" | "hard";
export type CardType =
  | "question-answer"
  | "true-false"
  | "matching"
  | "multiple-choice";

export interface FlashcardFormData {
  topic: string;
  numberOfCards: number;
  difficultyLevel: Difficulty;
  cardType: CardType;
}

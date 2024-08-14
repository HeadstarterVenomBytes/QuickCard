import { Flashcard } from "./flashcard";

// Generic FlashcardList
export type FlashcardList<T extends Flashcard> = T[];

// Generic FlashcardSet
export interface FlashcardSet<T extends Flashcard> {
  name: string;
  flashcards: FlashcardList<T>;
}

// Generic FlashcardSetList
export type FlashcardSetList<T extends Flashcard> = FlashcardSet<T>[];

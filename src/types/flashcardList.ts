import { Flashcard } from "./flashcard";

export type FlashcardList = Flashcard[];

export interface FlashcardSet {
  name: string;
  flashcards: FlashcardList;
}

export type FlashcardSetList = FlashcardSet[];

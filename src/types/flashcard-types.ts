// Base Flashcard type
export interface Flashcard {
  front: string;
  back: string;
}

// Firestore Flashcard type extending the base Flashcard
// with document id from Firebase
export interface FirestoreFlashcard extends Flashcard {
  id: string;
}

// Generic FlashcardList
export type FlashcardList<T extends Flashcard> = T[];

// Generic FlashcardSet
export interface FlashcardSet<T extends Flashcard> {
  name: string;
  flashcards: FlashcardList<T>;
}

// Generic FlashcardSetList
export type FlashcardSetList<T extends Flashcard> = FlashcardSet<T>[];

// Union type for any Flashcard
export type AnyFlashcard = Flashcard | FirestoreFlashcard;

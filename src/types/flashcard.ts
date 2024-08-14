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

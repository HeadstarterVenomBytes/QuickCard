import React, { useState } from "react";
import { doc, collection, getDoc, writeBatch } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  Flashcard,
  FlashcardSet,
  FlashcardSetList,
} from "@/types/flashcard-types";
import { useFirebaseAuth } from "@/app/context/FirebaseAuthContext";

interface SaveFlashcardsParams {
  flashcardSet: FlashcardSet<Flashcard>;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export function useSaveFlashcards() {
  const { firebaseUser } = useFirebaseAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveFlashcards = async ({
    flashcardSet,
    onSuccess,
    onError,
  }: SaveFlashcardsParams): Promise<void> => {
    if (!firebaseUser) {
      setError("User not authenticated");
      onError?.("User not authenticated");
      return;
    }

    const {
      name: setName,
      topic,
      numberOfCards,
      difficultyLevel,
      cardType,
    } = flashcardSet;

    if (!setName.trim()) {
      setError("Please enter a name for your flashcard set.");
      onError?.("Please enter a name for your flashcard set.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const userDocRef = doc(collection(db, "users"), firebaseUser.uid);
      const userDocSnap = await getDoc(userDocRef);
      const batch = writeBatch(db);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        const updatedSets: FlashcardSetList<Flashcard> = [
          ...(userData?.flashcardSets || []),
          {
            name: setName,
            flashcards: [],
            topic,
            numberOfCards,
            difficultyLevel,
            cardType,
          },
        ];
        batch.update(userDocRef, { flashcardSets: updatedSets });
      } else {
        batch.set(userDocRef, {
          flashcardSets: [
            {
              name: setName,
              flashcards: [],
              topic,
              numberOfCards,
              difficultyLevel,
              cardType,
            },
          ],
        });
      }

      const setDocRef = doc(collection(userDocRef, "flashcardSets"), setName);
      batch.set(setDocRef, {
        name: setName,
        topic,
        numberOfCards,
        difficultyLevel,
        cardType,
      });

      // Save individual flashcards
      flashcardSet.flashcards.forEach((flashcard) => {
        const flashcardDocRef = doc(collection(setDocRef, "flashcards"));
        batch.set(flashcardDocRef, {
          front: flashcard.front,
          back: flashcard.back,
        });
      });

      await batch.commit();
      onSuccess?.();
    } catch (error) {
      console.error("Error saving flashcards:", error);
      setError("An error occurred while saving flashcards. Please try again.");
      onError?.("An error occurred while saving flashcards. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return { saveFlashcards, isLoading, error };
}

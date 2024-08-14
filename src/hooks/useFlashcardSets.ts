import React, { useState, useEffect } from "react";
import { doc, getDoc, setDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  FlashcardSetList,
  FlashcardSet,
  FirestoreFlashcard,
} from "@/types/flashcard-types";
import { useFirebaseAuth } from "@/app/context/FirebaseAuthContext";

export function useFlashcardSets(): {
  flashcardSets: FlashcardSetList<FirestoreFlashcard>;
  isLoading: boolean;
  error: Error | null;
} {
  const { firebaseUser, loading } = useFirebaseAuth();
  const [flashcardSets, setFlashcardSets] = useState<
    FlashcardSetList<FirestoreFlashcard>
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // TODO: type hint the return
  useEffect(() => {
    async function fetchFlashcardSets() {
      if (loading) return;
      if (!firebaseUser) {
        setFlashcardSets([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const userDocRef = doc(collection(db, "users"), firebaseUser.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          const flashcardSetsList = userData.flashcardSets || [];

          const fullSets = await Promise.all(
            flashcardSetsList.map(async (set: { name: string }) => {
              const setDocRef = doc(
                collection(userDocRef, "flashcardSets"),
                set.name
              );
              const setDocSnap = await getDoc(setDocRef);
              if (setDocSnap.exists()) {
                return setDocSnap.data() as FlashcardSet<FirestoreFlashcard>;
              }
              return { name: set.name, flashcards: [] };
            })
          );
          setFlashcardSets(fullSets);
        } else {
          // Initialize user document with empty flashcard set
          await setDoc(userDocRef, { flashcardSets: [] });
          setFlashcardSets([]);
        }
      } catch (error) {
        setError(
          error instanceof Error
            ? error
            : new Error("An error occurred while fetching flashcard sets")
        );
      } finally {
        setIsLoading(false);
      }
    }
    fetchFlashcardSets();
  }, [firebaseUser, loading]);

  return { flashcardSets, isLoading, error };
}

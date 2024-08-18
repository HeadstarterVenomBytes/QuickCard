import React, { useEffect, useState } from "react";
import { doc, collection, getDocs, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  FlashcardList,
  FirestoreFlashcard,
  FlashcardSet,
} from "@/types/flashcard-types";
import { useFirebaseAuth } from "@/app/context/FirebaseAuthContext";

function useFlashcardSet(setId: string | null) {
  const { firebaseUser, loading } = useFirebaseAuth();
  const [flashcardSet, setFlashcardSet] = useState<
    FlashcardSet<FirestoreFlashcard>
  >({
    name: "",
    topic: "",
    numberOfCards: 0,
    difficultyLevel: "easy",
    cardType: "question-answer",
    flashcards: [],
  });

  useEffect(() => {
    async function fetchFlashcards() {
      if (loading) return;
      if (!setId || !firebaseUser) return; // TODO: better error handling

      const userDocRef = doc(collection(db, "users"), firebaseUser.uid);
      const flashcardSetRef = doc(
        collection(userDocRef, "flashcardSets"),
        setId
      );

      try {
        // Fetch the flashcard set document
        const setDocSnap = await getDoc(flashcardSetRef);
        if (!setDocSnap.exists()) {
          console.error("Flaschard set not found");
          return;
        }

        const setData = setDocSnap.data();

        // Fetch the flashcards
        const flashcardsCol = collection(flashcardSetRef, "flashcards");
        const flashcardDocs = await getDocs(flashcardsCol);
        const fetchedFlashcards: FlashcardList<FirestoreFlashcard> = [];

        flashcardDocs.forEach((doc) => {
          fetchedFlashcards.push({
            id: doc.id,
            front: doc.data().front as string,
            back: doc.data().back as string,
          } as FirestoreFlashcard);
        });

        // Construct the full FlashcardSet object
        const fullFlashcardSet: FlashcardSet<FirestoreFlashcard> = {
          name: setData.name,
          topic: setData.topic,
          numberOfCards: setData.numberOfCards,
          difficultyLevel: setData.difficultyLevel,
          cardType: setData.cardType,
          flashcards: fetchedFlashcards,
        };

        setFlashcardSet(fullFlashcardSet);
      } catch (error) {
        console.error("Error fetching flashcard set:", error);
      }
    }

    fetchFlashcards();
  }, [setId, firebaseUser, loading]);

  return flashcardSet;
}

export default useFlashcardSet;

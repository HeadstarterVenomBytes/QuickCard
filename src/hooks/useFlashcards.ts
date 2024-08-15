import React, { useEffect, useState } from "react";
import { doc, collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { FlashcardList, FirestoreFlashcard } from "@/types/flashcard-types";
import { useFirebaseAuth } from "@/app/context/FirebaseAuthContext";

function useFlashcards(setId: string | null) {
  const { firebaseUser, loading } = useFirebaseAuth();
  const [flashcards, setFlashcards] = useState<
    FlashcardList<FirestoreFlashcard>
  >([]);

  useEffect(() => {
    async function fetchFlashcards() {
      if (loading) return;
      if (!setId || !firebaseUser) return; // TODO: better error handling

      const flashcardSetRef = collection(
        doc(collection(db, "users"), firebaseUser.uid),
        "flashcardSets"
      );
      const setDocRef = doc(flashcardSetRef, setId);
      const flashcardsCol = collection(setDocRef, "flashcards");
      const docs = await getDocs(flashcardsCol);
      const fetchedFlashcards: FlashcardList<FirestoreFlashcard> = [];

      docs.forEach((doc) => {
        fetchedFlashcards.push({
          id: doc.id,
          front: doc.data().front as string,
          back: doc.data().back as string,
        } as FirestoreFlashcard);
      });
      setFlashcards(fetchedFlashcards);
    }

    fetchFlashcards();
    
  }, [setId, firebaseUser, loading]);

  return flashcards;
}

export default useFlashcards;

import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { doc, collection, getDocs } from "firebase/firestore";
import db from "@/lib/firebase";
import { FlashcardList, FirestoreFlashcard } from "@/types/flashcard-types";

// TODO: move to utils maybe?
function useFlashcards(setId: string | null) {
  const { user } = useUser();
  const [flashcards, setFlashcards] = useState<
    FlashcardList<FirestoreFlashcard>
  >([]);

  useEffect(() => {
    async function fetchFlashcards() {
      if (!setId || !user) return; // TODO: better error handling

      const flashcardSetRef = collection(
        doc(collection(db, "users"), user.id),
        "flashcardSets"
      );
      const setDocRef = doc(flashcardSetRef, setId);
      const flashcardsCol = collection(setDocRef, "flaschards");
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
  }, [setId, user]);

  return flashcards;
}

export default useFlashcards;

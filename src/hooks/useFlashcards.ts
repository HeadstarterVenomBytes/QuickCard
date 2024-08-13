import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { doc, collection, getDocs } from "firebase/firestore";
import db from "@/lib/firebase";
import { FlashcardList } from "@/types/flashcardList";
import { Flashcard } from "@/types/flashcard";

// TODO: move to utils maybe?
function useFlashcards(setId: string | null) {
  const { user } = useUser();
  const [flashcards, setFlashcards] = useState<FlashcardList>([]);

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
      const fetchedFlashcards: FlashcardList = [];

      docs.forEach((doc) => {
        fetchedFlashcards.push({ id: doc.id, ...doc.data() } as Flashcard);
      });

      setFlashcards(fetchedFlashcards);
    }

    fetchFlashcards();
  }, [setId, user]);

  return flashcards;
}

export default useFlashcards;

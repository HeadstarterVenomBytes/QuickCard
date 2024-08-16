import React, { useEffect, useState } from "react";
import { doc, collection, getDocs, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { FirestoreFlashcard } from "@/types/flashcard-types";
import { useFirebaseAuth } from "@/app/context/FirebaseAuthContext";

function useFlashcard(setId: string | null, flashcardId: string | null) {
    const { firebaseUser, loading } = useFirebaseAuth();
    const [flashcard, setFlashcard] = useState<FirestoreFlashcard>();

    useEffect(() => {
        async function fetchFlashcard() {
            if (loading) return;
            if (!setId || !flashcardId ||  !firebaseUser) return; // TODO: better error handling
      
            const flashcardSetRef = collection(
              doc(collection(db, "users"), firebaseUser.uid),
              "flashcardSets"
            );
            const setDocRef = doc(flashcardSetRef, setId);
            const flashcardsCol = collection(setDocRef, "flashcards");
            const setFlashcardRef = doc(flashcardsCol, flashcardId)
            const flashcardDoc = await getDoc(setFlashcardRef)
            const fetchedFlashcard: FirestoreFlashcard = {
                id: flashcardDoc.id,
                front: flashcardDoc?.data()?.front as string,
                back: flashcardDoc?.data()?.back as string
            }

            setFlashcard(fetchedFlashcard);
        }

        fetchFlashcard();

    }, [setId, flashcardId, firebaseUser, loading])

    return flashcard;
}

export default useFlashcard;
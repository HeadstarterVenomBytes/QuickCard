import { doc, getDoc, setDoc, collection } from "firebase/firestore";
import db from "@/lib/firebase";
import { UserResource } from "@clerk/types";
import { FlashcardSetList, FlashcardSet } from "@/types/flashcardList";

export async function getFlashcardSets(
  user: UserResource | null
): Promise<FlashcardSetList> {
  if (!user) return [];

  const userDocRef = doc(collection(db, "users"), user.id);
  const userDocSnap = await getDoc(userDocRef);

  if (userDocSnap.exists()) {
    const userData = userDocSnap.data();
    const flashcardSets = userData.flashcardSets || [];

    // Fetch full flashcard sets
    const fullSets = await Promise.all(
      flashcardSets.map(async (set: { name: string }) => {
        const setDocRef = doc(
          collection(userDocRef, "flashcardSets"),
          set.name
        );
        const setDocSnap = await getDoc(setDocRef);
        if (setDocSnap.exists()) {
          return setDocSnap.data() as FlashcardSet;
        }
        return { name: set.name, flashcards: [] };
      })
    );

    return fullSets;
  } else {
    // Initialize user document with empty flashcard sets
    await setDoc(userDocRef, { flashcardSets: [] });
    return [];
  }
}

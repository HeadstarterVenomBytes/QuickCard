import { doc, collection, getDoc, writeBatch } from "firebase/firestore";
import db from "@/lib/firebase";
import {
  Flashcard,
  FlashcardSet,
  FlashcardSetList,
} from "@/types/flashcard-types";

interface SaveFlashcardsParams {
  userId: string;
  flashcardSet: FlashcardSet<Flashcard>;
  handleCloseDialog: () => void;
  setSetName: (name: string) => void;
}

export const saveFlashcards = async ({
  userId,
  flashcardSet,
  handleCloseDialog,
  setSetName,
}: SaveFlashcardsParams): Promise<void> => {
  const { name: setName } = flashcardSet;

  if (!setName.trim()) {
    alert("Please enter a name for your flashcard set.");
  }

  try {
    const userDocRef = doc(collection(db, "users"), userId);
    const userDocSnap = await getDoc(userDocRef);

    const batch = writeBatch(db);

    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      const updatedSets: FlashcardSetList<Flashcard> = [
        ...(userData?.flashcardSets || []),
        { name: setName, flashcards: [] },
      ];
      batch.update(userDocRef, { flashcardSets: updatedSets });
    } else {
      batch.set(userDocRef, {
        flashcardSets: [{ name: setName, flashcards: [] }],
      });
    }

    const setDocRef = doc(collection(userDocRef, "flashcardSets"), setName);
    batch.set(setDocRef, { name: setName });

    // Save individual flashcards
    flashcardSet.flashcards.forEach((flashcard, index) => {
      const flashcardDocRef = doc(collection(setDocRef, "flashcards"));
      batch.set(flashcardDocRef, {
        front: flashcard.front,
        back: flashcard.back,
      });
    });

    await batch.commit();

    alert("Flashcards saved succesfully!");
    handleCloseDialog();
    setSetName("");
  } catch (error) {
    console.error("Error saving flashcards:", error);
    alert("An error occurred while saving flashcards. Please try again.");
  }
};

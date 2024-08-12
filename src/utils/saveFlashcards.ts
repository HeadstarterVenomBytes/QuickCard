import { doc, collection, getDoc, writeBatch } from "firebase/firestore";
import db from "@/lib/firebase";
import { FlashcardList } from "@/types/flashcardList";
import { UserResource } from "@clerk/types";

interface FlashcardSet {
  name: string;
  flashcards: FlashcardList;
}

interface SaveFlashcardsParams {
  flashcardSet: FlashcardSet;
  handleCloseDialog: () => void;
  setSetName: (name: string) => void;
}

export const saveFlashcards = async ({
  flashcardSet,
  handleCloseDialog,
  setSetName,
}: SaveFlashcardsParams): Promise<void> => {
  const { name: setName, flashcards } = flashcardSet;

  if (!setName.trim()) {
    alert("Please enter a name for your flashcard set.");
  }

  try {
    const userDocRef = doc(collection(db, "users"), user.id); // TODO: not sure how to handle passing this
    const userDocSnap = await getDoc(userDocRef);

    const batch = writeBatch(db);

    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      const updatedSets = [
        ...(userData?.flashcardSets || []),
        { name: setName },
      ];
      batch.update(userDocRef, { flashcardSets: updatedSets });
    } else {
      batch.set(userDocRef, { flashcardSets: [{ name: setName }] });
    }

    const setDocRef = doc(collection(userDocRef, "flashcardSets"), setName);
    batch.set(setDocRef, { flashcards });

    await batch.commit();

    alert("Flashcards saved succesfully!");
    handleCloseDialog();
    setSetName("");
  } catch (error) {
    console.error("Error saving flashcards:", error);
    alert("An error occurred while saving flashcards. Please try again.");
  }
};

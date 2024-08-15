import { NextRequest, NextResponse } from "next/server";
import { FlashcardFormData } from "@/types/flashcard-form-types";
import { Flashcard, FlashcardList } from "@/types/flashcard-types";
import { generateFlashcards } from "@/utils/generateFlashcardData";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const formData: FlashcardFormData = await req.json();

    const flashcardList: FlashcardList<Flashcard> = await generateFlashcards(
      formData
    );

    return NextResponse.json(flashcardList);
  } catch (error) {
    console.error("Error generating flashcards:", error);
    return NextResponse.json(
      { error: "Error generating flashcards" },
      { status: 500 }
    );
  }
}

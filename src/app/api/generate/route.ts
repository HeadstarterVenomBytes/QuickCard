import { NextRequest, NextResponse } from "next/server";
import { Flashcard, FlashcardList } from "@/types/flashcard-types";
import { generateFlashcards } from "@/utils/generateFlashcardData";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const formData: string = await req.text();

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

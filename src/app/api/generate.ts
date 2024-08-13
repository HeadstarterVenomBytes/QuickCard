import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "openai";
import { ChatCompletionMessageParam } from "openai/src/resources/index.js";
import { FlashcardList } from "@/types/flashcardList";

// TODO: switch this to use LangChain for prompts
const systemPrompt = `
You are a flashcard creator, you take in text and create multiple flashcards from it. Make sure to create exactly 10 flashcards.
Both front and back should be one sentence long.
You should return in the following JSON format:
{
  "flashcards":[
    {
      "front": "Front of the card",
      "back": "Back of the card"
    }
  ]
}
`;

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.NEXT_PUBLIC_OPENROUTER_API_KEY as string,
});

export async function POST(req: NextRequest): Promise<NextResponse> {
  const data = await req.text();

  // Define the conversation structure
  const messages: ChatCompletionMessageParam[] = [
    { role: "system", content: systemPrompt },
    { role: "user", content: data },
  ];

  // Create the OpenAI API request
  const completion = await client.chat.completions.create({
    messages,
    model: "meta-llama/llama-3.1-8b-instruct:free",
    response_format: { type: "json_object" }, // TODO: schema instead?
  });

  // Parse and extract flashcards
  const flashcardsData: { flashcards: FlashcardList } = JSON.parse(
    completion.choices[0]?.message?.content as string
  );

  // Return the flashcards as a JSON response
  return NextResponse.json(flashcardsData.flashcards);
}

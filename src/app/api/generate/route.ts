import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "openai";
import { Flashcard, FlashcardList } from "@/types/flashcard-types";

// TODO: switch this to use LangChain for prompts
const systemPrompt = `
You are a flashcard creator. Your task is to take in text and create exactly 10 flashcards from it. Both the front and back of each card should be one sentence long. 

Your response must consist solely of a JSON object in the following format, with no additional text before or after:

{
  "flashcards": [
    {
      "front": "Front of card 1",
      "back": "Back of card 1"
    },
    {
      "front": "Front of card 2",
      "back": "Back of card 2"
    },
    ...
  ]
}

Ensure that your response contains exactly 10 flashcard objects within the "flashcards" array.
`;

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY as string,
});

export async function POST(req: NextRequest): Promise<NextResponse> {
  const data = await req.text();

  // Define the conversation structure
  const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
    { role: "system", content: systemPrompt },
    { role: "user", content: data },
  ];

  // Create the OpenAI API request
  const completion = await client.chat.completions.create({
    messages: messages,
    model: "meta-llama/llama-3.1-8b-instruct:free",
    response_format: { type: "json_object" }, // TODO: schema instead?
  });

  // Parse and extract flashcards
  const flashcardsData: { flashcards: FlashcardList<Flashcard> } = JSON.parse(
    completion.choices[0]?.message?.content as string
  );

  // Return the flashcards as a JSON response
  return NextResponse.json(flashcardsData.flashcards);
}

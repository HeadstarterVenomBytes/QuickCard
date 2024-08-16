import { ChatOpenAI } from "@langchain/openai";
import { FlashcardFormData, CardType } from "@/types/flashcard-form-types";
import {
  FlashcardList,
  Flashcard,
  FlashcardResponse,
} from "@/types/flashcard-types";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
} from "@langchain/core/prompts";
import { JsonOutputParser } from "@langchain/core/output_parsers";
import {
  basePrompt,
  jsonExample,
  difficultyInstructions,
} from "./prompts/prompts";

function getCardTypeInstructions(cardType: CardType): string {
  switch (cardType) {
    case "question-answer":
      return `- "type" should be "{cardType}"
- "front" should contain a question about the topic in string format
- "back" should contain the answer to that question in string format`;

    case "true-false":
      return `- "type" should be "{cardType}"
- "front" should contain a statement about the topic in string format
- "back" should contain either "True" or "False" in string format`;

    case "matching":
      return `- "type" should be "{cardType}"
- "front" should contain an item related to the topic in string format
- "back" should contain a matching item or concept in string format`;

    case "multiple-choice":
      return `- "type" should be "{cardType}"
- "front" should contain a question about the topic in string format
- "back" should be an object with the following structure:
  {"correct": "Correct answer", "options": ["Incorrect 1", "Incorrect 2", "Incorrect 3"]}`;

    default:
      throw new Error(`Unsupported card type: ${cardType}`);
  }
}

export async function generateFlashcards(
  jsonFormData: string
): Promise<FlashcardList<Flashcard>> {
  const { formData }: { formData: FlashcardFormData } =
    JSON.parse(jsonFormData);

  const prompt = new ChatPromptTemplate({
    promptMessages: [
      SystemMessagePromptTemplate.fromTemplate(basePrompt),
      HumanMessagePromptTemplate.fromTemplate("Generate the flashcards now."),
    ],
    inputVariables: [
      "cardType",
      "numberOfCards",
      "topic",
      "difficultyLevel",
      "difficulty_instructions",
      "json_example",
      "card_type_instructions",
    ],
  });

  // const llm = new ChatOpenAI({ model: "gpt-4o-mini", temperature: 0 });
  const llm = new ChatOpenAI({
    temperature: 0,
    modelName: "meta-llama/llama-3.1-8b-instruct:free",
    openAIApiKey: process.env.OPENROUTER_API_KEY as string,
    configuration: {
      baseURL: "https://openrouter.ai/api/v1",
    },
  });

  const model = llm.bind({
    response_format: { type: "json_object" },
  });

  const parser = new JsonOutputParser<FlashcardResponse>();

  const chain = prompt.pipe(model).pipe(parser);

  const response = await chain.invoke({
    cardType: formData.cardType,
    numberOfCards: formData.numberOfCards,
    topic: formData.topic,
    difficultyLevel: formData.difficultyLevel,
    difficulty_instructions: difficultyInstructions,
    json_example: jsonExample,
    card_type_instructions: getCardTypeInstructions(formData.cardType),
  });

  const flashcardList: FlashcardList<Flashcard> = response?.flashcards.map(
    (flashcard) => {
      let back: string;
      if (
        typeof flashcard === "object" &&
        flashcard.type === "multiple-choice"
      ) {
        // For multiple-choice cards, stringify the back object.
        back = JSON.stringify(flashcard.back);
      } else {
        back = flashcard.back as string;
      }

      return {
        front: flashcard.front,
        back: back,
      };
    }
  );
  return flashcardList;
}

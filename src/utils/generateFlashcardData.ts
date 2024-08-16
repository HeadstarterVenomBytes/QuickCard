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

/**
 * Generates instructions for each flashcard type based on the provided cardType.
 *
 * @param cardType - The type of flashcard to generate instructions for.
 * @returns Instructions specific to the provided cardType.
 */
function getCardTypeInstructions(cardType: CardType): string {
  switch (cardType) {
    case "question-answer":
      return `- "type" should be "{cardType}".
- "front" should contain a question about the topic in string format.
- "back" should contain the answer to that question in string format.`;

    case "true-false":
      return `- "type" should be "{cardType}".
- "front" should contain a statement about the topic in string format.
- "back" should contain either "True" or "False" in string format.`;

    case "matching":
      return `- "type" should be "{cardType}".
- "front" should contain an item related to the topic in string format.
- "back" should contain a matching item or concept in string format.`;

    case "multiple-choice":
      return `- "type" should be "{cardType}".
- "front" should contain a question about the topic in string format.
- "back" should be an object with the following structure:
  {
    "correct": "Correct answer", 
    "options": ["Incorrect 1", "Incorrect 2", "Incorrect 3"]
  }`;

    default:
      throw new Error(`Unsupported card type: ${cardType}`);
  }
}

/**
 * Generates flashcards based on the provided form data.
 *
 * @param jsonFormData - A JSON string containing the form data used to generate flashcards.
 * @returns A promise that resolves to a list of generated flashcards.
 */
export async function generateFlashcards(
  jsonFormData: string
): Promise<FlashcardList<Flashcard>> {
  // Parse the JSON string to extract form data.
  const { formData }: { formData: FlashcardFormData } =
    JSON.parse(jsonFormData);

  // Create a prompt template for generating flashcards
  const prompt = new ChatPromptTemplate({
    promptMessages: [
      // System message with the base prompt template for the task.
      SystemMessagePromptTemplate.fromTemplate(basePrompt),
      // Human message instructing the model to generate flashcards now.
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

  // Configure the Llama 3.1 model through OpenAI with appropriate settings.
  const llm = new ChatOpenAI({
    temperature: 0, // Set temperature to 0 for deterministic output.
    modelName: "meta-llama/llama-3.1-8b-instruct:free",
    openAIApiKey: process.env.OPENROUTER_API_KEY as string,
    configuration: {
      baseURL: "https://openrouter.ai/api/v1",
    },
  });

  // Bind the model to specify the response format.
  const model = llm.bind({
    response_format: { type: "json_object" },
  });

  // Initialize the JSON output parser for parsing the model's responses.
  const parser = new JsonOutputParser<FlashcardResponse>();

  // Create a processing chain with the prompt, model, and parser.
  const chain = prompt.pipe(model).pipe(parser);

  // Invoke the chain with the provided form data and prompts.
  const response = await chain.invoke({
    cardType: formData.cardType,
    numberOfCards: formData.numberOfCards,
    topic: formData.topic,
    difficultyLevel: formData.difficultyLevel,
    difficulty_instructions: difficultyInstructions,
    json_example: jsonExample,
    card_type_instructions: getCardTypeInstructions(formData.cardType),
  });

  // Process the response to format the flashcards.
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
  // Return the formatted list of flashcards.
  return flashcardList;
}

import { ChatOpenAI } from "@langchain/openai";
import { FlashcardFormData } from "@/types/flashcard-form-types";
import { FlashcardList, Flashcard } from "@/types/flashcard-types";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
} from "@langchain/core/prompts";
import { zodToJsonSchema } from "zod-to-json-schema";
import { JsonOutputFunctionsParser } from "langchain/output_parsers";
import {
  zodSchema,
  zodFlashcard,
  zodFlashcardList,
} from "@/types/flashcard-schema";

const basePrompt = `You are a {cardType} flashcard creator. Your task is to generate exactly {numberOfCards} {cardType} flashcards based on {topic}. 

{cardTypeInstructions}

Adjust the content difficulty based on the specified difficulty level: {difficultyLevel}.

Your response must consist solely of a JSON object in the following format, with no additional text before or after:
    
{
  "flashcards": [
    {
      "type": "{cardType}",
      "front": "Front of card 1",
      "back": "Back of card 1"
    },
    {
      "type": "{cardType}",
      "front": "Front of card 2",
      "back": "Back of card 2"
    },
    ...
  ]
}

For multiple-choice cards, the "back" should be an object with "correct" and "options" fields.

{format_instructions}
    
Ensure that your response contains exactly {numberOfCards} flashcard objects within the "flashcards" array.

The topic for these flashcards is: {topic}
`;

const difficultyInstructions = `
Adjust the complexity of the flashcards based on the difficulty level:

- For "easy" difficulty:
  • Use simple vocabulary and straightforward concepts
  • Focus on basic facts and definitions
  • For multiple-choice, make the correct answer more obvious

- For "medium" difficulty:
  • Use more advanced vocabulary and introduce some complexity
  • Include some application of concepts, not just facts
  • For multiple-choice, make distractors more plausible

- For "hard" difficulty:
  • Use technical vocabulary and complex concepts
  • Focus on analysis, synthesis, and evaluation of ideas
  • For multiple-choice, use very plausible distractors
  • Include some edge cases or exceptions to rules

Always ensure the content is accurate and relevant to the topic.
`;

const simplifiedPrompt = `You are a {cardType} flashcard creator. Your task is to generate exactly {numberOfCards} {cardType} flashcards based on {topic}. The difficulty level is {difficultyLevel}.

${difficultyInstructions}

For each flashcard type:
- "question-answer": Create a question on the front and its answer on the back.
- "true-false": Write a statement on the front and "True" or "False" on the back.
- "matching": Put a term or concept on the front and its matching item on the back.
- "multiple-choice": Write a question on the front. On the back, provide the correct answer and three incorrect options.

Ensure all flashcards are factual, clear, and appropriate for the chosen difficulty level.
`;

export async function generateFlashcards(
  formData: FlashcardFormData
): Promise<FlashcardList<Flashcard>> {
  const prompt = new ChatPromptTemplate({
    promptMessages: [
      SystemMessagePromptTemplate.fromTemplate(simplifiedPrompt),
      HumanMessagePromptTemplate.fromTemplate("Generate the flashcards now."),
    ],
    inputVariables: ["cardType", "numberOfCards", "topic", "difficultyLevel"],
  });

  const llm = new ChatOpenAI({ model: "gpt-4o-mini", temperature: 0 });

  const functionCallingModel = llm.bind({
    functions: [
      {
        name: "output_formatter",
        description: "Should always be used to properly format output",
        parameters: zodToJsonSchema(zodSchema),
      },
    ],
    function_call: { name: "output_formatter" },
  });

  const outputParser = new JsonOutputFunctionsParser();

  const chain = prompt.pipe(functionCallingModel).pipe(outputParser);

  const response = await chain.invoke({
    cardType: formData.cardType,
    numberOfCards: formData.numberOfCards,
    topic: formData.topic,
    difficultyLevel: formData.difficultyLevel,
  });

  const zodFlashcardList = response as zodFlashcardList;

  const flashcardList: FlashcardList<Flashcard> =
    zodFlashcardList.flashcards.map((zodFlashcard) => {
      const baseFlashcard: Flashcard = {
        front: zodFlashcard.front,
        back:
          zodFlashcard.type === "multiple-choice"
            ? JSON.stringify(zodFlashcard.back)
            : (zodFlashcard.back as string),
      };
      return baseFlashcard;
    });
  console.log(flashcardList);
  return flashcardList;
}

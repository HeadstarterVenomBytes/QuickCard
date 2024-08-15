import { z } from "zod";

const baseFlashcardSchema = z.object({
  front: z.string().describe("The front side of the flashcard"),
  type: z
    .enum(["question-answer", "true-false", "matching", "multiple-choice"])
    .describe("The type of flashcard"),
});

const questionAnswerFlashcardSchema = baseFlashcardSchema.extend({
  type: z.literal("question-answer"),
  back: z.string().describe("The answer to the question"),
});

const trueFalseFlashcardSchema = baseFlashcardSchema.extend({
  type: z.literal("true-false"),
  back: z
    .enum(["True", "False"])
    .describe("Whether the statement is true or false"),
});

const matchingFlashcardSchema = baseFlashcardSchema.extend({
  type: z.literal("matching"),
  back: z.string().describe("The matching item or concept"),
});

const multipleChoiceFlashcardSchema = baseFlashcardSchema.extend({
  type: z.literal("multiple-choice"),
  back: z
    .object({
      correct: z.string().describe("The correct answer"),
      options: z
        .array(z.string())
        .length(3)
        .describe("Three incorrect options"),
    })
    .describe("The multiple choice options"),
});

const flashcardSchema = z.discriminatedUnion("type", [
  questionAnswerFlashcardSchema,
  trueFalseFlashcardSchema,
  matchingFlashcardSchema,
  multipleChoiceFlashcardSchema,
]);

export const zodSchema = z.object({
  flashcards: z.array(flashcardSchema).describe("An array of flashcards"),
});

export type zodFlashcard = z.infer<typeof flashcardSchema>;
export type zodFlashcardList = z.infer<typeof zodSchema>;

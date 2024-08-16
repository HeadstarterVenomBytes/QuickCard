export const difficultyInstructions = `
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

export const jsonExample = `
{{
  "flashcards": [
    {{
      "type": "{cardType}",
      "front": "Front of card 1",
      "back": "Back of card 1"
    }},
    {{
      "type": "{cardType}",
      "front": "Front of card 2",
      "back": "Back of card 2"
    }},
    ...
  ]
}}
`;

export const basePrompt = `You are a {cardType} flashcard creator. Your task is to generate exactly {numberOfCards} {cardType} flashcards based on {topic}. The difficulty level is {difficultyLevel}.

{difficulty_instructions}

Your response must consist solely of a JSON object in the following format, with no additional text before or after:

{json_example}

For each flashcard object within the "flashcards" array:
{card_type_instructions}
    
Ensure that your response contains exactly {numberOfCards} flashcard objects within the "flashcards" array.


The topic for these flashcards is: {topic}
`;

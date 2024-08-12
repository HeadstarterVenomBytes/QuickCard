"use client";

import React, { useState } from "react";
import { Container, Box } from "@mui/material";
import TypographyHeader from "../components/TypographyHeader";
import TextInput from "../components/TextInput";
import PrimaryButton from "../components/PrimaryButton";
import FlashcardGrid from "../components/FlashcardGrid";
import { Flashcard } from "@/types/flashcard";

export default function Generate(): React.JSX.Element {
  const [text, setText] = useState<string>("");
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);

  const handleSubmit = async (): Promise<void> => {
    if (!text.trim()) {
      alert("Please enter some text to generate flashcards.");
      return;
    }

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        body: text,
      });

      if (!response.ok) {
        throw new Error("Failed to generate flashcards");
      }

      const data: Flashcard[] = await response.json();
      setFlashcards(data);
    } catch (error) {
      console.error("Error generating flashcards:", error);
      alert("An error occured while generating flashcards. Please try again.");
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <TypographyHeader title="Generate Flashcards" />
        <TextInput
          value={text}
          onChange={(e) => setText(e.target.value)}
          label="Enter text"
          multiline
          rows={4}
        />
        <PrimaryButton onClick={handleSubmit}>
          Generate Flashcards
        </PrimaryButton>
      </Box>
      {flashcards.length > 0 && <FlashcardGrid flashcards={flashcards} />}
    </Container>
  );
}

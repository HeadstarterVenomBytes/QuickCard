"use client";

import React, { useState } from "react";
import { Container, Box } from "@mui/material";
import TypographyHeader from "../components/TypographyHeader";
import TextInput from "../components/TextInput";
import PrimaryButton from "../components/PrimaryButton";
import { Flashcard } from "@/types/flashcard";

export default function Generate(): React.JSX.Element {
  const [text, setText] = useState<string>("");
  const [flashcard, setFlashcard] = useState<Flashcard[]>([]);

  const handleSubmit = async (): Promise<void> => {
    // Implement api call here
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

      {/* Add flashcard display here */}
    </Container>
  );
}

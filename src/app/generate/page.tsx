"use client";

import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Container, Box } from "@mui/material";
import TypographyHeader from "../components/TypographyHeader";
import TextInput from "../components/TextInput";
import PrimaryButton from "../components/PrimaryButton";
import GeneratedFlashcardsGrid from "../components/GeneratedFlashcardsGrid";
import { FlashcardList, FlashcardSet } from "@/types/flashcardList";
import { saveFlashcards } from "@/utils/saveFlashcards";
import SaveFlashcardsButton from "../components/SaveFlashcardsButton";
import SaveFlashcardsDialog from "../components/SaveFlashcardsDialog";

export default function Generate(): React.JSX.Element {
  const { user } = useUser();
  const [text, setText] = useState<string>("");
  const [flashcards, setFlashcards] = useState<FlashcardList>([]);
  const [setName, setSetName] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

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

      const data: FlashcardList = await response.json();
      setFlashcards(data);
    } catch (error) {
      console.error("Error generating flashcards:", error);
      alert("An error occured while generating flashcards. Please try again.");
    }
  };

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleSaveFlashCards = async (): Promise<void> => {
    if (!user) {
      alert("You must be signed in to save flashcards.");
      return;
    }
    const newFlashcardSet: FlashcardSet = {
      name: setName,
      flashcards: flashcards,
    };
    await saveFlashcards({
      userId: user.id,
      flashcardSet: newFlashcardSet,
      handleCloseDialog,
      setSetName,
    });
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
      {flashcards.length > 0 && (
        <>
          <GeneratedFlashcardsGrid flashcards={flashcards} />
          <SaveFlashcardsButton onClick={handleOpenDialog} />
        </>
      )}
      <SaveFlashcardsDialog
        open={dialogOpen}
        setName={setName}
        onSetNameChange={(e) => setSetName(e.target.value)}
        onSave={handleSaveFlashCards}
        onClose={handleCloseDialog}
      />
    </Container>
  );
}

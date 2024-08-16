"use client";

import React, { useState } from "react";
import { Container, Box } from "@mui/material";
import TypographyHeader from "../components/TypographyHeader";
import { SelectChangeEvent } from "@mui/material";
import GeneratedFlashcardsGrid from "../components/FlashCardPages/GeneratedFlashcardsGrid";
import {
  Flashcard,
  FlashcardList,
  FlashcardSet,
} from "@/types/flashcard-types";
import { useSaveFlashcards } from "@/hooks/useSaveFlashcards";
import { FlashcardFormData } from "@/types/flashcard-form-types";
import SaveFlashcardsButton from "../components/FlashCardPages/SaveFlashcardsButton";
import SaveFlashcardsDialog from "../components/FlashCardPages/SaveFlashcardsDialog";
import FlashcardForm from "../components/FlashcardForm";
import SideNavBar from "../components/SideNavBar";

export default function Generate(): React.JSX.Element {
  const [formData, setFormData] = useState<FlashcardFormData>({
    topic: "",
    numberOfCards: 10,
    difficultyLevel: "medium",
    cardType: "question-answer",
  });
  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof FlashcardFormData, string>>
  >({});
  const [flashcards, setFlashcards] = useState<FlashcardList<Flashcard>>([]);
  const [setName, setSetName] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const { saveFlashcards, isLoading, error } = useSaveFlashcards();

  const handleChangeInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "numberOfCards" ? parseInt(value, 10) : value,
    }));
    // Clear error when field is changed
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleChangeSelect = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Clear error when field is changed
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FlashcardFormData, string>> = {};
    if (!formData.topic.trim()) {
      newErrors.topic = "Topic is required";
    }
    // TODO: adjust this based on the subscription plan?
    if (formData.numberOfCards < 1 || formData.numberOfCards > 50) {
      newErrors.numberOfCards = "Number of cards must between 1 and 100";
    }
    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (): Promise<void> => {
    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formData }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data: FlashcardList<Flashcard> = await response.json();
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
    const newFlashcardSet: FlashcardSet<Flashcard> = {
      name: setName,
      flashcards: flashcards,
      topic: formData.topic,
      numberOfCards: formData.numberOfCards,
      difficultyLevel: formData.difficultyLevel,
      cardType: formData.cardType,
    };

    await saveFlashcards({
      flashcardSet: newFlashcardSet,
      onSuccess: () => {
        alert("Flashcards saved successfully!");
        handleCloseDialog();
        setSetName("");
      },
      onError: (errorMessage) => {
        alert(errorMessage);
      },
    });
  };

  return (
    <Container maxWidth="lg" sx={{ display: "flex" }}>
      <SideNavBar />
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <TypographyHeader title="Generate Flashcards" />
        <FlashcardForm
          formData={formData}
          onChangeInput={handleChangeInput}
          onChangeSelect={handleChangeSelect}
          onSubmit={handleSubmit}
          errors={formErrors}
        />
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
      {error && <p style={{ color: "red" }}>{error}</p>}
    </Container>
  );
}

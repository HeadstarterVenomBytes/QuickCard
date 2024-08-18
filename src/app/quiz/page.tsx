"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Box, Container, useTheme } from "@mui/material";
import FlashcardQuiz from "../components/QuizzesPages/FlashcardQuiz";
import SideNavBar from "../components/SideNavBar";
import useFlashcardSet from "@/hooks/useFlashcardSet";
import { FlippedState } from "@/types/flashcardFlipState";

export default function FlashcardQuizPage(): React.JSX.Element {
  const [flipped, setFlipped] = useState<FlippedState>({});
  const [activeStep, setActiveStep] = useState(0);
  const searchParams = useSearchParams();
  const setId = searchParams.get("setid");
  const theme = useTheme();

  if (!setId) {
    throw new Error("Something went wrong retrieving the set name.");
  }

  const flashcardSet = useFlashcardSet(setId);

  if (!flashcardSet) {
    console.error("Error occured while retrieving the flashcard set.");
  }

  const handleCardClick = (id: string) => {
    setFlipped((prevFlipped) => ({
      ...prevFlipped,
      [id]: !prevFlipped[id],
    }));
  };

  const handleNext = () => {
    if (activeStep < (flashcardSet?.flashcards.length ?? 1) - 1) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prev) => prev - 1);
    }
  };

  const handleFlip = () => {
    const currentFlashcard = flashcardSet?.flashcards[activeStep];
    if (currentFlashcard) {
      handleCardClick(currentFlashcard.id);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ height: "100%", py: 4, display: "flex" }}>
      <SideNavBar />
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <FlashcardQuiz
          flashcardSet={flashcardSet!}
          activeStep={activeStep}
          isFlipped={!!flipped[flashcardSet.flashcards[activeStep]?.id]}
          onFlip={handleFlip}
          onNext={handleNext}
          onBack={handleBack}
        />
      </Box>
    </Container>
  );
}

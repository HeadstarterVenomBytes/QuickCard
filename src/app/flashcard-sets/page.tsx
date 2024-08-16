"use client";

import React, { useState, useEffect } from "react";
import { AnyFlashcard, FlashcardSetList } from "@/types/flashcard-types";
import { useRouter } from "next/navigation";
import { useFlashcardSets } from "@/hooks/useFlashcardSets";
import FlashcardSetsOverviewGrid from "../components/FlashCardPages/FlashcardSetsOverviewGrid";
import TypographyHeader from "../components/TypographyHeader";
import Container from "@mui/material/Container";

export default function FlashcardSets(): React.JSX.Element {
  const router = useRouter();
  const { flashcardSets, isLoading, error } = useFlashcardSets();

  if (!flashcardSets) {
    throw new Error("Error occured while retrieving flashcard sets.");
  }

  const handleSetClick = (id: string) => {
    router.push(`/flashcard?setid=${id}`);
  };

  // TODO: Style all of these with material UI
  if (isLoading) {
    return <div>Loading flashcards...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Container maxWidth="lg">
      <TypographyHeader title="Recent Sets" />
      <FlashcardSetsOverviewGrid
        flashcardSets={flashcardSets}
        onSetClick={handleSetClick}
      />
      <TypographyHeader title="Based On Your Interest" />
    </Container>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import { AnyFlashcard, FlashcardSetList } from "@/types/flashcard-types";
import { useRouter } from "next/navigation";
import { useFlashcardSets } from "@/hooks/useFlashcardSets";
import FlashcardSetsOverviewGrid from "../components/FlashCardPages/FlashcardSetsOverviewGrid";
import TypographyHeader from "../components/TypographyHeader";
import Container from "@mui/material/Container";

// TODO: maybe use `React.FC<type stuff>` for stricter typing
export default function Flashcard(): React.JSX.Element {
  const router = useRouter();
  const { flashcardSets, isLoading, error } = useFlashcardSets();

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
    <Container maxWidth="md" style={{ height:"50%" }}>
      <TypographyHeader title="Recent Sets" />
      <FlashcardSetsOverviewGrid
        flashcardSets={flashcardSets || []}
        onSetClick={handleSetClick}
      />
      <TypographyHeader title="Based On Your Interest" />
    </Container>
  );
}

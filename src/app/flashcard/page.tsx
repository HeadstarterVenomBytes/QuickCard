"use client";

import React, { useState, useEffect } from "react";
import useFlashcards from "@/hooks/useFlashcards";
import RenderedFlashcardGrid from "../components/FlashCardPages/RenderedFlashcardGrid";
import { FlippedState } from "@/types/flashcardFlipState";
import { useSearchParams } from "next/navigation";
import Container from "@mui/material/Container";
import TypographyHeader from "../components/TypographyHeader";
import { toTitleCase } from "@/utils/textUtils";

export default function FlashcardSet(): React.JSX.Element {
  const [flipped, setFlipped] = useState<FlippedState>({});

  const searchParams = useSearchParams();
  const setId = searchParams.get("setid");

  if (!setId) {
    throw new Error("Something went wrong retrieving the set name.");
  }

  const flashcards = useFlashcards(setId);

  const handleCardClick = (id: string) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <Container maxWidth="lg" sx={{ height: "100%", py: 4 }}>
      <TypographyHeader
        component="h2"
        variant="h4"
        title={toTitleCase(setId)}
      />

      <RenderedFlashcardGrid
        flashcards={flashcards}
        flipped={flipped}
        handleCardClick={handleCardClick}
        setId={setId}
      />
    </Container>
  );
}

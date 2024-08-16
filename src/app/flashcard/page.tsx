"use client";

import React, { useState, useEffect } from "react";
import useFlashcards from "@/hooks/useFlashcards";
import RenderedFlashcardGrid from "../components/FlashCardPages/RenderedFlashcardGrid";
import { FlippedState } from "@/types/flashcardFlipState";
import { useSearchParams } from "next/navigation";
import Container from "@mui/material/Container";

export default function FlashcardSet(): React.JSX.Element {
  const [flipped, setFlipped] = useState<FlippedState>({});

  const searchParams = useSearchParams();
  const setId = searchParams.get("setid");
  const flashcards = useFlashcards(setId);

  const handleCardClick = (id: string) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <Container maxWidth="lg" sx={{ height: "100%", py: 4 }}>
      <RenderedFlashcardGrid
        flashcards={flashcards}
        flipped={flipped}
        handleCardClick={handleCardClick}
        setId={setId}
      />
    </Container>
  );
}

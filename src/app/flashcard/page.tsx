"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import useFlashcards from "@/hooks/useFlashcards";
import RenderedFlashcardGrid from "../components/RenderedFlashcardGrid";
import { FlippedState } from "@/types/flashcardFlipState";
import { useSearchParams } from "next/navigation";
import { Container } from "@mui/material";
import TypographyHeader from "../components/TypographyHeader";

export default function Flashcard(): React.JSX.Element {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flipped, setFlipped] = useState<FlippedState>({});

  const searchParams = useSearchParams();
  const setId = searchParams.get("id");
  const flashcards = useFlashcards(setId);

  // console.log(flashcards)

  const handleCardClick = (id: string) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <Container maxWidth="md" style={{ height:"100%" }}>
      <TypographyHeader title="Flashcard Set" />
      <RenderedFlashcardGrid
        flashcards={flashcards}
        flipped={flipped}
        handleCardClick={handleCardClick}
      />
    </Container>
  );
}

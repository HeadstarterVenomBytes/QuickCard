"use client";

import React, { useState, useEffect } from "react";
import useFlashcardSet from "@/hooks/useFlashcardSet";
import RenderedFlashcardGrid from "../components/FlashCardPages/RenderedFlashcardGrid";
import { FlippedState } from "@/types/flashcardFlipState";
import { useSearchParams } from "next/navigation";
import { Box, Container, useTheme } from "@mui/material";
import TypographyHeader from "../components/TypographyHeader";
import { toTitleCase } from "@/utils/textUtils";
import SideNavBar from "../components/SideNavBar";

export default function FlashcardSet(): React.JSX.Element {
  const [flipped, setFlipped] = useState<FlippedState>({});

  const searchParams = useSearchParams();
  const setId = searchParams.get("setid");

  const theme = useTheme();

  if (!setId) {
    throw new Error("Something went wrong retrieving the set name.");
  }

  const flashcardSet = useFlashcardSet(setId);

  const handleCardClick = (id: string) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <Container maxWidth="lg" sx={{ height: "100%", py: 4, display: "flex" }}>
      <SideNavBar />
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <TypographyHeader
          component="h2"
          variant="h4"
          color={theme.palette.secondary.main}
          title={toTitleCase(setId)}
        />

        <RenderedFlashcardGrid
          flashcards={flashcardSet?.flashcards ?? []}
          flipped={flipped}
          handleCardClick={handleCardClick}
          setId={setId}
        />
      </Box>
    </Container>
  );
}

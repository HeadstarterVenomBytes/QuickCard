"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { FlashcardSetList } from "@/types/flashcardList";
import { useRouter } from "next/router";
import { getFlashcardSets } from "@/utils/getFlashcards";
import FlashcardSetsOverviewGrid from "../components/FlashcardSetsOverviewGrid";
import TypographyHeader from "../components/TypographyHeader";
import Container from "@mui/material/Container";

// TODO: maybe use `React.FC<type stuff>` for stricter typing
export default function Flashcard(): React.JSX.Element {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcardSets, setFlashcardSets] = useState<FlashcardSetList>([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchFlashcards() {
      if (isLoaded && isSignedIn) {
        const sets = await getFlashcardSets(user);
        setFlashcardSets(sets);
      }
    }

    fetchFlashcards();
  }, [isLoaded, isSignedIn, user]);

  const handleSetClick = (id: string) => {
    router.push(`/flashcard?id=${id}`);
  };

  return (
    <Container maxWidth="md">
      <TypographyHeader title="Your Flashcard Sets" />
      <FlashcardSetsOverviewGrid
        flashcardSets={flashcardSets}
        onSetClick={handleSetClick}
      />
    </Container>
  );
}

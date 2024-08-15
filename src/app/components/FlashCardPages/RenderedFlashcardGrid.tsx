import React from "react";
import { Grid, Container } from "@mui/material";
import { FlippedState } from "@/types/flashcardFlipState";
import { FlashcardList, FirestoreFlashcard } from "@/types/flashcard-types";
import FlashcardComponent from "./FlashcardComponent";

interface RenderedFlashcardGridProps {
  flashcards: FlashcardList<FirestoreFlashcard>;
  flipped: FlippedState;
  handleCardClick: (id: string) => void;
}

const RenderedFlashcardGrid: React.FC<RenderedFlashcardGridProps> = ({
  flashcards,
  flipped,
  handleCardClick,
}) => {
  return (
    <Container maxWidth="md" style={{ height:"100%" }}>
      <Grid container spacing={12} sx={{ mt: 4 }} style={{ height:"100%" }}>
        {flashcards?.map((flashcard) => (
          <Grid item xs={12} sm={6} md={4} key={flashcard?.id} style={{ height:"50%" }}>
            <FlashcardComponent
              flashcard={flashcard}
              isFlipped={!!flipped[flashcard?.id]}
              onClick={() => handleCardClick(flashcard?.id)}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default RenderedFlashcardGrid;

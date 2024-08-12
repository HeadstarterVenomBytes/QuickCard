import React from "react";
import { Grid, Container } from "@mui/material";
import { FlippedState } from "@/types/flashcardFlipState";
import { FlashcardList } from "@/types/flashcardList";
import FlashcardComponent from "./FlashcardComponent";

interface RenderedFlashcardGridProps {
  flashcards: FlashcardList;
  flipped: FlippedState;
  handleCardClick: (id: string) => void;
}

const RenderedFlashcardGrid: React.FC<RenderedFlashcardGridProps> = ({
  flashcards,
  flipped,
  handleCardClick,
}) => {
  return (
    <Container maxWidth="md">
      <Grid container spacing={3} sx={{ mt: 4 }}>
        {flashcards.map((flashcard) => (
          <Grid item xs={12} sm={6} md={4} key={flashcard.id}>
            <FlashcardComponent
              flashcard={flashcard}
              isFlipped={!!flipped[flashcard.id]}
              onClick={() => handleCardClick(flashcard.id)}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default RenderedFlashcardGrid;

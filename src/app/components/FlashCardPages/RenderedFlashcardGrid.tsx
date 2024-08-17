import React from "react";
import { Grid, Container } from "@mui/material";
import { FlippedState } from "@/types/flashcardFlipState";
import { FlashcardList, FirestoreFlashcard } from "@/types/flashcard-types";
import FlashcardComponent from "./FlashcardComponent";

interface RenderedFlashcardGridProps {
  flashcards: FlashcardList<FirestoreFlashcard>;
  flipped: FlippedState;
  handleCardClick: (id: string) => void;
  setId: string;
}

const RenderedFlashcardGrid: React.FC<RenderedFlashcardGridProps> = ({
  flashcards,
  flipped,
  handleCardClick,
  setId,
}) => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {flashcards?.map((flashcard) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={flashcard?.id}
            sx={{ display: "flex" }}
          >
            <FlashcardComponent
              flashcard={flashcard}
              isFlipped={!!flipped[flashcard?.id]}
              onClick={() => handleCardClick(flashcard?.id)}
              setId={setId}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default RenderedFlashcardGrid;

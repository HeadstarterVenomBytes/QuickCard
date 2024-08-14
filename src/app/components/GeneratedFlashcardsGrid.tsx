import React from "react";
import {
  Box,
  Typography,
  Unstable_Grid2 as Grid,
  Card,
  CardContent,
} from "@mui/material";
import { Flashcard, FlashcardList } from "@/types/flashcard-types";

interface GeneratedFlashcardsGrid {
  flashcards: FlashcardList<Flashcard>;
}

const GeneratedFlashcardsGrid: React.FC<GeneratedFlashcardsGrid> = ({
  flashcards,
}) => {
  if (flashcards.length === 0) {
    return null;
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Generated Flashcards
      </Typography>
      <Grid container spacing={2}>
        {flashcards.map((flashcard, index) => (
          <Grid key={index} xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Front:</Typography>
                <Typography>{flashcard.front}</Typography>
                <Typography variant="h6" sx={{ mt: 2 }}>
                  Back:
                </Typography>
                <Typography>{flashcard.back}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default GeneratedFlashcardsGrid;

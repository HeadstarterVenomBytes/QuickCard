import React from "react";
import Link from "next/link";
import { Flashcard, FlashcardSetList } from "@/types/flashcard-types";
import Grid from "@mui/material/Unstable_Grid2";
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";

interface FlashcardSetsOverviewGridProps {
  flashcardSets: FlashcardSetList<Flashcard>;
  onSetClick: (id: string) => void;
}

const FlashcardSetsOverviewGrid: React.FC<FlashcardSetsOverviewGridProps> = ({
  flashcardSets,
  onSetClick,
}) => {
  return (
    <Grid container spacing={3} sx={{ mt: 2 }}>
      {flashcardSets.map((set, index) => (
        <Grid xs={12} sm={6} md={4} key={index}>
          <Card>
            <CardActionArea onClick={() => onSetClick(set?.name)}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {set?.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {set?.flashcards?.length}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default FlashcardSetsOverviewGrid;

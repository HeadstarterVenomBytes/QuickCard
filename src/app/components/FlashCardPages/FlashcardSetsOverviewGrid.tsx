import React from "react";
import Link from "next/link";
import { Flashcard, FlashcardSetList } from "@/types/flashcard-types";
import Grid from "@mui/material/Unstable_Grid2";
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";

interface FlashcardSetsOverviewGridProps {
  flashcardSets: FlashcardSetList<Flashcard>;
  onSetClick: (setid: string) => void;
}

const FlashcardSetsOverviewGrid: React.FC<FlashcardSetsOverviewGridProps> = ({
  flashcardSets,
  onSetClick,
}) => {
  return (
    <Grid container spacing={3} sx={{ mt: 2 }} style={{ height:"100%"}}>
      {flashcardSets.map((set, index) => (
        <Grid xs={12} sm={6} md={4} key={index}>
          <Card 
          style={{
            height:"60%",
            width: "100%", 
            left: "8.64%", 
            right: "8.63%",
            top: "6.66%",
            bottom: "6.66%",
            background: "#003050",
            border: "2px solid #003050",
            boxShadow: "3.13962px 3.13962px 6.27925px rgba(0, 0, 0, 0.15)",
            borderRadius: "12px",
          }}
          >
            <CardActionArea onClick={() => onSetClick(set?.name)}>
              <CardContent>
              <Typography variant="h5" component="div" color="#FFFFFF">
                  {set?.name}
                </Typography>
                <Typography variant="body2" color="#FFFFFF">
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

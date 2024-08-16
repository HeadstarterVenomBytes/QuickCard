import React from "react";
import { Flashcard, FlashcardSetList } from "@/types/flashcard-types";
import Grid from "@mui/material/Unstable_Grid2";
import { useTheme } from "@mui/material";
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { toTitleCase } from "@/utils/textUtils";

interface FlashcardSetsOverviewGridProps {
  flashcardSets: FlashcardSetList<Flashcard>;
  onSetClick: (id: string) => void;
}

const FlashcardSetsOverviewGrid: React.FC<FlashcardSetsOverviewGridProps> = ({
  flashcardSets,
  onSetClick,
}) => {
  const theme = useTheme();

  // TODO: use material ui for themeing the card
  // TODO: padding on the sides?
  return (
    <Grid container spacing={3} sx={{ py: 4 }} style={{ height: "100%" }}>
      {flashcardSets.map((set, index) => (
        <Grid xs={12} sm={6} md={4} key={index}>
          <Card
            sx={{
              height: "100%",
              width: "100%",
              background: "#003050",
              border: "2px solid #003050",
              boxShadow: "3.13962px 3.13962px 6.27925px rgba(0, 0, 0, 0.15)",
              borderRadius: "12px",
            }}
          >
            <CardActionArea onClick={() => onSetClick(set?.name)}>
              <CardContent
                sx={{
                  height: "100%",
                  textAlign: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  variant="h5"
                  component="div"
                  color={theme.palette.primary.contrastText}
                >
                  {toTitleCase(set?.name)}
                </Typography>
                <Typography
                  variant="body2"
                  color={theme.palette.primary.contrastText}
                >
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

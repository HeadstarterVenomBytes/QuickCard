import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import { Flashcard } from "@/types/flashcard-types";

interface FlashcardComponentProps {
  flashcard: Flashcard;
  isFlipped: boolean;
  onClick: () => void;
}

const FlashcardComponent: React.FC<FlashcardComponentProps> = ({
  flashcard,
  isFlipped,
  onClick,
}) => {
  return (
    <Card style={{ height:"100%" }}>
      <CardActionArea onClick={onClick}>
        <CardContent>
          <Box sx={{ perspective: 1000 }}>
            <Box
              sx={{
                transformStyle: "preserve-3d",
                transition: "transform 0.6s",
                transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  width: "100%",
                  backfaceVisibility: "hidden",
                  transform: "rotateY(0deg)",
                }}
              >
                <Typography variant="h5" component="div">
                  {flashcard?.front}
                </Typography>
              </Box>
              <Box
                sx={{
                  position: "absolute",
                  width: "100%",
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                <Typography variant="h5" component="div">
                  {flashcard?.back}
                </Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default FlashcardComponent;

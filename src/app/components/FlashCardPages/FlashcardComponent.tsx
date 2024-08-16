import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import Link from "next/link";
import { FirestoreFlashcard } from "@/types/flashcard-types";

interface FlashcardComponentProps {
  flashcard: FirestoreFlashcard;
  isFlipped: boolean;
  onClick: () => void;
  setId: string | null;
}

const FlashcardComponent: React.FC<FlashcardComponentProps> = ({
  flashcard,
  isFlipped,
  onClick,
}) => {
  return (
    <Card
      style={{
        background: "#003050",
        boxShadow: "4px 4px 9px rgba(0, 0, 0, 0.25)",
        borderRadius: "20px",
      }}
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "auto",
        width: "100%",
        minHeight: 150,
        maxHeight: "100%",
      }}
    >
      <CardActionArea onClick={onClick}>
        <CardContent sx={{ flexGrow: 1 }}>
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
                <Typography variant="h5" component="div" color="#FFFFFF">
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
                <Typography variant="h5" component="div" color="#FFFFFF">
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

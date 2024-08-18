import React from "react";
import { Box, IconButton, Typography, LinearProgress } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import FlashcardComponent from "../FlashCardPages/FlashcardComponent";
import { useTheme } from "@mui/material";
import { FlashcardSet, FirestoreFlashcard } from "@/types/flashcard-types";

interface FlashcardQuizProps {
  flashcardSet: FlashcardSet<FirestoreFlashcard>;
  activeStep: number;
  isFlipped: boolean;
  onFlip: () => void;
  onNext: () => void;
  onBack: () => void;
}

const FlashcardQuiz: React.FC<FlashcardQuizProps> = ({
  flashcardSet,
  activeStep,
  isFlipped,
  onFlip,
  onNext,
  onBack,
}) => {
  const theme = useTheme();
  const progress = ((activeStep + 1) / flashcardSet.flashcards.length) * 100;

  return (
    <Box
      sx={{ width: "100%", maxWidth: 600, margin: "auto", textAlign: "center" }}
    >
      <Box sx={{ paddingBottom: 2 }}>
        <Typography variant="h5" gutterBottom>
          {flashcardSet.topic}
        </Typography>
        <Typography
          variant="subtitle1"
          color={theme.palette.secondary.contrastText}
        >
          Difficulty: {flashcardSet.difficultyLevel}
        </Typography>
        <Typography
          variant="subtitle2"
          color={theme.palette.secondary.contrastText}
        >
          Card Type: {flashcardSet.cardType}
        </Typography>
      </Box>

      <Box sx={{ padding: 2 }}>
        <FlashcardComponent
          flashcard={flashcardSet.flashcards[activeStep]}
          isFlipped={isFlipped}
          onClick={onFlip}
          setId={null}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 2,
        }}
      >
        <IconButton
          disabled={activeStep === 0}
          onClick={onBack}
          aria-label="Back"
        >
          <ArrowBackIosNewIcon />
        </IconButton>

        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{ width: "60%" }}
        />

        <IconButton
          disabled={activeStep === flashcardSet.flashcards.length - 1}
          onClick={onNext}
          aria-label="Next"
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default FlashcardQuiz;

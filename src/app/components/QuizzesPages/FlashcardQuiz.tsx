import React from "react";
import {
  Box,
  IconButton,
  LinearProgress,
  Chip,
  Typography,
  useTheme,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import FlashcardComponent from "../FlashCardPages/FlashcardComponent";
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
      sx={{
        width: "100%",
        maxWidth: 600,
        margin: "auto",
        textAlign: "center",
        backgroundColor: theme.palette.surfaceContainer.main,
        borderRadius: 2,
        padding: 3,
        boxShadow: theme.shadows[1],
      }}
    >
      <Typography variant="h5" gutterBottom color="primary">
        {flashcardSet.topic}
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "left", gap: 1, mb: 2 }}>
        <Chip
          label={`Difficulty: ${flashcardSet.difficultyLevel}`}
          color="primary"
          sx={{
            bgcolor: theme.palette.primaryContainer.main,
            color: theme.palette.primaryContainer.contrastText,
          }}
        />
        <Chip
          label={`Card Type: ${flashcardSet.cardType}`}
          color="secondary"
          sx={{
            backgroundColor: theme.palette.secondaryContainer.main,
            color: theme.palette.secondaryContainer.contrastText,
          }}
        />
      </Box>
      <Box
        sx={{
          padding: 2,
          bgcolor: theme.palette.surfaceContainerHighest.main,
          borderRadius: 1,
          boxShadow: theme.shadows[2],
        }}
      >
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
          sx={{ color: theme.palette.tertiary.main }}
        >
          <ArrowBackIosNewIcon />
        </IconButton>

        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            width: "60%",
            backgroundColor: theme.palette.surfaceContainerHighest.main,
            "& .MuiLinearProgress-bar": {
              backgroundColor: theme.palette.primary.main,
            },
          }}
        />

        <IconButton
          disabled={activeStep === flashcardSet.flashcards.length - 1}
          onClick={onNext}
          aria-label="Next"
          sx={{ color: theme.palette.tertiary.main }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default FlashcardQuiz;

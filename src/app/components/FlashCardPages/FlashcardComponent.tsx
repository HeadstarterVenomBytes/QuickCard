import React from "react";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
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
  const theme = useTheme();

  return (
    <Card
      elevation={3}
      sx={{
        height: "100%",
        width: "100%",
        minHeight: 200,
        borderRadius: 2,
        backgroundColor: theme.palette.primary.main,
        "&:hover": {
          boxShadow: theme.shadows[8],
        },
        position: "relative",
        perspective: 1000,
      }}
    >
      <CardActionArea
        onClick={onClick}
        sx={{ height: "100%", display: "flex", flexDirection: "column" }}
      >
        <CardContent
          sx={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 200,
            width: "100%",
            position: "relative",
            perspective: 1000,
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              transformStyle: "preserve-3d",
              transition: "transform 0.6s",
              transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backfaceVisibility: "hidden",
                transform: "rotateY(0deg)",
              }}
            >
              <Typography
                variant="h6"
                component="div"
                sx={{
                  color: theme.palette.primary.contrastText,
                }}
              >
                {flashcard?.front}
              </Typography>
            </Box>

            <Box
              sx={{
                backfaceVisibility: "hidden",
                position: "absolute",
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                padding: 2,
                transform: "rotateY(180deg)",
              }}
            >
              <Typography
                variant="h6"
                component="div"
                sx={{
                  color: theme.palette.primary.contrastText,
                }}
              >
                {flashcard?.back}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default FlashcardComponent;

import React from "react";
import { Grid, Container, useTheme } from "@mui/material";
import { FlippedState } from "@/types/flashcardFlipState";
import { FlashcardList, FirestoreFlashcard } from "@/types/flashcard-types";
import FlashcardComponent from "../FlashCardPages/FlashcardComponent";

interface RenderedQuizzesdGridProps {
    flashcards: FlashcardList<FirestoreFlashcard>;
    flipped: FlippedState;
    handleCardClick: (id: string) => void;
    setId: string;
}

const RenderedQuizzesdGrid: React.FC<RenderedQuizzesdGridProps> = ({
    flashcards,
    flipped,
    handleCardClick,
    setId,
}) => {
    const theme = useTheme();

    return (
        <Container
            maxWidth="lg"
            sx={{ py: 4, bgcolor: theme.palette.surfaceContainerHighest.main }}
        >
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
    )
}

export default RenderedQuizzesdGrid;
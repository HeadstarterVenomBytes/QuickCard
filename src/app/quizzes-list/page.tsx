"use client";

import React, { useState, useEffect } from "react";
import { AnyFlashcard, FlashcardSetList } from "@/types/flashcard-types";
import { Container, Box, useTheme } from "@mui/material";
import { useRouter } from "next/navigation";
import { useFlashcardSets } from "@/hooks/useFlashcardSets";
import FlashcardSetsOverviewGrid from "../components/FlashCardPages/FlashcardSetsOverviewGrid";
import TypographyHeader from "../components/TypographyHeader";
import SideNavBar from "../components/SideNavBar";

export default function QuizzesList(): React.JSX.Element {
    const router = useRouter();
    const theme = useTheme();
    const { flashcardSets, isLoading, error } = useFlashcardSets();

    if (!flashcardSets) {
        throw new Error("Error occured while retrieving flashcard sets.");
    }

    const handleSetClick = (id: string) => {
        router.push(`/flashcard?setid=${id}`);
    };

    if (isLoading) {
        return <div>Loading flashcards...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <Container maxWidth="lg" sx={{ height: "100vh" }}>
            <Box sx={{ display: "flex" }}>
                <SideNavBar />
                <Box sx={{ flexGrow: 1, p: 3 }}>
                    <TypographyHeader
                        title="Quizzes"
                        color={theme.palette.secondary.main}
                    />
                    <FlashcardSetsOverviewGrid
                        flashcardSets={flashcardSets}
                        onSetClick={handleSetClick}
                    />
                </Box>
            </Box>
        </Container>
    );
}

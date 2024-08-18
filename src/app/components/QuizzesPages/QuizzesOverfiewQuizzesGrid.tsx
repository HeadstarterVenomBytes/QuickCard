import React from "react";
import { Grid, Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { FlippedState } from "@/types/flashcardFlipState";
import { Flashcard, FlashcardSetList } from "@/types/flashcard-types";
import { useTheme } from "@mui/material";
import { toTitleCase } from "@/utils/textUtils";

interface QuizzesdOverviewGridProps {
    flashcardSets: FlashcardSetList<Flashcard>;
    onSetClick: (id: string) => void;
}
const QuizzesdOverviewGrid: React.FC<QuizzesdOverviewGridProps> = ({
    flashcardSets,
    onSetClick,
}) => {
    const theme = useTheme();

    return (<Grid container spacing={3} sx={{ py: 4 }} style={{ height: "100%" }}>
        {flashcardSets.map((set, index) => (
            <Grid xs={12} sm={6} md={4} key={index}>
                <Card
                    sx={{
                        height: "100%",
                        width: "100%",
                        bgcolor: theme.palette.primary.main,
                        border: `2px solid ${theme.palette.inversePrimary.main}`,
                        boxShadow: `3.13962px 3.13962px 6.27925px ${theme.palette.shadow.main}`,
                        borderRadius: theme.shape.borderRadius * 1.5,

                        "&hover": {
                            background: theme.palette.primary.dark,
                            borderColor: theme.palette.primaryContainer.main,
                        },
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
    )
}

export default QuizzesdOverviewGrid;
import React from "react";
import {
  Box,
  FormGroup,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  TextField,
  Button,
  useTheme,
  Grid,
  Typography,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { FlashcardFormData } from "@/types/flashcard-form-types";

interface FlashcardFormProps {
  formData: FlashcardFormData;
  onChangeInput: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onChangeSelect: (event: SelectChangeEvent) => void;
  onSubmit: () => void;
  errors: Partial<Record<keyof FlashcardFormData, string>>;
}

const FlashcardForm: React.FC<FlashcardFormProps> = ({
  formData,
  onChangeInput,
  onChangeSelect,
  onSubmit,
  errors,
}) => {
  const theme = useTheme();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        p: 3,
        maxWidth: 600,
        mx: "auto",
        bgcolor: theme.palette.surfaceContainer.main,
        borderRadius: 3,
        boxShadow: 3,
      }}
    >
      <Typography
        variant="h6"
        component="h1"
        gutterBottom
        sx={{ mb: 3, color: theme.palette.tertiary.main }}
      >
        Create Flashcards
      </Typography>
      <FormGroup>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl fullWidth error={!!errors.topic}>
              <TextField
                label="Topic"
                name="topic"
                value={formData.topic}
                onChange={onChangeInput}
                required
                error={!!errors.topic}
                helperText={errors.topic}
                variant="outlined"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={!!errors.numberOfCards}>
              <TextField
                label="Number of cards"
                name="numberOfCards"
                type="number"
                value={formData.numberOfCards}
                onChange={onChangeInput}
                required
                inputProps={{ min: 1, max: 100 }}
                error={!!errors.numberOfCards}
                helperText={errors.numberOfCards}
                variant="outlined"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={!!errors.difficultyLevel}>
              <InputLabel id="difficulty-level-label">
                Difficulty Level
              </InputLabel>
              <Select
                labelId="difficulty-level-label"
                name="difficultyLevel"
                value={formData.difficultyLevel}
                onChange={onChangeSelect}
                label="Difficulty Level"
                required
              >
                <MenuItem value="easy">Easy</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="hard">Hard</MenuItem>
              </Select>
              {errors.difficultyLevel && (
                <FormHelperText>{errors.difficultyLevel}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth error={!!errors.cardType}>
              <InputLabel id="card-type-label">Card Type</InputLabel>
              <Select
                labelId="card-type-label"
                name="cardType"
                value={formData.cardType}
                onChange={onChangeSelect}
                label="Card Type"
                required
              >
                <MenuItem value="question-answer">Question-Answer</MenuItem>
                <MenuItem value="true-false">True-False</MenuItem>
                <MenuItem value="matching">Matching</MenuItem>
                <MenuItem value="multiple-choice">Multiple Choice</MenuItem>
              </Select>
              {errors.cardType && (
                <FormHelperText>{errors.cardType}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              sx={{
                mt: 2,
                py: 1.5,
                bgcolor: "primary.main",
                "&:hover": {
                  bgcolor: "primary.dark",
                },
              }}
            >
              Generate Flashcards
            </Button>
          </Grid>
        </Grid>
      </FormGroup>
    </Box>
  );
};

export default FlashcardForm;

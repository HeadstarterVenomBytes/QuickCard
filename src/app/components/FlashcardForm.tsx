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
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <FormGroup>
        <FormControl fullWidth margin="normal" error={!errors.topic}>
          <TextField
            label="Topic"
            name="topic"
            value={formData.topic}
            onChange={onChangeInput}
            required
            error={!errors.topic}
            helperText={errors.topic}
          />
        </FormControl>
        <FormControl fullWidth margin="normal" error={!errors.numberOfCards}>
          <TextField
            label="Number of cards"
            name="numberOfCards"
            type="number"
            value={formData.numberOfCards}
            onChange={onChangeInput}
            required
            inputProps={{ min: 1, max: 100 }}
            error={!errors.numberOfCards}
            helperText={errors.numberOfCards}
          />
        </FormControl>
        <FormControl fullWidth margin="normal" error={!errors.difficultyLevel}>
          <InputLabel id="difficulty-level-label">Difficulty Level</InputLabel>
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

        <FormControl fullWidth margin="normal" error={!errors.cardType}>
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

          <Button type="submit" color="primary" variant="contained">
            Generate Flashcards
          </Button>
        </FormControl>
      </FormGroup>
    </Box>
  );
};

export default FlashcardForm;

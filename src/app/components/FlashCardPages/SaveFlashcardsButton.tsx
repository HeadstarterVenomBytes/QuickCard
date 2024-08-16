import React from "react";
import { Box, Button } from "@mui/material";

interface SaveFlashcardsButtonProps {
  onClick: () => void;
}

// XXX: use PrimaryButton component here and extend it maybe
const SaveFlashcardsButton: React.FC<SaveFlashcardsButtonProps> = ({
  onClick,
}) => (
  <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
    <Button variant="contained" color="primary" onClick={onClick}>
      Save Flashcards
    </Button>
  </Box>
);

export default SaveFlashcardsButton;

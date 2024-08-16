import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

interface SaveFlashcardsDialogProps {
  open: boolean;
  setName: string;
  onSetNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => Promise<void>;
  onClose: () => void;
}

// TODO: make sure cancel button is themed with an `error` color from the Material UI theme
const SaveFlashcardsDialog: React.FC<SaveFlashcardsDialogProps> = ({
  open,
  setName,
  onSetNameChange,
  onSave,
  onClose,
}) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Save Flashcard Set</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Please enter a name for your flashcard set.
      </DialogContentText>
      <TextField
        autoFocus
        margin="dense"
        label="Set Name"
        type="text"
        fullWidth
        value={setName}
        onChange={onSetNameChange}
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Cancel</Button>
      <Button onClick={onSave} color="primary">
        Save
      </Button>
    </DialogActions>
  </Dialog>
);

export default SaveFlashcardsDialog;

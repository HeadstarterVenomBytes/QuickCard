import React from "react";
import { TextField } from "@mui/material";

interface TextInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  multiline?: boolean;
  rows?: number;
}

const TextInput: React.FC<TextInputProps> = ({
  value,
  onChange,
  label,
  multiline = false,
  rows = 1,
}) => (
  <TextField
    value={value}
    onChange={onChange}
    label={label}
    fullWidth
    multiline={multiline}
    rows={rows}
    variant="outlined"
    sx={{ mb: 2 }}
  />
);

export default TextInput;

import React from "react";
import { Button } from "@mui/material";

// Move to types/ directory if used again
// This seems like a good generic interface for buttons
interface PrimaryButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ onClick, children }) => (
  <Button variant="contained" color="primary" onClick={onClick} fullWidth>
    {children}
  </Button>
);

export default PrimaryButton;

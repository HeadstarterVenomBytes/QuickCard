import React from "react";
import { Typography } from "@mui/material";

interface ErrorDisplayProps {
  message: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => {
  return (
    <Typography variant="h6" color="error">
      {message}
    </Typography>
  );
};

export default ErrorDisplay;

import React from "react";
import { CircularProgress } from "@mui/material";
import TypographyHeader from "../TypographyHeader";

interface LoadingIndicatorProps {}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = () => {
  return (
    <>
      <CircularProgress />
      <TypographyHeader title="Loading..." variant="h6" sx={{ mt: 2 }} />
    </>
  );
};

export default LoadingIndicator;

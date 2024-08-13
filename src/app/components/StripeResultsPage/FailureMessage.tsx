import React from "react";
import { Typography, Box } from "@mui/material";
import TypographyHeader from "../TypographyHeader";

interface FailureMessageProps {}

// TODO: add more details?
const FailureMessage: React.FC<FailureMessageProps> = () => {
  return (
    <>
      <TypographyHeader title="Payment failed" variant="h4" />
      <Box sx={{ mt: 2 }}>
        <Typography variant="body1">
          Your payment was not successful. Please try again.
        </Typography>
      </Box>
    </>
  );
};

export default FailureMessage;

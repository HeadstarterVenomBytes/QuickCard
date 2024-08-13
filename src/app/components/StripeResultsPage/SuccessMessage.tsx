import React from "react";
import { Typography, Box } from "@mui/material";
import TypographyHeader from "../TypographyHeader";

interface SuccessMessageProps {
  sessionId: string;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ sessionId }) => {
  return (
    <>
      <TypographyHeader title="Thank you for your purchase!" />
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6">Session ID: {sessionId}</Typography>
        <Typography variant="body1">
          We have received your payment. You will receive an email with the
          order details shortly.
        </Typography>
      </Box>
    </>
  );
};

export default SuccessMessage;

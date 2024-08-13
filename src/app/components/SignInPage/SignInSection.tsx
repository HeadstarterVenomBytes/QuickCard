import React from "react";
import { Box, Typography } from "@mui/material";
import { SignIn } from "@clerk/nextjs";

interface SignInSectionProps {}

const SignInSection: React.FC<SignInSectionProps> = ({}) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      sx={{ textAlign: "center", my: 4 }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Sign In
      </Typography>
      <SignIn />
    </Box>
  );
};

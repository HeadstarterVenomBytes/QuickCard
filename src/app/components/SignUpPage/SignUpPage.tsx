import React from "react";
import { Box, Typography } from "@mui/material";
import { SignUp } from "@clerk/nextjs";

interface SignUpPageProps {}

const SignUpPage: React.FC<SignUpPageProps> = ({}) => {
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{ textAlign: "center", my: 4 }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Sign Up
        </Typography>
        <SignUp />
      </Box>
    );
  };

  export default SignUpPage;
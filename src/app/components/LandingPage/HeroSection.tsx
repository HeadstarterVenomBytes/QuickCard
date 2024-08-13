import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TypographyHeader from "../TypographyHeader";

interface HeroSectionProps {}

const HeroSection: React.FC<HeroSectionProps> = () => {
  return (
    <Box sx={{ textAlign: "center", my: 4 }}>
      <TypographyHeader
        title="Welcome to Quickcard SaaS"
        variant="h2"
        component="h1"
      />
      <TypographyHeader
        title="The easiest way to create flashcards from your text."
        variant="h5"
        component="h2"
      />
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2, mr: 2 }}
        href="/generate"
      >
        Get Started
      </Button>
      <Button variant="outlined" color="primary" sx={{ mt: 2 }}>
        Learn More
      </Button>
    </Box>
  );
};

export default HeroSection;

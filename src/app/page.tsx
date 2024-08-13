"use client";

import LandingPageAppBar from "./components/LandingPage/LandingPageBar";
import HeroSection from "./components/LandingPage/HeroSection";
import { Box, Grid } from "@mui/material";
import TypographyHeader from "./components/TypographyHeader";
import getStripe from "@/utils/getStripe";

export default function Home() {
  // TODO: use this in the pricing plan grid
  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: { origin: "http://localhost:3000" },
      });

      if (!response.ok) {
        throw new Error(
          `Failed to create checkout session: ${response.statusText}`
        );
      }

      // TODO: make sure this is type checked
      const checkoutSessionJson = await response.json();

      const stripe = await getStripe();
      const result = await stripe?.redirectToCheckout({
        sessionId: checkoutSessionJson.id,
      });

      if (result?.error) {
        console.warn(result.error.message);
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <>
      <LandingPageAppBar />
      <HeroSection />
      <Box sx={{ my: 6 }}>
        <TypographyHeader title="Features" variant="h4" component="h2" />
        <Grid container spacing={4}>
          {/* Feature Items */}
        </Grid>
      </Box>
      <Box sx={{ my: 6, textAlign: "center" }}>
        <TypographyHeader title="Pricing" variant="h4" component="h2" />
        <Grid container spacing={4} justifyContent="center">
          {/* Pricing Plans */}
        </Grid>
      </Box>
    </>
  );
}

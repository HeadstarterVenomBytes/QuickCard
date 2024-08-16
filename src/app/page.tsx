"use client";

import LandingPageAppBar from "./components/LandingPage/LandingPageBar";
import HeroSection from "./components/LandingPage/HeroSection";
import { Box, Grid, Container, Card, CardContent, Divider } from "@mui/material";
import TypographyHeader from "./components/TypographyHeader";
import getStripe from "@/utils/getStripe";
import Stripe from "stripe";

// Development

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

      const checkoutSessionJson: Stripe.Checkout.Session =
        await response.json();

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
      <Container maxWidth="lg" sx={{ my: 6 }}>
        <Card>
           <CardContent sx={{ textAlign: "center" }}>
            <TypographyHeader title="Features" variant="h4" component="h2" />
            <Grid container spacing={4} justifyContent="center">
              {/* Feature Items */}
            </Grid>
          </CardContent>
        </Card>
        <Divider sx={{ my: 6 }} />
        <Card>
          <CardContent sx={{ textAlign: "center" }}>
            <TypographyHeader title="Pricing" variant="h4" component="h2" />
            <Grid container spacing={4} justifyContent="center">
              {/* Pricing Plans */}
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}

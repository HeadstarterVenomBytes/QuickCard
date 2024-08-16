import React from "react";
import { Box, Grid, Typography, Container, Paper } from "@mui/material";
import LandingPageAppBar from "./LandingPageBar";
import HeroSection from "./HeroSection";
import PricingPlans from "./PricingPlans";

const LandingPage: React.FC = () => {
  return (
    <Box sx={{ backgroundColor: "#EDFBFF", minHeight: "100vh", padding: "1rem" }}>
      <LandingPageAppBar />
      <HeroSection />
      <Grid container spacing={4} sx={{ mt: 4 }}>
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              backgroundColor: "#003050",
              color: "#FFFFFF",
              borderRadius: 2,
              padding: 2,
              textAlign: "center",
            }}
          >
            <Typography variant="h6">My Sets</Typography>
            <Typography variant="body1">This month</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              backgroundColor: "#F8DB39",
              color: "#000000",
              borderRadius: 2,
              padding: 2,
              textAlign: "center",
            }}
          >
            <Typography variant="h6">Schedule</Typography>
            <Typography variant="body1">This week</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              backgroundColor: "#EC6F70",
              color: "#FFFFFF",
              borderRadius: 2,
              padding: 2,
              textAlign: "center",
            }}
          >
            <Typography variant="h6">QuickCard AI</Typography>
            <Typography variant="body1">Upcoming Tasks</Typography>
          </Box>
        </Grid>
      </Grid>
      <Container>
        <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
          <Typography variant="h2" component="h1" align="center" gutterBottom>
            Pricing Plans
          </Typography>
          <PricingPlans /> {/* Ensure this line is present */}
        </Paper>
      </Container>
    </Box>
  );
};

export default LandingPage;

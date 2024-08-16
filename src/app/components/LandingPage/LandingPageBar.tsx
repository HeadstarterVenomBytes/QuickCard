import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

interface LandingPageAppBarProps {}

const LandingPageAppBar: React.FC<LandingPageAppBarProps> = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          <Button href="/" color="inherit" > QuickCard SaaS </Button>
        </Typography>
        <SignedOut>
          <Button color="inherit" href="/sign-in">
            Login
          </Button>
          <Button color="inherit" href="/sign-up">
            Sign Up
          </Button>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </Toolbar>
    </AppBar>
  );
};

export default LandingPageAppBar;

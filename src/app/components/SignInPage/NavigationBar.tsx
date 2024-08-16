import React from "react";
import { AppBar, Toolbar, Button } from "@mui/material";
import { Typography } from "@mui/material";
import Link from "next/link";

interface SignInNavigationBarProps {}

// TODO: replace href: might be better replaced with a link to the sign-up page.
const SignInNavigationBar: React.FC<SignInNavigationBarProps> = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#3f51b5" }}>
      <Toolbar>
      <Typography variant="h6" style={{ flexGrow: 1 }}>
          <Button href="/" color="inherit" > QuickCard SaaS </Button>
        </Typography>
        <Button color="inherit">
          <Link href="/sign-in" passHref>
            Login
          </Link>
        </Button>
        <Button color="inherit">
          <Link href="/sign-up" passHref>
            Sign Up
          </Link>
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default SignInNavigationBar;

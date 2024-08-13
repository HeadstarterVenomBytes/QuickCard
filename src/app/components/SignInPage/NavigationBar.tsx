import React from "react";
import { AppBar, Toolbar, Button } from "@mui/material";
import TypographyHeader from "../TypographyHeader";
import Link from "next/link";

interface SignInNavigationBarProps {}

// TODO: replace href: might be better replaced with a link to the sign-up page.
const SignInNavigationBar: React.FC<SignInNavigationBarProps> = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#3f51b5" }}>
      <Toolbar>
        <TypographyHeader
          title="QuickCard SaaS"
          variant="h6"
          sx={{ flexGrow: 1 }}
        />
        <Button color="inherit">
          <Link href="/login" passHref>
            Login
          </Link>
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default SignInNavigationBar;

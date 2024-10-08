import React from "react";
import SignInNavigationBar from "@/app/components/SignInPage/NavigationBar";
import SignInPage from "@/app/components/SignInPage/SignInPage";

export default function UserAuthSignInPage(): React.JSX.Element {
  return (
    <>
      <SignInNavigationBar />
      <SignInPage />
    </>
  );
}

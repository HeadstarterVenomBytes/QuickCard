import React from "react";
import SignInNavigationBar from "@/app/components/SignInPage/NavigationBar";
import SignUpPage from "@/app/components/SignUpPage/SignUpPage";

export default function UserAuthSigUpPage(): React.JSX.Element {
  return (
    <>
      <SignInNavigationBar />
      <SignUpPage />
    </>
  );
}

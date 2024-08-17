import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { FirebaseAuthProvider } from "./context/FirebaseAuthContext";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import CssBaseline from "@mui/material/CssBaseline";

export const metadata: Metadata = {
  title: "QuickCard",
  description: "AI flashcard generation, empowering your studying!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider>
        <FirebaseAuthProvider>
          <body>
            <AppRouterCacheProvider options={{ enableCssLayer: true }}>
              <CssBaseline />
              {children}
            </AppRouterCacheProvider>
          </body>
        </FirebaseAuthProvider>
      </ClerkProvider>
    </html>
  );
}

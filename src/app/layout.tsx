import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { FirebaseAuthProvider } from "./context/FirebaseAuthContext";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import theme from "@/styles/theme";

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
              <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
                <Analytics />
                <SpeedInsights />
              </ThemeProvider>
            </AppRouterCacheProvider>
          </body>
        </FirebaseAuthProvider>
      </ClerkProvider>
    </html>
  );
}

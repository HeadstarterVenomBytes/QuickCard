import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { FirebaseAuthProvider } from "./context/FirebaseAuthContext";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="en" style={{ height: "100%" }}>
      <ClerkProvider>
        <FirebaseAuthProvider>
          <body className={inter.className} style={{ height: "100%" }}>
            <main style={{ height: "100%" }}>{children}</main>
          </body>
        </FirebaseAuthProvider>
      </ClerkProvider>
    </html>
  );
}

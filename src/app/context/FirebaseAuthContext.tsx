import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth as useClerkAuth } from "@clerk/nextjs";
import { User as FirebaseUser, signInWithCustomToken } from "firebase/auth";
import { auth } from "@/lib/firebase";

interface FirebaseAuthContextType {
  firebaseUser: FirebaseUser | null;
  loading: boolean;
  error: Error | null;
}

const FirebaseAuthContext = createContext<FirebaseAuthContextType | undefined>(
  undefined
);

export const FirebaseAuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isSignedIn, getToken } = useClerkAuth();
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const signInToFirebase = async () => {
      if (isSignedIn) {
        setLoading(true);
        setError(null);

        try {
          const token = await getToken({ template: "integration_firebase" });
          if (token) {
            const userCredentials = await signInWithCustomToken(auth, token);
            setFirebaseUser(userCredentials.user);
          }
        } catch (error) {
          console.error("Firebase sign-in failed:", error);
          setError(error instanceof Error ? error : new Error("Unknown error"));
        } finally {
          setLoading(false);
        }
      } else {
        setFirebaseUser(null);
        setLoading(false);
        // TODO: is there an error needed here?
      }
    };

    signInToFirebase();
  }, [isSignedIn, getToken]);

  return (
    <FirebaseAuthContext.Provider value={{ firebaseUser, loading, error }}>
      {children}
    </FirebaseAuthContext.Provider>
  );
};

export const useFirebaseAuth = (): FirebaseAuthContextType => {
  const context = useContext(FirebaseAuthContext);
  if (context === undefined) {
    throw new Error(
      "useFirebaseAuth must be used within a FirebaseAuthProvider"
    );
  }
  return context;
};

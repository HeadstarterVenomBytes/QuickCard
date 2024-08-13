"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import LoadingIndicator from "../components/StripeResultsPage/LoadingIndicator";
import ErrorDisplay from "../components/StripeResultsPage/ErrorDisplay";
import SuccessMessage from "../components/StripeResultsPage/SuccessMessage";
import FailureMessage from "../components/StripeResultsPage/FailureMessage";
import Stripe from "stripe";
import Container from "@mui/material/Container";

export default function ResultPage(): React.JSX.Element {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [loading, setLoading] = useState<boolean>(true);
  const [session, setSession] = useState<Stripe.Checkout.Session | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCheckoutSession = async () => {
      if (!sessionId) return; // throw error maybe
      try {
        const res = await fetch(
          `/api/checkout_sessions?session_id=${sessionId}`
        );
        const sessionData = await res.json(); // TODO: figure out typing here
        if (res.ok) {
          setSession(sessionData as Stripe.Checkout.Session);
        } else {
          setError(sessionData.error as string);
        }
      } catch (error) {
        setError("An error occured while retrieving the session.");
      } finally {
        setLoading(false);
      }
    };
    fetchCheckoutSession();
  }, [sessionId]);

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 4 }}>
      {loading ? (
        <LoadingIndicator />
      ) : error ? (
        <ErrorDisplay message={error} />
      ) : session && session.payment_status === "paid" && sessionId ? (
        <SuccessMessage sessionId={sessionId} />
      ) : (
        <FailureMessage />
      )}
    </Container>
  );
}

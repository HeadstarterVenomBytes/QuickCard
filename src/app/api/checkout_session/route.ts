import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";

// Utility function for formatting the `unit_amount`
const formatAmountForStripe = (amount: number, currency: string): number => {
  return Math.round(amount * 100);
};

// Create the stripe instance
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
});

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    {
      /* 
      Create the params with the configuration for the checkout session
      which in this case is a recurring subscription payable by card at $10 a month
      */
    }
    const params: Stripe.Checkout.SessionCreateParams = {
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Pro subscription",
            },
            unit_amount: formatAmountForStripe(10, "usd"), // $10.00
            recurring: {
              interval: "month",
              interval_count: 1,
            },
          },
          quantity: 1,
        },
      ],
      // redirection URLS after the payment process
      success_url: `${req.headers.get(
        "Referer"
      )}/result?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get(
        "Referer"
      )}/result?session_id={CHECKOUT_SESSION_ID}`,
    };

    const checkoutSession = await stripe.checkout.sessions.create(params);

    return NextResponse.json(checkoutSession, { status: 200 });
    // TODO: Stripe specific error catching?
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      { error: { message: (error as Error).message } },
      { status: 500 }
    );
  }
}

// This GET route retrieves checkout session details based on the provided session ID.
// It handles errors gracefully and returns appropriate JSON responses.
export async function GET(req: NextRequest): Promise<NextResponse> {
  const searchParams = req.nextUrl.searchParams;
  const session_id = searchParams.get("session_id");

  try {
    if (!session_id) {
      throw new Error("Session ID is required");
    }

    const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);

    return NextResponse.json(checkoutSession);
    // TODO: Stripe specific error checking?
  } catch (error) {
    console.error("Error retrieving checkout session:", error);
    return NextResponse.json(
      { error: { message: (error as Error).message } },
      { status: 500 }
    );
  }
}

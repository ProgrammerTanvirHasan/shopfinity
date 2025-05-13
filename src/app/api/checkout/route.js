import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { amount, email } = await req.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Booking Payment for ${email}`,
            },
            unit_amount: Math.round(amount * 100),
          },
          quantity: 1,
        },
      ],

      success_url: `${
        process.env.NEXT_PUBLIC_BASE_URL
      }/success?session_id={CHECKOUT_SESSION_ID}&email=${encodeURIComponent(
        email
      )}`,

      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
      metadata: { email },
    });

    return NextResponse.json({ id: session.id });
  } catch (error) {
    console.error("Stripe error:", error);
    return NextResponse.json(
      { error: "Stripe session failed" },
      { status: 500 }
    );
  }
}

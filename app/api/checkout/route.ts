import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getCourse } from "@/lib/courses";
import { stripe } from "@/lib/stripe";
import { z } from "zod";

export const runtime = "nodejs";

const checkoutSchema = z.object({
  courseId: z.string().min(1),
  whatsappNumber: z.string().trim().min(7).max(24),
});

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id || !session.user.email) return NextResponse.json({ error: "Sign in to continue." }, { status: 401 });

  const parsed = checkoutSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Enter a valid WhatsApp number." }, { status: 400 });
  const course = getCourse(parsed.data.courseId);
  if (!course) return NextResponse.json({ error: "Course not found." }, { status: 404 });

  const appUrl = process.env.NEXT_PUBLIC_APP_URL;
  if (!appUrl) return NextResponse.json({ error: "Checkout is not configured yet." }, { status: 503 });

  const checkout = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: session.user.email,
    client_reference_id: session.user.id,
    line_items: [{ quantity: 1, price_data: { currency: "inr", unit_amount: course.amountInr, product_data: { name: course.title, description: course.duration } } }],
    metadata: { userId: session.user.id, courseId: course.id, whatsappNumber: parsed.data.whatsappNumber },
    success_url: `${appUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${appUrl}/?checkout=cancelled`,
  });
  if (!checkout.url) return NextResponse.json({ error: "Could not create checkout." }, { status: 500 });
  return NextResponse.json({ url: checkout.url });
}

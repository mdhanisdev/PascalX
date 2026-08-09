import Stripe from "stripe";
import { NextResponse } from "next/server";
import { getCourse } from "@/lib/courses";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { notifyTutor } from "@/lib/whatsapp";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!signature || !webhookSecret) return new NextResponse("Webhook configuration missing", { status: 400 });

  let event: Stripe.Event;
  try { event = stripe.webhooks.constructEvent(await request.text(), signature, webhookSecret); }
  catch { return new NextResponse("Webhook signature verification failed", { status: 400 }); }

  if (event.type === "checkout.session.completed") {
    const checkout = event.data.object as Stripe.Checkout.Session;
    const userId = checkout.metadata?.userId ?? checkout.client_reference_id;
    const course = getCourse(checkout.metadata?.courseId ?? "");
    const whatsappNumber = checkout.metadata?.whatsappNumber;
    if (checkout.payment_status === "paid" && userId && course && whatsappNumber) {
      const purchase = await prisma.purchase.upsert({
        where: { stripeSessionId: checkout.id },
        create: { userId, courseId: course.id, courseName: course.title, amountInr: course.amountInr, stripeSessionId: checkout.id, stripePaymentIntentId: String(checkout.payment_intent ?? ""), whatsappNumber, status: "PAID" },
        update: { status: "PAID", whatsappNumber },
      });
      const notification = await notifyTutor({ courseName: course.title, purchaserId: userId, whatsappNumber, stripeSessionId: checkout.id });
      if (notification === "queued") await prisma.purchase.update({ where: { id: purchase.id }, data: { whatsappStatus: "QUEUED" } });
    }
  }
  return NextResponse.json({ received: true });
}

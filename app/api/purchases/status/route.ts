import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  const sessionId = new URL(request.url).searchParams.get("session_id");
  if (!sessionId) return NextResponse.json({ error: "Missing session id" }, { status: 400 });
  const purchase = await prisma.purchase.findFirst({ where: { stripeSessionId: sessionId, userId: session.user.id }, select: { status: true, courseName: true } });
  return NextResponse.json({ status: purchase?.status === "PAID" ? "paid" : "pending", courseName: purchase?.courseName });
}

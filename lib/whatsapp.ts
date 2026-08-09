type TutorNotification = { courseName: string; purchaserId: string; whatsappNumber: string; stripeSessionId: string };

export async function notifyTutor(payload: TutorNotification): Promise<"queued" | "not-configured" | "failed"> {
  const endpoint = process.env.WHATSAPP_TUTOR_WEBHOOK_URL;
  if (!endpoint) return "not-configured";
  try {
    const response = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json", ...(process.env.WHATSAPP_TUTOR_WEBHOOK_TOKEN ? { Authorization: `Bearer ${process.env.WHATSAPP_TUTOR_WEBHOOK_TOKEN}` } : {}) }, body: JSON.stringify({ event: "course.paid", ...payload }), signal: AbortSignal.timeout(5000) });
    return response.ok ? "queued" : "failed";
  } catch { return "failed"; }
}

# PascalX authentication and payments

The application now uses Auth.js with Google OAuth, Prisma/PostgreSQL for user and purchase records, and Stripe Checkout for one-time course payments.

## One-time setup

1. Copy `.env.example` to `.env.local` and fill in `AUTH_SECRET`, `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET`, `DATABASE_URL`, `STRIPE_SECRET_KEY`, and `NEXT_PUBLIC_APP_URL`.
2. In Google Cloud Console, add `http://localhost:3000/api/auth/callback/google` as an authorised redirect URI. Add the production callback URL when deploying.
3. Create the PostgreSQL database and run `npx prisma migrate dev --name init`.
4. Start the app with `npm.cmd run dev`.
5. In another terminal, install the Stripe CLI and run `stripe listen --forward-to localhost:3000/api/webhooks/stripe`. Copy its `whsec_...` value to `STRIPE_WEBHOOK_SECRET` and restart the app.

## Purchase flow

- The course modal requires a signed-in Auth.js session.
- The server re-checks the session, validates the course ID and WhatsApp number, and creates Stripe Checkout using server-side prices.
- The success page does not grant access by itself. It polls until the Stripe webhook has verified `checkout.session.completed` and persisted a paid purchase for that signed-in user.
- `WHATSAPP_TUTOR_WEBHOOK_URL` is an optional server-to-server hook for your WhatsApp Business/Twilio service. Without it, the paid purchase is still recorded with `NOT_CONFIGURED`, so a tutor can follow up manually. No WhatsApp message is falsely claimed as sent.

Never commit `.env.local` or real API keys. Use Stripe test keys until the complete webhook and tutor handoff flow has been tested.

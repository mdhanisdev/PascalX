# PasconX

Public marketing website for PasconX live cybersecurity training programmes.

## Technology

- Next.js 16 (App Router)
- React 19 and TypeScript
- Lenis smooth scrolling
- Next.js image optimisation and generated SEO routes

## Local development

Requirements: Node.js 20.9 or later and npm.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Quality checks

Run these before every release:

```bash
npm run lint
npm run build
npm audit --omit=dev
```

## Production deployment

The canonical production URL is `https://www.pasconx.com`.

1. Create the hosting project in the client-owned hosting account.
2. Connect the client-owned GitHub repository.
3. Configure `www.pasconx.com` as the production domain and redirect the apex domain to the chosen canonical URL.
4. Confirm HTTPS is active before launch.
5. Deploy from the protected production branch after all quality checks pass.
6. Verify `/robots.txt`, `/sitemap.xml`, both programme pages, WhatsApp enquiry links, phone/email links, and the 404 page on the live domain.
7. Submit `https://www.pasconx.com/sitemap.xml` in the client-owned Google Search Console property.

No environment variables are currently required. If any are added later, document safe placeholder names in `.env.example`; never commit real values.

## Content updates

- Course content is maintained in `features/courses/data.ts`.
- FAQ content is maintained in `features/faq/data.ts`.
- Public images, brochures, and video assets are in `public/`.
- Before publishing an asset, confirm the client owns or licenses it for web use.

## Security and SEO

The app includes baseline response headers, robots rules, an XML sitemap, canonical metadata, course metadata, a generated social sharing image, and branded not-found/error fallbacks.

Before enabling analytics or error monitoring, create those services in the client-owned account and document the required environment variables. Do not place tracking IDs, API keys, or service credentials directly in source files.

## Handover

Use [`PRODUCTION_HANDOVER_TODO.md`](./PRODUCTION_HANDOVER_TODO.md) as the live release and client-handover record. It tracks QA, deployment, source-code transfer, credential handover, client sign-off, and the warranty period.

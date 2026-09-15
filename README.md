# PasconX Website — Client Handover

PasconX is a public marketing website for live cybersecurity training programmes. It is built with Next.js and can be deployed to Vercel or another Node.js-compatible host.

## Project structure

```text
app/                 Pages, styles, metadata, icons, sitemap, and robots rules
components/          Reusable course, layout, provider, SEO, and UI components
features/            Course data, FAQ data, and Cloudinary media URLs
public/              PasconX logo and downloadable course brochure
tests/e2e/           Automated browser smoke tests
.github/workflows/   GitHub Actions quality checks
```

## Requirements

- Node.js 20.9 or later
- npm

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production commands

```bash
npm run lint         # code-quality check
npm run build        # production build
npm run test:e2e     # browser smoke tests
npm audit --omit=dev # production dependency audit
npm run verify       # runs all release checks
```

The browser tests use Playwright. On a new computer, install its browser once:

```bash
npx playwright install chromium
```

## Content management

| Content | File to update |
| --- | --- |
| Main course titles, details, modules, outcomes, and brochure links | `features/courses/data.ts` |
| Frequently asked questions | `features/faq/data.ts` |
| All Cloudinary images and videos | `features/media/assets.ts` |
| Website-wide styles | `app/globals.css` |
| Logo, browser icon, Apple icon, and favicon | `app/icon.png`, `app/apple-icon.png`, `app/favicon.ico` |

### Cloudinary media

All active course images and background videos are delivered from the Cloudinary account `fsaktlwi`. Update a Cloudinary delivery URL only in `features/media/assets.ts`; the website then uses it everywhere automatically.

The current site does not need Cloudinary API keys or environment variables. Do not commit Cloudinary API secrets to this repository.

## Deployment

Canonical domain: `https://www.pasconx.com`

1. Create the hosting project in a client-owned Vercel or hosting account.
2. Connect this GitHub repository.
3. Set `www.pasconx.com` as the production domain and redirect the apex domain to it.
4. Deploy from `main` after `npm run verify` passes.
5. Confirm HTTPS, home page, both course pages, WhatsApp links, brochure link, phone/email links, `/robots.txt`, `/sitemap.xml`, and the 404 page on the live domain.
6. Submit `https://www.pasconx.com/sitemap.xml` to the client-owned Google Search Console property.

## Included production safeguards

- Search-engine metadata, canonical URLs, sitemap, robots rules, Open Graph image, and structured course data
- Security headers: CSP, HSTS, anti-framing, COOP, referrer policy, and permissions policy
- Branded error and not-found pages
- Accessible skip link, keyboard focus styles, and reduced-motion support
- Automated GitHub Actions checks for linting, build, dependency audit, and browser tests
- Browser, Apple, and legacy favicon support

## Support notes

- There are no required environment variables today.
- Keep `package-lock.json` committed so deployments use the tested dependency versions.
- Do not upload `node_modules`, `.next`, test results, or local editor folders to Git.
- Client-owned hosting, GitHub, Cloudinary, analytics, monitoring, and DNS accounts are recommended for long-term ownership.

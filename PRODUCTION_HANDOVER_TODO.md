# PasconX — Production & Client Handover Checklist

**Project:** PasconX cybersecurity learning website  
**Repository:** `https://github.com/mdhanisdev/PascalX`  
**Checklist created:** 2026-09-14  
**Status:** Pre-production — implementation work has not been authorised.

This checklist is adapted for this project from the provided *Freelance Web Dev Playbook*, particularly its Testing & QA, Launch, GitHub Handover, and Delivery guidance.

## Change-control agreement

- No application, configuration, deployment, Git, or GitHub changes will be made without explicit approval for the next item.
- Each approved item will be completed, verified, and recorded here before moving forward.
- GitHub commits and pushes are deferred until the codebase passes the agreed pre-production gate and approval is given.
- Production ownership, credentials, hosting, domain, analytics, and monitoring should belong to the client. Secrets must never be committed or pasted into chat.

## Current verified status

| Item | Status | Evidence / note |
| --- | --- | --- |
| Production build | Complete | `npm.cmd run build` passed on 2026-09-14. |
| Git remote | Complete | `origin` points to `https://github.com/mdhanisdev/PascalX.git`. |
| Release-scope review | Complete | Completed 2026-09-14; findings are recorded below. |
| Production lint gate | Complete | 11 internal-navigation errors were corrected; `npm.cmd run lint` passed on 2026-09-14. |
| Dependency security audit | Complete | After the approved update, `npm.cmd audit --omit=dev` reported 0 vulnerabilities on 2026-09-14. |
| Diff integrity | Complete | `git diff --check` found no whitespace errors. Line-ending conversion warnings should be reviewed before the release commit. |
| Release hygiene review | Complete | Completed 2026-09-14; no tracked secrets, debug logging, or placeholder content requiring removal were found. |
| README handover readiness | Complete | Client-ready setup, quality-check, deployment, content, security, and handover guidance was added on 2026-09-14. |
| Functional QA | In progress | All three local routes returned HTTP 200 on 2026-09-14; browser, responsive, and real-device interaction testing remains pending. |
| Automated tests | Pending | No Vitest or Playwright scripts are currently configured in `package.json`. |
| Production security / SEO | In progress | Headers, robots, sitemap, canonical metadata, social image, course metadata, and branded fallbacks were added and verified locally. Analytics and error monitoring await client-owned accounts. |
| Production deployment | Not started | Hosting, domain, and production configuration are not yet confirmed. |
| Client handover | Not started | Must follow final payment and ownership-transfer conditions. |

## Release-scope review — 2026-09-14

### Files currently awaiting release review

The working tree contains website, scrolling, course-navigation, footer, enquiry, data, and styling changes. It also includes:

- a removed `components/layout/CourseMobileMenu.tsx` file;
- a new `components/providers/CourseScrollReset.tsx` file;
- a new `public/Logo.jpeg` asset; and
- this checklist file.

Before committing, the client or project owner should confirm that every one of these changes is intentional and that `Logo.jpeg` is licensed, final, and optimized for web delivery.

### Release blockers

1. **README must be rewritten.** It currently describes a generic starter project rather than the PasconX application and handover process.
2. **QA evidence is missing.** No automated test suite or documented manual cross-browser/device pass exists yet.
3. **Production safeguards are not configured.** Security headers, monitoring, analytics decision, sitemap/robots, and branded error handling need an approved scope.

### Non-blocking observations

- The production build succeeds.
- The lint and production build gates both passed after the internal navigation update on 2026-09-14.
- The approved dependency update raised Next.js from 16.3.0 to 16.3.5 and Sharp from 0.35.3 to 0.35.4; lint, production build, and the production dependency audit all passed afterward.
- No `console.log`, `console.debug`, `console.warn`, `console.error`, `TODO`, `FIXME`, or obvious secret-token text was found in the application source search.
- `.gitignore` excludes environment files, dependencies, build output, Vercel state, and PEM files.
- The project uses `npm` and has a committed lockfile; any audit should use `npm audit`, not the playbook's `pnpm audit` example.
- The largest public asset is `public/media/signal-grid.mp4` (about 7.4 MB). It is a Lighthouse/LCP review item, not an automatic removal candidate.
- No custom `app/not-found.tsx` or `app/error.tsx` exists, and no automated-test configuration or test directory was found.

### Release-hygiene review — 2026-09-14

- **Secrets:** no tracked `.env`, certificate, key, or common credential-pattern matches were found. Real deployment values must still remain outside Git.
- **Debug and placeholder review:** no application `console.log`, `console.debug`, `console.warn`, `console.error`, `TODO`, `FIXME`, Lorem Ipsum, or starter-contact placeholders requiring removal were found.
- **Assets:** `public/Logo.jpeg` remains untracked and needs explicit release approval. The public brochure, image, and video assets should be checked for client ownership and final publishing rights.
- **Release hygiene:** `git diff --check` is clean, but Git reports LF-to-CRLF conversion warnings for edited source files. The final release commit should be reviewed to ensure it does not contain unintended line-ending churn.

### Metadata, SEO, and security readiness review — 2026-09-14

- **Present:** root metadata has a basic PasconX title and description, the document language is English, and a favicon exists.
- **Missing:** no `robots.ts`, `sitemap.ts`, web manifest, Open Graph image/metadata, Twitter metadata, canonical URL, or page-specific course metadata was found.
- **Missing:** no custom `not-found.tsx` or `error.tsx` route was found.
- **Missing:** `next.config.ts` has no security response headers. A safe policy must account for the site's self-hosted media and third-party destinations before implementation.
- **Decision needed:** the final canonical production domain, public social-preview image, analytics provider, error-monitoring provider, and privacy/cookie requirements must be confirmed before final SEO and security configuration.

### Production baseline implementation — 2026-09-14

- **Canonical URL:** configured as `https://www.pasconx.com`.
- **SEO:** added root/canonical/course metadata, generated Open Graph image, `robots.txt`, and `sitemap.xml` covering the homepage and both programme pages.
- **Security:** added CSP, Permissions-Policy, Referrer-Policy, HSTS, `X-Content-Type-Options`, and anti-framing headers in `next.config.ts`. Local response verification confirmed all six headers.
- **Reliability:** added branded 404 and error fallbacks.
- **Handover:** replaced the default README with PasconX run, QA, deployment, content-management, security, and handover instructions.
- **Git hygiene:** added `.gitattributes` to normalise future text files to LF and avoid accidental line-ending churn in release commits.
- **Deferred intentionally:** analytics and error monitoring require client-owned accounts and must not be guessed or created under the developer's account.

## Phase 1 — Release baseline and code quality

- [x] **Approved and completed:** Perform a read-only release-scope review of the current uncommitted changes.
- [ ] **Client decision required:** Review the recorded change inventory and agree the final release scope.
- [x] **Approved and completed:** Replace the internal homepage anchors flagged by ESLint with Next.js `Link` components; lint and build both pass.
- [x] **Approved and completed:** Run the read-only production dependency audit and record its findings.
- [x] **Approved and completed:** Upgrade Next.js to 16.3.5 and Sharp to 0.35.4; regenerate the lockfile and verify lint, build, and audit all pass.
- [x] **Approved and completed:** Perform a read-only release-hygiene review for secrets, debug artefacts, placeholder content, and release-file hygiene.
- [ ] **Approval required:** Check for accidental secrets, private keys, debug output, placeholder content, and unused release artifacts.
- [x] **Completed:** Add `.gitattributes` to normalise repository line endings for future release commits.
- [x] **Completed:** Add a GitHub Actions quality gate for pushes and pull requests to `main` (`npm ci`, lint, build, and production dependency audit).
- [ ] **Approval required:** Create a clean release commit using a professional conventional-commit message.

## Phase 2 — User-flow and responsive QA

- [x] **Approved and completed:** Verify the local homepage and both programme routes respond successfully (all returned HTTP 200).
- [ ] **Approval required:** Test homepage navigation, carousel controls, mobile menu, Lenis scrolling, and back-to-top behavior.
- [ ] **Approval required:** Test both course pages: open from the carousel, return to programmes, footer links, brochure links, and mobile layout.
- [ ] **Approval required:** Test the WhatsApp enquiry flows end-to-end, including the correct recipient, prefilled message, and post-submit state.
- [ ] **Approval required:** Test at mobile, tablet, laptop, and large-desktop widths; verify on a real Android and iPhone where available.
- [ ] **Approval required:** Test Chrome, Firefox, and Safari; log any browser-extension-only console noise separately from product defects.
- [ ] **Approval required:** Verify all internal and external links, phone links, email links, Instagram link, and WhatsApp links.
- [x] **Completed:** Add branded `not-found` and error fallback pages.

## Phase 3 — Accessibility, performance, SEO, and security

- [ ] **Approval required:** Run Lighthouse on the home page and both course pages using the mobile profile; record Performance, Accessibility, Best Practices, and SEO scores (target: 90+ each).
- [ ] **Approval required:** Perform keyboard-only navigation, visible-focus, heading-order, contrast, alt-text, and form-label checks.
- [ ] **Approval required:** Confirm motion-reduction behavior and test that Lenis and route transitions remain usable with reduced motion enabled.
- [ ] **Approval required:** Review images, video sizes, and loading priority to protect LCP and prevent layout shift.
- [x] **Completed:** Add baseline production security headers and verify them locally.
- [x] **Completed:** Finalise canonical metadata, course metadata, social-sharing image, robots rules, and sitemap.

## Phase 4 — Production readiness

- [ ] **Client decision required:** Confirm the production host, domain, DNS owner, and client account that will own the deployment.
- [ ] **Client decision required:** Confirm the final public contact details, WhatsApp number, Instagram URL, and course brochure URLs.
- [ ] **Approval required:** Prepare safe `.env.example` documentation if any production variables are introduced; do not expose real values.
- [ ] **Client decision required:** Choose analytics and error monitoring, or explicitly document that they are out of scope.
- [ ] **Client decision required:** Choose uptime monitoring, or explicitly document that it is out of scope.
- [ ] **Approval required:** Deploy a preview, complete the release checklist against it, and obtain client approval before production deployment.
- [ ] **Approval required:** Configure the real domain, HTTPS, production environment values, redirects, and sitemap submission.
- [ ] **Approval required:** Re-test all user-facing flows on the live production domain.
- [ ] **Client / maintainer task:** Monitor errors, uptime, and key flows for 24–48 hours after launch.

## Phase 5 — GitHub release and source-code handover

- [ ] **Approval required:** Review `git diff` with the user and confirm every file intended for release.
- [ ] **Approval required:** Commit the release with a professional message, for example: `feat: prepare PasconX production release`.
- [ ] **Approval required:** Push the approved commit to `origin` on the agreed branch.
- [ ] **Client decision required:** Confirm whether the GitHub repository should remain under `mdhanisdev` or be transferred to the client’s GitHub account/organisation after payment.
- [ ] **Approval required:** Update the README with installation, local development, build, deployment, and client-support instructions.
- [ ] **Client / maintainer task:** Hand over production credentials through a password manager—not Git, chat, or email.
- [ ] **Client / maintainer task:** Transfer repository and infrastructure ownership only after final payment clears; rotate credentials that passed through the developer.
- [ ] **Client / maintainer task:** Obtain written delivery sign-off and record the warranty period.

## Decision log

| Date | Decision | Status |
| --- | --- | --- |
| 2026-09-14 | Use the provided playbook as the production and handover baseline. | Confirmed |
| 2026-09-14 | Require explicit approval before each implementation, commit, push, deployment, or ownership action. | Confirmed |
| 2026-09-14 | Do not push the current dirty working tree to GitHub. | Confirmed |
| 2026-09-14 | Local route smoke test completed: homepage and both programme pages returned HTTP 200. | Confirmed |
| 2026-09-14 | Full interactive QA is blocked in this workspace because no controllable browser surface is available. | Recorded |
| 2026-09-14 | Metadata, SEO, and security readiness review completed; implementation awaits final production-domain and client-service decisions. | Recorded |
| 2026-09-14 | Canonical domain confirmed as `https://www.pasconx.com`; production SEO, headers, fallbacks, README, and line-ending baseline implemented and locally verified. | Confirmed |

## Next proposed step

**Phase 4, item 1:** choose client-owned hosting, analytics, error monitoring, and uptime monitoring accounts; then configure only the selected production services. No developer-owned account should hold client production data or credentials.

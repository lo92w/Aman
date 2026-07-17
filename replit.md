# أمان | Aman — Smart Trust Layer for Bank Transfers

## Overview
Hackathon prototype: a FinTech "trust layer" that prevents transfer fraud (social engineering, mule accounts, fake stores) inside a mobile-first banking UI that mimics Alinma Bank. Fully Arabic, RTL. Every outgoing transfer is analyzed by a rule-based Trust Engine that produces a Trust Score (4–98) and routes the transfer into one of several protective flows.

Judging targets: Innovation 25%, Impact 25%, Technical 20%, Scalability 15%, UX 10%, Presentation 5%.

## Architecture
- **Monorepo (pnpm)** — OpenAPI-first workflow.
  - `lib/api-spec/openapi.yaml` — 14 endpoints; codegen produces `@workspace/api-client-react` hooks + `@workspace/api-zod` validators. Regenerate after spec changes.
  - `lib/db` — Drizzle schema: users, beneficiaries, recipient_profiles (network intelligence keyed by normalized IBAN), transfers (factors/timeline jsonb), notifications, security_stats singleton.
  - `artifacts/api-server` — Express 5 API (routes under `/api`):
    - `src/lib/trust-engine.ts` — scoring rules: base 72 + signed factors (history, account age, name match, amount, community reports, velocity, mule score, scam keywords in purpose), clamp 4–98. Risk bands: ≥75 proceed, 45–74 social_check, <45 recipient_approval; hard block when reports ≥15 or muleScore ≥80.
    - `src/lib/aman-service.ts` — mapping, notifications, stats, lazy lifecycle transitions (`applyLifecycle` runs on every read; no cron). Money: hold on awaiting (balance−/held+), refund on cancel/expire/reject, release on completion.
    - Social check escalation on create: ≥2 red-flag answers → block; 1 → recipient_approval; 0 → proceed. Blocked + `overrideAcknowledged` → forced recipient_approval.
    - Timers: recipient approval deadline +10 min; cooling period +90 s.
  - `artifacts/aman` — React+Vite frontend (Wouter, TanStack Query, shadcn), pages: login, dashboard, transfer-flow (hero feature: analyze → social check → action → result), transfers list/detail (countdowns + demo simulate panel), protection center, notifications. The protection center was simplified to a personal bank-style security view (status, protection settings, tips, alerts) rather than a network-intelligence dashboard.
- **Auth is fake/demo**: login accepts anything → demo user id 1; client keeps `aman_auth` flag in localStorage.
- Frontend must prefix API calls with Vite `BASE_URL` (no root-relative `/api`). Generated client already does this.

## Demo script (seeded scenarios)
Seed: `pnpm --filter @workspace/scripts run seed:aman` (TRUNCATE + reseed; run to reset a clean demo state).
- Trusted beneficiary سارة القحطاني `SA0310000002210011870025` → score ~98, instant proceed.
- Medium risk بدر الشهراني `SA5540000001229077430031` → social check questions.
- High risk / investment scam `SA3960000333221100998877` → recipient approval + network insight.
- Blocked / mule network `SA7115000999887766554433` → hard block (override → forced recipient approval).
- A live awaiting transfer to بدر is seeded with ~8 min countdown for the transfers screen.
- Transfer detail page has a demo panel to simulate recipient approve/reject and skip timers.

## Conventions
- Express 5: async handlers return `Promise<void>`, use `res.status().json(); return;`, log via `req.log` (pino) — never console.log.
- Arabic user-facing strings everywhere (backend errors too); numerals via `ar-u-nu-latn`.
- Brand: petrol `#02141E`/`#002134`, lavender `#837FD8`, cream `#FDF8F5`, salmon `#CD907E`; fonts Tajawal + IBM Plex Sans Arabic. Assets in `attached_assets/` (alinma-logo.svg, alinma-reference.png).

## User preferences
- Communicate in **Arabic**, non-technical register (user is on the Replit iOS app; explain in product terms, not code terms).
- User gave full creative freedom; optimize for hackathon judging criteria and stage-demo impact.

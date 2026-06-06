<div align="center">
  <img src="docs/assets/logo.png" alt="Viprasol Tech" width="120" />

  <h1>Next.js SaaS Starter</h1>

  <p><strong>Pricing &amp; billing math, a real dashboard, usage metering, an auth-ready session flow, and dark mode — start shipping features, not boilerplate.</strong></p>

  <p>Built and maintained by Viprasol Tech</p>

  <p>
    <a href="https://github.com/Viprasol-Tech/nextjs-saas-starter/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License: MIT" /></a>
    <a href="https://github.com/Viprasol-Tech/nextjs-saas-starter"><img src="https://img.shields.io/badge/Next.js-14-black.svg?logo=next.js" alt="Next.js 14" /></a>
    <a href="https://github.com/Viprasol-Tech/nextjs-saas-starter"><img src="https://img.shields.io/badge/TypeScript-strict-3178c6.svg?logo=typescript&logoColor=white" alt="TypeScript strict" /></a>
    <a href="https://github.com/Viprasol-Tech/nextjs-saas-starter"><img src="https://img.shields.io/badge/tests-123%20passing-brightgreen.svg" alt="123 tests passing" /></a>
    <a href="https://github.com/Viprasol-Tech/nextjs-saas-starter"><img src="https://img.shields.io/badge/version-0.2.0-blueviolet.svg" alt="version 0.2.0" /></a>
  </p>
</div>

---

A lightweight, opinionated starting point for a SaaS product built on the Next.js App Router and TypeScript (strict mode). It ships a marketing landing page with working pricing, an authenticated dashboard with stat widgets and a usage/activity view, billing pages with real proration math, and well-tested logic modules — so you can drop in your own database and auth provider with confidence.

## ✨ Features

- 🧱 **App Router (Next.js 14)** — clean root layout with a `(dashboard)` route group.
- 💳 **Billing math** in `lib/pricing.ts` — annual savings, per-seat totals, and prorated charges for mid-cycle seat adds and plan changes.
- 📊 **Dashboard** — stat widgets, usage progress bars, and a recent-activity feed.
- 📈 **Usage metering** in `lib/usage.ts` — ratios, severity levels, remaining allowance, and attention filtering.
- 🕑 **Activity feed** helpers in `lib/activity.ts` — relative timestamps and recency sorting.
- 🔐 **Auth-ready session flow** in `lib/session.ts` — session creation/expiry, role hierarchy, and permission checks.
- 🌙 **Dark mode** — a no-flash bootstrap script and a persistent `<ThemeToggle>`.
- 💬 **Marketing sections** — feature highlights, testimonials, and an FAQ accordion.
- 🎨 **Tailwind CSS** preconfigured with a brand palette and `class`-based dark mode.
- ✅ **Fully tested** — 123 Vitest tests covering every lib module plus component render tests under jsdom.

## 🚀 Quickstart

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The dashboard lives at `/dashboard`.

```bash
npm run typecheck   # tsc --noEmit (strict, zero errors)
npm test            # vitest run (123 tests)
```

## 📦 What's included

| Area | Module | Highlights |
| --- | --- | --- |
| Pricing & billing | `lib/pricing.ts` | `seatTotal`, `prorateUpgrade`, `proratePlanChange`, `computeAnnualSavings`, `formatPrice` |
| Usage metering | `lib/usage.ts` | `usageRatio`, `usageLevel`, `usageRemaining`, `metricsNeedingAttention` |
| Activity | `lib/activity.ts` | `relativeTime`, `recentActivity`, `sortByRecency`, `countByKind` |
| Sessions & roles | `lib/session.ts` | `createSession`, `isSessionExpired`, `hasRole`, `canManageBilling` |
| Theme | `lib/theme.ts` | `resolveInitialTheme`, `toggleTheme`, `themeBootstrapScript` |
| Components | `components/` | `PricingCard`, `StatCard`, `UsageBar`, `ActivityFeed`, `DashboardNav`, `ThemeToggle`, `Faq`, `Testimonials` |
| Pages | `app/` | Landing, dashboard overview, billing, settings |

### Project structure

```
app/
  layout.tsx                  # root layout + dark-mode bootstrap
  page.tsx                    # landing: hero, pricing, testimonials, FAQ
  globals.css
  (dashboard)/
    layout.tsx                # auth-gated shell with sidebar
    dashboard/
      page.tsx                # stat widgets, usage bars, activity feed
      billing/page.tsx        # seat + proration math
      settings/page.tsx       # profile, permissions, danger zone
components/                   # presentational + client components
lib/                          # pure, unit-tested logic
tests/                        # vitest unit + render tests (jsdom)
```

## 🧮 Billing math example

```ts
import { getPlan, prorateUpgrade, proratePlanChange } from "@/lib/pricing";

const pro = getPlan("pro")!;
const scale = getPlan("scale")!;

// Add 2 seats with 15 of 30 days left in the period:
prorateUpgrade(pro, "monthly", { addedSeats: 2, daysRemaining: 15 });

// Upgrade 5 seats from Pro to Scale mid-cycle (positive = owed):
proratePlanChange(pro, scale, "monthly", { daysRemaining: 15, seats: 5 });
```

## 🗺️ Roadmap

- [x] Pricing logic with annual savings
- [x] Seat-based and prorated billing math
- [x] Dashboard with stat widgets, usage bars, and activity feed
- [x] Billing and settings pages
- [x] Auth-ready session flow with role checks
- [x] Dark mode with a persistent toggle
- [ ] Stripe checkout adapter
- [ ] Database adapter (Drizzle/Prisma) examples
- [ ] Email + invite flows
- [ ] End-to-end tests (Playwright)

## ❓ FAQ

**Is this production ready?** The pricing, billing, usage, and session logic are fully typed and unit tested. Bring your own database and auth provider and you are ready to ship.

**How do I plug in real auth?** Replace `getCurrentUser` in `lib/session.ts` with a read from your identity provider; the rest of the role and permission helpers keep working.

**Does it support annual billing and proration?** Yes — see `lib/pricing.ts` and the billing page for seat totals and mid-cycle proration.

**Can I use it commercially?** Yes, it is MIT licensed.

## 🤝 Contributing

Contributions are welcome! Please open an issue to discuss substantial changes first. Before sending a PR, make sure both checks are green:

```bash
npm run typecheck
npm test
```

See [CONTRIBUTING.md](CONTRIBUTING.md) and our [Code of Conduct](CODE_OF_CONDUCT.md).

## Contact — Viprasol Tech Private Limited

- Website: [viprasol.com](https://viprasol.com)
- Email: [support@viprasol.com](mailto:support@viprasol.com)
- Telegram: [t.me/viprasol_help](https://t.me/viprasol_help) | WhatsApp: +91 96336 52112
- GitHub: [@Viprasol-Tech](https://github.com/Viprasol-Tech) | [LinkedIn](https://www.linkedin.com/in/viprasol/) | X [@viprasol](https://twitter.com/viprasol)

## License

[MIT](LICENSE) (c) 2025 Viprasol Tech Private Limited

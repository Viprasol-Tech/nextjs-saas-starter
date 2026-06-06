<div align="center">
  <img src="docs/assets/logo.png" alt="Viprasol Tech" width="120" />

  <h1>Next.js SaaS Starter</h1>

  <p><strong>Auth-ready layout, pricing, and a dashboard shell — start shipping features, not boilerplate.</strong></p>

  <p>Built and maintained by Viprasol Tech</p>

  <p>
    <a href="https://github.com/Viprasol-Tech/nextjs-saas-starter/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License: MIT" /></a>
    <a href="https://github.com/Viprasol-Tech/nextjs-saas-starter"><img src="https://img.shields.io/badge/Next.js-14-black.svg?logo=next.js" alt="Next.js 14" /></a>
    <a href="https://github.com/Viprasol-Tech/nextjs-saas-starter"><img src="https://img.shields.io/badge/TypeScript-strict-3178c6.svg?logo=typescript&logoColor=white" alt="TypeScript strict" /></a>
  </p>
</div>

---

A lightweight, opinionated starting point for a SaaS product built on the Next.js App Router and TypeScript (strict mode). It ships a marketing landing page with a working pricing section, an authenticated dashboard shell, and well-tested logic modules so you can drop in your own database and auth provider with confidence.

## Features

- **App Router (Next.js 14)** with a clean root layout and a `(dashboard)` route group.
- **Marketing landing page** — hero plus a pricing grid driven by typed plan data.
- **Pricing logic in `lib/pricing.ts`** — `computeAnnualSavings`, `computeAnnualSavingsPercent`, `annualTotal`, `getPlan`, and `formatPrice` (Intl-based).
- **Typed session helper in `lib/session.ts`** — `getCurrentUser`, `requireUser`, `canManageBilling`, and avatar `initials`. Swap the fake user for your real auth.
- **Reusable components** — `<PricingCard>` and `<DashboardNav>`.
- **Tailwind CSS** preconfigured with a small brand palette.
- **Fully tested** — Vitest unit tests for the logic modules plus a `@testing-library/react` render test for `<PricingCard>`.

## Quickstart

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the marketing page and [http://localhost:3000/dashboard](http://localhost:3000/dashboard) for the dashboard shell.

### Verify

```bash
npm run typecheck   # tsc --noEmit, zero errors
npm test            # vitest run, all green
```

## What's included

```
app/
  layout.tsx                     # root layout + globals
  page.tsx                       # marketing hero + pricing grid
  (dashboard)/
    layout.tsx                   # authed shell with DashboardNav
    dashboard/page.tsx           # dashboard overview
components/
  PricingCard.tsx                # single pricing plan card
  DashboardNav.tsx               # sidebar navigation
lib/
  pricing.ts                     # plans + pricing math + formatting
  session.ts                     # typed fake session helpers
tests/
  pricing.test.ts                # pricing math & formatting
  session.test.ts                # session helpers
  PricingCard.test.tsx           # component render test
```

## Contributing

Contributions are welcome. Fork the repo, create a feature branch, make sure `npm run typecheck` and `npm test` pass, and open a pull request describing your change.

## Contact — Viprasol Tech Private Limited

- Website: [viprasol.com](https://viprasol.com)
- Email: [support@viprasol.com](mailto:support@viprasol.com)
- Telegram: [t.me/viprasol_help](https://t.me/viprasol_help) | WhatsApp: +91 96336 52112
- GitHub: [@Viprasol-Tech](https://github.com/Viprasol-Tech) | [LinkedIn](https://www.linkedin.com/in/viprasol/) | X [@viprasol](https://twitter.com/viprasol)

## License

[MIT](LICENSE) (c) 2025 Viprasol Tech Private Limited

# Changelog

Format based on [Keep a Changelog](https://keepachangelog.com/); versioning
follows [SemVer](https://semver.org/).

## [0.2.0] - 2025

### Added
- **Billing math** in `lib/pricing.ts`: `perMonthPrice`, `seatTotal`,
  `prorateUpgrade`, `proratePlanChange`, and `roundCurrency` for seat-based and
  prorated mid-cycle charges.
- **Usage metering** in `lib/usage.ts`: ratios, levels, remaining allowance,
  attention filtering, and demo fixtures.
- **Activity feed** helpers in `lib/activity.ts`: relative timestamps, recency
  sorting, and demo events.
- **Theme helpers** in `lib/theme.ts` plus a `ThemeToggle` client component and
  a no-flash bootstrap script for dark mode.
- **Session flow** in `lib/session.ts`: `createSession`, `isSessionExpired`,
  `getSession`, `hasRole`, `canInviteMembers`, `canDeleteWorkspace`.
- **Pages**: a richer dashboard (stat widgets, usage bars, recent activity), a
  billing page with seat/proration math, and a settings page.
- **Components**: `StatCard`, `UsageBar`, `ActivityFeed`, `Faq`, `Testimonials`.
- **Homepage**: feature highlights, testimonials, and an FAQ section.
- Dark-mode styling across all pages and components.
- Test suite expanded from 29 to 123 tests (lib unit tests + component render
  tests under jsdom).

### Changed
- `formatPrice` now renders two decimals for fractional amounts.
- Bumped version to 0.2.0.

## [0.1.0] - 2025

### Added
- Initial release of nextjs-saas-starter: Next.js SaaS starter — auth-ready layout, pricing, dashboard shell.

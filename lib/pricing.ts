export type BillingInterval = "monthly" | "annual";

export interface Plan {
  /** Stable identifier used in URLs and checkout. */
  id: string;
  /** Display name shown on the pricing card. */
  name: string;
  /** Short marketing line under the name. */
  tagline: string;
  /** Price in whole currency units (e.g. dollars) per month, billed monthly. */
  monthlyPrice: number;
  /**
   * Price in whole currency units per month when billed annually.
   * Should be <= monthlyPrice to produce a positive saving.
   */
  annualMonthlyPrice: number;
  /** Feature bullet points. */
  features: string[];
  /** Marks the visually highlighted plan. */
  highlighted?: boolean;
}

/** The default plan catalogue shipped with the starter. */
export const PLANS: readonly Plan[] = [
  {
    id: "free",
    name: "Free",
    tagline: "For side projects and trying things out.",
    monthlyPrice: 0,
    annualMonthlyPrice: 0,
    features: ["1 project", "Community support", "1 GB storage"],
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "For growing teams that need more room.",
    monthlyPrice: 29,
    annualMonthlyPrice: 24,
    features: [
      "Unlimited projects",
      "Priority support",
      "100 GB storage",
      "Advanced analytics",
    ],
    highlighted: true,
  },
  {
    id: "scale",
    name: "Scale",
    tagline: "For organisations with serious workloads.",
    monthlyPrice: 99,
    annualMonthlyPrice: 79,
    features: [
      "Everything in Pro",
      "SSO & SAML",
      "1 TB storage",
      "Dedicated success manager",
    ],
  },
] as const;

/**
 * Look up a plan by its id.
 * @returns the matching plan, or undefined when no plan has that id.
 */
export function getPlan(
  id: string,
  plans: readonly Plan[] = PLANS,
): Plan | undefined {
  return plans.find((plan) => plan.id === id);
}

/**
 * Total amount charged for a plan over one year for the given interval.
 * Monthly billing charges the monthly price 12 times; annual billing charges
 * the discounted monthly price 12 times (typically up front).
 */
export function annualTotal(plan: Plan, interval: BillingInterval): number {
  const perMonth =
    interval === "annual" ? plan.annualMonthlyPrice : plan.monthlyPrice;
  return perMonth * 12;
}

/**
 * Absolute amount saved over a year by choosing annual billing instead of
 * monthly billing. Never returns a negative number.
 */
export function computeAnnualSavings(plan: Plan): number {
  const saving = annualTotal(plan, "monthly") - annualTotal(plan, "annual");
  return Math.max(0, saving);
}

/**
 * Percentage saved over a year by choosing annual billing, rounded to the
 * nearest whole percent. Returns 0 when the monthly total is 0 to avoid
 * dividing by zero.
 */
export function computeAnnualSavingsPercent(plan: Plan): number {
  const monthlyYear = annualTotal(plan, "monthly");
  if (monthlyYear <= 0) return 0;
  return Math.round((computeAnnualSavings(plan) / monthlyYear) * 100);
}

/**
 * Format a whole-currency amount for display.
 * @example formatPrice(29) // "$29"
 * @example formatPrice(29, { currency: "EUR" }) // "€29"
 */
export function formatPrice(
  amount: number,
  options: { currency?: string; locale?: string } = {},
): string {
  const { currency = "USD", locale = "en-US" } = options;
  const fractionDigits = Number.isInteger(amount) ? 0 : 2;
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(amount);
}

/** Per-month price for a plan at the given billing interval. */
export function perMonthPrice(plan: Plan, interval: BillingInterval): number {
  return interval === "annual" ? plan.annualMonthlyPrice : plan.monthlyPrice;
}

/**
 * Round a monetary value to whole cents to avoid floating-point dust such as
 * `0.1 + 0.2`. All proration/seat math runs results through this helper.
 */
export function roundCurrency(amount: number): number {
  return Math.round((amount + Number.EPSILON) * 100) / 100;
}

/**
 * Cost for a number of seats over one billing period.
 * Monthly billing charges per-seat per month; annual billing charges the
 * discounted per-seat monthly price multiplied by 12 (one year up front).
 *
 * @param seats number of seats; values below 1 are clamped to 1.
 */
export function seatTotal(
  plan: Plan,
  interval: BillingInterval,
  seats: number,
): number {
  const safeSeats = Math.max(1, Math.floor(seats));
  const perSeat = perMonthPrice(plan, interval);
  const months = interval === "annual" ? 12 : 1;
  return roundCurrency(perSeat * safeSeats * months);
}

/**
 * Prorated charge for adding seats partway through a billing period.
 * Only the unused fraction of the period is billed for the new seats.
 *
 * @param daysRemaining whole days left in the current period.
 * @param daysInPeriod total length of the current period in days (default 30).
 * @param addedSeats number of seats being added (clamped to >= 0).
 */
export function prorateUpgrade(
  plan: Plan,
  interval: BillingInterval,
  options: {
    addedSeats: number;
    daysRemaining: number;
    daysInPeriod?: number;
  },
): number {
  const { addedSeats, daysRemaining, daysInPeriod = 30 } = options;
  if (daysInPeriod <= 0) return 0;
  const seats = Math.max(0, Math.floor(addedSeats));
  const remaining = Math.min(Math.max(0, daysRemaining), daysInPeriod);
  const fraction = remaining / daysInPeriod;
  const perSeatForPeriod =
    interval === "annual"
      ? perMonthPrice(plan, interval) * 12
      : perMonthPrice(plan, interval);
  return roundCurrency(perSeatForPeriod * seats * fraction);
}

/**
 * Net amount due when switching a single seat from one plan to another in the
 * middle of a billing period. Returns a positive number for an upgrade (amount
 * owed) and a negative number for a downgrade (credit), prorated by the unused
 * fraction of the period.
 */
export function proratePlanChange(
  from: Plan,
  to: Plan,
  interval: BillingInterval,
  options: { daysRemaining: number; daysInPeriod?: number; seats?: number },
): number {
  const { daysRemaining, daysInPeriod = 30, seats = 1 } = options;
  if (daysInPeriod <= 0) return 0;
  const safeSeats = Math.max(1, Math.floor(seats));
  const remaining = Math.min(Math.max(0, daysRemaining), daysInPeriod);
  const fraction = remaining / daysInPeriod;
  const periodMultiplier = interval === "annual" ? 12 : 1;
  const fromCost = perMonthPrice(from, interval) * periodMultiplier;
  const toCost = perMonthPrice(to, interval) * periodMultiplier;
  return roundCurrency((toCost - fromCost) * safeSeats * fraction);
}

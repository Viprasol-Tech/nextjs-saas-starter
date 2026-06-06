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
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

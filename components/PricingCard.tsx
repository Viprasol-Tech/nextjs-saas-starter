import {
  computeAnnualSavings,
  computeAnnualSavingsPercent,
  formatPrice,
  type BillingInterval,
  type Plan,
} from "@/lib/pricing";

export interface PricingCardProps {
  plan: Plan;
  interval?: BillingInterval;
  currency?: string;
}

/**
 * Renders a single pricing plan. Shows the per-month price for the selected
 * billing interval and, when billed annually, the amount saved per year.
 */
export function PricingCard({
  plan,
  interval = "monthly",
  currency = "USD",
}: PricingCardProps) {
  const perMonth =
    interval === "annual" ? plan.annualMonthlyPrice : plan.monthlyPrice;
  const savings = computeAnnualSavings(plan);
  const savingsPercent = computeAnnualSavingsPercent(plan);
  const showSavings = interval === "annual" && savings > 0;

  return (
    <div
      data-testid="pricing-card"
      data-highlighted={plan.highlighted ? "true" : "false"}
      className={[
        "flex flex-col rounded-2xl border p-6 shadow-sm",
        plan.highlighted
          ? "border-brand-600 ring-2 ring-brand-600"
          : "border-slate-200",
      ].join(" ")}
    >
      {plan.highlighted && (
        <span className="mb-3 inline-block w-fit rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700">
          Most popular
        </span>
      )}

      <h3 className="text-xl font-semibold text-slate-900">{plan.name}</h3>
      <p className="mt-1 text-sm text-slate-500">{plan.tagline}</p>

      <div className="mt-4 flex items-baseline gap-1">
        <span className="text-4xl font-bold tracking-tight">
          {formatPrice(perMonth, { currency })}
        </span>
        <span className="text-sm text-slate-500">/ month</span>
      </div>

      {showSavings && (
        <p className="mt-2 text-sm font-medium text-emerald-600">
          Save {formatPrice(savings, { currency })} ({savingsPercent}%) per year
        </p>
      )}

      <ul className="mt-6 flex-1 space-y-2">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm">
            <span aria-hidden className="mt-0.5 text-brand-600">
              &#10003;
            </span>
            <span className="text-slate-700">{feature}</span>
          </li>
        ))}
      </ul>

      <a
        href={`/signup?plan=${plan.id}`}
        className={[
          "mt-6 inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold transition",
          plan.highlighted
            ? "bg-brand-600 text-white hover:bg-brand-700"
            : "bg-slate-100 text-slate-900 hover:bg-slate-200",
        ].join(" ")}
      >
        {plan.monthlyPrice === 0 ? "Get started" : `Choose ${plan.name}`}
      </a>
    </div>
  );
}

export default PricingCard;

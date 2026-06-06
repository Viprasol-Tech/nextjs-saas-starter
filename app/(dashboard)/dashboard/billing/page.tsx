import {
  canManageBilling,
  getCurrentUser,
  requireUser,
} from "@/lib/session";
import {
  computeAnnualSavings,
  computeAnnualSavingsPercent,
  formatPrice,
  getPlan,
  prorateUpgrade,
  proratePlanChange,
  seatTotal,
} from "@/lib/pricing";

const CURRENT_SEATS = 5;
const DAYS_REMAINING = 12;

export default function BillingPage() {
  const user = requireUser(getCurrentUser());
  const proPlan = getPlan("pro");
  const scalePlan = getPlan("scale");

  if (!canManageBilling(user) || !proPlan || !scalePlan) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
          Billing
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          You do not have permission to manage billing for this workspace.
        </p>
      </div>
    );
  }

  const annualSeatTotal = seatTotal(proPlan, "annual", CURRENT_SEATS);
  const monthlySeatTotal = seatTotal(proPlan, "monthly", CURRENT_SEATS);
  const annualSavings = computeAnnualSavings(proPlan) * CURRENT_SEATS;
  const annualSavingsPercent = computeAnnualSavingsPercent(proPlan);
  const addSeatCost = prorateUpgrade(proPlan, "monthly", {
    addedSeats: 2,
    daysRemaining: DAYS_REMAINING,
  });
  const upgradeToScale = proratePlanChange(proPlan, scalePlan, "monthly", {
    daysRemaining: DAYS_REMAINING,
    seats: CURRENT_SEATS,
  });

  const rows = [
    {
      label: "Current plan",
      value: `${proPlan.name} · ${CURRENT_SEATS} seats`,
    },
    {
      label: "Billed monthly",
      value: `${formatPrice(monthlySeatTotal)} / month`,
    },
    {
      label: "Billed annually",
      value: `${formatPrice(annualSeatTotal)} / year`,
    },
    {
      label: "Annual savings",
      value: `${formatPrice(annualSavings)} (${annualSavingsPercent}%)`,
    },
    {
      label: `Add 2 seats now (${DAYS_REMAINING} days left)`,
      value: `${formatPrice(addSeatCost)} prorated`,
    },
    {
      label: "Upgrade all seats to Scale",
      value: `${formatPrice(upgradeToScale)} prorated`,
    },
  ];

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
          Billing
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Manage your subscription, seats, and invoices.
        </p>
      </header>

      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <dl className="divide-y divide-slate-100 dark:divide-slate-800">
          {rows.map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between gap-4 px-5 py-4"
            >
              <dt className="text-sm text-slate-500 dark:text-slate-400">
                {row.label}
              </dt>
              <dd className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                {row.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <div className="flex flex-wrap gap-3">
        <a
          href="/#pricing"
          className="inline-flex rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700"
        >
          Change plan
        </a>
        <a
          href="/dashboard/settings"
          className="inline-flex rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
        >
          Workspace settings
        </a>
      </div>
    </div>
  );
}

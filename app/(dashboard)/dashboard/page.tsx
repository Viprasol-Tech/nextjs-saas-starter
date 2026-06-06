import {
  canManageBilling,
  getCurrentUser,
  requireUser,
} from "@/lib/session";
import { computeAnnualSavings, formatPrice, getPlan } from "@/lib/pricing";

const STATS = [
  { label: "Active projects", value: "12" },
  { label: "Team members", value: "5" },
  { label: "API calls (30d)", value: "48.2k" },
];

export default function DashboardPage() {
  const user = requireUser(getCurrentUser());
  const proPlan = getPlan("pro");
  const proSavings = proPlan ? computeAnnualSavings(proPlan) : 0;

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Welcome back, {user.name.split(" ")[0]}
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Here is what is happening across your workspace.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-3">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-slate-200 bg-white p-5"
          >
            <p className="text-sm text-slate-500">{stat.label}</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">
              {stat.value}
            </p>
          </div>
        ))}
      </section>

      {canManageBilling(user) && proPlan && (
        <section className="rounded-xl border border-brand-200 bg-brand-50 p-5">
          <h2 className="text-lg font-semibold text-brand-700">
            Save on billing
          </h2>
          <p className="mt-1 text-sm text-slate-700">
            Switch the {proPlan.name} plan to annual billing and save{" "}
            {formatPrice(proSavings)} per year.
          </p>
          <a
            href="/dashboard/billing"
            className="mt-3 inline-flex rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700"
          >
            Manage billing
          </a>
        </section>
      )}
    </div>
  );
}

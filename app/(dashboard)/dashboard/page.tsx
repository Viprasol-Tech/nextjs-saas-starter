import {
  canManageBilling,
  getCurrentUser,
  requireUser,
} from "@/lib/session";
import { computeAnnualSavings, formatPrice, getPlan } from "@/lib/pricing";
import { DEMO_USAGE, metricsNeedingAttention } from "@/lib/usage";
import { DEMO_ACTIVITY } from "@/lib/activity";
import { StatCard } from "@/components/StatCard";
import { UsageBar } from "@/components/UsageBar";
import { ActivityFeed } from "@/components/ActivityFeed";

const STATS = [
  { label: "Active projects", value: "12", change: "+2 this month" },
  { label: "Team members", value: "5", change: "+1 this month" },
  { label: "API calls (30d)", value: "48.2k", change: "+8.4%" },
  { label: "Churn (30d)", value: "1.2%", change: "-0.3%" },
] as const;

export default function DashboardPage() {
  const user = requireUser(getCurrentUser());
  const proPlan = getPlan("pro");
  const proSavings = proPlan ? computeAnnualSavings(proPlan) : 0;
  const alerts = metricsNeedingAttention(DEMO_USAGE);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
          Welcome back, {user.name.split(" ")[0]}
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Here is what is happening across your workspace.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat) => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            change={stat.change}
            negative={stat.change.trim().startsWith("-")}
          />
        ))}
      </section>

      {alerts.length > 0 && (
        <p className="rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-300">
          {alerts.length} metric{alerts.length === 1 ? "" : "s"} approaching the
          plan limit. Review usage below.
        </p>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="space-y-5 rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 lg:col-span-2">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
            Usage this period
          </h2>
          <div className="space-y-5">
            {DEMO_USAGE.map((metric) => (
              <UsageBar key={metric.key} metric={metric} />
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-50">
            Recent activity
          </h2>
          <ActivityFeed events={DEMO_ACTIVITY} limit={5} />
        </section>
      </div>

      {canManageBilling(user) && proPlan && (
        <section className="rounded-xl border border-brand-200 bg-brand-50 p-5 dark:border-brand-600/30 dark:bg-brand-600/10">
          <h2 className="text-lg font-semibold text-brand-700 dark:text-brand-400">
            Save on billing
          </h2>
          <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">
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

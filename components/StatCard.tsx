import type { ReactNode } from "react";

export interface StatCardProps {
  label: string;
  value: string;
  /** Optional delta string, e.g. "+12%". */
  change?: string;
  /** When true the change is styled as a regression. */
  negative?: boolean;
  icon?: ReactNode;
}

/** A single dashboard statistic with an optional trend indicator. */
export function StatCard({
  label,
  value,
  change,
  negative = false,
  icon,
}: StatCardProps) {
  return (
    <div
      data-testid="stat-card"
      className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
        {icon && <span aria-hidden>{icon}</span>}
      </div>
      <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-slate-50">
        {value}
      </p>
      {change && (
        <p
          className={[
            "mt-1 text-xs font-medium",
            negative
              ? "text-rose-600 dark:text-rose-400"
              : "text-emerald-600 dark:text-emerald-400",
          ].join(" ")}
        >
          {change}
        </p>
      )}
    </div>
  );
}

export default StatCard;

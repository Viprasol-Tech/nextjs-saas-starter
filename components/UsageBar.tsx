import {
  formatUsage,
  usageLevel,
  usagePercent,
  usageRemaining,
  type UsageMetric,
} from "@/lib/usage";

export interface UsageBarProps {
  metric: UsageMetric;
}

const LEVEL_BAR: Record<string, string> = {
  ok: "bg-brand-600",
  warning: "bg-amber-500",
  critical: "bg-orange-500",
  over: "bg-rose-600",
};

/** A labelled progress bar for a single usage metric. */
export function UsageBar({ metric }: UsageBarProps) {
  const level = usageLevel(metric);
  const percent = usagePercent(metric);
  const remaining = usageRemaining(metric);
  const unlimited = metric.limit === null;

  return (
    <div data-testid="usage-bar" data-level={level}>
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-slate-700 dark:text-slate-200">
          {metric.label}
        </span>
        <span className="text-slate-500 dark:text-slate-400">
          {formatUsage(metric.used, metric.unit)}
          {unlimited
            ? " used"
            : ` / ${formatUsage(metric.limit ?? 0, metric.unit)}`}
        </span>
      </div>
      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
        <div
          className={["h-full rounded-full", LEVEL_BAR[level]].join(" ")}
          style={{ width: unlimited ? "8%" : `${percent}%` }}
          role="progressbar"
          aria-valuenow={unlimited ? undefined : percent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${metric.label} usage`}
        />
      </div>
      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
        {unlimited
          ? "Unlimited"
          : `${formatUsage(remaining ?? 0, metric.unit)} remaining`}
      </p>
    </div>
  );
}

export default UsageBar;

/**
 * Usage metering helpers for the SaaS starter.
 *
 * These are pure functions over typed data so they can be unit tested without
 * a database. Swap the `DEMO_USAGE` fixtures for real metering reads in
 * production.
 */

/** A single metered resource (API calls, storage, seats, etc.). */
export interface UsageMetric {
  /** Stable key, e.g. "api_calls". */
  key: string;
  /** Human-readable label for dashboards. */
  label: string;
  /** Amount consumed so far this period. */
  used: number;
  /** Included allowance for the active plan. A limit of `null` means unlimited. */
  limit: number | null;
  /** Optional unit suffix shown after numbers, e.g. "GB". */
  unit?: string;
}

/** Severity bucket derived from how close usage is to its limit. */
export type UsageLevel = "ok" | "warning" | "critical" | "over";

/**
 * Fraction of the allowance consumed, clamped to [0, 1].
 * Unlimited metrics (limit `null`) and non-positive limits return 0.
 */
export function usageRatio(metric: UsageMetric): number {
  if (metric.limit === null || metric.limit <= 0) return 0;
  const ratio = metric.used / metric.limit;
  return Math.min(1, Math.max(0, ratio));
}

/** Whole-percent version of {@link usageRatio} for progress bars. */
export function usagePercent(metric: UsageMetric): number {
  return Math.round(usageRatio(metric) * 100);
}

/** Remaining allowance; `null` for unlimited metrics, never below 0. */
export function usageRemaining(metric: UsageMetric): number | null {
  if (metric.limit === null) return null;
  return Math.max(0, metric.limit - metric.used);
}

/** True once consumption meets or exceeds the limit (finite limits only). */
export function isOverLimit(metric: UsageMetric): boolean {
  if (metric.limit === null) return false;
  return metric.used >= metric.limit;
}

/**
 * Classify a metric into a severity level for colour-coding.
 * - `over`      used >= limit
 * - `critical`  >= 90% of limit
 * - `warning`   >= 75% of limit
 * - `ok`        below 75% or unlimited
 */
export function usageLevel(metric: UsageMetric): UsageLevel {
  if (metric.limit === null) return "ok";
  if (isOverLimit(metric)) return "over";
  const ratio = usageRatio(metric);
  if (ratio >= 0.9) return "critical";
  if (ratio >= 0.75) return "warning";
  return "ok";
}

/** Sum the consumed amount across a list of metrics. */
export function totalUsed(metrics: readonly UsageMetric[]): number {
  return metrics.reduce((sum, metric) => sum + metric.used, 0);
}

/** Metrics at or above the warning threshold, useful for alert badges. */
export function metricsNeedingAttention(
  metrics: readonly UsageMetric[],
): UsageMetric[] {
  return metrics.filter((metric) => {
    const level = usageLevel(metric);
    return level === "warning" || level === "critical" || level === "over";
  });
}

/** Format a metered value with an optional unit suffix. */
export function formatUsage(value: number, unit?: string): string {
  const formatted = new Intl.NumberFormat("en-US").format(value);
  return unit ? `${formatted} ${unit}` : formatted;
}

/** Deterministic demo usage used by the dashboard while wiring metering. */
export const DEMO_USAGE: readonly UsageMetric[] = [
  { key: "api_calls", label: "API calls", used: 48200, limit: 100000 },
  { key: "storage", label: "Storage", used: 78, limit: 100, unit: "GB" },
  { key: "seats", label: "Team seats", used: 5, limit: 10 },
  { key: "projects", label: "Projects", used: 12, limit: null },
] as const;

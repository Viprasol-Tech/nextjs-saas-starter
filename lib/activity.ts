/**
 * Activity-feed helpers. Pure functions over typed events so the dashboard
 * widget and any tests stay deterministic.
 */

export type ActivityKind =
  | "member_invited"
  | "project_created"
  | "billing_updated"
  | "api_key_created"
  | "plan_changed";

export interface ActivityEvent {
  id: string;
  kind: ActivityKind;
  /** Short human-readable summary. */
  message: string;
  /** Display name of the actor who triggered the event. */
  actor: string;
  /** ISO-8601 timestamp. */
  at: string;
}

/** Emoji glyph used to decorate each event kind in the UI. */
export const ACTIVITY_ICONS: Record<ActivityKind, string> = {
  member_invited: "\u{1F465}",
  project_created: "\u{1F4C1}",
  billing_updated: "\u{1F4B3}",
  api_key_created: "\u{1F511}",
  plan_changed: "⬆️",
};

/** Return the icon for a kind, falling back to a neutral dot. */
export function iconFor(kind: ActivityKind): string {
  return ACTIVITY_ICONS[kind] ?? "•";
}

/**
 * Format an ISO timestamp as a compact relative string ("3h ago").
 * @param now reference time, defaults to the current time. Future timestamps
 * are reported as "just now".
 */
export function relativeTime(iso: string, now: Date = new Date()): string {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "unknown";
  const diffSeconds = Math.floor((now.getTime() - then) / 1000);
  if (diffSeconds < 60) return "just now";
  const minutes = Math.floor(diffSeconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  const weeks = Math.floor(days / 7);
  return `${weeks}w ago`;
}

/** Most-recent-first ordering by timestamp. */
export function sortByRecency(
  events: readonly ActivityEvent[],
): ActivityEvent[] {
  return [...events].sort(
    (a, b) => new Date(b.at).getTime() - new Date(a.at).getTime(),
  );
}

/**
 * The newest `limit` events, most recent first.
 * @param limit clamped to >= 0; 0 returns an empty list.
 */
export function recentActivity(
  events: readonly ActivityEvent[],
  limit = 5,
): ActivityEvent[] {
  const safeLimit = Math.max(0, Math.floor(limit));
  return sortByRecency(events).slice(0, safeLimit);
}

/** Count of events grouped by kind. */
export function countByKind(
  events: readonly ActivityEvent[],
): Record<string, number> {
  return events.reduce<Record<string, number>>((acc, event) => {
    acc[event.kind] = (acc[event.kind] ?? 0) + 1;
    return acc;
  }, {});
}

/** Deterministic demo feed for the dashboard. */
export const DEMO_ACTIVITY: readonly ActivityEvent[] = [
  {
    id: "evt_001",
    kind: "member_invited",
    message: "Invited grace@example.com as a member",
    actor: "Ada Lovelace",
    at: "2025-05-31T09:12:00.000Z",
  },
  {
    id: "evt_002",
    kind: "project_created",
    message: "Created project “Atlas”",
    actor: "Ada Lovelace",
    at: "2025-05-30T16:40:00.000Z",
  },
  {
    id: "evt_003",
    kind: "api_key_created",
    message: "Generated a production API key",
    actor: "Grace Hopper",
    at: "2025-05-29T11:05:00.000Z",
  },
  {
    id: "evt_004",
    kind: "billing_updated",
    message: "Updated the default payment method",
    actor: "Ada Lovelace",
    at: "2025-05-28T08:22:00.000Z",
  },
  {
    id: "evt_005",
    kind: "plan_changed",
    message: "Upgraded from Free to Pro",
    actor: "Ada Lovelace",
    at: "2025-05-20T14:00:00.000Z",
  },
] as const;

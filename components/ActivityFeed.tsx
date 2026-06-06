import {
  iconFor,
  recentActivity,
  relativeTime,
  type ActivityEvent,
} from "@/lib/activity";

export interface ActivityFeedProps {
  events: readonly ActivityEvent[];
  limit?: number;
  /** Reference time for relative timestamps; injectable for tests. */
  now?: Date;
}

/** A compact recent-activity list for the dashboard. */
export function ActivityFeed({ events, limit = 5, now }: ActivityFeedProps) {
  const items = recentActivity(events, limit);

  if (items.length === 0) {
    return (
      <p
        data-testid="activity-empty"
        className="text-sm text-slate-500 dark:text-slate-400"
      >
        No recent activity yet.
      </p>
    );
  }

  return (
    <ul data-testid="activity-feed" className="space-y-4">
      {items.map((event) => (
        <li key={event.id} className="flex items-start gap-3">
          <span
            aria-hidden
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm dark:bg-slate-800"
          >
            {iconFor(event.kind)}
          </span>
          <div className="min-w-0">
            <p className="text-sm text-slate-800 dark:text-slate-100">
              {event.message}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {event.actor} &middot; {relativeTime(event.at, now)}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default ActivityFeed;

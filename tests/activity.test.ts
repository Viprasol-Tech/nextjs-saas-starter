import { describe, it, expect } from "vitest";
import {
  ACTIVITY_ICONS,
  DEMO_ACTIVITY,
  countByKind,
  iconFor,
  recentActivity,
  relativeTime,
  sortByRecency,
  type ActivityEvent,
} from "@/lib/activity";

const event = (id: string, at: string): ActivityEvent => ({
  id,
  kind: "project_created",
  message: "m",
  actor: "a",
  at,
});

describe("iconFor", () => {
  it("returns the configured icon for a kind", () => {
    expect(iconFor("api_key_created")).toBe(ACTIVITY_ICONS.api_key_created);
  });
});

describe("relativeTime", () => {
  const now = new Date("2025-06-01T00:00:00.000Z");
  it("reports just now for very recent events", () => {
    expect(relativeTime("2025-05-31T23:59:30.000Z", now)).toBe("just now");
  });
  it("reports minutes", () => {
    expect(relativeTime("2025-05-31T23:30:00.000Z", now)).toBe("30m ago");
  });
  it("reports hours", () => {
    expect(relativeTime("2025-05-31T21:00:00.000Z", now)).toBe("3h ago");
  });
  it("reports days", () => {
    expect(relativeTime("2025-05-29T00:00:00.000Z", now)).toBe("3d ago");
  });
  it("reports weeks", () => {
    expect(relativeTime("2025-05-11T00:00:00.000Z", now)).toBe("3w ago");
  });
  it("handles invalid input", () => {
    expect(relativeTime("not-a-date", now)).toBe("unknown");
  });
});

describe("sortByRecency", () => {
  it("orders newest first without mutating the input", () => {
    const input = [
      event("a", "2025-01-01T00:00:00.000Z"),
      event("b", "2025-03-01T00:00:00.000Z"),
      event("c", "2025-02-01T00:00:00.000Z"),
    ];
    const sorted = sortByRecency(input);
    expect(sorted.map((e) => e.id)).toEqual(["b", "c", "a"]);
    expect(input[0]!.id).toBe("a");
  });
});

describe("recentActivity", () => {
  it("limits the number of events", () => {
    expect(recentActivity(DEMO_ACTIVITY, 2)).toHaveLength(2);
  });
  it("returns an empty list for a zero limit", () => {
    expect(recentActivity(DEMO_ACTIVITY, 0)).toEqual([]);
  });
  it("clamps negative limits to zero", () => {
    expect(recentActivity(DEMO_ACTIVITY, -5)).toEqual([]);
  });
});

describe("countByKind", () => {
  it("tallies events by kind", () => {
    const counts = countByKind([
      event("a", "2025-01-01T00:00:00.000Z"),
      event("b", "2025-01-02T00:00:00.000Z"),
    ]);
    expect(counts.project_created).toBe(2);
  });
});

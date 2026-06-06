import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ActivityFeed } from "@/components/ActivityFeed";
import { DEMO_ACTIVITY, type ActivityEvent } from "@/lib/activity";

const now = new Date("2025-06-01T00:00:00.000Z");

describe("<ActivityFeed />", () => {
  it("renders recent events with relative timestamps", () => {
    render(<ActivityFeed events={DEMO_ACTIVITY} now={now} />);
    expect(screen.getByTestId("activity-feed")).toBeInTheDocument();
    expect(
      screen.getByText("Created project “Atlas”"),
    ).toBeInTheDocument();
  });

  it("limits the number of rendered items", () => {
    render(<ActivityFeed events={DEMO_ACTIVITY} limit={2} now={now} />);
    const list = screen.getByTestId("activity-feed");
    expect(list.querySelectorAll("li")).toHaveLength(2);
  });

  it("shows an empty state when there are no events", () => {
    const empty: ActivityEvent[] = [];
    render(<ActivityFeed events={empty} now={now} />);
    expect(screen.getByTestId("activity-empty")).toBeInTheDocument();
  });
});

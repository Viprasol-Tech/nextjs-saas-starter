import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { DashboardNav, DEFAULT_NAV_ITEMS } from "@/components/DashboardNav";
import { DEMO_USER } from "@/lib/session";

describe("<DashboardNav />", () => {
  it("renders all default nav items", () => {
    render(<DashboardNav user={DEMO_USER} />);
    for (const item of DEFAULT_NAV_ITEMS) {
      expect(screen.getByText(item.label)).toBeInTheDocument();
    }
  });

  it("marks the active item with aria-current", () => {
    render(<DashboardNav user={DEMO_USER} activeHref="/dashboard/billing" />);
    const billing = screen.getByText("Billing");
    expect(billing).toHaveAttribute("aria-current", "page");
  });

  it("renders the user's name and initials", () => {
    render(<DashboardNav user={DEMO_USER} />);
    expect(screen.getByText(DEMO_USER.name)).toBeInTheDocument();
    expect(screen.getByText("AL")).toBeInTheDocument();
  });

  it("renders a theme toggle", () => {
    render(<DashboardNav user={DEMO_USER} />);
    expect(
      screen.getByRole("button", { name: /mode/i }),
    ).toBeInTheDocument();
  });
});

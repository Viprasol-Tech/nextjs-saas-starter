import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { PricingCard } from "@/components/PricingCard";
import type { Plan } from "@/lib/pricing";

const proPlan: Plan = {
  id: "pro",
  name: "Pro",
  tagline: "For growing teams.",
  monthlyPrice: 29,
  annualMonthlyPrice: 24,
  features: ["Unlimited projects", "Priority support"],
  highlighted: true,
};

describe("<PricingCard />", () => {
  it("renders the plan name, tagline and features", () => {
    render(<PricingCard plan={proPlan} />);
    expect(screen.getByText("Pro")).toBeInTheDocument();
    expect(screen.getByText("For growing teams.")).toBeInTheDocument();
    expect(screen.getByText("Unlimited projects")).toBeInTheDocument();
    expect(screen.getByText("Priority support")).toBeInTheDocument();
  });

  it("shows the monthly price for monthly billing without savings", () => {
    render(<PricingCard plan={proPlan} interval="monthly" />);
    expect(screen.getByText("$29")).toBeInTheDocument();
    expect(screen.queryByText(/Save/)).not.toBeInTheDocument();
  });

  it("shows the discounted price and savings for annual billing", () => {
    render(<PricingCard plan={proPlan} interval="annual" />);
    expect(screen.getByText("$24")).toBeInTheDocument();
    expect(screen.getByText(/Save \$60 \(17%\) per year/)).toBeInTheDocument();
  });

  it("marks highlighted plans via a data attribute", () => {
    render(<PricingCard plan={proPlan} />);
    expect(screen.getByTestId("pricing-card")).toHaveAttribute(
      "data-highlighted",
      "true",
    );
  });
});

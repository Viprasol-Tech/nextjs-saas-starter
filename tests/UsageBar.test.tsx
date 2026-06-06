import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { UsageBar } from "@/components/UsageBar";
import type { UsageMetric } from "@/lib/usage";

const make = (used: number, limit: number | null): UsageMetric => ({
  key: "storage",
  label: "Storage",
  used,
  limit,
  unit: "GB",
});

describe("<UsageBar />", () => {
  it("renders the label and used/limit text", () => {
    render(<UsageBar metric={make(78, 100)} />);
    expect(screen.getByText("Storage")).toBeInTheDocument();
    expect(screen.getByText("78 GB / 100 GB")).toBeInTheDocument();
  });

  it("shows remaining allowance", () => {
    render(<UsageBar metric={make(78, 100)} />);
    expect(screen.getByText("22 GB remaining")).toBeInTheDocument();
  });

  it("marks the warning level via a data attribute", () => {
    render(<UsageBar metric={make(95, 100)} />);
    expect(screen.getByTestId("usage-bar")).toHaveAttribute(
      "data-level",
      "critical",
    );
  });

  it("renders unlimited metrics without a percentage", () => {
    render(<UsageBar metric={make(120, null)} />);
    expect(screen.getByText("Unlimited")).toBeInTheDocument();
    expect(screen.getByTestId("usage-bar")).toHaveAttribute(
      "data-level",
      "ok",
    );
  });
});

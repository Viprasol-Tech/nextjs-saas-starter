import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatCard } from "@/components/StatCard";

describe("<StatCard />", () => {
  it("renders the label and value", () => {
    render(<StatCard label="Active projects" value="12" />);
    expect(screen.getByText("Active projects")).toBeInTheDocument();
    expect(screen.getByText("12")).toBeInTheDocument();
  });

  it("renders a change indicator when provided", () => {
    render(<StatCard label="API" value="48k" change="+8%" />);
    expect(screen.getByText("+8%")).toBeInTheDocument();
  });

  it("omits the change indicator when not provided", () => {
    render(<StatCard label="API" value="48k" />);
    expect(screen.queryByText(/%/)).not.toBeInTheDocument();
  });
});

import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  Testimonials,
  DEFAULT_TESTIMONIALS,
} from "@/components/Testimonials";

describe("<Testimonials />", () => {
  it("renders every author and role", () => {
    render(<Testimonials items={DEFAULT_TESTIMONIALS} />);
    for (const item of DEFAULT_TESTIMONIALS) {
      expect(screen.getByText(item.author)).toBeInTheDocument();
      expect(screen.getByText(item.role)).toBeInTheDocument();
    }
  });

  it("renders avatar initials", () => {
    render(
      <Testimonials
        items={[{ quote: "Great", author: "Maya Chen", role: "Founder" }]}
      />,
    );
    expect(screen.getByText("MC")).toBeInTheDocument();
  });
});

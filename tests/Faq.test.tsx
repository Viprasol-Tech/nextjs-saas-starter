import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Faq, DEFAULT_FAQ } from "@/components/Faq";

describe("<Faq />", () => {
  it("renders every question", () => {
    render(<Faq items={DEFAULT_FAQ} />);
    for (const item of DEFAULT_FAQ) {
      expect(screen.getByText(item.question)).toBeInTheDocument();
    }
  });

  it("renders the matching answer text", () => {
    render(<Faq items={DEFAULT_FAQ} />);
    expect(screen.getByText(DEFAULT_FAQ[0]!.answer)).toBeInTheDocument();
  });

  it("renders a custom item list", () => {
    render(
      <Faq items={[{ question: "Q?", answer: "A." }]} />,
    );
    expect(screen.getByText("Q?")).toBeInTheDocument();
    expect(screen.getByText("A.")).toBeInTheDocument();
  });
});

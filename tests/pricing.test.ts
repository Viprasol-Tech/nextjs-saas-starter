import { describe, it, expect } from "vitest";
import {
  PLANS,
  annualTotal,
  computeAnnualSavings,
  computeAnnualSavingsPercent,
  formatPrice,
  getPlan,
  type Plan,
} from "@/lib/pricing";

const proPlan: Plan = {
  id: "pro",
  name: "Pro",
  tagline: "test",
  monthlyPrice: 29,
  annualMonthlyPrice: 24,
  features: ["a"],
};

const freePlan: Plan = {
  id: "free",
  name: "Free",
  tagline: "test",
  monthlyPrice: 0,
  annualMonthlyPrice: 0,
  features: ["a"],
};

describe("getPlan", () => {
  it("finds a plan by id", () => {
    expect(getPlan("pro")?.name).toBe("Pro");
  });

  it("returns undefined for unknown ids", () => {
    expect(getPlan("nope")).toBeUndefined();
  });
});

describe("annualTotal", () => {
  it("multiplies the monthly price by 12 for monthly billing", () => {
    expect(annualTotal(proPlan, "monthly")).toBe(348);
  });

  it("uses the discounted price for annual billing", () => {
    expect(annualTotal(proPlan, "annual")).toBe(288);
  });
});

describe("computeAnnualSavings", () => {
  it("returns the yearly difference between monthly and annual billing", () => {
    expect(computeAnnualSavings(proPlan)).toBe(60);
  });

  it("never returns a negative number", () => {
    const inverted: Plan = { ...proPlan, annualMonthlyPrice: 40 };
    expect(computeAnnualSavings(inverted)).toBe(0);
  });

  it("returns 0 for a free plan", () => {
    expect(computeAnnualSavings(freePlan)).toBe(0);
  });
});

describe("computeAnnualSavingsPercent", () => {
  it("rounds to the nearest whole percent", () => {
    // 60 / 348 = 17.24% -> 17
    expect(computeAnnualSavingsPercent(proPlan)).toBe(17);
  });

  it("returns 0 when the monthly total is 0", () => {
    expect(computeAnnualSavingsPercent(freePlan)).toBe(0);
  });
});

describe("formatPrice", () => {
  it("formats USD with no decimals", () => {
    expect(formatPrice(29)).toBe("$29");
  });

  it("formats zero", () => {
    expect(formatPrice(0)).toBe("$0");
  });

  it("honours a custom currency", () => {
    const out = formatPrice(29, { currency: "EUR" });
    expect(out).toContain("29");
    expect(out).toMatch(/€|EUR/);
  });
});

describe("PLANS catalogue", () => {
  it("has exactly one highlighted plan", () => {
    expect(PLANS.filter((p) => p.highlighted)).toHaveLength(1);
  });

  it("has unique ids", () => {
    const ids = PLANS.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

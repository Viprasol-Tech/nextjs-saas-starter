import { describe, it, expect } from "vitest";
import {
  perMonthPrice,
  roundCurrency,
  seatTotal,
  prorateUpgrade,
  proratePlanChange,
  formatPrice,
  type Plan,
} from "@/lib/pricing";

const pro: Plan = {
  id: "pro",
  name: "Pro",
  tagline: "t",
  monthlyPrice: 30,
  annualMonthlyPrice: 24,
  features: ["a"],
};

const scale: Plan = {
  id: "scale",
  name: "Scale",
  tagline: "t",
  monthlyPrice: 90,
  annualMonthlyPrice: 75,
  features: ["a"],
};

describe("perMonthPrice", () => {
  it("returns the monthly price for monthly billing", () => {
    expect(perMonthPrice(pro, "monthly")).toBe(30);
  });
  it("returns the discounted price for annual billing", () => {
    expect(perMonthPrice(pro, "annual")).toBe(24);
  });
});

describe("roundCurrency", () => {
  it("rounds to two decimal places", () => {
    expect(roundCurrency(0.1 + 0.2)).toBe(0.3);
  });
  it("leaves whole numbers untouched", () => {
    expect(roundCurrency(42)).toBe(42);
  });
});

describe("seatTotal", () => {
  it("multiplies per-seat monthly price by seats", () => {
    expect(seatTotal(pro, "monthly", 5)).toBe(150);
  });
  it("charges a full year for annual billing", () => {
    expect(seatTotal(pro, "annual", 5)).toBe(24 * 5 * 12);
  });
  it("clamps seats to a minimum of one", () => {
    expect(seatTotal(pro, "monthly", 0)).toBe(30);
    expect(seatTotal(pro, "monthly", -3)).toBe(30);
  });
  it("floors fractional seats", () => {
    expect(seatTotal(pro, "monthly", 2.9)).toBe(60);
  });
});

describe("prorateUpgrade", () => {
  it("bills only the unused fraction of the period", () => {
    // 30/month, 2 seats, 15 of 30 days left => 30 * 2 * 0.5 = 30
    expect(
      prorateUpgrade(pro, "monthly", { addedSeats: 2, daysRemaining: 15 }),
    ).toBe(30);
  });
  it("uses a full year of per-seat cost for annual billing", () => {
    // 24*12 per seat per year, 1 seat, half period => 144
    expect(
      prorateUpgrade(pro, "annual", { addedSeats: 1, daysRemaining: 15 }),
    ).toBe(144);
  });
  it("returns zero when no days remain", () => {
    expect(
      prorateUpgrade(pro, "monthly", { addedSeats: 4, daysRemaining: 0 }),
    ).toBe(0);
  });
  it("clamps days remaining to the period length", () => {
    expect(
      prorateUpgrade(pro, "monthly", {
        addedSeats: 1,
        daysRemaining: 60,
        daysInPeriod: 30,
      }),
    ).toBe(30);
  });
  it("returns zero for a non-positive period", () => {
    expect(
      prorateUpgrade(pro, "monthly", {
        addedSeats: 2,
        daysRemaining: 10,
        daysInPeriod: 0,
      }),
    ).toBe(0);
  });
});

describe("proratePlanChange", () => {
  it("returns a positive charge for an upgrade", () => {
    // (90-30) * 1 seat * 0.5 = 30
    expect(
      proratePlanChange(pro, scale, "monthly", { daysRemaining: 15 }),
    ).toBe(30);
  });
  it("returns a negative credit for a downgrade", () => {
    expect(
      proratePlanChange(scale, pro, "monthly", { daysRemaining: 15 }),
    ).toBe(-30);
  });
  it("scales by seat count", () => {
    expect(
      proratePlanChange(pro, scale, "monthly", {
        daysRemaining: 30,
        seats: 3,
      }),
    ).toBe(180);
  });
  it("returns zero for a non-positive period", () => {
    expect(
      proratePlanChange(pro, scale, "monthly", {
        daysRemaining: 10,
        daysInPeriod: 0,
      }),
    ).toBe(0);
  });
});

describe("formatPrice with fractions", () => {
  it("shows two decimals for non-integer amounts", () => {
    expect(formatPrice(29.5)).toBe("$29.50");
  });
  it("shows no decimals for whole amounts", () => {
    expect(formatPrice(30)).toBe("$30");
  });
});

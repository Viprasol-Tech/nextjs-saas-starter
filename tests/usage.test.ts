import { describe, it, expect } from "vitest";
import {
  DEMO_USAGE,
  formatUsage,
  isOverLimit,
  metricsNeedingAttention,
  totalUsed,
  usageLevel,
  usagePercent,
  usageRatio,
  usageRemaining,
  type UsageMetric,
} from "@/lib/usage";

const make = (used: number, limit: number | null): UsageMetric => ({
  key: "k",
  label: "Metric",
  used,
  limit,
});

describe("usageRatio", () => {
  it("returns the fraction consumed", () => {
    expect(usageRatio(make(50, 100))).toBe(0.5);
  });
  it("clamps to 1 when over the limit", () => {
    expect(usageRatio(make(150, 100))).toBe(1);
  });
  it("returns 0 for unlimited metrics", () => {
    expect(usageRatio(make(50, null))).toBe(0);
  });
  it("returns 0 for non-positive limits", () => {
    expect(usageRatio(make(5, 0))).toBe(0);
  });
});

describe("usagePercent", () => {
  it("rounds to whole percent", () => {
    expect(usagePercent(make(1, 3))).toBe(33);
  });
});

describe("usageRemaining", () => {
  it("returns remaining allowance", () => {
    expect(usageRemaining(make(30, 100))).toBe(70);
  });
  it("never goes below zero", () => {
    expect(usageRemaining(make(120, 100))).toBe(0);
  });
  it("returns null for unlimited metrics", () => {
    expect(usageRemaining(make(5, null))).toBeNull();
  });
});

describe("isOverLimit", () => {
  it("is true at or above the limit", () => {
    expect(isOverLimit(make(100, 100))).toBe(true);
  });
  it("is false below the limit", () => {
    expect(isOverLimit(make(99, 100))).toBe(false);
  });
  it("is false for unlimited metrics", () => {
    expect(isOverLimit(make(9999, null))).toBe(false);
  });
});

describe("usageLevel", () => {
  it("returns ok below 75%", () => {
    expect(usageLevel(make(50, 100))).toBe("ok");
  });
  it("returns warning at 75%", () => {
    expect(usageLevel(make(75, 100))).toBe("warning");
  });
  it("returns critical at 90%", () => {
    expect(usageLevel(make(95, 100))).toBe("critical");
  });
  it("returns over at the limit", () => {
    expect(usageLevel(make(100, 100))).toBe("over");
  });
  it("returns ok for unlimited metrics", () => {
    expect(usageLevel(make(1e9, null))).toBe("ok");
  });
});

describe("totalUsed", () => {
  it("sums the used amounts", () => {
    expect(totalUsed([make(10, 100), make(5, 50)])).toBe(15);
  });
});

describe("metricsNeedingAttention", () => {
  it("returns only warning and above metrics", () => {
    const list = [make(10, 100), make(80, 100), make(100, 100)];
    expect(metricsNeedingAttention(list)).toHaveLength(2);
  });
});

describe("formatUsage", () => {
  it("formats with thousands separators", () => {
    expect(formatUsage(48200)).toBe("48,200");
  });
  it("appends a unit when given", () => {
    expect(formatUsage(78, "GB")).toBe("78 GB");
  });
});

describe("DEMO_USAGE", () => {
  it("contains an unlimited metric", () => {
    expect(DEMO_USAGE.some((m) => m.limit === null)).toBe(true);
  });
});

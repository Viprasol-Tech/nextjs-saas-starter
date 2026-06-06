import { describe, it, expect } from "vitest";
import {
  THEME_STORAGE_KEY,
  normalizeTheme,
  resolveInitialTheme,
  themeBootstrapScript,
  toggleTheme,
} from "@/lib/theme";

describe("normalizeTheme", () => {
  it("passes through dark", () => {
    expect(normalizeTheme("dark")).toBe("dark");
  });
  it("defaults unknown values to light", () => {
    expect(normalizeTheme("purple")).toBe("light");
    expect(normalizeTheme(null)).toBe("light");
    expect(normalizeTheme(undefined)).toBe("light");
  });
});

describe("toggleTheme", () => {
  it("flips between light and dark", () => {
    expect(toggleTheme("light")).toBe("dark");
    expect(toggleTheme("dark")).toBe("light");
  });
});

describe("resolveInitialTheme", () => {
  it("honours a stored choice over system preference", () => {
    expect(resolveInitialTheme("light", true)).toBe("light");
    expect(resolveInitialTheme("dark", false)).toBe("dark");
  });
  it("falls back to system preference when unset", () => {
    expect(resolveInitialTheme(null, true)).toBe("dark");
    expect(resolveInitialTheme(null, false)).toBe("light");
  });
  it("ignores invalid stored values", () => {
    expect(resolveInitialTheme("bogus", true)).toBe("dark");
  });
});

describe("themeBootstrapScript", () => {
  it("references the storage key", () => {
    expect(themeBootstrapScript()).toContain(THEME_STORAGE_KEY);
  });
  it("is an IIFE wrapped in a try/catch", () => {
    const script = themeBootstrapScript();
    expect(script.startsWith("(function(){try{")).toBe(true);
  });
});

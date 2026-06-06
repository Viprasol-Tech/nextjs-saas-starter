import { describe, it, expect } from "vitest";
import {
  DEMO_USER,
  canManageBilling,
  getCurrentUser,
  initials,
  requireUser,
  type User,
} from "@/lib/session";

describe("getCurrentUser", () => {
  it("returns the demo user by default", () => {
    expect(getCurrentUser()?.id).toBe(DEMO_USER.id);
  });

  it("returns null when signed out", () => {
    expect(getCurrentUser({ signedIn: false })).toBeNull();
  });
});

describe("requireUser", () => {
  it("returns the user when present", () => {
    expect(requireUser(DEMO_USER)).toBe(DEMO_USER);
  });

  it("throws when there is no user", () => {
    expect(() => requireUser(null)).toThrow("Not authenticated");
  });
});

describe("canManageBilling", () => {
  const make = (role: User["role"]): User => ({ ...DEMO_USER, role });

  it("allows owners and admins", () => {
    expect(canManageBilling(make("owner"))).toBe(true);
    expect(canManageBilling(make("admin"))).toBe(true);
  });

  it("blocks members", () => {
    expect(canManageBilling(make("member"))).toBe(false);
  });
});

describe("initials", () => {
  it("uses first and last initial for full names", () => {
    expect(initials("Ada Lovelace")).toBe("AL");
  });

  it("takes two letters for single names", () => {
    expect(initials("Madonna")).toBe("MA");
  });

  it("collapses extra whitespace", () => {
    expect(initials("  Grace   Brewster  Hopper ")).toBe("GH");
  });

  it("returns a placeholder for empty input", () => {
    expect(initials("   ")).toBe("?");
  });
});

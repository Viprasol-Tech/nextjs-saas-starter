import { describe, it, expect } from "vitest";
import {
  DEMO_USER,
  canDeleteWorkspace,
  canInviteMembers,
  createSession,
  getSession,
  hasRole,
  isSessionExpired,
  type User,
} from "@/lib/session";

const make = (role: User["role"]): User => ({ ...DEMO_USER, role });

describe("hasRole", () => {
  it("treats owner as the most privileged", () => {
    expect(hasRole(make("owner"), "admin")).toBe(true);
    expect(hasRole(make("owner"), "member")).toBe(true);
  });
  it("rejects insufficient roles", () => {
    expect(hasRole(make("member"), "admin")).toBe(false);
    expect(hasRole(make("admin"), "owner")).toBe(false);
  });
  it("allows equal roles", () => {
    expect(hasRole(make("admin"), "admin")).toBe(true);
  });
});

describe("canDeleteWorkspace", () => {
  it("only owners may delete", () => {
    expect(canDeleteWorkspace(make("owner"))).toBe(true);
    expect(canDeleteWorkspace(make("admin"))).toBe(false);
  });
});

describe("canInviteMembers", () => {
  it("admins and owners may invite", () => {
    expect(canInviteMembers(make("admin"))).toBe(true);
    expect(canInviteMembers(make("owner"))).toBe(true);
  });
  it("members may not invite", () => {
    expect(canInviteMembers(make("member"))).toBe(false);
  });
});

describe("createSession", () => {
  it("sets expiry ttlMinutes after issuedAt", () => {
    const issuedAt = new Date("2025-01-01T00:00:00.000Z");
    const session = createSession(DEMO_USER, { ttlMinutes: 30, issuedAt });
    expect(session.expiresAt).toBe("2025-01-01T00:30:00.000Z");
    expect(session.user).toBe(DEMO_USER);
  });
  it("clamps a non-positive ttl to at least one minute", () => {
    const issuedAt = new Date("2025-01-01T00:00:00.000Z");
    const session = createSession(DEMO_USER, { ttlMinutes: 0, issuedAt });
    expect(session.expiresAt).toBe("2025-01-01T00:01:00.000Z");
  });
});

describe("isSessionExpired", () => {
  const issuedAt = new Date("2025-01-01T00:00:00.000Z");
  const session = createSession(DEMO_USER, { ttlMinutes: 60, issuedAt });

  it("is false before expiry", () => {
    expect(
      isSessionExpired(session, new Date("2025-01-01T00:30:00.000Z")),
    ).toBe(false);
  });
  it("is true after expiry", () => {
    expect(
      isSessionExpired(session, new Date("2025-01-01T02:00:00.000Z")),
    ).toBe(true);
  });
});

describe("getSession", () => {
  const issuedAt = new Date("2025-01-01T00:00:00.000Z");
  const session = createSession(DEMO_USER, { ttlMinutes: 60, issuedAt });

  it("returns the session while live", () => {
    expect(
      getSession(session, new Date("2025-01-01T00:30:00.000Z")),
    ).toBe(session);
  });
  it("returns null once expired", () => {
    expect(
      getSession(session, new Date("2025-01-01T03:00:00.000Z")),
    ).toBeNull();
  });
  it("returns null for no session", () => {
    expect(getSession(null)).toBeNull();
  });
});

export type UserRole = "owner" | "admin" | "member";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  /** ISO-8601 timestamp of when the account was created. */
  createdAt: string;
}

export interface Session {
  user: User;
  /** ISO-8601 timestamp of when the session expires. */
  expiresAt: string;
}

/**
 * A deterministic fake user used while wiring up real authentication.
 * Replace `getCurrentUser` with your auth provider in production.
 */
export const DEMO_USER: User = {
  id: "usr_demo_001",
  name: "Ada Lovelace",
  email: "ada@example.com",
  role: "owner",
  createdAt: "2025-01-01T00:00:00.000Z",
};

/**
 * Typed fake session helper. In a real app this would read an auth cookie or
 * call your identity provider; here it returns a stable demo user so the
 * dashboard renders without external setup. Returns null when signed out.
 */
export function getCurrentUser(
  options: { signedIn?: boolean } = {},
): User | null {
  const { signedIn = true } = options;
  return signedIn ? DEMO_USER : null;
}

/** Convenience guard that throws when there is no authenticated user. */
export function requireUser(user: User | null): User {
  if (!user) {
    throw new Error("Not authenticated");
  }
  return user;
}

/** True when the user may access owner/admin-only areas. */
export function canManageBilling(user: User): boolean {
  return user.role === "owner" || user.role === "admin";
}

/** Derive the two-letter initials shown in avatars. */
export function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return (parts[0]![0]! + parts[parts.length - 1]![0]!).toUpperCase();
}

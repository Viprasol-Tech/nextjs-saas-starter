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

/** Relative weight of each role; higher means more privileged. */
const ROLE_RANK: Record<UserRole, number> = {
  member: 1,
  admin: 2,
  owner: 3,
};

/** True when `user` holds at least the privileges of `required`. */
export function hasRole(user: User, required: UserRole): boolean {
  return ROLE_RANK[user.role] >= ROLE_RANK[required];
}

/** Only owners may delete the workspace or transfer ownership. */
export function canDeleteWorkspace(user: User): boolean {
  return user.role === "owner";
}

/** Members and above may invite teammates; this mirrors common SaaS defaults. */
export function canInviteMembers(user: User): boolean {
  return hasRole(user, "admin");
}

/**
 * Build a typed session that expires `ttlMinutes` from `issuedAt`.
 * @param ttlMinutes session lifetime in minutes (clamped to >= 1).
 */
export function createSession(
  user: User,
  options: { ttlMinutes?: number; issuedAt?: Date } = {},
): Session {
  const { ttlMinutes = 60, issuedAt = new Date() } = options;
  const minutes = Math.max(1, Math.floor(ttlMinutes));
  const expiresAt = new Date(issuedAt.getTime() + minutes * 60_000);
  return { user, expiresAt: expiresAt.toISOString() };
}

/** True when the session's expiry is in the past relative to `now`. */
export function isSessionExpired(
  session: Session,
  now: Date = new Date(),
): boolean {
  return new Date(session.expiresAt).getTime() <= now.getTime();
}

/** A live (non-expired) session, or null. */
export function getSession(
  session: Session | null,
  now: Date = new Date(),
): Session | null {
  if (!session) return null;
  return isSessionExpired(session, now) ? null : session;
}

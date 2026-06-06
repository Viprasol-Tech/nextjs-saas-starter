/** Theme helpers shared by the toggle and the no-flash bootstrap script. */

export type Theme = "light" | "dark";

/** Key used to persist the user's explicit choice in localStorage. */
export const THEME_STORAGE_KEY = "saas-theme";

/** Coerce arbitrary input into a valid {@link Theme}, defaulting to light. */
export function normalizeTheme(value: unknown): Theme {
  return value === "dark" ? "dark" : "light";
}

/** The opposite of the given theme. */
export function toggleTheme(theme: Theme): Theme {
  return theme === "dark" ? "light" : "dark";
}

/**
 * Resolve the initial theme from a stored choice, falling back to the system
 * preference, then to light.
 */
export function resolveInitialTheme(
  stored: string | null,
  prefersDark: boolean,
): Theme {
  if (stored === "dark" || stored === "light") return stored;
  return prefersDark ? "dark" : "light";
}

/**
 * Inline script that applies the saved theme before React hydrates, preventing
 * a flash of the wrong colour scheme. Returned as a string for `<script>`.
 */
export function themeBootstrapScript(): string {
  return `(function(){try{var k=${JSON.stringify(
    THEME_STORAGE_KEY,
  )};var s=localStorage.getItem(k);var d=window.matchMedia("(prefers-color-scheme: dark)").matches;var t=(s==="dark"||s==="light")?s:(d?"dark":"light");if(t==="dark"){document.documentElement.classList.add("dark");}}catch(e){}})();`;
}

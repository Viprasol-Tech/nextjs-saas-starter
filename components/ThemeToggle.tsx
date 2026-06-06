"use client";

import { useEffect, useState } from "react";
import {
  normalizeTheme,
  resolveInitialTheme,
  THEME_STORAGE_KEY,
  toggleTheme,
  type Theme,
} from "@/lib/theme";

/**
 * Light/dark theme toggle. Reads the persisted choice on mount, applies the
 * `dark` class to <html>, and stores the user's selection.
 */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    setTheme(resolveInitialTheme(stored, prefersDark));
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme, mounted]);

  const next = toggleTheme(theme);

  return (
    <button
      type="button"
      onClick={() => setTheme((current) => toggleTheme(normalizeTheme(current)))}
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
    >
      <span aria-hidden>{theme === "dark" ? "☀️" : "\u{1F319}"}</span>
    </button>
  );
}

export default ThemeToggle;

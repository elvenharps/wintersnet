"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useSyncExternalStore,
} from "react";

type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  toggle: () => void;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function readCurrentTheme(): Theme {
  if (typeof document === "undefined") return "light";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function applyTheme(theme: Theme) {
  if (typeof document === "undefined") return;
  const html = document.documentElement;
  if (theme === "dark") html.classList.add("dark");
  else html.classList.remove("dark");
  forceStyleRecalc();
  try {
    localStorage.setItem("theme", theme);
  } catch {}
}

// WebKit/Safari sometimes fails to re-resolve CSS custom properties on a large
// DOM when a class toggles on <html>, leaving stale theme colors until a manual
// refresh (most visible on the long history page). Briefly hiding the body
// forces a synchronous, full style recalculation. The display change is
// reverted within the same frame, so there is no visible flash; scroll position
// is captured and restored in case the reflow clamps it.
function forceStyleRecalc() {
  const body = document.body;
  if (!body) return;
  const { scrollX, scrollY } = window;
  const prevDisplay = body.style.display;
  body.style.display = "none";
  void body.offsetHeight;
  body.style.display = prevDisplay;
  window.scrollTo(scrollX, scrollY);
}

const subscribers = new Set<() => void>();

function subscribe(cb: () => void) {
  subscribers.add(cb);
  return () => {
    subscribers.delete(cb);
  };
}

function notify() {
  subscribers.forEach((cb) => cb());
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore<Theme>(
    subscribe,
    readCurrentTheme,
    () => "light"
  );

  const setTheme = useCallback((next: Theme) => {
    applyTheme(next);
    notify();
  }, []);

  const toggle = useCallback(() => {
    setTheme(readCurrentTheme() === "dark" ? "light" : "dark");
  }, [setTheme]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      try {
        if (!localStorage.getItem("theme")) {
          applyTheme(mq.matches ? "dark" : "light");
          notify();
        }
      } catch {}
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggle, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

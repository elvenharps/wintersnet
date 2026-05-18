import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { EvergreenMark } from "./evergreen-mark";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--background)]/75 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold tracking-tight text-[var(--foreground)] no-underline hover:text-[var(--accent)]"
        >
          <EvergreenMark className="text-[var(--accent)]" />
          <span>WintersNet</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link
            href="/history"
            className="text-[var(--muted)] no-underline hover:text-[var(--foreground)]"
          >
            History
          </Link>
          <Link
            href="/about"
            className="text-[var(--muted)] no-underline hover:text-[var(--foreground)]"
          >
            About
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

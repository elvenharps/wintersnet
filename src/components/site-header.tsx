import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <Link
          href="/"
          className="font-semibold tracking-tight text-[var(--foreground)] no-underline hover:text-[var(--accent)]"
        >
          WintersNet
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

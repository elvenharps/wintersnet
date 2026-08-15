import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { EvergreenMark } from "./evergreen-mark";
import { MobileNav } from "./mobile-nav";

const NAV_LINKS = [
  { href: "/projects", label: "Projects" },
  { href: "/history", label: "History" },
  { href: "/minecraft", label: "Minecraft" },
  { href: "/about", label: "About" },
] as const;

export function SiteHeader() {
  return (
    <header className="relative sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--background)]/75 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 font-semibold tracking-tight whitespace-nowrap text-[var(--foreground)] no-underline hover:text-[var(--accent)]"
        >
          <EvergreenMark className="text-[var(--accent)]" />
          <span>WintersNet</span>
        </Link>
        <div className="flex min-w-0 items-center gap-3">
          <nav
            aria-label="Primary"
            className="hidden items-center gap-6 text-sm md:flex"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[var(--muted)] no-underline hover:text-[var(--foreground)]"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <ThemeToggle />
          <MobileNav links={NAV_LINKS} />
        </div>
      </div>
    </header>
  );
}

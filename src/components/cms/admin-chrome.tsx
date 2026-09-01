import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { LogoutButton } from "@/components/cms/logout-button";
import { EvergreenMark } from "@/components/evergreen-mark";

const LINKS = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/site", label: "Site" },
  { href: "/admin/home", label: "Home" },
  { href: "/admin/about", label: "About" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/history", label: "History" },
  { href: "/admin/minecraft", label: "Minecraft" },
] as const;

export function AdminChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-full flex-col">
      <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--background)]/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <Link
            href="/admin"
            className="flex items-center gap-2 font-semibold tracking-tight text-[var(--foreground)] no-underline hover:text-[var(--accent)]"
          >
            <EvergreenMark className="text-[var(--accent)]" />
            <span>CMS</span>
          </Link>
          <nav aria-label="CMS" className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[var(--muted)] no-underline hover:text-[var(--foreground)]"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-sm text-[var(--muted)] no-underline hover:text-[var(--foreground)]"
            >
              View site
            </Link>
            <LogoutButton />
            <ThemeToggle />
          </div>
        </div>
      </header>
      <div className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6">{children}</div>
    </div>
  );
}

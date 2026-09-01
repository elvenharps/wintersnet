import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { EvergreenMark } from "./evergreen-mark";
import { MobileNav } from "./mobile-nav";
import { CmsHtml, cmsInnerHtml } from "@/components/cms/cms-html";
import type { NavItem } from "@/lib/cms/schema";
import { isExternalHref } from "@/lib/cms/html";

export function SiteHeader({
  name,
  links,
}: {
  name: string;
  links: NavItem[];
}) {
  return (
    <header className="relative sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--background)]/75 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 font-semibold tracking-tight whitespace-nowrap text-[var(--foreground)] no-underline hover:text-[var(--accent)]"
        >
          <EvergreenMark className="text-[var(--accent)]" />
          <CmsHtml html={name} inline />
        </Link>
        <div className="flex min-w-0 items-center gap-3">
          <nav
            aria-label="Primary"
            className="hidden items-center gap-6 text-sm md:flex"
          >
            {links.map((link) =>
              isExternalHref(link.href) ? (
                <a
                  key={link.id}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[var(--muted)] no-underline hover:text-[var(--foreground)]"
                >
                  <CmsHtml html={link.label} inline />
                </a>
              ) : (
                <Link
                  key={link.id}
                  href={link.href}
                  className="text-[var(--muted)] no-underline hover:text-[var(--foreground)]"
                >
                  <CmsHtml html={link.label} inline />
                </Link>
              ),
            )}
          </nav>
          <ThemeToggle />
          <MobileNav
            links={links.map((link) => ({
              ...link,
              label: cmsInnerHtml(link.label, true),
            }))}
          />
        </div>
      </div>
    </header>
  );
}

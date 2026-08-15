import Link from "next/link";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[var(--border)] py-8 text-sm text-[var(--muted)]">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-2 px-6 sm:flex-row">
        <p>© 2003–{year} WintersNet. All rights reserved.</p>
        <p>
          Created by <Link href="/about">Nathan Scott</Link>.
        </p>
      </div>
    </footer>
  );
}

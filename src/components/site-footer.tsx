import { CmsHtml } from "@/components/cms/cms-html";
import { replaceYearToken } from "@/lib/cms/html";

export function SiteFooter({
  left,
  right,
}: {
  left: string;
  right: string;
}) {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[var(--border)] py-8 text-sm text-[var(--muted)]">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-2 px-6 sm:flex-row">
        <CmsHtml html={replaceYearToken(left, year)} className="cms-html" />
        <CmsHtml html={replaceYearToken(right, year)} className="cms-html" />
      </div>
    </footer>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { ForestSilhouette } from "@/components/forest-silhouette";
import { CmsHtml } from "@/components/cms/cms-html";
import { getContent } from "@/lib/cms/store";
import { seoMetadata } from "@/lib/cms/metadata";
import { isExternalHref, stripHtml, withHeadingIds, injectToc } from "@/lib/cms/html";
import { sanitizeCmsHtml } from "@/lib/cms/sanitize";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent();
  return {
    ...seoMetadata(content.history.seo, {
      path: "/history",
      type: "article",
      publishedTime: content.history.publishedIso,
      modifiedTime: content.history.modifiedIso,
      authors: ["https://www.wintersnet.net/about"],
      keywords: [
        "MSN Chat",
        "MSN Chat history",
        "Comic Chat",
        "Microsoft Chat",
        "MSN Web Chat",
        "GateKeeper",
        "IRCx",
        "irc.msn.com",
        "9MSN Chat",
        "history of MSN Chat",
      ],
    }),
    authors: [{ name: "Nathan Scott", url: "https://www.wintersnet.net/about" }],
  };
}

export default async function HistoryPage() {
  const content = await getContent();
  const { history, site } = content;
  const { html: withIds, toc } = withHeadingIds(sanitizeCmsHtml(history.body));
  const html = injectToc(withIds, toc);
  const siteName = stripHtml(site.name) || "WintersNet";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": "https://www.wintersnet.net/history#article",
        headline: stripHtml(history.title) || history.seo.title,
        description: history.seo.description,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": "https://www.wintersnet.net/history",
        },
        datePublished: history.publishedIso,
        dateModified: history.modifiedIso,
        inLanguage: "en",
        author: {
          "@type": "Person",
          name: "Nathan Scott",
          url: "https://www.wintersnet.net/about",
        },
        publisher: {
          "@type": "Organization",
          name: siteName,
          url: "https://www.wintersnet.net",
        },
        about: [
          { "@type": "Thing", name: "MSN Chat" },
          { "@type": "Thing", name: "Microsoft Comic Chat" },
          { "@type": "Thing", name: "IRCx" },
        ],
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.wintersnet.net/history#breadcrumb",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: siteName,
            item: "https://www.wintersnet.net",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: stripHtml(history.title) || history.seo.title,
            item: "https://www.wintersnet.net/history",
          },
        ],
      },
    ],
  };

  const bannerHref = history.bannerCta.href;
  const bannerExternal = isExternalHref(bannerHref);

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <aside className="border-b border-[var(--accent)]/30 bg-[var(--surface-muted)]">
        <div className="mx-auto flex max-w-4xl flex-col gap-3 px-6 py-4 text-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <span
              aria-hidden="true"
              className="mt-0.5 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-on-accent text-xs font-bold"
            >
              ✦
            </span>
            <div className="leading-relaxed text-[var(--foreground)]">
              <CmsHtml html={history.bannerHtml} className="cms-html" />
            </div>
          </div>
          {bannerExternal ? (
            <a
              href={bannerHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex flex-shrink-0 items-center gap-2 rounded-full border border-[var(--accent)] bg-[var(--accent)] px-4 py-1.5 text-sm font-medium text-on-accent no-underline transition hover:bg-[var(--accent-hover)] hover:border-[var(--accent-hover)] hover:text-on-accent"
            >
              <CmsHtml html={history.bannerCta.label} inline />
              <span aria-hidden>→</span>
            </a>
          ) : (
            <Link
              href={bannerHref}
              className="inline-flex flex-shrink-0 items-center gap-2 rounded-full border border-[var(--accent)] bg-[var(--accent)] px-4 py-1.5 text-sm font-medium text-on-accent no-underline transition hover:bg-[var(--accent-hover)] hover:border-[var(--accent-hover)] hover:text-on-accent"
            >
              <CmsHtml html={history.bannerCta.label} inline />
              <span aria-hidden>→</span>
            </Link>
          )}
        </div>
      </aside>

      <header className="relative isolate overflow-hidden border-b border-[var(--border)]">
        <div className="absolute inset-0 -z-10">
          <ForestSilhouette className="absolute bottom-0 left-0 w-full h-[140px] opacity-80" />
          <div className="mist" />
        </div>
        <div className="mx-auto max-w-3xl px-6 pt-16 pb-28 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-[var(--muted)]">
            <CmsHtml html={history.eyebrow} inline />
          </p>
          <h1 className="serif mt-4 text-4xl sm:text-5xl font-medium tracking-tight">
            <CmsHtml html={history.title} inline />
          </h1>
          <div className="mt-4 text-[var(--muted)] italic">
            <CmsHtml html={history.subtitle} className="cms-html" />
          </div>
        </div>
      </header>

      <div className="prose-article mx-auto px-6 py-14">
        <div
          className="cms-html"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        <div className="mt-16 border-t border-[var(--border)] pt-8 text-center text-sm text-[var(--muted)]">
          <Link href="/">← Back to {siteName}</Link>
        </div>
      </div>
    </article>
  );
}

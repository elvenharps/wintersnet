import type { Metadata } from "next";
import Link from "next/link";
import { ForestSilhouette } from "@/components/forest-silhouette";
import { Rain } from "@/components/rain";
import { CmsHtml } from "@/components/cms/cms-html";
import { getContent } from "@/lib/cms/store";
import { isExternalHref, stripHtml } from "@/lib/cms/html";
import { seoMetadata } from "@/lib/cms/metadata";
import type { HomeCard } from "@/lib/cms/schema";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent();
  return seoMetadata(content.home.seo, { path: "/", absoluteTitle: true });
}

export default async function HomePage() {
  const content = await getContent();
  const { home, site, about } = content;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://www.wintersnet.net/#website",
        url: "https://www.wintersnet.net",
        name: stripHtml(site.name),
        description: home.seo.description,
        inLanguage: "en",
        publisher: { "@id": "https://www.wintersnet.net/#person" },
      },
      {
        "@type": "Person",
        "@id": "https://www.wintersnet.net/#person",
        name: stripHtml(about.title),
        url: "https://www.wintersnet.net/about",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <ForestSilhouette className="absolute bottom-0 left-0 w-full h-[280px] sm:h-[340px]" />
          <Rain count={70} />
          <div className="mist" />
        </div>

        <div className="mx-auto max-w-3xl px-6 pt-20 pb-44 sm:pt-28 sm:pb-56 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-[var(--muted)]">
            <CmsHtml html={home.eyebrow} inline />
          </p>
          <h1 className="serif mt-5 text-5xl sm:text-6xl font-medium tracking-tight text-[var(--foreground)]">
            <CmsHtml html={home.title} inline />
          </h1>
          <div className="mt-6 text-lg leading-relaxed text-[var(--muted)] max-w-2xl mx-auto">
            <CmsHtml html={home.intro} className="cms-html" />
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <CtaLink href={home.primaryCta.href} variant="primary">
              <CmsHtml html={home.primaryCta.label} inline />
              <span aria-hidden>→</span>
            </CtaLink>
            <CtaLink href={home.secondaryCta.href} variant="secondary">
              <CmsHtml html={home.secondaryCta.label} inline />
            </CtaLink>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-20 -mt-10 relative z-10">
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-7 sm:p-9 shadow-sm">
          <div className="text-base sm:text-lg leading-relaxed text-[var(--foreground)]">
            <CmsHtml html={home.body} className="cms-html" />
          </div>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {home.cards.map((card) => (
            <Card key={card.id} card={card} />
          ))}
        </div>
      </section>
    </>
  );
}

function CtaLink({
  href,
  variant,
  children,
}: {
  href: string;
  variant: "primary" | "secondary";
  children: React.ReactNode;
}) {
  const external = isExternalHref(href);
  const className =
    variant === "primary"
      ? "inline-flex items-center gap-2 rounded-full border border-[var(--accent)] bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-on-accent no-underline transition hover:bg-[var(--accent-hover)] hover:border-[var(--accent-hover)] hover:text-on-accent"
      : "inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)]/70 px-5 py-2.5 text-sm font-medium text-[var(--foreground)] no-underline backdrop-blur transition hover:border-[var(--accent)] hover:text-[var(--accent)]";
  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

function Card({ card }: { card: HomeCard }) {
  const linkProps = card.external || isExternalHref(card.href)
    ? { target: "_blank" as const, rel: "noreferrer" }
    : {};
  const Component = card.external || isExternalHref(card.href) ? "a" : Link;
  return (
    <Component
      href={card.href}
      {...linkProps}
      className="group block overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] transition hover:border-[var(--accent)] hover:shadow-md no-underline"
    >
      {card.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={card.image} alt="" className="h-40 w-full object-cover" />
      ) : null}
      <div className="p-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--muted)]">
          <CmsHtml html={card.eyebrow} inline />
        </p>
        <h2 className="serif mt-2 text-2xl font-medium text-[var(--foreground)]">
          <CmsHtml html={card.title} inline />
        </h2>
        <div className="mt-3 text-sm text-[var(--muted)] leading-relaxed">
          <CmsHtml html={card.description} className="cms-html" />
        </div>
        <p className="mt-4 text-sm font-medium text-[var(--accent)] group-hover:text-[var(--accent-hover)]">
          <CmsHtml html={card.cta} inline />
        </p>
      </div>
    </Component>
  );
}

import type { Metadata } from "next";
import { ForestSilhouette } from "@/components/forest-silhouette";
import { MinecraftStatus } from "@/components/minecraft-status";
import { CmsHtml } from "@/components/cms/cms-html";
import { getContent } from "@/lib/cms/store";
import { seoMetadata } from "@/lib/cms/metadata";
import { isExternalHref } from "@/lib/cms/html";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent();
  return seoMetadata(content.minecraft.seo, { path: "/minecraft" });
}

export default async function MinecraftPage() {
  const { minecraft } = await getContent();
  const mapExternal = isExternalHref(minecraft.mapCta.href);

  return (
    <>
      <header className="relative isolate overflow-hidden border-b border-[var(--border)]">
        <div className="absolute inset-0 -z-10">
          <ForestSilhouette className="absolute bottom-0 left-0 w-full h-[120px] opacity-80" />
          <div className="mist" />
        </div>
        <div className="mx-auto max-w-3xl px-6 pt-16 pb-24 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-[var(--muted)]">
            <CmsHtml html={minecraft.eyebrow} inline />
          </p>
          <h1 className="serif mt-4 text-4xl sm:text-5xl font-medium tracking-tight">
            <CmsHtml html={minecraft.title} inline />
          </h1>
          <div className="mt-4 text-[var(--muted)] italic">
            <CmsHtml html={minecraft.subtitle} className="cms-html" />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-6 py-14 space-y-12">
        <MinecraftStatus />

        <section>
          <div className="cms-html [&_h2]:serif [&_h2]:text-2xl [&_h2]:font-medium [&_h2]:tracking-tight [&_h2]:text-[var(--foreground)] [&_p]:mt-3 [&_p]:text-[var(--muted)] [&_p]:leading-relaxed [&_code]:rounded [&_code]:bg-[var(--surface-muted)] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-sm [&_code]:text-[var(--foreground)]">
            <CmsHtml html={minecraft.joinHtml} />
          </div>
          <div className="mt-6">
            {mapExternal ? (
              <a
                href={minecraft.mapCta.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--accent)] bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-on-accent no-underline transition hover:bg-[var(--accent-hover)] hover:border-[var(--accent-hover)] hover:text-on-accent"
              >
                <CmsHtml html={minecraft.mapCta.label} inline />
                <span aria-hidden>→</span>
              </a>
            ) : (
              <a
                href={minecraft.mapCta.href}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--accent)] bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-on-accent no-underline transition hover:bg-[var(--accent-hover)] hover:border-[var(--accent-hover)] hover:text-on-accent"
              >
                <CmsHtml html={minecraft.mapCta.label} inline />
                <span aria-hidden>→</span>
              </a>
            )}
            <div className="mt-3 text-sm text-[var(--muted)]">
              <CmsHtml html={minecraft.mapNote} className="cms-html" />
            </div>
          </div>
        </section>

        <section>
          <h2 className="serif text-2xl font-medium tracking-tight text-[var(--foreground)]">
            <CmsHtml html={minecraft.staffHeading} inline />
          </h2>
          <div className="mt-3 text-[var(--muted)] leading-relaxed">
            <CmsHtml html={minecraft.staffIntro} className="cms-html" />
          </div>
          <ul className="mt-6 divide-y divide-[var(--border)] rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
            {minecraft.staff.map((person) => (
              <li
                key={person.id}
                className="flex items-baseline justify-between gap-4 px-5 py-4"
              >
                <span className="font-medium text-[var(--foreground)]">
                  <CmsHtml html={person.name} inline />
                </span>
                <span className="text-sm text-[var(--muted)]">
                  <CmsHtml html={person.role} inline />
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="serif text-2xl font-medium tracking-tight text-[var(--foreground)]">
            <CmsHtml html={minecraft.rulesHeading} inline />
          </h2>
          <div className="mt-3 text-[var(--muted)] leading-relaxed">
            <CmsHtml html={minecraft.rulesIntro} className="cms-html" />
          </div>
          <ul className="mt-6 space-y-3 text-[var(--foreground)] leading-relaxed">
            {minecraft.rules.map((rule) => (
              <li key={rule.id} className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="mt-2 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--accent)]"
                />
                <span>
                  <CmsHtml html={rule.html} inline />
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}

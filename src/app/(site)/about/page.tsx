import type { Metadata } from "next";
import { ForestSilhouette } from "@/components/forest-silhouette";
import { CmsHtml } from "@/components/cms/cms-html";
import { getContent } from "@/lib/cms/store";
import { seoMetadata } from "@/lib/cms/metadata";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent();
  return seoMetadata(content.about.seo, { path: "/about", type: "profile" });
}

export default async function AboutPage() {
  const { about } = await getContent();
  return (
    <>
      <header className="relative isolate overflow-hidden border-b border-[var(--border)]">
        <div className="absolute inset-0 -z-10">
          <ForestSilhouette className="absolute bottom-0 left-0 w-full h-[120px] opacity-80" />
          <div className="mist" />
        </div>
        <div className="mx-auto max-w-2xl px-6 pt-16 pb-24 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-[var(--muted)]">
            <CmsHtml html={about.eyebrow} inline />
          </p>
          <h1 className="serif mt-4 text-4xl sm:text-5xl font-medium tracking-tight">
            <CmsHtml html={about.title} inline />
          </h1>
        </div>
      </header>

      <div className="mx-auto max-w-2xl px-6 py-14">
        {about.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={about.image}
            alt=""
            className="mb-10 mx-auto max-h-72 rounded-xl object-cover"
          />
        ) : null}
        <div className="space-y-5 text-[var(--foreground)] leading-relaxed text-lg">
          <CmsHtml html={about.body} className="cms-html" />
        </div>
      </div>
    </>
  );
}

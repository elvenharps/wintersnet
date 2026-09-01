import type { Metadata } from "next";
import { ForestSilhouette } from "@/components/forest-silhouette";
import { CmsHtml } from "@/components/cms/cms-html";
import { getContent } from "@/lib/cms/store";
import { seoMetadata } from "@/lib/cms/metadata";
import type { ProjectItem } from "@/lib/cms/schema";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent();
  return seoMetadata(content.projects.seo, { path: "/projects" });
}

export default async function ProjectsPage() {
  const { projects } = await getContent();
  return (
    <>
      <header className="relative isolate overflow-hidden border-b border-[var(--border)]">
        <div className="absolute inset-0 -z-10">
          <ForestSilhouette className="absolute bottom-0 left-0 w-full h-[120px] opacity-80" />
          <div className="mist" />
        </div>
        <div className="mx-auto max-w-3xl px-6 pt-16 pb-24 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-[var(--muted)]">
            <CmsHtml html={projects.eyebrow} inline />
          </p>
          <h1 className="serif mt-4 text-4xl sm:text-5xl font-medium tracking-tight">
            <CmsHtml html={projects.title} inline />
          </h1>
          <div className="mt-4 text-[var(--muted)] italic">
            <CmsHtml html={projects.subtitle} className="cms-html" />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-6 py-14 space-y-10">
        {projects.items.map((item) => (
          <ProjectCard key={item.id} project={item} />
        ))}
      </div>
    </>
  );
}

function ProjectCard({ project }: { project: ProjectItem }) {
  return (
    <article className="rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden shadow-sm">
      {project.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={project.image} alt="" className="h-52 w-full object-cover" />
      ) : null}
      <div className="border-l-4 border-[var(--accent)] p-7 sm:p-9">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
          <div>
            <h2 className="serif text-3xl font-medium tracking-tight text-[var(--foreground)]">
              <CmsHtml html={project.name} inline />
            </h2>
            <div className="mt-1 text-[var(--muted)] italic">
              <CmsHtml html={project.tagline} className="cms-html" />
            </div>
          </div>
          <a
            href={project.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex flex-shrink-0 items-center gap-2 rounded-full border border-[var(--accent)] bg-[var(--accent)] px-4 py-2 text-sm font-medium text-on-accent no-underline transition hover:bg-[var(--accent-hover)] hover:border-[var(--accent-hover)] hover:text-on-accent"
          >
            <CmsHtml html={project.cta} inline />
          </a>
        </div>

        <div className="mt-5 text-[var(--foreground)] leading-relaxed">
          <CmsHtml html={project.description} className="cms-html" />
        </div>

        <div className="mt-6 text-sm text-[var(--muted)] [&_ul]:space-y-2 [&_li]:flex [&_li]:items-start [&_li]:gap-2 [&_ul]:list-none [&_ul]:p-0 [&_li]:before:mt-1.5 [&_li]:before:inline-block [&_li]:before:h-1.5 [&_li]:before:w-1.5 [&_li]:before:flex-shrink-0 [&_li]:before:rounded-full [&_li]:before:bg-[var(--accent)] [&_li]:before:content-['']">
          <CmsHtml html={project.features} className="cms-html" />
        </div>
      </div>
    </article>
  );
}

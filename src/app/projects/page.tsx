import type { Metadata } from "next";
import { ForestSilhouette } from "@/components/forest-silhouette";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Active projects by Nathan Scott — Redmond Chat (the spiritual successor to MSN Chat) and Evaluate My Portfolio (AI-powered investment analysis).",
};

type Project = {
  name: string;
  tagline: string;
  href: string;
  description: string;
  features: string[];
  cta: string;
};

const projects: Project[] = [
  {
    name: "Redmond Chat",
    tagline: "MSN Chat, reborn.",
    href: "https://redmond.chat",
    description:
      "A free, modern reimplementation of MSN Chat (chat.msn.com) running on the original 1998 IRCx protocol. Browse rooms by category and chat in your browser — no plugins, no Java, no nostalgia tax. Power users can also point any IRC client at irc.redmond.chat over SSL.",
    features: [
      "Browser-native — works in every modern browser",
      "Original IRCx (Microsoft's 1998 IRC extension) on the back end",
      "Secure IRC over SSL for traditional clients (irc.redmond.chat:6697)",
      "Browse rooms by category, just like the old days",
      "Free, open, and ad-free",
    ],
    cta: "Visit redmond.chat →",
  },
  {
    name: "Evaluate My Portfolio",
    tagline: "AI-powered investment analysis.",
    href: "https://evaluatemyportfolio.net",
    description:
      "Connect your brokerage or upload a CSV, and get a deep, AI-driven read on your portfolio: risk metrics, growth projections, benchmark comparison, ETF X-ray, and personalized recommendations — delivered as an actionable report.",
    features: [
      "Risk metrics: Sharpe, Sortino, VaR, Beta, Alpha",
      "Benchmark comparison vs. S&P 500 and Nasdaq 100",
      "30-year growth projections + dividend income projector",
      "ETF X-Ray — see what you actually own under the hood",
      "Brokerage integration (Fidelity, Vanguard, Chase) or CSV upload",
      "What-if trade simulator, weekly digest emails, downloadable PDF report",
    ],
    cta: "Visit evaluatemyportfolio.net →",
  },
];

export default function ProjectsPage() {
  return (
    <>
      <header className="relative isolate overflow-hidden border-b border-[var(--border)]">
        <div className="absolute inset-0 -z-10">
          <ForestSilhouette className="absolute bottom-0 left-0 w-full h-[120px] opacity-80" />
          <div className="mist" />
        </div>
        <div className="mx-auto max-w-3xl px-6 pt-16 pb-24 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-[var(--muted)]">
            Active projects
          </p>
          <h1 className="serif mt-4 text-4xl sm:text-5xl font-medium tracking-tight">
            What I&rsquo;m building
          </h1>
          <p className="mt-4 text-[var(--muted)] italic">
            Side projects that keep the lights on at WintersNet.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-6 py-14 space-y-10">
        {projects.map((p) => (
          <ProjectCard key={p.name} project={p} />
        ))}
      </div>
    </>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden shadow-sm">
      <div className="border-l-4 border-[var(--accent)] p-7 sm:p-9">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
          <div>
            <h2 className="serif text-3xl font-medium tracking-tight text-[var(--foreground)]">
              {project.name}
            </h2>
            <p className="mt-1 text-[var(--muted)] italic">{project.tagline}</p>
          </div>
          <a
            href={project.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex flex-shrink-0 items-center gap-2 rounded-full border border-[var(--accent)] bg-[var(--accent)] px-4 py-2 text-sm font-medium text-on-accent no-underline transition hover:bg-[var(--accent-hover)] hover:border-[var(--accent-hover)] hover:text-on-accent"
          >
            {project.cta}
          </a>
        </div>

        <p className="mt-5 text-[var(--foreground)] leading-relaxed">
          {project.description}
        </p>

        <ul className="mt-6 space-y-2 text-sm text-[var(--muted)]">
          {project.features.map((f) => (
            <li key={f} className="flex items-start gap-2 leading-relaxed">
              <span
                aria-hidden="true"
                className="mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--accent)]"
              />
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

import Link from "next/link";
import { ForestSilhouette } from "@/components/forest-silhouette";
import { Rain } from "@/components/rain";

export default function HomePage() {
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <ForestSilhouette className="absolute bottom-0 left-0 w-full h-[280px] sm:h-[340px]" />
          <Rain count={70} />
          <div className="mist" />
        </div>

        <div className="mx-auto max-w-3xl px-6 pt-20 pb-44 sm:pt-28 sm:pb-56 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-[var(--muted)]">
            Pacific Northwest · Est. 2003
          </p>
          <h1 className="serif mt-5 text-5xl sm:text-6xl font-medium tracking-tight text-[var(--foreground)]">
            A quiet corner of the internet.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-[var(--muted)] max-w-2xl mx-auto">
            WintersNet has existed, in one form or another, since early 2003.
            Founded by <Link href="/about">Nathan Scott</Link>, who still
            actively maintains it today.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/history"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--accent)] bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white no-underline transition hover:bg-[var(--accent-hover)] hover:border-[var(--accent-hover)] hover:text-white"
            >
              Read the MSN Chat history
              <span aria-hidden>→</span>
            </Link>
            <a
              href="https://discord.gg/WyxjwgDyws"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)]/70 px-5 py-2.5 text-sm font-medium text-[var(--foreground)] no-underline backdrop-blur transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              Join the Discord
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-20 -mt-10 relative z-10">
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-7 sm:p-9 shadow-sm">
          <p className="text-base sm:text-lg leading-relaxed text-[var(--foreground)]">
            In its present iteration, we provide folks who may not have the
            means to procure bandwidth en-masse a premium web presence. We
            partner with several large networks &mdash;{" "}
            <a href="https://www.microsoft.com" target="_blank" rel="noreferrer">
              Microsoft
            </a>{" "}
            and{" "}
            <a href="https://www.quadranet.com" target="_blank" rel="noreferrer">
              QuadraNet
            </a>{" "}
            to name but two &mdash; and have servers and facilities spread
            across the globe. We offer significantly reduced, or in many cases
            entirely free, bandwidth and infrastructure to those who qualify.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          <Card
            eyebrow="Long-form"
            title="History of MSN Chat"
            description="A detailed, fact-checked history of MSN Chat, from its Comic Chat origins through its final days. Cited by Wikipedia."
            href="/history"
            cta="Read the history →"
          />
          <Card
            eyebrow="Community"
            title="Discord Server"
            description="A small Discord where a fair number of folks from the early MSN Chat days can be found."
            href="https://discord.gg/WyxjwgDyws"
            cta="Join the Discord →"
            external
          />
        </div>
      </section>
    </>
  );
}

function Card({
  eyebrow,
  title,
  description,
  href,
  cta,
  external,
}: {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  cta: string;
  external?: boolean;
}) {
  const linkProps = external ? { target: "_blank", rel: "noreferrer" } : {};
  const Component = external ? "a" : Link;
  return (
    <Component
      href={href}
      {...linkProps}
      className="group block rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 transition hover:border-[var(--accent)] hover:shadow-md no-underline"
    >
      <p className="text-xs font-semibold uppercase tracking-widest text-[var(--muted)]">
        {eyebrow}
      </p>
      <h2 className="serif mt-2 text-2xl font-medium text-[var(--foreground)]">
        {title}
      </h2>
      <p className="mt-3 text-sm text-[var(--muted)] leading-relaxed">
        {description}
      </p>
      <p className="mt-4 text-sm font-medium text-[var(--accent)] group-hover:text-[var(--accent-hover)]">
        {cta}
      </p>
    </Component>
  );
}

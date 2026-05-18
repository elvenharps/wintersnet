import Link from "next/link";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
      <section className="space-y-6">
        <p className="text-sm font-medium uppercase tracking-widest text-[var(--muted)]">
          Est. 2003
        </p>
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">
          Welcome to <span className="text-[var(--accent)]">WintersNet</span>.
        </h1>
        <p className="text-lg text-[var(--muted)] leading-relaxed">
          WintersNet has existed, in one form or another, since early 2003. It was
          founded by{" "}
          <Link href="/about">Nathan Scott</Link>, who still actively maintains it
          today. In its present iteration, we provide folks who may not have the
          means to procure bandwidth en-masse a premium web presence.
        </p>
        <p className="text-lg text-[var(--muted)] leading-relaxed">
          We partner with several large networks &mdash;{" "}
          <a href="https://www.microsoft.com" target="_blank" rel="noreferrer">
            Microsoft
          </a>{" "}
          and{" "}
          <a href="https://www.quadranet.com" target="_blank" rel="noreferrer">
            QuadraNet
          </a>{" "}
          to name but two &mdash; and have servers and facilities spread across
          the globe. We are able to offer significantly reduced, or in many cases
          entirely free, bandwidth and infrastructure to those who qualify.
        </p>
      </section>

      <section className="mt-16 grid gap-6 sm:grid-cols-2">
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
          description="A small Discord has been created where a fair number of folks from the early MSN Chat days can be found."
          href="https://discord.gg/WyxjwgDyws"
          cta="Join the Discord →"
          external
        />
      </section>
    </div>
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
  const linkProps = external
    ? { target: "_blank", rel: "noreferrer" }
    : {};
  const Component = external ? "a" : Link;
  return (
    <Component
      href={href}
      {...linkProps}
      className="group block rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6 transition hover:border-[var(--accent)] hover:shadow-sm no-underline"
    >
      <p className="text-xs font-semibold uppercase tracking-widest text-[var(--muted)]">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-xl font-semibold text-[var(--foreground)]">
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

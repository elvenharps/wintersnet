import type { Metadata } from "next";
import { ForestSilhouette } from "@/components/forest-silhouette";
import { MinecraftStatus } from "@/components/minecraft-status";

export const metadata: Metadata = {
  title: "Minecraft",
  description:
    "The WintersNet Family Minecraft server — a quiet 24/7 survival world. Join at minecraft.wintersnet.net and explore the live map.",
  alternates: {
    canonical: "/minecraft",
  },
  openGraph: {
    title: "Minecraft · WintersNet",
    description:
      "The WintersNet Family Minecraft server — a quiet 24/7 survival world. Join at minecraft.wintersnet.net and explore the live map.",
    url: "https://www.wintersnet.net/minecraft",
    type: "website",
  },
};

const staff = [
  { name: "Nathan Scott", role: "Administrator" },
  { name: "Emily Scott", role: "Administrator" },
];

const rules = [
  "Be kind. This is a family server — treat people the way you\u2019d want to be treated.",
  "Don\u2019t steal or grief. Other players\u2019 builds and belongings stay theirs.",
  "Keep it family-friendly. No harassment, hate, or inappropriate content.",
  "Ask before big changes near someone else\u2019s base.",
];

export default function MinecraftPage() {
  return (
    <>
      <header className="relative isolate overflow-hidden border-b border-[var(--border)]">
        <div className="absolute inset-0 -z-10">
          <ForestSilhouette className="absolute bottom-0 left-0 w-full h-[120px] opacity-80" />
          <div className="mist" />
        </div>
        <div className="mx-auto max-w-3xl px-6 pt-16 pb-24 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-[var(--muted)]">
            Minecraft
          </p>
          <h1 className="serif mt-4 text-4xl sm:text-5xl font-medium tracking-tight">
            WintersNet Family Server
          </h1>
          <p className="mt-4 text-[var(--muted)] italic">
            A quiet 24/7 survival world &mdash; open to anyone who plays nice.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-6 py-14 space-y-12">
        <MinecraftStatus />

        <section>
          <h2 className="serif text-2xl font-medium tracking-tight text-[var(--foreground)]">
            How to join
          </h2>
          <p className="mt-3 text-[var(--muted)] leading-relaxed">
            Add{" "}
            <code className="rounded bg-[var(--surface-muted)] px-1.5 py-0.5 font-mono text-sm text-[var(--foreground)]">
              minecraft.wintersnet.net
            </code>{" "}
            as a Java Edition server. No whitelist for now &mdash; just connect
            and say hello.
          </p>
          <div className="mt-6">
            <a
              href="https://map.wintersnet.net"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--accent)] bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-on-accent no-underline transition hover:bg-[var(--accent-hover)] hover:border-[var(--accent-hover)] hover:text-on-accent"
            >
              Open the live map
              <span aria-hidden>→</span>
            </a>
            <p className="mt-3 text-sm text-[var(--muted)]">
              BlueMap covers the overworld, nether, and the end &mdash; useful
              for finding your way home or showing friends around.
            </p>
          </div>
        </section>

        <section>
          <h2 className="serif text-2xl font-medium tracking-tight text-[var(--foreground)]">
            Staff
          </h2>
          <p className="mt-3 text-[var(--muted)] leading-relaxed">
            A short roster. Ping either of us in-game if something needs sorting
            out.
          </p>
          <ul className="mt-6 divide-y divide-[var(--border)] rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
            {staff.map((person) => (
              <li
                key={person.name}
                className="flex items-baseline justify-between gap-4 px-5 py-4"
              >
                <span className="font-medium text-[var(--foreground)]">
                  {person.name}
                </span>
                <span className="text-sm text-[var(--muted)]">
                  {person.role}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="serif text-2xl font-medium tracking-tight text-[var(--foreground)]">
            House rules
          </h2>
          <p className="mt-3 text-[var(--muted)] leading-relaxed">
            The usual stuff, kept short.
          </p>
          <ul className="mt-6 space-y-3 text-[var(--foreground)] leading-relaxed">
            {rules.map((rule) => (
              <li key={rule} className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="mt-2 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--accent)]"
                />
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}

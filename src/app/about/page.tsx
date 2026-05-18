import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Nathan Scott, founder and maintainer of WintersNet since 2003.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16 sm:py-24">
      <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
        About
      </h1>
      <div className="mt-8 space-y-5 text-[var(--foreground)] leading-relaxed">
        <p>
          A messaging and systems engineer by trade, Nathan currently works full
          time for Microsoft as a Service Engineer and Product Manager for
          Exchange Online. With over 15 years cumulative experience within
          Information Services, he uses the wealth of his experience to ensure
          WintersNet continues to exist.
        </p>
        <p className="text-[var(--muted)]">
          Nathan can be contacted via e-mail at{" "}
          <a href="mailto:nathan@wintersnet.net">nathan@wintersnet.net</a>, or
          on the WintersNet{" "}
          <a href="https://discord.gg/WyxjwgDyws" target="_blank" rel="noreferrer">
            Discord server
          </a>
          .
        </p>
      </div>
    </div>
  );
}

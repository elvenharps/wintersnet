import type { Metadata } from "next";
import { ForestSilhouette } from "@/components/forest-silhouette";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Nathan Scott, founder and maintainer of WintersNet since 2003.",
};

export default function AboutPage() {
  return (
    <>
      <header className="relative isolate overflow-hidden border-b border-[var(--border)]">
        <div className="absolute inset-0 -z-10">
          <ForestSilhouette className="absolute bottom-0 left-0 w-full h-[120px] opacity-80" />
          <div className="mist" />
        </div>
        <div className="mx-auto max-w-2xl px-6 pt-16 pb-24 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-[var(--muted)]">
            About
          </p>
          <h1 className="serif mt-4 text-4xl sm:text-5xl font-medium tracking-tight">
            Nathan Scott
          </h1>
        </div>
      </header>

      <div className="mx-auto max-w-2xl px-6 py-14">
        <div className="space-y-5 text-[var(--foreground)] leading-relaxed text-lg">
          <p>
            A messaging and systems engineer by trade, Nathan currently works
            full time for Microsoft as a Service Engineer and Product Manager
            for Exchange Online. With over 20 years cumulative experience
            within Information Services, he uses the wealth of his experience
            to ensure WintersNet continues to exist.
          </p>
          <p className="text-[var(--muted)]">
            Nathan can be contacted via e-mail at{" "}
            <a href="mailto:nathan@wintersnet.net">nathan@wintersnet.net</a>,
            or via{" "}
            <a href="https://flutterby.chat" target="_blank" rel="noreferrer">
              Flutterby Chat
            </a>
            , the spiritual successor to MSN Chat.
          </p>
        </div>
      </div>
    </>
  );
}

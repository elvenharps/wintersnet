"use client";

import { useCallback, useEffect, useState } from "react";

const HOST = "minecraft.wintersnet.net";
const STATUS_URL = `https://api.mcstatus.io/v2/status/java/${HOST}`;
const POLL_MS = 45_000;

type StatusPayload = {
  online: boolean;
  players?: { online: number; max: number };
  version?: { name_clean?: string };
  motd?: { clean?: string };
};

type StatusState =
  | { kind: "loading" }
  | { kind: "ok"; data: StatusPayload; checkedAt: Date }
  | { kind: "error"; checkedAt: Date };

export function MinecraftStatus() {
  const [status, setStatus] = useState<StatusState>({ kind: "loading" });
  const [copied, setCopied] = useState(false);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch(STATUS_URL, { cache: "no-store" });
      if (!res.ok) throw new Error(`status ${res.status}`);
      const data = (await res.json()) as StatusPayload;
      setStatus({ kind: "ok", data, checkedAt: new Date() });
    } catch {
      setStatus({ kind: "error", checkedAt: new Date() });
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    const tick = async () => {
      if (cancelled) return;
      await refresh();
    };

    void tick();
    const timer = setInterval(() => void tick(), POLL_MS);

    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, [refresh]);

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(HOST);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard may be denied; leave button label unchanged.
    }
  };

  const online = status.kind === "ok" && status.data.online;
  const offline =
    status.kind === "error" || (status.kind === "ok" && !status.data.online);

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden shadow-sm">
      <div className="border-l-4 border-[var(--accent)] p-7 sm:p-9">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <StatusDot
              state={
                status.kind === "loading"
                  ? "loading"
                  : online
                    ? "online"
                    : "offline"
              }
            />
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--muted)]">
                Live status
              </p>
              <p className="mt-0.5 text-lg font-medium text-[var(--foreground)]">
                {status.kind === "loading" && "Checking…"}
                {online && "Online"}
                {offline && "Offline"}
              </p>
            </div>
          </div>
          {status.kind !== "loading" && (
            <p className="text-xs text-[var(--muted)]">
              Checked{" "}
              {status.checkedAt.toLocaleTimeString(undefined, {
                hour: "numeric",
                minute: "2-digit",
              })}
            </p>
          )}
        </div>

        {status.kind === "ok" && status.data.online && (
          <dl className="mt-6 grid gap-4 sm:grid-cols-3 text-sm">
            <Stat
              label="Players"
              value={`${status.data.players?.online ?? 0} / ${status.data.players?.max ?? "—"}`}
            />
            <Stat
              label="Version"
              value={status.data.version?.name_clean ?? "—"}
            />
            <Stat
              label="MOTD"
              value={status.data.motd?.clean ?? "—"}
            />
          </dl>
        )}

        {status.kind === "error" && (
          <p className="mt-5 text-sm text-[var(--muted)]">
            Couldn&rsquo;t reach the status API. The server may still be up
            &mdash; try joining directly.
          </p>
        )}

        <div className="mt-7 flex flex-col sm:flex-row sm:items-center gap-3">
          <code className="flex-1 rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-2.5 font-mono text-sm text-[var(--foreground)]">
            {HOST}
          </code>
          <button
            type="button"
            onClick={() => void copyAddress()}
            className="inline-flex flex-shrink-0 items-center justify-center gap-2 rounded-full border border-[var(--accent)] bg-[var(--accent)] px-4 py-2.5 text-sm font-medium text-on-accent transition hover:bg-[var(--accent-hover)] hover:border-[var(--accent-hover)]"
          >
            {copied ? "Copied" : "Copy address"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wider text-[var(--muted)]">
        {label}
      </dt>
      <dd className="mt-1 text-[var(--foreground)] leading-snug">{value}</dd>
    </div>
  );
}

function StatusDot({
  state,
}: {
  state: "loading" | "online" | "offline";
}) {
  const color =
    state === "online"
      ? "bg-[var(--accent)]"
      : state === "offline"
        ? "bg-red-500/80"
        : "bg-[var(--muted)]";

  return (
    <span className="relative flex h-3 w-3" aria-hidden="true">
      {state === "online" && (
        <span
          className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-40 ${color}`}
        />
      )}
      <span
        className={`relative inline-flex h-3 w-3 rounded-full ${color} ${state === "loading" ? "animate-pulse" : ""}`}
      />
    </span>
  );
}

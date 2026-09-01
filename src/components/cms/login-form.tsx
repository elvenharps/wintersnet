"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function LoginForm({ configured }: { configured: boolean }) {
  const router = useRouter();
  const params = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  if (!configured) {
    return (
      <p className="text-[var(--muted)] leading-relaxed">
        Set <code className="rounded bg-[var(--surface-muted)] px-1.5 py-0.5 text-sm">CMS_PASSWORD</code>{" "}
        and{" "}
        <code className="rounded bg-[var(--surface-muted)] px-1.5 py-0.5 text-sm">CMS_SECRET</code>{" "}
        in the environment, then reload this page.
      </p>
    );
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(data.error || "Could not sign in.");
        return;
      }
      const next = params.get("next") || "/admin";
      router.replace(next.startsWith("/admin") ? next : "/admin");
      router.refresh();
    } catch {
      setError("Could not sign in.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <label className="block space-y-2">
        <span className="text-sm font-medium">Password</span>
        <input
          type="password"
          name="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm outline-none focus:border-[var(--accent)]"
          required
        />
      </label>
      {error ? (
        <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
      ) : null}
      <button
        type="submit"
        disabled={busy}
        className="w-full rounded-full border border-[var(--accent)] bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-on-accent transition hover:bg-[var(--accent-hover)] disabled:opacity-60"
      >
        {busy ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}

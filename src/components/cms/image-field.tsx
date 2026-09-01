"use client";

import { useRef, useState } from "react";

type Props = {
  label: string;
  value: string;
  onChange: (url: string) => void;
};

export function ImageField({ label, value, onChange }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onFile(file: File) {
    setError("");
    setBusy(true);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: form });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) throw new Error(data.error || "Upload failed.");
      onChange(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-[var(--foreground)]">{label}</p>
      {value ? (
        <div className="overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface-muted)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="" className="max-h-48 w-full object-cover" />
        </div>
      ) : null}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          disabled={busy}
          onClick={() => fileRef.current?.click()}
          className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-sm font-medium text-[var(--foreground)] transition hover:border-[var(--accent)] hover:text-[var(--accent)] disabled:opacity-60"
        >
          {busy ? "Uploading…" : value ? "Replace image" : "Upload image"}
        </button>
        {value ? (
          <button
            type="button"
            onClick={() => onChange("")}
            className="rounded-full border border-[var(--border)] px-3 py-1.5 text-sm text-[var(--muted)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            Remove
          </button>
        ) : null}
      </div>
      {error ? <p className="text-sm text-red-700 dark:text-red-400">{error}</p> : null}
      <input
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0];
          event.target.value = "";
          if (file) void onFile(file);
        }}
      />
    </div>
  );
}

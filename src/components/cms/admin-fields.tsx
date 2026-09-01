"use client";

import type { SeoFields } from "@/lib/cms/schema";
import { RichTextEditor, type EditorVariant } from "./rich-text-editor";

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-2">
      <span className="block text-sm font-medium text-[var(--foreground)]">
        {label}
      </span>
      {children}
      {hint ? <span className="block text-xs text-[var(--muted)]">{hint}</span> : null}
    </label>
  );
}

export function HtmlField({
  label,
  value,
  onChange,
  variant = "compact",
  placeholder,
  hint,
}: {
  label: string;
  value: string;
  onChange: (html: string) => void;
  variant?: EditorVariant;
  placeholder?: string;
  hint?: string;
}) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-[var(--foreground)]">{label}</p>
      <RichTextEditor
        value={value}
        onChange={onChange}
        variant={variant}
        placeholder={placeholder}
      />
      {hint ? <p className="text-xs text-[var(--muted)]">{hint}</p> : null}
    </div>
  );
}

export function TextField({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  hint,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  hint?: string;
}) {
  return (
    <Field label={label} hint={hint}>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--foreground)] outline-none transition focus:border-[var(--accent)]"
      />
    </Field>
  );
}

export function SeoFieldsEditor({
  value,
  onChange,
}: {
  value: SeoFields;
  onChange: (seo: SeoFields) => void;
}) {
  return (
    <fieldset className="space-y-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
      <legend className="px-1 text-sm font-semibold uppercase tracking-widest text-[var(--muted)]">
        SEO
      </legend>
      <TextField
        label="Page title"
        value={value.title}
        onChange={(title) => onChange({ ...value, title })}
        hint="Used in the browser tab and search results. The site name is appended automatically on inner pages."
      />
      <TextField
        label="Meta description"
        value={value.description}
        onChange={(description) => onChange({ ...value, description })}
      />
      <TextField
        label="Open Graph description"
        value={value.ogDescription}
        onChange={(ogDescription) => onChange({ ...value, ogDescription })}
      />
    </fieldset>
  );
}

export function SaveBar({
  status,
  error,
  onSave,
}: {
  status: "idle" | "saving" | "saved" | "error";
  error?: string;
  onSave: () => void;
}) {
  return (
    <div className="sticky bottom-4 z-10 mt-8 flex flex-wrap items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--background)]/95 px-4 py-3 shadow-sm backdrop-blur">
      <button
        type="button"
        onClick={onSave}
        disabled={status === "saving"}
        className="rounded-full border border-[var(--accent)] bg-[var(--accent)] px-5 py-2 text-sm font-medium text-on-accent transition hover:bg-[var(--accent-hover)] hover:border-[var(--accent-hover)] disabled:opacity-60"
      >
        {status === "saving" ? "Saving…" : "Save changes"}
      </button>
      {status === "saved" ? (
        <p className="text-sm text-[var(--accent)]">Saved.</p>
      ) : null}
      {status === "error" ? (
        <p className="text-sm text-red-700 dark:text-red-400">
          {error || "Could not save."}
        </p>
      ) : null}
    </div>
  );
}

export function RepeaterControls({
  onMoveUp,
  onMoveDown,
  onRemove,
  disableUp,
  disableDown,
}: {
  onMoveUp: () => void;
  onMoveDown: () => void;
  onRemove: () => void;
  disableUp?: boolean;
  disableDown?: boolean;
}) {
  const btn =
    "rounded-md border border-[var(--border)] px-2 py-1 text-xs text-[var(--muted)] transition hover:border-[var(--accent)] hover:text-[var(--accent)] disabled:opacity-40";
  return (
    <div className="flex flex-wrap gap-1">
      <button type="button" className={btn} onClick={onMoveUp} disabled={disableUp}>
        Up
      </button>
      <button type="button" className={btn} onClick={onMoveDown} disabled={disableDown}>
        Down
      </button>
      <button type="button" className={btn} onClick={onRemove}>
        Remove
      </button>
    </div>
  );
}

export function moveItem<T>(items: T[], index: number, direction: -1 | 1): T[] {
  const next = items.slice();
  const target = index + direction;
  if (target < 0 || target >= next.length) return items;
  const [item] = next.splice(index, 1);
  next.splice(target, 0, item);
  return next;
}

export async function saveSection(
  patch: Record<string, unknown>,
): Promise<void> {
  const res = await fetch("/api/admin/content", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patch),
  });
  const data = (await res.json()) as { error?: string };
  if (!res.ok) throw new Error(data.error || "Save failed.");
}

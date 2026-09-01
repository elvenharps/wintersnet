"use client";

import { useState } from "react";
import type { SiteSection } from "@/lib/cms/schema";
import {
  HtmlField,
  RepeaterControls,
  SaveBar,
  SeoFieldsEditor,
  TextField,
  moveItem,
  saveSection,
} from "./admin-fields";

export function SiteEditor({ initial }: { initial: SiteSection }) {
  const [data, setData] = useState(initial);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">(
    "idle",
  );
  const [error, setError] = useState("");

  async function save() {
    setStatus("saving");
    setError("");
    try {
      await saveSection({ site: data });
      setStatus("saved");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Save failed.");
    }
  }

  return (
    <div className="space-y-8">
      <HtmlField
        label="Site name"
        value={data.name}
        onChange={(name) => setData({ ...data, name })}
      />
      <HtmlField
        label="Footer (left)"
        value={data.footerLeft}
        onChange={(footerLeft) => setData({ ...data, footerLeft })}
        hint="Use {{year}} for the current year."
      />
      <HtmlField
        label="Footer (right)"
        value={data.footerRight}
        onChange={(footerRight) => setData({ ...data, footerRight })}
      />

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="serif text-xl font-medium">Navigation</h2>
          <button
            type="button"
            onClick={() =>
              setData({
                ...data,
                nav: [
                  ...data.nav,
                  {
                    id: crypto.randomUUID(),
                    href: "/",
                    label: "<p>New link</p>",
                  },
                ],
              })
            }
            className="text-sm font-medium text-[var(--accent)]"
          >
            Add link
          </button>
        </div>
        {data.nav.map((item, index) => (
          <div
            key={item.id}
            className="space-y-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4"
          >
            <div className="flex justify-end">
              <RepeaterControls
                disableUp={index === 0}
                disableDown={index === data.nav.length - 1}
                onMoveUp={() =>
                  setData({ ...data, nav: moveItem(data.nav, index, -1) })
                }
                onMoveDown={() =>
                  setData({ ...data, nav: moveItem(data.nav, index, 1) })
                }
                onRemove={() =>
                  setData({
                    ...data,
                    nav: data.nav.filter((n) => n.id !== item.id),
                  })
                }
              />
            </div>
            <HtmlField
              label="Label"
              value={item.label}
              onChange={(label) =>
                setData({
                  ...data,
                  nav: data.nav.map((n) =>
                    n.id === item.id ? { ...n, label } : n,
                  ),
                })
              }
            />
            <TextField
              label="URL"
              value={item.href}
              onChange={(href) =>
                setData({
                  ...data,
                  nav: data.nav.map((n) =>
                    n.id === item.id ? { ...n, href } : n,
                  ),
                })
              }
            />
          </div>
        ))}
      </section>

      <SeoFieldsEditor
        value={data.seo}
        onChange={(seo) => setData({ ...data, seo })}
      />
      <SaveBar status={status} error={error} onSave={() => void save()} />
    </div>
  );
}

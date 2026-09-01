"use client";

import { useState } from "react";
import type { MinecraftSection } from "@/lib/cms/schema";
import {
  HtmlField,
  RepeaterControls,
  SaveBar,
  SeoFieldsEditor,
  TextField,
  moveItem,
  saveSection,
} from "./admin-fields";

export function MinecraftEditor({ initial }: { initial: MinecraftSection }) {
  const [data, setData] = useState(initial);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">(
    "idle",
  );
  const [error, setError] = useState("");

  async function save() {
    setStatus("saving");
    setError("");
    try {
      await saveSection({ minecraft: data });
      setStatus("saved");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Save failed.");
    }
  }

  return (
    <div className="space-y-8">
      <HtmlField
        label="Eyebrow"
        value={data.eyebrow}
        onChange={(eyebrow) => setData({ ...data, eyebrow })}
      />
      <HtmlField
        label="Title"
        value={data.title}
        onChange={(title) => setData({ ...data, title })}
      />
      <HtmlField
        label="Subtitle"
        value={data.subtitle}
        onChange={(subtitle) => setData({ ...data, subtitle })}
      />
      <HtmlField
        label="How to join"
        value={data.joinHtml}
        onChange={(joinHtml) => setData({ ...data, joinHtml })}
        variant="full"
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <HtmlField
          label="Map button label"
          value={data.mapCta.label}
          onChange={(label) =>
            setData({ ...data, mapCta: { ...data.mapCta, label } })
          }
        />
        <TextField
          label="Map URL"
          value={data.mapCta.href}
          onChange={(href) =>
            setData({ ...data, mapCta: { ...data.mapCta, href } })
          }
        />
      </div>
      <HtmlField
        label="Map note"
        value={data.mapNote}
        onChange={(mapNote) => setData({ ...data, mapNote })}
      />
      <HtmlField
        label="Staff heading"
        value={data.staffHeading}
        onChange={(staffHeading) => setData({ ...data, staffHeading })}
      />
      <HtmlField
        label="Staff intro"
        value={data.staffIntro}
        onChange={(staffIntro) => setData({ ...data, staffIntro })}
      />

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="serif text-xl font-medium">Staff</h2>
          <button
            type="button"
            onClick={() =>
              setData({
                ...data,
                staff: [
                  ...data.staff,
                  {
                    id: crypto.randomUUID(),
                    name: "<p>Name</p>",
                    role: "<p>Role</p>",
                  },
                ],
              })
            }
            className="text-sm font-medium text-[var(--accent)]"
          >
            Add person
          </button>
        </div>
        {data.staff.map((person, index) => (
          <div
            key={person.id}
            className="space-y-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4"
          >
            <div className="flex justify-end">
              <RepeaterControls
                disableUp={index === 0}
                disableDown={index === data.staff.length - 1}
                onMoveUp={() =>
                  setData({ ...data, staff: moveItem(data.staff, index, -1) })
                }
                onMoveDown={() =>
                  setData({ ...data, staff: moveItem(data.staff, index, 1) })
                }
                onRemove={() =>
                  setData({
                    ...data,
                    staff: data.staff.filter((s) => s.id !== person.id),
                  })
                }
              />
            </div>
            <HtmlField
              label="Name"
              value={person.name}
              onChange={(name) =>
                setData({
                  ...data,
                  staff: data.staff.map((s) =>
                    s.id === person.id ? { ...s, name } : s,
                  ),
                })
              }
            />
            <HtmlField
              label="Role"
              value={person.role}
              onChange={(role) =>
                setData({
                  ...data,
                  staff: data.staff.map((s) =>
                    s.id === person.id ? { ...s, role } : s,
                  ),
                })
              }
            />
          </div>
        ))}
      </section>

      <HtmlField
        label="Rules heading"
        value={data.rulesHeading}
        onChange={(rulesHeading) => setData({ ...data, rulesHeading })}
      />
      <HtmlField
        label="Rules intro"
        value={data.rulesIntro}
        onChange={(rulesIntro) => setData({ ...data, rulesIntro })}
      />

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="serif text-xl font-medium">House rules</h2>
          <button
            type="button"
            onClick={() =>
              setData({
                ...data,
                rules: [
                  ...data.rules,
                  { id: crypto.randomUUID(), html: "<p>New rule</p>" },
                ],
              })
            }
            className="text-sm font-medium text-[var(--accent)]"
          >
            Add rule
          </button>
        </div>
        {data.rules.map((rule, index) => (
          <div
            key={rule.id}
            className="space-y-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4"
          >
            <div className="flex justify-end">
              <RepeaterControls
                disableUp={index === 0}
                disableDown={index === data.rules.length - 1}
                onMoveUp={() =>
                  setData({ ...data, rules: moveItem(data.rules, index, -1) })
                }
                onMoveDown={() =>
                  setData({ ...data, rules: moveItem(data.rules, index, 1) })
                }
                onRemove={() =>
                  setData({
                    ...data,
                    rules: data.rules.filter((r) => r.id !== rule.id),
                  })
                }
              />
            </div>
            <HtmlField
              label={`Rule ${index + 1}`}
              value={rule.html}
              onChange={(html) =>
                setData({
                  ...data,
                  rules: data.rules.map((r) =>
                    r.id === rule.id ? { ...r, html } : r,
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

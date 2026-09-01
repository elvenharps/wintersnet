"use client";

import { useState } from "react";
import type { ProjectsSection } from "@/lib/cms/schema";
import { ImageField } from "./image-field";
import {
  HtmlField,
  RepeaterControls,
  SaveBar,
  SeoFieldsEditor,
  TextField,
  moveItem,
  saveSection,
} from "./admin-fields";

export function ProjectsEditor({ initial }: { initial: ProjectsSection }) {
  const [data, setData] = useState(initial);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">(
    "idle",
  );
  const [error, setError] = useState("");

  async function save() {
    setStatus("saving");
    setError("");
    try {
      await saveSection({ projects: data });
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

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="serif text-xl font-medium">Projects</h2>
          <button
            type="button"
            onClick={() =>
              setData({
                ...data,
                items: [
                  ...data.items,
                  {
                    id: crypto.randomUUID(),
                    name: "<p>New project</p>",
                    tagline: "<p>Tagline</p>",
                    href: "https://",
                    description: "<p>Description</p>",
                    features: "<ul><li>Feature</li></ul>",
                    cta: "<p>Visit →</p>",
                    image: "",
                  },
                ],
              })
            }
            className="text-sm font-medium text-[var(--accent)]"
          >
            Add project
          </button>
        </div>
        {data.items.map((item, index) => (
          <div
            key={item.id}
            className="space-y-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5"
          >
            <div className="flex justify-end">
              <RepeaterControls
                disableUp={index === 0}
                disableDown={index === data.items.length - 1}
                onMoveUp={() =>
                  setData({ ...data, items: moveItem(data.items, index, -1) })
                }
                onMoveDown={() =>
                  setData({ ...data, items: moveItem(data.items, index, 1) })
                }
                onRemove={() =>
                  setData({
                    ...data,
                    items: data.items.filter((p) => p.id !== item.id),
                  })
                }
              />
            </div>
            <HtmlField
              label="Name"
              value={item.name}
              onChange={(name) =>
                setData({
                  ...data,
                  items: data.items.map((p) =>
                    p.id === item.id ? { ...p, name } : p,
                  ),
                })
              }
            />
            <HtmlField
              label="Tagline"
              value={item.tagline}
              onChange={(tagline) =>
                setData({
                  ...data,
                  items: data.items.map((p) =>
                    p.id === item.id ? { ...p, tagline } : p,
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
                  items: data.items.map((p) =>
                    p.id === item.id ? { ...p, href } : p,
                  ),
                })
              }
            />
            <HtmlField
              label="Description"
              value={item.description}
              onChange={(description) =>
                setData({
                  ...data,
                  items: data.items.map((p) =>
                    p.id === item.id ? { ...p, description } : p,
                  ),
                })
              }
              variant="full"
            />
            <HtmlField
              label="Features"
              value={item.features}
              onChange={(features) =>
                setData({
                  ...data,
                  items: data.items.map((p) =>
                    p.id === item.id ? { ...p, features } : p,
                  ),
                })
              }
              variant="full"
              hint="A bullet list works well here."
            />
            <HtmlField
              label="Button label"
              value={item.cta}
              onChange={(cta) =>
                setData({
                  ...data,
                  items: data.items.map((p) =>
                    p.id === item.id ? { ...p, cta } : p,
                  ),
                })
              }
            />
            <ImageField
              label="Project image"
              value={item.image}
              onChange={(image) =>
                setData({
                  ...data,
                  items: data.items.map((p) =>
                    p.id === item.id ? { ...p, image } : p,
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

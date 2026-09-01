"use client";

import { useState } from "react";
import type { HomeSection } from "@/lib/cms/schema";
import { ImageField } from "./image-field";
import {
  Field,
  HtmlField,
  RepeaterControls,
  SaveBar,
  SeoFieldsEditor,
  TextField,
  moveItem,
  saveSection,
} from "./admin-fields";

export function HomeEditor({ initial }: { initial: HomeSection }) {
  const [data, setData] = useState(initial);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">(
    "idle",
  );
  const [error, setError] = useState("");

  async function save() {
    setStatus("saving");
    setError("");
    try {
      await saveSection({ home: data });
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
        label="Intro"
        value={data.intro}
        onChange={(intro) => setData({ ...data, intro })}
        variant="full"
      />
      <HtmlField
        label="Body"
        value={data.body}
        onChange={(body) => setData({ ...data, body })}
        variant="full"
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <HtmlField
          label="Primary button label"
          value={data.primaryCta.label}
          onChange={(label) =>
            setData({ ...data, primaryCta: { ...data.primaryCta, label } })
          }
        />
        <TextField
          label="Primary button URL"
          value={data.primaryCta.href}
          onChange={(href) =>
            setData({ ...data, primaryCta: { ...data.primaryCta, href } })
          }
        />
        <HtmlField
          label="Secondary button label"
          value={data.secondaryCta.label}
          onChange={(label) =>
            setData({
              ...data,
              secondaryCta: { ...data.secondaryCta, label },
            })
          }
        />
        <TextField
          label="Secondary button URL"
          value={data.secondaryCta.href}
          onChange={(href) =>
            setData({
              ...data,
              secondaryCta: { ...data.secondaryCta, href },
            })
          }
        />
      </div>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="serif text-xl font-medium">Cards</h2>
          <button
            type="button"
            onClick={() =>
              setData({
                ...data,
                cards: [
                  ...data.cards,
                  {
                    id: crypto.randomUUID(),
                    eyebrow: "<p>New</p>",
                    title: "<p>Card title</p>",
                    description: "<p>Description</p>",
                    href: "/",
                    cta: "<p>Learn more →</p>",
                    external: false,
                    image: "",
                  },
                ],
              })
            }
            className="text-sm font-medium text-[var(--accent)]"
          >
            Add card
          </button>
        </div>
        {data.cards.map((card, index) => (
          <div
            key={card.id}
            className="space-y-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5"
          >
            <div className="flex justify-end">
              <RepeaterControls
                disableUp={index === 0}
                disableDown={index === data.cards.length - 1}
                onMoveUp={() =>
                  setData({ ...data, cards: moveItem(data.cards, index, -1) })
                }
                onMoveDown={() =>
                  setData({ ...data, cards: moveItem(data.cards, index, 1) })
                }
                onRemove={() =>
                  setData({
                    ...data,
                    cards: data.cards.filter((c) => c.id !== card.id),
                  })
                }
              />
            </div>
            <HtmlField
              label="Eyebrow"
              value={card.eyebrow}
              onChange={(eyebrow) =>
                setData({
                  ...data,
                  cards: data.cards.map((c) =>
                    c.id === card.id ? { ...c, eyebrow } : c,
                  ),
                })
              }
            />
            <HtmlField
              label="Title"
              value={card.title}
              onChange={(title) =>
                setData({
                  ...data,
                  cards: data.cards.map((c) =>
                    c.id === card.id ? { ...c, title } : c,
                  ),
                })
              }
            />
            <HtmlField
              label="Description"
              value={card.description}
              onChange={(description) =>
                setData({
                  ...data,
                  cards: data.cards.map((c) =>
                    c.id === card.id ? { ...c, description } : c,
                  ),
                })
              }
              variant="full"
            />
            <TextField
              label="URL"
              value={card.href}
              onChange={(href) =>
                setData({
                  ...data,
                  cards: data.cards.map((c) =>
                    c.id === card.id ? { ...c, href } : c,
                  ),
                })
              }
            />
            <HtmlField
              label="Call to action"
              value={card.cta}
              onChange={(cta) =>
                setData({
                  ...data,
                  cards: data.cards.map((c) =>
                    c.id === card.id ? { ...c, cta } : c,
                  ),
                })
              }
            />
            <Field label="Open in a new tab">
              <input
                type="checkbox"
                checked={card.external}
                onChange={(event) =>
                  setData({
                    ...data,
                    cards: data.cards.map((c) =>
                      c.id === card.id
                        ? { ...c, external: event.target.checked }
                        : c,
                    ),
                  })
                }
                className="h-4 w-4 accent-[var(--accent)]"
              />
            </Field>
            <ImageField
              label="Card image"
              value={card.image}
              onChange={(image) =>
                setData({
                  ...data,
                  cards: data.cards.map((c) =>
                    c.id === card.id ? { ...c, image } : c,
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

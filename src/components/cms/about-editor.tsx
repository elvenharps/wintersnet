"use client";

import { useState } from "react";
import type { AboutSection } from "@/lib/cms/schema";
import { ImageField } from "./image-field";
import {
  HtmlField,
  SaveBar,
  SeoFieldsEditor,
  saveSection,
} from "./admin-fields";

export function AboutEditor({ initial }: { initial: AboutSection }) {
  const [data, setData] = useState(initial);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">(
    "idle",
  );
  const [error, setError] = useState("");

  async function save() {
    setStatus("saving");
    setError("");
    try {
      await saveSection({ about: data });
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
        label="Body"
        value={data.body}
        onChange={(body) => setData({ ...data, body })}
        variant="full"
      />
      <ImageField
        label="Portrait"
        value={data.image}
        onChange={(image) => setData({ ...data, image })}
      />
      <SeoFieldsEditor
        value={data.seo}
        onChange={(seo) => setData({ ...data, seo })}
      />
      <SaveBar status={status} error={error} onSave={() => void save()} />
    </div>
  );
}

"use client";

import { useState } from "react";
import type { HistorySection } from "@/lib/cms/schema";
import {
  HtmlField,
  SaveBar,
  SeoFieldsEditor,
  TextField,
  saveSection,
} from "./admin-fields";

export function HistoryEditor({ initial }: { initial: HistorySection }) {
  const [data, setData] = useState(initial);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">(
    "idle",
  );
  const [error, setError] = useState("");

  async function save() {
    setStatus("saving");
    setError("");
    try {
      await saveSection({ history: data });
      setStatus("saved");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Save failed.");
    }
  }

  return (
    <div className="space-y-8">
      <HtmlField
        label="Banner"
        value={data.bannerHtml}
        onChange={(bannerHtml) => setData({ ...data, bannerHtml })}
        variant="full"
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <HtmlField
          label="Banner button label"
          value={data.bannerCta.label}
          onChange={(label) =>
            setData({ ...data, bannerCta: { ...data.bannerCta, label } })
          }
        />
        <TextField
          label="Banner button URL"
          value={data.bannerCta.href}
          onChange={(href) =>
            setData({ ...data, bannerCta: { ...data.bannerCta, href } })
          }
        />
      </div>
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
        label="Article"
        value={data.body}
        onChange={(body) => setData({ ...data, body })}
        variant="full"
        hint="Headings become the table of contents. Use Host for decommissioned hostnames, and the image button to upload figures."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          label="Published (ISO)"
          value={data.publishedIso}
          onChange={(publishedIso) => setData({ ...data, publishedIso })}
        />
        <TextField
          label="Modified (ISO)"
          value={data.modifiedIso}
          onChange={(modifiedIso) => setData({ ...data, modifiedIso })}
        />
      </div>
      <SeoFieldsEditor
        value={data.seo}
        onChange={(seo) => setData({ ...data, seo })}
      />
      <SaveBar status={status} error={error} onSave={() => void save()} />
    </div>
  );
}

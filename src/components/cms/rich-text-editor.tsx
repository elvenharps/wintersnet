"use client";

import { useCallback, useEffect, useRef } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import { DeadHostMark } from "./dead-host-mark";

export type EditorVariant = "compact" | "full";

type Props = {
  value: string;
  onChange: (html: string) => void;
  variant?: EditorVariant;
  placeholder?: string;
};

async function uploadImage(file: File): Promise<string> {
  const form = new FormData();
  form.append("file", file);
  const res = await fetch("/api/admin/upload", { method: "POST", body: form });
  const data = (await res.json()) as { url?: string; error?: string };
  if (!res.ok || !data.url) {
    throw new Error(data.error || "Upload failed.");
  }
  return data.url;
}

function isImageFile(file: File): boolean {
  return file.type.startsWith("image/");
}

export function RichTextEditor({
  value,
  onChange,
  variant = "full",
  placeholder = "Write here…",
}: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const lastEmitted = useRef(value);
  const compact = variant === "compact";

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: compact ? false : { levels: [2, 3] },
        codeBlock: compact ? false : undefined,
        blockquote: compact ? false : undefined,
        horizontalRule: compact ? false : undefined,
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
        HTMLAttributes: { rel: "noreferrer" },
      }),
      Image.configure({
        allowBase64: false,
        HTMLAttributes: { class: "cms-image" },
      }),
      Placeholder.configure({ placeholder }),
      DeadHostMark,
    ],
    content: value || "",
    editorProps: {
      attributes: {
        class: compact
          ? "cms-editor cms-editor-compact"
          : "cms-editor cms-editor-full",
      },
    },
    onUpdate: ({ editor: instance }) => {
      const html = instance.getHTML();
      lastEmitted.current = html;
      onChange(html);
    },
  });

  const insertFromFile = useCallback(
    async (file: File) => {
      try {
        const url = await uploadImage(file);
        editor?.chain().focus().setImage({ src: url }).run();
      } catch (error) {
        window.alert(error instanceof Error ? error.message : "Upload failed.");
      }
    },
    [editor],
  );

  useEffect(() => {
    if (!editor) return;
    const onPaste = (event: ClipboardEvent) => {
      const file = event.clipboardData?.files?.[0];
      if (!file || !isImageFile(file)) return;
      event.preventDefault();
      void insertFromFile(file);
    };
    const onDrop = (event: DragEvent) => {
      const file = event.dataTransfer?.files?.[0];
      if (!file || !isImageFile(file)) return;
      event.preventDefault();
      void insertFromFile(file);
    };
    const el = editor.view.dom;
    el.addEventListener("paste", onPaste);
    el.addEventListener("drop", onDrop);
    return () => {
      el.removeEventListener("paste", onPaste);
      el.removeEventListener("drop", onDrop);
    };
  }, [editor, insertFromFile]);

  useEffect(() => {
    if (!editor) return;
    if (value === lastEmitted.current) return;
    editor.commands.setContent(value || "", { emitUpdate: false });
    lastEmitted.current = value;
  }, [editor, value]);

  if (!editor) {
    return (
      <div className="min-h-[4.5rem] rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--muted)]">
        Loading editor…
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)]">
      <div className="flex flex-wrap gap-0.5 border-b border-[var(--border)] bg-[var(--surface-muted)] p-1">
        <ToolbarButton
          label="Bold"
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <strong>B</strong>
        </ToolbarButton>
        <ToolbarButton
          label="Italic"
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <em>I</em>
        </ToolbarButton>
        <ToolbarButton
          label="Underline"
          active={editor.isActive("underline")}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <span className="underline">U</span>
        </ToolbarButton>
        {!compact ? (
          <>
            <ToolbarButton
              label="Heading 2"
              active={editor.isActive("heading", { level: 2 })}
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
            >
              H2
            </ToolbarButton>
            <ToolbarButton
              label="Heading 3"
              active={editor.isActive("heading", { level: 3 })}
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 3 }).run()
              }
            >
              H3
            </ToolbarButton>
          </>
        ) : null}
        <ToolbarButton
          label="Bullet list"
          active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          •
        </ToolbarButton>
        <ToolbarButton
          label="Numbered list"
          active={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          1.
        </ToolbarButton>
        <ToolbarButton
          label="Link"
          active={editor.isActive("link")}
          onClick={() => {
            const previous = editor.getAttributes("link").href as
              | string
              | undefined;
            const url = window.prompt("Link URL", previous || "https://");
            if (url === null) return;
            if (url === "") {
              editor.chain().focus().extendMarkRange("link").unsetLink().run();
              return;
            }
            editor
              .chain()
              .focus()
              .extendMarkRange("link")
              .setLink({ href: url })
              .run();
          }}
        >
          Link
        </ToolbarButton>
        <ToolbarButton
          label="Insert image"
          onClick={() => fileRef.current?.click()}
        >
          Image
        </ToolbarButton>
        <ToolbarButton
          label="Historical hostname"
          active={editor.isActive("deadHost")}
          onClick={() => {
            if (editor.isActive("deadHost")) {
              editor.chain().focus().unsetDeadHost().run();
              return;
            }
            const year = window.prompt("Offline since year (optional)", "");
            const title = year?.trim()
              ? `Offline since ~${year.trim()}`
              : "Offline — historical hostname";
            editor.chain().focus().toggleDeadHost({ title }).run();
          }}
        >
          Host
        </ToolbarButton>
        <ToolbarButton
          label="Inline code"
          active={editor.isActive("code")}
          onClick={() => editor.chain().focus().toggleCode().run()}
        >
          {"</>"}
        </ToolbarButton>
      </div>
      <EditorContent editor={editor} />
      <input
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0];
          event.target.value = "";
          if (file) void insertFromFile(file);
        }}
      />
    </div>
  );
}

function ToolbarButton({
  label,
  active,
  onClick,
  children,
}: {
  label: string;
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={active}
      onClick={onClick}
      className={`rounded px-2 py-1 text-xs font-medium transition ${
        active
          ? "bg-[var(--accent)] text-on-accent"
          : "text-[var(--foreground)] hover:bg-[var(--surface)]"
      }`}
    >
      {children}
    </button>
  );
}

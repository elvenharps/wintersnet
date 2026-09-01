const BLOCK_UNWRAP = /^<p>([\s\S]*)<\/p>$/i;

export function stripHtml(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<\/p>/gi, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&mdash;/g, "—")
    .replace(/&ndash;/g, "–")
    .replace(/&rsquo;/g, "’")
    .replace(/&lsquo;/g, "‘")
    .replace(/&rdquo;/g, "”")
    .replace(/&ldquo;/g, "“")
    .replace(/\s+/g, " ")
    .trim();
}

export function unwrapBlocks(html: string): string {
  const trimmed = html.trim();
  const single = trimmed.match(BLOCK_UNWRAP);
  if (single && !single[1].includes("</p>")) {
    return single[1];
  }
  return trimmed.replace(/<\/p>\s*<p>/gi, "<br>").replace(/<\/?p>/gi, "");
}

export function replaceYearToken(html: string, year = new Date().getFullYear()): string {
  return html.replaceAll("{{year}}", String(year));
}

export function isExternalHref(href: string): boolean {
  return /^(https?:|mailto:|irc:)/i.test(href);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&[a-z]+;/gi, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export type TocEntry = { id: string; text: string };

export function injectToc(html: string, toc: TocEntry[]): string {
  if (toc.length === 0) return html;
  const items = toc
    .map(
      (entry) =>
        `<li><a href="#${escapeHtml(entry.id)}">${escapeHtml(entry.text)}</a></li>`,
    )
    .join("");
  const nav = `<nav aria-label="Table of contents" class="toc"><p class="toc-label">Contents</p><ol>${items}</ol></nav>`;
  const idx = html.search(/<h2\b/i);
  if (idx === -1) return `${nav}${html}`;
  return `${html.slice(0, idx)}${nav}${html.slice(idx)}`;
}

export function withHeadingIds(html: string): { html: string; toc: TocEntry[] } {
  const toc: TocEntry[] = [];
  const next = html.replace(/<h2\b([^>]*)>([\s\S]*?)<\/h2>/gi, (full, attrs: string, inner: string) => {
    const text = stripHtml(inner);
    if (!text) return full;
    const idMatch = attrs.match(/\bid\s*=\s*"([^"]*)"/i);
    const id = idMatch?.[1] || slugify(text);
    toc.push({ id, text });
    if (idMatch) return full;
    const trimmedAttrs = attrs.trim();
    return `<h2${trimmedAttrs ? ` ${trimmedAttrs}` : ""} id="${id}">${inner}</h2>`;
  });
  return { html: next, toc };
}

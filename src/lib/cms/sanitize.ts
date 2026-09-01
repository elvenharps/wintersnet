import sanitizeHtml from "sanitize-html";

const ALLOWED_TAGS = [
  ...sanitizeHtml.defaults.allowedTags,
  "img",
  "h1",
  "h2",
  "h3",
  "span",
  "figure",
  "figcaption",
  "u",
];

export function sanitizeCmsHtml(dirty: string): string {
  return sanitizeHtml(dirty, {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      a: ["href", "name", "target", "rel", "class", "title"],
      img: ["src", "alt", "title", "width", "height", "class"],
      span: ["class", "title"],
      p: ["class", "id"],
      h1: ["id", "class"],
      h2: ["id", "class"],
      h3: ["id", "class"],
      div: ["class", "id"],
      code: ["class"],
      pre: ["class"],
    },
    allowedSchemes: ["http", "https", "mailto", "irc"],
    allowedSchemesByTag: {
      img: ["http", "https"],
    },
    allowProtocolRelative: false,
    transformTags: {
      a: (tagName, attribs) => {
        const next = { ...attribs };
        if (next.target === "_blank" && !next.rel) {
          next.rel = "noreferrer";
        }
        return { tagName, attribs: next };
      },
    },
  });
}
